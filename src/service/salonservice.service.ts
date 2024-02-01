import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SalonService, ServiceDocument  } from './salonservice.schema';
import { CreateServiceDto } from './dto/service.dto';

@Injectable()
export class Service {
 constructor(
  @InjectModel('service')
  private readonly  serviceModel: Model<ServiceDocument>
 ) {}
  
 async createService(reqBody:CreateServiceDto):Promise<any>{
   try {
    const {serviceImage,serviceName,servicePrice} = reqBody
    const createService = new this.serviceModel({serviceImage,serviceName,servicePrice})
    return await createService.save();
   } catch (error) {
    throw new Error (`Failed to create service: ${error.message}`)
   }
 }

 async getService():Promise<any>{
    try {
        const findService = this.serviceModel.find()
        return await findService
    } catch (error) {
        throw new Error (`Failed to get service: ${error.message}`)
    }
 }

}