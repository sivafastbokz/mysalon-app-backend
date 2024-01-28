import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SalonModule } from './salon/salon.module';
import { ServiceModule } from './service/salonservice.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [SalonModule, ServiceModule, MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
