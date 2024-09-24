import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

/**
 * @class RolesGuard
 * @classdesc A guard that checks if the current user has the required roles to access specific routes.
 * Implements the CanActivate interface to define custom role-based access control.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  /**
   * @constructor
   * @param {Reflector} reflector - The reflector used to get metadata for route handlers.
   */
  constructor(private reflector: Reflector) {}

  /**
   * Determines if the current user has the required roles to access the route.
   *
   * @async
   * @method canActivate
   * @param {ExecutionContext} context - The execution context of the request.
   * @returns {boolean} - Returns true if the user has the required roles, otherwise false.
   * @throws {Error} Throws an error if the execution context is invalid.
   * @example
   * const context = { /* mock ExecutionContext here *\/ };
   * const hasAccess = rolesGuard.canActivate(context);
   * console.log(hasAccess); // Output: true or false based on user roles
   */
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return requiredRoles.some((role) => user.role === role);
  }
}
