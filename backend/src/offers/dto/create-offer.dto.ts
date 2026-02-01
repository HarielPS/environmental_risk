import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class PriceDto {
  @IsNumber()
  @Min(0)
  value: number;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  unit: string;
}

class Co2MetaDto {
  @IsNumber()
  @Min(0)
  value: number;

  @IsString()
  @IsNotEmpty()
  unit: string;

  @IsString()
  @IsNotEmpty()
  level: string;

  @IsBoolean()
  verified: boolean;
}

export class CreateOfferDto {
  @IsString()
  @IsNotEmpty()
  id_material: string;

  @IsString()
  @IsNotEmpty()
  material_nombre: string;

  @IsString()
  @IsNotEmpty()
  categoria: string;

  @IsString()
  @IsOptional()
  variant?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  cantidad?: number;

  @ValidateNested()
  @Type(() => PriceDto)
  price: PriceDto;

  @IsString()
  @IsNotEmpty()
  unidad: string;

  @IsNumber()
  @Min(0)
  costo_unitario_mxn: number;

  @IsNumber()
  @Min(0)
  factor_emision_kgco2e_por_unidad: number;

  @IsNumber()
  @Min(0)
  co2e_kg: number;

  @ValidateNested()
  @Type(() => Co2MetaDto)
  co2: Co2MetaDto;

  @IsString()
  @IsOptional()
  provedoor_id?: string; // se llena por URL o bulk
}
