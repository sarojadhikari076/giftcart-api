import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { PrismaService } from './../prisma/prisma.service';
import { AuthEntity } from './entity/auth.entity';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { UpdateDetailDto } from './dto/update-detail.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  /**
   * Validates a user by email and password.
   * @param email - The user's email.
   * @param password - The user's password.
   * @returns The user if validation is successful, otherwise null.
   */
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);

    if (user && (await compare(password, user.password))) {
      return user;
    }

    return null;
  }

  /**
   * Logs in a user and returns an access token.
   * @param email - The user's email.
   * @param password - The user's password.
   * @returns An AuthEntity containing the access token and user.
   * @throws NotFoundException if the user is not found.
   * @throws UnauthorizedException if the password is invalid.
   */
  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    delete user.password; // Remove password before returning user

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
      user,
    };
  }

  /**
   * Registers a new user.
   * @param registerDto - The registration details.
   * @returns An AuthEntity containing the access token and new user.
   * @throws UnauthorizedException if the email is already taken.
   */
  async register(registerDto: RegisterDto): Promise<AuthEntity> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new UnauthorizedException('Email already taken by another user');
    }

    const hashedPassword = await hash(registerDto.password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        ...registerDto,
        role: 'USER',
        password: hashedPassword,
        dateOfBirth: new Date(registerDto.dateOfBirth),
      },
    });

    delete newUser.password; // Remove password before returning user

    return {
      accessToken: this.jwtService.sign({ userId: newUser.id }),
      user: newUser,
    };
  }

  /**
   * Retrieves the authenticated user's details.
   * @param userId - The user's ID.
   * @returns The user's details.
   * @throws NotFoundException if the user is not found.
   */
  async getMe(userId: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    delete user.password; // Remove password before returning user

    return user;
  }

  /**
   * Updates the basic details of a user.
   * @param userId - The user's ID.
   * @param body - The details to update.
   * @returns The updated user.
   * @throws UnauthorizedException if attempting to update the password.
   */
  async updateBasicDetails(
    userId: number,
    body: UpdateDetailDto,
  ): Promise<User> {
    if (body.password) {
      throw new UnauthorizedException(
        'Cannot update password using this endpoint',
      );
    }

    if (body.dateOfBirth) {
      body.dateOfBirth = new Date(body.dateOfBirth);
    }

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: body,
    });

    return user;
  }

  /**
   * Updates the password of a user.
   * @param userId - The user's ID.
   * @param data - The password change details.
   * @returns The updated user.
   * @throws NotFoundException if the user is not found.
   * @throws UnauthorizedException if the current password is invalid.
   */
  async updatePassword(userId: number, data: ChangePasswordDto): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await compare(data.currentPassword, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid current password');
    }

    const hashedPassword = await hash(data.newPassword, 10);

    return this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  }

  /**
   * Deletes a user's account.
   * @param userId - The user's ID.
   * @returns The deleted user.
   * @throws NotFoundException if the user is not found.
   */
  async deleteAccount(userId: number): Promise<User> {
    const user = await this.prisma.user.delete({
      where: { id: userId },
    });
    return user;
  }
}
