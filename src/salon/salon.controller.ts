import { Body, Controller, Get, Post } from '@nestjs/common';
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
  async getImg(){
    try {
        const fingImg = this.salonService.getImg()
        return await fingImg
    } catch (error) {
        throw error
    }
  }
}