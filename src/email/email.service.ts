import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { UsersService } from '../users/users.service';
import { ProductsService } from 'src/products/products.service';
import { CouponsService } from 'src/coupons/coupons.service';
import { addDays } from 'date-fns';
import { v4 as uuid } from 'uuid';
import { BDAY_DISCOUNT } from 'src/constants/app.constants';

/**
 * EmailService handles the scheduling and sending of birthday emails to users.
 * It leverages a cron job to periodically check for users with upcoming birthdays,
 * generates a birthday discount coupon, and queues an email with product recommendations.
 *
 * @class
 */
@Injectable()
export class EmailService {
  /**
   * Constructor for EmailService.
   *
   * @param {Queue} emailQueue - The Bull queue for handling email jobs.
   * @param {UsersService} usersService - Service to interact with user data.
   * @param {ProductsService} productsService - Service to interact with product data.
   * @param {CouponsService} couponsService - Service to interact with coupon data.
   */
  constructor(
    @InjectQueue('email') private emailQueue: Queue,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
    private readonly couponsService: CouponsService,
  ) {}

  /**
   * Cron job that runs every week to send birthday emails.
   * It retrieves users who have birthdays in the next 7 days,
   * generates a birthday coupon, and adds an email job to the queue with product recommendations.
   *
   * @returns {Promise<void>} - A promise that resolves once the emails are queued.
   */
  @Cron(CronExpression.EVERY_WEEK)
  async sendBirthdayEmail(): Promise<void> {
    const today = new Date();
    const nextWeek = addDays(today, 7);

    // Get users with upcoming birthdays
    const users = await this.usersService.findUsersWithUpcomingBirthdays();

    // Iterate over the list of users to send birthday emails
    for (const user of users) {
      // Get birthday-related product recommendations for the user
      const products = await this.productsService.findBirthdayProducts(user.id);

      // Generate a unique discount code for the birthday
      const code = 'BDAY-' + uuid().slice(0, 8).toUpperCase();

      // Create a birthday coupon for the user
      await this.couponsService.create({
        code,
        discount: BDAY_DISCOUNT,
        userId: user.id,
        validFrom: today,
        validUntil: nextWeek,
        maxRedemption: 1,
        redeemed: 0,
      });

      // Add an email job to the queue with user data, product recommendations, and the coupon code
      await this.emailQueue.add({
        user,
        products,
        code,
      });
    }
  }
}
