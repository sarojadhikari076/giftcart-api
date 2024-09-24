import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

/**
 * Key used to store the roles required to access a route.
 */
export const ROLES_KEY = 'roles';

/**
 * Decorator to set the roles required to access a route.
 * @param roles - The roles required to access the route.
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
