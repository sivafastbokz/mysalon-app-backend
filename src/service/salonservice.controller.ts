import { Body, Controller, Get, Post, Res, HttpStatus, Put, Param } from '@nestjs/common';
import { Service } from './salonservice.service';
import { CreateServiceDto } from './dto/service.dto';
import { UpdateServiceDto } from './dto/service.dto';

@Controller('service')
export class SalonServiceController {
constructor(
    private readonly service:Service
) {}

@Post('create')
async addService(@Body() reqBody:CreateServiceDto, @Res() response){
  try {
    const newService = await this.service.createService(reqBody)
    return response.status(HttpStatus.CREATED).json({
        message:'Service created successfully',newService
    })
  } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode:400,
        message:'Error: Service not created',
        error:'Bad Request'
      })
  }
}

@Get('getService')
async getService(@Res() response){
    try {
        const fetchService = await this.service.getService()
        return response.status(HttpStatus.OK).json({
            messages:'serivce found successfully',fetchService
        })
    } catch (error) {
        return response.status(HttpStatus.BAD_REQUEST).json({
            statusCode:400,
            message:'Error: Service not found',
            error:'Bad Request'
          })
    }
}

@Put('update/:id')
async updateService(@Param('id') id:string,@Res() response, @Body() updateDto:UpdateServiceDto){
  try {
     const UpdateData = await this.service.updateService(id,updateDto)
     return response.status(HttpStatus.OK).json({
      messages:'serivce Updated successfully',UpdateData
  })
  } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      statusCode:400,
      message:'Error: Service not Updated',
      error:'Bad Request'
    })
  }
}
} 