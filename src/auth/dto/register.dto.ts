import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'The email address of the user.',
    example: 'user@example.com',
    required: true,
  })
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  @IsNotEmpty({ message: 'Email is required.' })
  email: string;

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

  @ApiProperty({
    description: 'The phone number of the user.',
    example: '+441234567890',
    required: true,
  })
  @IsString({ message: 'Phone must be a string.' })
  @IsNotEmpty({ message: 'Phone is required.' })
  phone: string;

  @ApiProperty({
    description: 'The full name of the user.',
    example: 'John Doe',
    required: true,
  })
  @IsString({ message: 'Name must be a string.' })
  @IsNotEmpty({ message: 'Name is required.' })
  name: string;

  @ApiProperty({
    description: 'The gender of the user.',
    example: 'Male',
    required: true,
  })
  @IsString({ message: 'Gender must be a string.' })
  @IsNotEmpty({ message: 'Gender is required.' })
  gender: string;

  @ApiProperty({
    description: 'The date of birth of the user (in YYYY-MM-DD format).',
    example: '1990-01-01',
    required: true,
  })
  @IsString({ message: 'Date of birth must be a string.' })
  @IsNotEmpty({ message: 'Date of birth is required.' })
  dateOfBirth: string;

  @ApiProperty({
    description: 'The address of the user.',
    example: '123 Street, City, Country',
    required: true,
  })
  @IsString({ message: 'Address must be a string.' })
  @IsNotEmpty({ message: 'Address is required.' })
  address: string;
}
