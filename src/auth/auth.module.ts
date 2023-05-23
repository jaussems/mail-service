import { Module } from '@nestjs/common';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [MailModule], // 📧
  providers: [],
})
export class AuthModule {}
