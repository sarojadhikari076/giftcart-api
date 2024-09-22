import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { MailerService } from '@nestjs-modules/mailer';
import { WEBSITE_URL } from 'src/constants/app.constants';

@Processor('email')
export class EmailProcessor {
  constructor(private readonly mailerService: MailerService) {}

  @Process()
  async sendEmail(job: Job) {
    console.log('Sending birthday email to', job.data.user.email);
    const { user, products } = job.data;
    const code = job.data.code;

    // Send birthday email to the user
    await this.mailerService.sendMail({
      to: user.email,
      subject: `Happy Birthday ${user.name}!`,
      template: 'birthday',
      context: {
        name: user.name,
        senderName: 'GiftCart',
        discountCode: code,
        year: new Date().getFullYear(),
        email: user.email,
        website: WEBSITE_URL,
        dateOfBirth: user.dateOfBirth,
        products,
      },
    });
  }
}
