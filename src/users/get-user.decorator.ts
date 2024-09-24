import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

/**
 * Custom decorator to extract the user object from the request.
 *
 * This decorator can be used in controller methods to easily access
 * the authenticated user from the request object.
 *
 * @param _ - Unused parameter.
 * @param ctx - The execution context which provides access to the request.
 * @returns The user object extracted from the request.
 */
export const GetUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
