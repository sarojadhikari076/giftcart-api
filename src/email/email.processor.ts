import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { MailerService } from '@nestjs-modules/mailer';
import { WEBSITE_URL } from 'src/constants/app.constants';

/**
 * @class EmailProcessor
 * @classdesc Processes email-related jobs, specifically for sending birthday emails to users.
 * @extends {Processor}
 */
@Processor('email')
export class EmailProcessor {
  /**
   * @constructor
   * @param {MailerService} mailerService - The service used to send emails.
   */
  constructor(private readonly mailerService: MailerService) {}

  /**
   * Sends a birthday email to the user.
   *
   * @async
   * @method sendEmail
   * @param {Job} job - The job containing user and product data.
   * @param {Object} job.data - The data associated with the job.
   * @param {Object} job.data.user - The user details for the email.
   * @param {string} job.data.user.email - The email address of the user.
   * @param {string} job.data.user.name - The name of the user.
   * @param {string} job.data.user.dateOfBirth - The user's date of birth.
   * @param {Array} job.data.products - The products to include in the email.
   * @param {string} job.data.code - The discount code to include in the email.
   * @returns {Promise<void>} A promise that resolves when the email is sent.
   * @throws {Error} Throws an error if sending the email fails.
   * @example
   * const job = {
   *   data: {
   *     user: {
   *       email: 'user@example.com',
   *       name: 'John Doe',
   *       dateOfBirth: '1990-01-01',
   *     },
   *     products: [...], // array of product data
   *     code: 'BIRTHDAY2024',
   *   },
   * };
   * await emailProcessor.sendEmail(job);
   */
  @Process()
  async sendEmail(job: Job) {
    const { user, products } = job.data;
    const code = job.data.code;

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
