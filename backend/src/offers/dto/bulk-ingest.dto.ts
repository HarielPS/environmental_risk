import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOfferDto } from '../../offers/dto/create-offer.dto';
import { CreateSupplierDto } from '../../suppliers/dto/create-supplier.dto';

// Un item trae campos de supplier + offer. Aquí lo modelamos como "any" estructurado,
// pero lo validamos reusando DTOs internamente en el service.
export class BulkIngestDto {
  @IsArray()
  items: any[];
}
