import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MailService } from './mail/mail.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private _mailService: MailService,
  ) {}

  @Get()
  getHello(config: ConfigService): any {
    //return this.appService.getHello();
    return this._mailService.sendUserConfirmation(
      {
        email: config.get('MAIL_USER'),
        name: 'Jannes',
      },
      'fdsfdsfdsffs',
    );
  }
}
