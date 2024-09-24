import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * A guard that extends the default JWT authentication guard provided by NestJS.
 * This guard is used to protect routes by ensuring that the request contains a valid JWT token.
 *
 * @extends {AuthGuard('jwt')}
 * @class JwtAuthGuard
 * @description
 * The `JwtAuthGuard` automatically checks for the presence of a valid JWT token in the request headers.
 * If the token is valid, the request proceeds to the next handler; otherwise, a 401 Unauthorized response is returned.
 * This guard can be applied to any route that requires authentication.
 *
 * @example
 * // Applying the guard to a route in a controller
 * import { Controller, Get, UseGuards } from '@nestjs/common';
 * import { JwtAuthGuard } from './jwt-auth.guard';
 *
 * @Controller('protected')
 * export class ProtectedController {
 *   @UseGuards(JwtAuthGuard)
 *   @Get()
 *   getProtectedResource() {
 *     return 'This route is protected by JWT';
 *   }
 * }
 *
 * @param {ExecutionContext} context - The execution context for the request, containing details about the request and response objects.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the request is allowed to proceed (true) or not (false).
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
