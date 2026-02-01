import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CoordinatesDto {
  @IsNumber()
  latitud: number;

  @IsNumber()
  longitud: number;
}

export class AddressDto {
  @IsString()
  @IsNotEmpty()
  pais: string; // "MX"

  @IsString()
  @IsNotEmpty()
  estado: string; // "CDMX"

  @IsString()
  @IsNotEmpty()
  ciudad: string;

  @IsString()
  @IsNotEmpty()
  alcaldia_municipio: string;

  @IsString()
  @IsOptional()
  colonia?: string;

  @IsString()
  @IsOptional()
  calle?: string;

  @IsString()
  @IsOptional()
  avenida?: string;

  @IsString()
  @IsOptional()
  numero_exterior?: string;

  @IsString()
  @IsOptional()
  numero_interior?: string;

  @IsString()
  @IsOptional()
  codigo_postal?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CoordinatesDto)
  coordenadas?: CoordinatesDto;
}

export class ContactDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  puesto?: string;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsEmail()
  @IsOptional()
  correo?: string;
}

export class NormativeFlagsDto {
  @IsBoolean()
  @IsOptional()
  tieneAuditoriaCO2?: boolean;

  @IsBoolean()
  @IsOptional()
  tieneEPD?: boolean;

  @IsBoolean()
  @IsOptional()
  tieneEF?: boolean;
}

export class MaterialDto {
  @IsString()
  @IsNotEmpty()
  material_nombre: string;

  @IsString()
  @IsNotEmpty()
  categoria: string;

  @IsNumber()
  @Min(0)
  cantidad: number;

  @IsString()
  @IsNotEmpty()
  unidad: string; // kg | t | m2 | L ...

  @IsNumber()
  @Min(0)
  costo_unitario_mxn: number;

  @IsNumber()
  @Min(0)
  factor_emision_kgco2e_por_unidad: number;

  @IsNumber()
  @Min(0)
  co2e_kg: number;

  // mejoras
  @IsString()
  @IsOptional()
  especificacion?: string; // "Grado 42", "30 MPa", etc.

  @IsString()
  @IsOptional()
  factor_emision_source?: string; // "EPD" | "EF" | "partner" | "promedio"

  @IsNumber()
  @IsOptional()
  @Min(0)
  dist_km?: number; // opcional para transporte después
}

export class ObraDto {
  @IsString()
  @IsNotEmpty()
  obra_id: string;

  @IsString()
  @IsNotEmpty()
  obra_tipo: string;

  @IsString()
  @IsOptional()
  obra_descripcion?: string;

  @ValidateNested()
  @Type(() => AddressDto)
  ubicacion: AddressDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MaterialDto)
  materiales: MaterialDto[];

  // mejoras
  @IsString()
  @IsOptional()
  moneda?: string; // "MXN"

  @IsObject()
  @IsOptional()
  supuestos?: Record<string, any>; // trazabilidad de estimación
}

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  nombre_comercial: string;

  @IsString()
  @IsOptional()
  razon_social?: string;

  @IsString()
  @IsOptional()
  rfc?: string;

  @IsString()
  @IsNotEmpty()
  giro: string; // "construccion", "manufactura", etc.

  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @ValidateNested()
  @Type(() => ContactDto)
  contacto: ContactDto;

  @ValidateNested()
  @Type(() => AddressDto)
  ubicacion_fiscal: AddressDto;

  @ValidateNested()
  @Type(() => NormativeFlagsDto)
  @IsOptional()
  flags?: NormativeFlagsDto;

  // opcional: permitir crear empresa con obras iniciales
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ObraDto)
  @IsOptional()
  obras?: ObraDto[];
}
