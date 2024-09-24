import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { addDays, isWithinInterval, setYear } from 'date-fns';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Finds a user by their email address.
   *
   * @param {string} email - The email address of the user to find.
   * @returns {Promise<User | null>} A promise that resolves to the user object if found, or null if not found.
   * @example
   * const user = await usersService.findByEmail('example@example.com');
   */
  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  /**
   * Retrieves all users who have upcoming birthdays within the next week
   * and have not redeemed a birthday coupon in the last year.
   *
   * @returns {Promise<User[]>} A promise that resolves to a list of users with upcoming birthdays and no redeemed coupons in the last year.
   * @example
   * const usersWithUpcomingBirthdays = await usersService.findUsersWithUpcomingBirthdays();
   */
  async findUsersWithUpcomingBirthdays(): Promise<User[]> {
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);

    const lastYear = new Date();
    lastYear.setFullYear(lastYear.getFullYear() - 1);

    const users: User[] = await this.prisma.$queryRaw`
      SELECT * FROM "User" u
      WHERE
        (EXTRACT(MONTH FROM u."dateOfBirth") = EXTRACT(MONTH FROM CURRENT_DATE)
        AND EXTRACT(DAY FROM u."dateOfBirth") BETWEEN EXTRACT(DAY FROM CURRENT_DATE) AND EXTRACT(DAY FROM CURRENT_DATE) + 7)
        AND NOT EXISTS (
          SELECT 1 FROM "Coupon" c
          WHERE c."userId" = u.id
          AND c."createdAt" >= ${lastYear}
        )
    `;

    return users;
  }

  /**
   * Checks if a user's birthday falls within the next week.
   *
   * @param {number} userId - The ID of the user to check.
   * @returns {Promise<boolean>} A promise that resolves to true if the user's birthday is within the next week, false otherwise.
   * @example
   * const isBirthdayNextWeek = await usersService.isBirthdayWithinNextWeek(1);
   */
  async isBirthdayWithinNextWeek(userId: number): Promise<boolean> {
    const today = new Date();
    const nextWeek = addDays(today, 7);

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    const birthday = setYear(user.dateOfBirth, today.getFullYear());

    const iswithin = isWithinInterval(new Date(birthday), {
      start: today,
      end: nextWeek,
    });

    return iswithin;
  }

  /**
   * Retrieves a user by their ID.
   *
   * @param {number} id - The ID of the user to retrieve.
   * @returns {Promise<User | null>} A promise that resolves to the user object if found, or null if not found.
   * @example
   * const user = await usersService.findOne(1);
   */
  findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
