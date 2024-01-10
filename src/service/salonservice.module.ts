import { Module } from '@nestjs/common';
import { config } from 'src/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Service } from './salonservice.service';
import { SalonServiceController } from './salonservice.controller';
import { serviceSchema } from './salonservice.schema';


@Module({
    imports:[
        MongooseModule.forRoot(config.dbUrl),
        MongooseModule.forFeature([{name:'service',schema:serviceSchema}])
    ],
    providers:[Service],
    controllers:[SalonServiceController]
})
export class ServiceModule {}