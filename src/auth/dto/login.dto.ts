import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  /**
   * The user's email address.
   * Must be a valid email format.
   */
  @ApiProperty({
    description: 'The email address of the user.',
    example: 'user@example.com',
    required: true,
  })
  @IsEmail({}, { message: 'Please provide a valid email address.' }) // Custom error message for invalid email
  @IsNotEmpty({ message: 'Email is required.' }) // Ensures email is not empty
  email: string;

  /**
   * The user's password.
   * Must be at least 6 characters long.
   */
  @ApiProperty({
    description: 'The password of the user (minimum length of 6 characters).',
    example: 'password123',
    minLength: 6,
    required: true,
  })
  @IsString({ message: 'Password must be a string.' }) // Ensures password is a string
  @IsNotEmpty({ message: 'Password is required.' }) // Ensures password is not empty
  @MinLength(6, { message: 'Password must be at least 6 characters long.' }) // Sets minimum length for password
  password: string;
}
