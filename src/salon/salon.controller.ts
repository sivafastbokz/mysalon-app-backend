import { Body, Controller, Get, Post, Res, HttpStatus } from '@nestjs/common';
import { SalonService } from './salon.service' ;
import { SalonCutomerData } from './salon.schema';
import { SignUpDto } from './dto/salon.dto';
import { SignInDto } from './dto/salon.dto';

@Controller('mysalon')
export class SalonController {
 constructor(
    private readonly salonService:SalonService
 ) {}

 @Post('signup')
 async createCustomer(@Body() reqObj:SignUpDto, @Res() response){
    try {
      const newCustomer = await this.salonService.signUp(reqObj)
      return response.status(HttpStatus.OK).json({
        message: 'Account created successfully',newCustomer
      });
    } catch (error) {
      console.log(error)
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode:400,
        message:'Error: Account not created',
        error:'Bad Request'
      })
    }
 }

 @Get('customerlist')
 async getCustomers(@Res() response){
  try {
    const customerlist = await this.salonService.getAllCustomer()
    return response.status(HttpStatus.OK).json({
      message:'Customer List',customerlist
    })
  } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      statusCode:400,
      message:'Error: Cannot get customers',
      error:'Bad Request'
    })
  }
 }
 
 @Post('signin')
async signIn(@Body() reqObj:SignInDto,@Res() response):Promise<{token:string}>{
  try {
    const {token} = await this.salonService.signIn(reqObj)
    return response.status(HttpStatus.OK).json({
      message:'signIn successfull',
      data:token
    })
  } catch (error) {
    return response.status(HttpStatus.UNAUTHORIZED).json({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'Error: Cannot sign in!',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}



}