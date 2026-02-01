import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Supplier, SupplierDocument } from './schemas/supplier.schema';
import { CreateSupplierDto } from './dto/create-supplier.dto';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectModel(Supplier.name)
    private readonly supplierModel: Model<SupplierDocument>,
  ) {}

  private toGeo(lat: number, lng: number) {
    return { type: 'Point' as const, coordinates: [lng, lat] as [number, number] };
  }

  async upsertByExternalId(dto: CreateSupplierDto) {
    const update = {
      ...dto,
      geo: this.toGeo(dto.latitud, dto.longitud),
    };

    return this.supplierModel.findOneAndUpdate(
      { provedoor_id: dto.provedoor_id },
      { $set: update },
      { new: true, upsert: true },
    ).exec();
  }

  async create(dto: CreateSupplierDto) {
    // create directo (si ya existe, Mongo dará error unique)
    const doc = new this.supplierModel({
      ...dto,
      geo: this.toGeo(dto.latitud, dto.longitud),
    });
    return doc.save();
  }

  async findAll() {
    return this.supplierModel.find().exec();
  }

  async findByExternalId(provedoor_id: string) {
    const s = await this.supplierModel.findOne({ provedoor_id }).exec();
    if (!s) throw new NotFoundException('Supplier not found');
    return s;
  }
}
