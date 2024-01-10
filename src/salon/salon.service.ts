import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SalonImgHeader,SalonImgDocument } from './salon.schema';

@Injectable()
export class SalonService {
 constructor(
   @InjectModel('salonimages')
   private readonly SalonImgModel: Model<SalonImgDocument>,
 ) {}

 async postImgs(image:SalonImgHeader):Promise<SalonImgHeader>{
     try {
        const { img } = image
        const HeaderImg = new this.SalonImgModel({img})
        return  await HeaderImg.save()
     } catch (error) {
        throw new Error (`Failed to post image: ${error.message}`);
     }
 }

 async getImg():Promise<any>{
    try {
        const getImages = this.SalonImgModel.find()
        return await getImages
    } catch (error) {
        throw new Error (`Failed to get image: ${error.message}`);
    }
 }

}