import { IsNotEmpty, IsNumber, IsOptional, IsString, Min, Max, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class DeliveryDto {
  @IsNumber() @Min(0)
  minDays: number;

  @IsNumber() @Min(0)
  maxDays: number;
}

export class CreateSupplierDto {
  @IsString() @IsNotEmpty()
  provedoor_id: string; // "PROV-001" (external id)

  @IsString() @IsNotEmpty()
  nombre_provedor: string;

  @IsNumber()
  latitud: number;

  @IsNumber()
  longitud: number;

  @ValidateNested()
  @Type(() => DeliveryDto)
  @IsOptional()
  delivery?: DeliveryDto;

  @IsString()
  @IsOptional()
  location?: string; // "CDMX" / "Naucalpan, MEX"

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  logo?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(5)
  rating?: number;
}
