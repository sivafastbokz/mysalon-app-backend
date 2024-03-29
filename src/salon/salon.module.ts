import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'src/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SalonService } from './salon.service';
import { SalonController } from './salon.controller';
import { customerData } from './salon.schema';
import { MailModule } from 'src/mail/mail.module';

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
    MongooseModule.forFeature([{name:'customerdata',schema:customerData}]),
    MailModule
   ],
   providers:[SalonService],
   controllers:[SalonController],
   exports:[SalonService]
})

export class SalonModule {}
