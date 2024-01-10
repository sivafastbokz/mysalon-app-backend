import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SalonModule } from './salon/salon.module';
import { ServiceModule } from './service/salonservice.module';

@Module({
  imports: [SalonModule, ServiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
