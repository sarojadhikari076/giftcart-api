import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

/**
 * DTO for updating user details.
 */
export class UpdateDetailDto {
  /**
   * The updated email address of the user.
   * @example 'user@example.com'
   */
  @ApiProperty({
    description: 'The updated email address of the user.',
    example: 'user@example.com',
    required: true,
  })
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  @IsNotEmpty({ message: 'Email is required.' })
  email: string;

  /**
   * The updated phone number of the user.
   * @example '+441234567890'
   */
  @ApiProperty({
    description: 'The updated phone number of the user.',
    example: '+441234567890',
    required: true,
  })
  @IsString({ message: 'Phone must be a string.' })
  @IsNotEmpty({ message: 'Phone is required.' })
  phone: string;

  /**
   * The updated full name of the user.
   * @example 'John Doe'
   */
  @ApiProperty({
    description: 'The updated full name of the user.',
    example: 'John Doe',
    required: true,
  })
  @IsString({ message: 'Name must be a string.' })
  @IsNotEmpty({ message: 'Name is required.' })
  name: string;

  /**
   * The updated gender of the user.
   * @example 'Male'
   */
  @ApiProperty({
    description: 'The updated gender of the user.',
    example: 'Male',
    required: true,
  })
  @IsString({ message: 'Gender must be a string.' })
  @IsNotEmpty({ message: 'Gender is required.' })
  gender: string;

  /**
   * The updated date of birth of the user (in YYYY-MM-DD format).
   * @example '1990-01-01'
   */
  @ApiProperty({
    description:
      'The updated date of birth of the user (in YYYY-MM-DD format).',
    example: '1990-01-01',
    required: true,
  })
  @IsString({ message: 'Date of birth must be a string.' })
  @IsNotEmpty({ message: 'Date of birth is required.' })
  dateOfBirth: string | Date;

  /**
   * The updated address of the user.
   * @example '123 Street, City, Country'
   */
  @ApiProperty({
    description: 'The updated address of the user.',
    example: '123 Street, City, Country',
    required: true,
  })
  @IsString({ message: 'Address must be a string.' })
  @IsNotEmpty({ message: 'Address is required.' })
  address: string;

  /**
   * The updated password of the user (optional).
   * @example 'newPassword123'
   */
  @ApiPropertyOptional({
    description: 'The updated password of the user (optional).',
    example: 'newPassword123',
  })
  @IsString({ message: 'Password must be a string.' })
  @IsOptional()
  password?: string;
}
