import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  // Mapea el campo _id a id
  @Prop({ type: String })
  id: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);