import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { ByMaterialsDto } from './dto/by-materials.dto';

@Controller()
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  // Crear/actualizar oferta para un proveedor
  @Post('suppliers/:provedoor_id/offers')
  createForSupplier(
    @Param('provedoor_id') provedoor_id: string,
    @Body() dto: CreateOfferDto,
  ) {
    return this.offersService.createForSupplier(provedoor_id, dto);
  }

  // Buscar ofertas (filtros)
  @Get('offers')
  find(
    @Query('categoria') categoria?: string,
    @Query('material_nombre') material_nombre?: string,
    @Query('provedoor_id') provedoor_id?: string,
    @Query('verified') verified?: string,
    @Query('sort') sort?: string,
  ) {
    return this.offersService.find({ categoria, material_nombre, provedoor_id, verified, sort });
  }

  // Bulk ingest: acepta tu array combinado
  @Post('offers/bulk')
  bulk(@Body() body: { items: any[] }) {
    return this.offersService.bulkIngest(body.items ?? []);
  }

  // Buscar ofertas por materiales
  @Post('offers/by-materials')
    byMaterials(@Body() dto: ByMaterialsDto) {
    return this.offersService.findByMaterials(dto.materials, dto.sort);
    }

}