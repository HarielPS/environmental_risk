import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class MaterialNeedDto {
  @IsString() @IsNotEmpty()
  categoria: string;

  @IsString() @IsOptional()
  material_nombre?: string; // opcional para match más fino

  @IsString() @IsOptional()
  variant?: string; // si quieres pedir "Baja huella", etc.
}

export class ByMaterialsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MaterialNeedDto)
  materials: MaterialNeedDto[];

  @IsString()
  @IsOptional()
  sort?: 'co2' | 'price';
}
