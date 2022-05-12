import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(): Promise<any> {
    return await this.mailerService.sendMail({
      to: 'dlwoguq65@naver.com',
      from: 'jaehyup.lee@hyconsoft.com',
      subject: 'test',
      text: 'test',
      html: '<h1>test</h1>',
    });
  }
}
