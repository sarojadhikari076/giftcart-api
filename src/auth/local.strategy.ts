import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';

/**
 * LocalStrategy class that extends PassportStrategy to handle local authentication.
 *
 * @class
 * @extends {PassportStrategy} - Extends the PassportStrategy class using the local strategy.
 * @description
 * This class is responsible for validating user credentials (email and password)
 * and returning the user object if the validation is successful.
 *
 * @constructor
 * @param {AuthService} authService - The service used to interact with user data.
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  /**
   * Validates the user based on the email and password provided.
   *
   * @async
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<User>} - A promise that resolves to the user object if validation is successful.
   * @throws {UnauthorizedException} - Throws an exception if the user is not found or the credentials are invalid.
   * @example
   * const user = await localStrategy.validate('user@example.com', 'password123');
   * // user will contain the user object if credentials are valid.
   */
  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(email, password);
    if (user === null) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
