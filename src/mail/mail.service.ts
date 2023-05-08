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
