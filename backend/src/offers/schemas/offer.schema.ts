import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OfferDocument = Offer & Document;

@Schema({ _id: false })
class Price {
  @Prop({ required: true, min: 0 })
  value: number;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  unit: string;
}
const PriceSchema = SchemaFactory.createForClass(Price);

@Schema({ _id: false })
class Co2Meta {
  @Prop({ required: true, min: 0 })
  value: number;

  @Prop({ required: true })
  unit: string;

  @Prop({ required: true })
  level: string;

  @Prop({ required: true })
  verified: boolean;
}
const Co2MetaSchema = SchemaFactory.createForClass(Co2Meta);

@Schema({ timestamps: true })
export class Offer {
  @Prop({ required: true })
  id_material: string;

  @Prop({ required: true })
  material_nombre: string;

  @Prop({ required: true })
  categoria: string;

  @Prop()
  variant?: string;

  @Prop({ min: 0 })
  cantidad?: number;

  @Prop({ type: PriceSchema, required: true })
  price: Price;

  @Prop({ required: true })
  unidad: string;

  @Prop({ required: true, min: 0 })
  costo_unitario_mxn: number;

  @Prop({ required: true, min: 0 })
  factor_emision_kgco2e_por_unidad: number;

  @Prop({ required: true, min: 0 })
  co2e_kg: number;

  @Prop({ type: Co2MetaSchema, required: true })
  co2: Co2Meta;

  @Prop({ required: true, index: true })
  provedoor_id: string;
}

export const OfferSchema = SchemaFactory.createForClass(Offer);

// Evitar duplicados por proveedor+material
OfferSchema.index({ provedoor_id: 1, id_material: 1 }, { unique: true });
OfferSchema.index({ categoria: 1 });
OfferSchema.index({ material_nombre: 1 });
