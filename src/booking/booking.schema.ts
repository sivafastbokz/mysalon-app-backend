import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type  BookingDocument = Booking & Document

@Schema()
export class Booking {
  @Prop()
  userId:string;

  @Prop()
  bookingName:string;

  @Prop()
  bookingDate:string;

  @Prop()
  bookingTime:string;
}

export const bookingSchema = SchemaFactory.createForClass(Booking)