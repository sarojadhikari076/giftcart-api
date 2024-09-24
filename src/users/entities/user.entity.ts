import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Represents a User entity.
 */
export class User {
  /**
   * Unique identifier for the user.
   */
  @ApiProperty({
    description: 'Unique identifier for the user',
    example: 1,
  })
  id: number;

  /**
   * Email address of the user.
   */
  @ApiProperty({
    description: 'Email address of the user',
    example: 'user@example.com',
  })
  email: string;

  /**
   * Phone number of the user.
   */
  @ApiProperty({
    description: 'Phone number of the user',
    example: '+44 7911 123456',
  })
  phone: string;

  /**
   * Full name of the user.
   */
  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  name: string;

  /**
   * Role of the user in the system.
   */
  @ApiProperty({
    description: 'Role of the user in the system',
    enum: Role,
    example: Role.USER,
  })
  role: Role;

  /**
   * Gender of the user.
   */
  @ApiProperty({
    description: 'Gender of the user',
    example: 'Male',
  })
  gender: string;

  /**
   * Date of birth of the user.
   */
  @ApiProperty({
    description: 'Date of birth of the user',
    example: '1990-01-01',
    type: Date,
  })
  dateOfBirth: Date;

  /**
   * Address of the user.
   */
  @ApiProperty({
    description: 'Address of the user',
    example: '1234 Main St, Birmingham, UK',
  })
  address: string;

  /**
   * Timestamp when the user was created.
   */
  @ApiProperty({
    description: 'Timestamp when the user was created',
    example: '2023-01-01T10:00:00Z',
    type: Date,
  })
  createdAt: Date;

  /**
   * Timestamp when the user was last updated.
   */
  @ApiProperty({
    description: 'Timestamp when the user was last updated',
    example: '2023-01-10T12:00:00Z',
    type: Date,
  })
  updatedAt: Date;
}
