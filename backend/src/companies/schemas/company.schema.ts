import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema({ _id: false })
export class Coordinates {
  @Prop({ required: true })
  latitud: number;

  @Prop({ required: true })
  longitud: number;
}
export const CoordinatesSchema = SchemaFactory.createForClass(Coordinates);

@Schema({ _id: false })
export class Address {
  @Prop({ required: true })
  pais: string;

  @Prop({ required: true })
  estado: string;

  @Prop({ required: true })
  ciudad: string;

  @Prop({ required: true })
  alcaldia_municipio: string;

  @Prop()
  colonia?: string;

  @Prop()
  calle?: string;

  @Prop()
  avenida?: string;

  @Prop()
  numero_exterior?: string;

  @Prop()
  numero_interior?: string;

  @Prop()
  codigo_postal?: string;

  @Prop({ type: CoordinatesSchema })
  coordenadas?: Coordinates;
}
export const AddressSchema = SchemaFactory.createForClass(Address);

@Schema({ _id: false })
export class Contact {
  @Prop({ required: true })
  nombre: string;

  @Prop()
  puesto?: string;

  @Prop()
  telefono?: string;

  @Prop()
  correo?: string;
}
export const ContactSchema = SchemaFactory.createForClass(Contact);

@Schema({ _id: false })
export class NormativeFlags {
  @Prop({ default: false })
  tieneAuditoriaCO2?: boolean;

  @Prop({ default: false })
  tieneEPD?: boolean;

  @Prop({ default: false })
  tieneEF?: boolean;
}
export const NormativeFlagsSchema = SchemaFactory.createForClass(NormativeFlags);

@Schema({ _id: false })
export class Material {
  @Prop({ required: true })
  material_nombre: string;

  @Prop({ required: true })
  categoria: string;

  @Prop({ required: true, min: 0 })
  cantidad: number;

  @Prop({ required: true })
  unidad: string;

  @Prop({ required: true, min: 0 })
  costo_unitario_mxn: number;

  @Prop({ required: true, min: 0 })
  factor_emision_kgco2e_por_unidad: number;

  @Prop({ required: true, min: 0 })
  co2e_kg: number;

  @Prop()
  especificacion?: string;

  @Prop()
  factor_emision_source?: string;

  @Prop({ min: 0 })
  dist_km?: number;
}
export const MaterialSchema = SchemaFactory.createForClass(Material);

@Schema({ _id: false })
export class Obra {
  @Prop({ required: true })
  obra_id: string;

  @Prop({ required: true })
  obra_tipo: string;

  @Prop()
  obra_descripcion?: string;

  @Prop({ type: AddressSchema, required: true })
  ubicacion: Address;

  @Prop({ type: [MaterialSchema], default: [] })
  materiales: Material[];

  @Prop()
  moneda?: string;

  @Prop({ type: Object })
  supuestos?: Record<string, any>;
}
export const ObraSchema = SchemaFactory.createForClass(Obra);

@Schema({ timestamps: true })
export class Company {
  @Prop({ required: true })
  nombre_comercial: string;

  @Prop()
  razon_social?: string;

  @Prop()
  rfc?: string;

  @Prop({ required: true })
  giro: string;

  @Prop({ required: true })
  correo: string;

  @Prop({ type: ContactSchema, required: true })
  contacto: Contact;

  @Prop({ type: AddressSchema, required: true })
  ubicacion_fiscal: Address;

  @Prop({ type: NormativeFlagsSchema, default: {} })
  flags?: NormativeFlags;

  @Prop({ type: [ObraSchema], default: [] })
  obras: Obra[];
}

export const CompanySchema = SchemaFactory.createForClass(Company);
