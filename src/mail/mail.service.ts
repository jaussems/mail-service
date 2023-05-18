import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IMessage, User } from 'src/user/user.entity';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private _configService: ConfigService,
  ) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;
    const nodemailer = require('nodemailer');
    await this.mailerService.sendMail({
      to: user.email,
      from: this._configService.get('MAIL_USER'), // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: user.name,
        url,
      },
    });
  }

  async sendUserMessage(user: User, body: IMessage) {
    // this.mailerService.addTransporter('outlook', {
    //   host: this._configService.get('MAIL_HOST'),
    //   port: this._configService.get('MAIL_PORT'),
    //   secure: false,
    //   auth: {
    //     user: this._configService.get('MAIL_USER'),
    //     pass: this._configService.get('MAIL_PASSWORD'),
    //   },
    //   tls: {
    //     // do not fail on invalid certs
    //     rejectUnauthorized: false,
    //   },
    // });
    await this.mailerService.sendMail({
      to: user.email,
      from: this._configService.get('MAIL_USER'),
      subject: 'Website message',
      template: './message',
      context: {
        sender: body.sender,
        message: body.message,
      },
    });
  }
}
