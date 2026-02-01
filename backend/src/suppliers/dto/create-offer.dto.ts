import { IsBoolean, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PriceDto {
  @IsNumber() @Min(0)
  value: number;

  @IsString() @IsNotEmpty()
  currency: string; // "MXN"

  @IsString() @IsNotEmpty()
  unit: string; // "kg" | "t" | "m3" | "L" | "pza" | "saco"
}

class Co2MetaDto {
  @IsNumber() @Min(0)
  value: number; // normalmente = factor_emision_kgco2e_por_unidad

  @IsString() @IsNotEmpty()
  unit: string; // "kgCO2e"

  @IsString() @IsNotEmpty()
  level: string; // "Muy Bajo" | "Bajo" | "Medio" | "Alto" | "Muy Alto"

  @IsBoolean()
  verified: boolean;
}

export class CreateOfferDto {
  @IsString() @IsNotEmpty()
  id_material: string; // "MAT-001"

  @IsString() @IsNotEmpty()
  material_nombre: string;

  @IsString() @IsNotEmpty()
  categoria: string;

  @IsString()
  @IsOptional()
  variant?: string; // "Estándar" | "Baja huella" | etc.

  // OJO: cantidad aquí puede ser "ejemplo"; en cotización real vendrá desde obra/BOM.
  @IsNumber() @IsOptional() @Min(0)
  cantidad?: number;

  @ValidateNested()
  @Type(() => PriceDto)
  price: PriceDto;

  @IsString() @IsNotEmpty()
  unidad: string; // redundante pero lo traes en tu JSON

  @IsNumber() @Min(0)
  costo_unitario_mxn: number;

  @IsNumber() @Min(0)
  factor_emision_kgco2e_por_unidad: number;

  @IsNumber() @Min(0)
  co2e_kg: number;

  @ValidateNested()
  @Type(() => Co2MetaDto)
  co2: Co2MetaDto;

  // vínculo (lo mandas desde endpoint /suppliers/:id/offers o en bulk)
  @IsString()
  @IsOptional()
  provedoor_id?: string;
}
