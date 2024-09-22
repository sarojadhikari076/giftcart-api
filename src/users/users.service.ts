import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { addDays, isWithinInterval, setYear } from 'date-fns';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findUsersWithUpcomingBirthdays() {
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

  async isBirthdayWithinNextWeek(userId: number) {
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

    if (iswithin) return true;
    return false;
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
