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

@Injectable()
export class EmailService {
  constructor(
    @InjectQueue('email') private emailQueue: Queue,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
    private readonly couponsService: CouponsService,
  ) {}

  // Cron job runs every week
  @Cron(CronExpression.EVERY_WEEK)
  async sendBirthdayEmail() {
    const today = new Date();
    const nextWeek = addDays(today, 7);

    // Get users with upcoming birthdays
    const users = await this.usersService.findUsersWithUpcomingBirthdays();

    for (const user of users) {
      // Get products related to the user's birthday
      const products = await this.productsService.findBirthdayProducts(user.id);

      // Generate a unique discount code
      const code = 'BDAY-' + uuid().slice(0, 8).toUpperCase();

      // Create a coupon for the user
      await this.couponsService.create({
        code,
        discount: BDAY_DISCOUNT,
        userId: user.id,
        validFrom: today,
        validUntil: nextWeek,
        maxRedemption: 1,
        redeemed: 0,
      });

      // Add email job to the queue
      await this.emailQueue.add({
        user,
        products,
        code,
      });
    }
  }
}
