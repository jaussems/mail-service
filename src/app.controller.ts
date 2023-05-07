import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MailService } from './mail/mail.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private _mailService: MailService,
    private _configService: ConfigService,
  ) {}

  @Get()
  getHello(): any {
    return this._mailService.sendUserConfirmation(
      {
        email: this._configService.get('MAIL_TO_EMAIL'),
        name: 'Jannes',
      },
      'fdsfdsfdsffs',
    );
  }
}
