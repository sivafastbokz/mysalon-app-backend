import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServiceDocument = SalonService & Document

@Schema()
export class SalonService {
    @Prop()
    serviceImage:string
    @Prop()
    serviceName:string
    @Prop()
    servicePrice:number
}

export const serviceSchema = SchemaFactory.createForClass(SalonService);