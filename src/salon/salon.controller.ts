import { Body, Controller, Get, Post, Res, HttpStatus, Param } from '@nestjs/common';
import { SalonService } from './salon.service' ;
// import { SalonCutomerData } from './salon.schema';
import { SignUpDto } from './dto/salon.dto';
import { SignInDto } from './dto/salon.dto';
import { MailService,SendEmailDto } from 'src/mail/mail.service';

@Controller('mysalon')
export class SalonController {
 constructor(
    private readonly salonService:SalonService,
    private readonly mailservice:MailService
 ) {}

 @Post('signup')
 async createCustomer(@Body() reqObj:SignUpDto, @Res() response){
    try {
      const newCustomer = await this.salonService.signUp(reqObj)
      const dto : SendEmailDto = {
        recipients:[{name:newCustomer.name,address:newCustomer.email}],
        subject:'Welcome to MySalon',
        text:`Dear ${newCustomer.name} Welcome to MySalon, your one-stop destination for all your grooming needs! We are thrilled to have you join our community.
        At MySalon, we are committed to providing you with top-notch services and ensuring that every visit leaves you feeling refreshed and rejuvenated. Whether it's a haircut, a relaxing massage, or a refreshing facial, our team of experienced professionals is here to cater to your every need.`,
        html:`Dear ${newCustomer.name} <br/> Welcome to MySalon, your one-stop destination for all your grooming needs! We are thrilled to have you join our community.
        At MySalon, we are committed to providing you with top-notch services and ensuring that every visit leaves you feeling refreshed and rejuvenated. Whether it's a haircut, a relaxing massage, or a refreshing facial, our team of experienced professionals is here to cater to your every need.`,    
      }
      await this.mailservice.SendEmail(dto)
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

@Get('user/:id')
async getUserById(@Param('id') id:string,@Res() response){
  try {
    const findUser = await this.salonService.findByUserId(id)
    return response.status(HttpStatus.OK).json({
      message:'Found User',findUser
    })
  } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      statusCode:400,
      message:'Error: Cannot get User',
      error:'Bad Request'
    })
  }
}
}