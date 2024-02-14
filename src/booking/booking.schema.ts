import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type  BookingDocument = Booking & Document

var currentDate = new Date()
var day = currentDate.getDate()
var month = currentDate.getMonth()+1
var year = currentDate.getFullYear()
var formattedDate = day + '/' + month + '/' + year;

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

  @Prop({default:formattedDate})
  bookedDate:string;
}

export const bookingSchema = SchemaFactory.createForClass(Booking)