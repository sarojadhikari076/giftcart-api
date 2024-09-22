import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Current password of the user.',
    example: 'currentPassword123',
    required: true,
  })
  @IsString({ message: 'Current password must be a string.' })
  @IsNotEmpty({ message: 'Current password is required.' })
  currentPassword: string;

  @ApiProperty({
    description: 'New password for the user (minimum length of 6 characters).',
    example: 'newPassword123',
    minLength: 6,
    required: true,
  })
  @IsString({ message: 'New password must be a string.' })
  @IsNotEmpty({ message: 'New password is required.' })
  @MinLength(6, { message: 'New password must be at least 6 characters long.' })
  newPassword: string;
}
