import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Offer, OfferDocument } from './schemas/offer.schema';
import { CreateOfferDto } from './dto/create-offer.dto';
import { SuppliersService } from '../suppliers/suppliers.service';

@Injectable()
export class OffersService {
  constructor(
    @InjectModel(Offer.name)
    private readonly offerModel: Model<OfferDocument>,
    private readonly suppliersService: SuppliersService,
  ) {}

  async upsertOffer(dto: CreateOfferDto) {
    if (!dto.provedoor_id) {
      throw new BadRequestException('provedoor_id is required');
    }

    // upsert por provedoor_id + id_material
    return this.offerModel.findOneAndUpdate(
      { provedoor_id: dto.provedoor_id, id_material: dto.id_material },
      { $set: dto },
      { new: true, upsert: true },
    ).exec();
  }

  async createForSupplier(provedoor_id: string, dto: CreateOfferDto) {
    // verifica proveedor
    await this.suppliersService.findByExternalId(provedoor_id);

    return this.upsertOffer({ ...dto, provedoor_id });
  }

  async find(query: {
    categoria?: string;
    material_nombre?: string;
    provedoor_id?: string;
    verified?: string; // "true"/"false"
    sort?: string; // "price" | "co2" | "rating"
  }) {
    const filter: any = {};
    if (query.categoria) filter.categoria = query.categoria;
    if (query.material_nombre) filter.material_nombre = { $regex: query.material_nombre, $options: 'i' };
    if (query.provedoor_id) filter.provedoor_id = query.provedoor_id;
    if (query.verified) filter['co2.verified'] = query.verified === 'true';

    let q = this.offerModel.find(filter);

    if (query.sort === 'price') q = q.sort({ costo_unitario_mxn: 1 });
    if (query.sort === 'co2') q = q.sort({ factor_emision_kgco2e_por_unidad: 1 });

    return q.exec();
  }

  /**
   * Bulk ingest: recibe tu array combinado y lo separa:
   * - upsert supplier por provedoor_id
   * - upsert offer por (provedoor_id, id_material)
   */
  async bulkIngest(items: any[]) {
    const results: any[] = [];

    for (const item of items) {
      // 1) supplier
      const supplier = await this.suppliersService.upsertByExternalId({
        provedoor_id: item.provedoor_id,
        nombre_provedor: item.nombre_provedor,
        latitud: item.latitud,
        longitud: item.longitud,
        delivery: item.delivery,
        location: item.location,
        address: item.address,
        logo: item.logo,
        phone: item.phone,
        rating: item.rating,
      });

      // 2) offer
      const offerDto: CreateOfferDto = {
        id_material: item.id_material,
        material_nombre: item.material_nombre,
        categoria: item.categoria,
        variant: item.variant,
        cantidad: item.cantidad,
        price: item.price,
        unidad: item.unidad,
        costo_unitario_mxn: item.costo_unitario_mxn,
        factor_emision_kgco2e_por_unidad: item.factor_emision_kgco2e_por_unidad,
        co2e_kg: item.co2e_kg,
        co2: item.co2,
        provedoor_id: supplier.provedoor_id,
      };

      const offer = await this.upsertOffer(offerDto);
      results.push({ supplier: supplier.provedoor_id, offer: offer.id_material });
    }

    return { insertedOrUpdated: results.length, results };
  }

  async findByMaterials(
  materials: Array<{ categoria: string; material_nombre?: string; variant?: string }>,
  sort?: 'co2' | 'price',
) {
  const results: any[] = [];

  for (const m of materials) {
    const filter: any = { categoria: m.categoria };

    if (m.material_nombre) {
      filter.material_nombre = { $regex: m.material_nombre, $options: 'i' };
    }
    if (m.variant) {
      filter.variant = { $regex: m.variant, $options: 'i' };
    }

    let q = this.offerModel.find(filter).limit(10);

    if (sort === 'co2') q = q.sort({ factor_emision_kgco2e_por_unidad: 1 });
    if (sort === 'price') q = q.sort({ costo_unitario_mxn: 1 });

    const offers = await q.exec();

    results.push({
      query: m,
      count: offers.length,
      offers,
    });
  }

  return results;
}

}
