import { Module } from '@nestjs/common';
import { config } from 'src/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SalonService } from './salon.service';
import { SalonController } from './salon.controller';
import { salonImgSchema } from './salon.schema';

@Module({
   imports:[
    MongooseModule.forRoot(config.dbUrl),
    MongooseModule.forFeature([{name:'salonimages',schema:salonImgSchema}])
   ],
   providers:[SalonService],
   controllers:[SalonController] 
})

export class SalonModule {}
