import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  // imports:[
  //   ConfigModule.forRoot(),
  //   MailerModule.forRootAsync({
  //     inject:[ConfigService],
  //     useFactory:async (configService:ConfigService) => ({
  //       transport:{
  //         host: configService.get<string>('MAIL_HOST'),
  //         port: configService.get<number>('MAIL_PORT'),
  //         secure: false,
  //         auth: {
  //           user: configService.get<string>('MAIL_USER'),
  //           pass: configService.get<string>('MAIL_PASSWORD'),
  //         },
  //       },
  //       defaults:{
  //         from:configService.get<string>('MAIL_SENDER'),
  //       }  
  //     })
  //   })
  // ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
