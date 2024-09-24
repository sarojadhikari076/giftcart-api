import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

/**
 * JwtStrategy class that extends PassportStrategy to handle JWT authentication.
 *
 * @class
 * @extends {PassportStrategy(Strategy, 'jwt')}
 * @implements {PassportStrategy}
 *
 * @constructor
 * @param {UsersService} usersService - The service used to interact with user data.
 *
 * @description
 * This class is responsible for validating JWT tokens and extracting user information
 * from the token payload. It uses the UsersService to fetch user details from the database.
 *
 * @method validate
 * @async
 * @param {Object} payload - The JWT payload containing user information.
 * @param {number} payload.userId - The ID of the user extracted from the JWT payload.
 * @returns {Promise<User>} - Returns the user object if validation is successful.
 * @throws {UnauthorizedException} - Throws an exception if the user is not found.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  /**
   * Creates an instance of JwtStrategy.
   * @param {UsersService} usersService - The service used to interact with user data.
   */
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  /**
   * Validates the user based on the payload extracted from the JWT token.
   *
   * @async
   * @param {Object} payload - The JWT payload containing user information.
   * @param {number} payload.userId - The ID of the user extracted from the JWT payload.
   * @returns {Promise<User>} - Returns the user object if validation is successful.
   * @throws {UnauthorizedException} - Throws an exception if the user is not found.
   */
  async validate(payload: { userId: number }) {
    const user = await this.usersService.findOne(payload.userId);

    if (user === null) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
