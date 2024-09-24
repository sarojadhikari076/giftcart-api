import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

/**
 * The UsersModule is a NestJS module that provides the necessary configuration
 * for the users feature of the application. It includes the UsersController
 * for handling HTTP requests and the UsersService for business logic related
 * to users. The module also imports the PrismaModule for database interactions.
 *
 * @module UsersModule
 */
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PrismaModule],
})
export class UsersModule {}
