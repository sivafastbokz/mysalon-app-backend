import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BookingDocument } from './booking.schema';
import { BookingDto } from './dto/booking.dto';

@Injectable()
export class BookingService {
    constructor(
        @InjectModel('bookingdata')
        private readonly bookingModel: Model<BookingDocument>
    ) {}
 
   async CreateBooking(reqObj:BookingDto):Promise<any>{
     try {
        const {userId,bookingName,bookingDate,bookingTime,bookedDate} = reqObj
        const newBooking = new this.bookingModel({userId,bookingName,bookingDate,bookingTime,bookedDate})
        return await newBooking.save();
     } catch (error) {
        throw new Error (`Failed to create booking: ${error.message}`)
     }
   } 

   async getBooking({userId}:{userId:string}){
    try {
        const getAllBooking = this.bookingModel.find({userId})
        return await getAllBooking
    } catch (error) {
        throw new Error(`Failed to get Bookings: ${error.message}`);
    }
}

   async updateBooking(id,data){
    try {
        const update = this.bookingModel.findByIdAndUpdate(id,data,{new:true})
        return await update
    } catch (error) {
        throw new Error(`Failed to Update Booking: ${error.message}`);
    }
   }

   async deleteBooking(id:string){
    try {
        const deleteBooking = this.bookingModel.findByIdAndDelete(id)
        return await deleteBooking
    } catch (error) {
        throw new Error(`Failed to Delete Booking: ${error.message}`);
    }
   }

}
