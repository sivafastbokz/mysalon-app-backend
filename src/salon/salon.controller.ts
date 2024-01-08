import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { SalonService } from './salon.service' ;
import { SalonImgHeader } from './salon.schema';

@Controller('mysalon')
export class SalonController {
 constructor(
    private readonly salonService:SalonService
 ) {}

 @Post('postimg')
  async postImg(@Body() img:SalonImgHeader){
    try {
        const newImg = this.salonService.postImgs(img) 
        return await newImg
    } catch (error) {
        throw error
    }
  }

  @Get('getimg')
  async getImg(@Res() res){
    // res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    // res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    
    try {
        const fingImg = this.salonService.getImg()
        return await fingImg
    } catch (error) {
        throw error
    }
  }
}