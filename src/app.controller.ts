import {
  Controller,
  Get,
  Header,
  Post,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';
import { MailService } from './mail/mail.service';
import { ConfigService } from '@nestjs/config';

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
  @Post('/message')
  @Header('content-type', 'application/json')
  sendMessage(@Req() req, @Res({ passthrough: true }) res): Promise<void> {
    if (!req.body.sender || !req.body.message) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .send(
          'You have forgotton to fill in all the required fields, check again please',
        );
    }

    return this._mailService.sendUserMessage(
      {
        email: this._configService.get('MAIL_TO_EMAIL'),
        name: 'Jannes',
      },
      {
        sender: req.body.sender,
        message: req.body.message,
      },
    );
  }
}
