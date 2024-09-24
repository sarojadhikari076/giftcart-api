import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * Data Transfer Object for user login.
 *
 * This class is used to validate and transfer the login data provided by the user.
 * It includes the user's email and password, with appropriate validation rules.
 *
 * @example
 * const loginDto = new LoginDto();
 * loginDto.email = 'user@example.com';
 * loginDto.password = 'password123';
 *
 * @class
 */
export class LoginDto {
  /**
   * The email address of the user.
   * @example 'user@example.com'
   */
  @ApiProperty({
    description: 'The email address of the user.',
    example: 'user@example.com',
    required: true,
  })
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  @IsNotEmpty({ message: 'Email is required.' })
  email: string;

  /**
   * The password of the user.
   * Must be at least 6 characters long.
   * @example 'password123'
   */
  @ApiProperty({
    description: 'The password of the user (minimum length of 6 characters).',
    example: 'password123',
    minLength: 6,
    required: true,
  })
  @IsString({ message: 'Password must be a string.' })
  @IsNotEmpty({ message: 'Password is required.' })
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  password: string;
}
