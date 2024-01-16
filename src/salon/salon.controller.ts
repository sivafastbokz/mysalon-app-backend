import { Body, Controller, Get, Post, Res, HttpStatus } from '@nestjs/common';
import { SalonService } from './salon.service' ;
import { SalonImgHeader } from './salon.schema';

@Controller('mysalon')
export class SalonController {
 constructor(
    private readonly salonService:SalonService
 ) {}

 @Post('postimg')
  async postImg(@Body() img:SalonImgHeader, @Res() response){
    try {
        const newImg =  await this.salonService.postImgs(img) 
        return response.status(HttpStatus.OK).json({
          statusCode:HttpStatus.CREATED,
          message:'Image posted successfully',newImg
        })
    } catch (error) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          statusCode:400,
          message:'Error: Image not created',
          error:'Bad Request'
        })
    }
  }

  @Get('getimg')
  async getImg(@Res() response){
    try {
        const fingImg = await this.salonService.getImg()
        return  response.status(HttpStatus.OK).json({
          statusCode:HttpStatus.CREATED,
          message:'Image found successfully',fingImg
        })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode:400,
        message:'Error: Image not found',
        error:'Bad Request'
      })
    }
  }
}