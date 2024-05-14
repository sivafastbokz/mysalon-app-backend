import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards, Param, UnauthorizedException, Put, Delete,} from '@nestjs/common';
import { BookingService } from './booking.service';
import { AuthorizationGuard } from 'src/guard/authorization.guard';
import { BookingDto } from './dto/booking.dto';
import { UpdateBookingDto } from './dto/booking.dto';
import { MailService, SendEmailDto } from 'src/mail/mail.service';
import { SalonService } from 'src/salon/salon.service';

@UseGuards(AuthorizationGuard)
@Controller('mysalon')
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly mailService:MailService,
    private readonly salonService:SalonService
    ) {}
  
  @Post('booking')
  async addBooking(@Body() reqObj:BookingDto,@Res() response){
      try {
        const userId = response.req.userId;
        if (!userId) {
            throw new UnauthorizedException('Unauthorized');
      }
      const newBooking = await this.bookingService.CreateBooking({...reqObj,userId:userId})
      const user = await this.salonService.findByUserId(userId)
      const Dto: SendEmailDto = {
         recipients:[{name:user.name,address:user.email}],
         subject: 'Appointment Confirmation',
         text: `Dear ${user.name}, your appointment for ${newBooking.bookingName} has been confirmed for ${newBooking.bookingDate} at ${newBooking.bookingTime}.`,
         html: `<p>Dear ${user.name}, your appointment for ${newBooking.bookingName} has been confirmed for ${newBooking.bookingDate} at ${newBooking.bookingTime}.</p>`
      }
      await this.mailService.SendEmail(Dto)
      return response.status(HttpStatus.CREATED).json({
        message:'Booking created successfully',newBooking
      });
      } catch (error) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          statusCode:400,
          message:'Error: Booking not created',
          error:'Bad Request'
        })
      }
  }

  @Get('bookings')
  async fetchBookings(@Res() response){
    try {
        const userId = response.req.userId;
        const fetchBookings = await this.bookingService.getBooking({userId})
        return response.status(HttpStatus.OK).json({
            message: 'All bookings fetched successfully',fetchBookings
        });
    } catch (error) {
        return response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: 400,
            message: 'Error:Cannot get Bookings!',
            error: 'Bad Request'
        });
    }
}
  
  @Put('update/:id')
  async UpdateBooking(@Param('id') id:string ,@Res() response, @Body() updateDto:UpdateBookingDto){
     try {
      const update = await this.bookingService.updateBooking(id,updateDto)
      return response.status(HttpStatus.OK).json({
        message: 'booking Updated successfully',update
    });
     } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error:Cannot Update Booking!',
        error: 'Bad Request'
    });
     }
  }

  @Delete('delete/:id')
  async deleteBooking(@Param('id') id:string, @Res() response){
    try {
       const deleteBooking = await this.bookingService.deleteBooking(id)
       return response.status(HttpStatus.OK).json({
        message: 'booking Deleted successfully',deleteBooking
    });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error:Cannot delete Booking!',
        error: 'Bad Request'
    });
    }
  }
}