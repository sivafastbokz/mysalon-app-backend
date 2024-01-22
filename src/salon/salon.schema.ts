import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerDataDocument = SalonCutomerData & Document

@Schema()
export class SalonCutomerData {
 @Prop()
 name:string;

 @Prop()
 email:string;

 @Prop()
 phoneNumber:number;

 @Prop()
 message:string;

 @Prop()
 password:string;
}

export const customerData = SchemaFactory.createForClass(SalonCutomerData);
