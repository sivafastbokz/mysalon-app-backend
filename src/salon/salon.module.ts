import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SalonService } from './salon.service';
import { SalonController } from './salon.controller';
import { salonImgSchema } from './salon.schema'

@Module({
   imports:[
    MongooseModule.forRoot('mongodb+srv://sivaharshanfastbokz:uoazQaGUCRMUERcC@cluster0.lcmnw6s.mongodb.net/mysalon?retryWrites=true&w=majority'),
    MongooseModule.forFeature([{name:'salonimages',schema:salonImgSchema}])
   ],
   providers:[SalonService],
   controllers:[SalonController] 
})

export class SalonModule {}
