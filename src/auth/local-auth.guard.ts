import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * A guard that extends the default local authentication guard provided by NestJS.
 * This guard is used to protect routes by ensuring that the request contains valid credentials.
 *
 * @extends {AuthGuard('local')}
 */

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  /**
   * Check if the user is authenticated and can access the route.
   * This method is called by the framework to check if the user is authenticated.
   *
   * @param context - The execution context of the request.
   * @returns A boolean indicating if the user is authenticated.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);

    return result;
  }
}
