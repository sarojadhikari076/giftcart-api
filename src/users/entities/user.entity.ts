import { Role } from '@prisma/client';

/**
 * Represents a User entity.
 */
export class User {
  /**
   * Unique identifier for the user.
   */
  id: number;

  /**
   * Email address of the user.
   */
  email: string;

  /**
   * Hashed password of the user.
   */
  password: string;

  /**
   * Phone number of the user.
   */
  phone: string;

  /**
   * Full name of the user.
   */
  name: string;

  /**
   * Role of the user in the system.
   */
  role: Role;

  /**
   * Gender of the user.
   */
  gender: string;

  /**
   * Date of birth of the user.
   */
  dateOfBirth: Date;

  /**
   * Address of the user.
   */
  address: string;

  /**
   * Timestamp when the user was created.
   */
  createdAt: Date;

  /**
   * Timestamp when the user was last updated.
   */
  updatedAt: Date;
}
