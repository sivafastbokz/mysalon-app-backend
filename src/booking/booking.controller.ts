import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards, Param, UnauthorizedException, Put,} from '@nestjs/common';
import { BookingService } from './booking.service';
import { AuthorizationGuard } from 'src/guard/authorization.guard';
import { BookingDto } from './dto/booking.dto';

@UseGuards(AuthorizationGuard)
@Controller('mysalon')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}
  
  @Post('booking')
  async addBooking(@Body() reqObj:BookingDto,@Res() response){
      try {
        const userId = response.req.userId;
        if (!userId) {
            throw new UnauthorizedException('Unauthorized');
      }
      const newBooking = await this.bookingService.CreateBooking({...reqObj,userId:userId})
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

}
