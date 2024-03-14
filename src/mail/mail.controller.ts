import { Controller, Post } from '@nestjs/common';
import { MailService, SendEmailDto } from './mail.service';

@Controller()
export class MailController {
  constructor(private readonly mailerService: MailService) {}


@Post('send-email')
sendEmail(){
  const dto :SendEmailDto = {
    // sender:{name:'siva',address:'sivaharshansj@gmail.com'},
    recipients:[{name:'leo messi',address:'leomessi@example.com'}],
    subject:'welcome email',
    text:'“The time is always right to do what is right” – Martin Luther King Jr.',
    html:'“The time is always right to do what is <span style="color:green">right</span>” – Martin Luther King Jr.<br/>'
  }
  return this.mailerService.SendEmail(dto)
}
}
