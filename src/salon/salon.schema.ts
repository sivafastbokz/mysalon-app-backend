import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SalonImgDocument = SalonImgHeader & Document

@Schema()
export class SalonImgHeader {
 @Prop()
 img:string;
}

export const salonImgSchema = SchemaFactory.createForClass(SalonImgHeader);
