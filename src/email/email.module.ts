import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { UsersService } from 'src/users/users.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductsService } from 'src/products/products.service';
import { CouponsService } from 'src/coupons/coupons.service';
import { BullModule } from '@nestjs/bull';
import { EmailProcessor } from './email.processor';

/**
 * @module EmailModule
 *
 * The EmailModule is responsible for configuring and providing email-related services and functionalities.
 * It imports and configures the MailerModule and BullModule for email transport and queue management.
 *
 * @imports
 * - MailerModule: Configures the email transport settings, default email sender, and email templates.
 * - BullModule: Registers the 'email' queue for managing email-related jobs.
 *
 * @providers
 * - EmailService: Service for handling email-related operations.
 * - UsersService: Service for managing user-related operations.
 * - ProductsService: Service for managing product-related operations.
 * - CouponsService: Service for managing coupon-related operations.
 * - PrismaService: Service for interacting with the Prisma ORM.
 * - EmailProcessor: Processor for handling email queue jobs.
 */
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: false,
        auth: {
          user: process.env.EMAIL_HOST_USER,
          pass: process.env.EMAIL_HOST_PASSWORD,
        },
      },
      defaults: {
        from: process.env.EMAIL_FROM,
      },
      template: {
        dir: join(__dirname, '/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    BullModule.registerQueue({
      name: 'email', // Register the email queue
    }),
  ],
  providers: [
    EmailService,
    UsersService,
    ProductsService,
    CouponsService,
    PrismaService,
    EmailProcessor,
  ],
})
export class EmailModule {}
