import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'src/config';
import { MongooseModule } from '@nestjs/mongoose';
import { bookingSchema } from './booking.schema';

@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(config:ConfigService)=>{
         return{
            secret:config.get<string>('JWT_SERCRETKEY'),
            signOptions:{
               expiresIn:config.get<string|number>('EXPIRES_IN')
            }
         }
      }
    }),
    MongooseModule.forRoot(config.dbUrl),
    MongooseModule.forFeature([{name:'bookingdata',schema:bookingSchema}])
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
