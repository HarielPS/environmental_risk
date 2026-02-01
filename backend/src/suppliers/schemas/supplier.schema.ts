import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SupplierDocument = Supplier & Document;

@Schema({ _id: false })
class Delivery {
  @Prop({ min: 0 })
  minDays: number;

  @Prop({ min: 0 })
  maxDays: number;
}
const DeliverySchema = SchemaFactory.createForClass(Delivery);

@Schema({ timestamps: true })
export class Supplier {
  @Prop({ required: true, unique: true })
  provedoor_id: string; // external id (PROV-001)

  @Prop({ required: true })
  nombre_provedor: string;

  @Prop({ required: true })
  latitud: number;

  @Prop({ required: true })
  longitud: number;

  // GeoJSON para queries cercanas
  @Prop({
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [] }, // [lng, lat]
  })
  geo?: { type: 'Point'; coordinates: [number, number] };

  @Prop({ type: DeliverySchema })
  delivery?: Delivery;

  @Prop() location?: string;
  @Prop() address?: string;
  @Prop() logo?: string;
  @Prop() phone?: string;

  @Prop({ min: 0, max: 5 })
  rating?: number;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);

SupplierSchema.index({ geo: '2dsphere' });
