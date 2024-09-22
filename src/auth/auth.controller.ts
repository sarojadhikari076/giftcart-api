import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';
import { LoginDto } from './dto/login.dto';
import { GetUser } from 'src/users/get-user.decorator';
import { User } from '@prisma/client';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RegisterDto } from './dto/register.dto';
import { UpdateDetailDto } from './dto/update-detail.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'User Login',
    description: 'Authenticate a user with email and password.',
  })
  @ApiBody({
    type: LoginDto,
    description: 'The user login details (email and password).',
    examples: {
      valid: {
        summary: 'Valid example',
        value: { email: 'user@example.com', password: 'P@ssw0rd' },
      },
      invalid: {
        summary: 'Invalid example',
        value: { email: 'user@example.com', password: 'wrongPassword' },
      },
    },
  })
  @ApiOkResponse({
    type: AuthEntity,
    description: 'Login successful, JWT token returned.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid login credentials or missing fields.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - incorrect email or password.',
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('register')
  @ApiOperation({
    summary: 'User Registration',
    description: 'Register a new user.',
  })
  @ApiBody({
    type: RegisterDto,
    description: 'User registration details.',
    examples: {
      valid: {
        summary: 'Valid example',
        value: {
          email: 'newuser@example.com',
          password: 'P@ssw0rd123',
          name: 'John Doe',
          phone: '1234567890',
          gender: 'male',
          dateOfBirth: '1995-07-10',
          address: '123 Main Street, London',
        },
      },
      invalid: {
        summary: 'Invalid example',
        value: {
          email: 'invalidemail',
          password: 'short',
        },
      },
    },
  })
  @ApiCreatedResponse({
    type: AuthEntity,
    description: 'Registration successful, user created.',
  })
  @ApiBadRequestResponse({
    description:
      'Invalid registration data, email already exists, or missing fields.',
  })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get Authenticated User',
    description: 'Retrieve the details of the authenticated user.',
  })
  @ApiOkResponse({
    type: AuthEntity,
    description: 'User details returned successfully.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - invalid or missing JWT token.',
  })
  me(@GetUser() user: User) {
    return this.authService.getMe(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('basic-details')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update User Profile',
    description:
      'Update basic details of the authenticated user (e.g., name, address).',
  })
  @ApiBody({
    type: UpdateDetailDto,
    description: 'Details to update the user profile.',
    examples: {
      valid: {
        summary: 'Valid example',
        value: {
          name: 'Jane Doe',
          phone: '9876543210',
          address: '456 Elm Street, Birmingham',
        },
      },
    },
  })
  @ApiOkResponse({
    type: AuthEntity,
    description: 'User profile updated successfully.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - invalid or missing JWT token.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid data provided for updating profile.',
  })
  updateBasicDetails(
    @Body() updateDetailDto: UpdateDetailDto,
    @GetUser() user: User,
  ) {
    return this.authService.updateBasicDetails(user.id, updateDetailDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Change User Password',
    description: 'Change the password of the authenticated user.',
  })
  @ApiBody({
    type: ChangePasswordDto,
    description:
      'Details for changing the password (current and new passwords).',
    examples: {
      valid: {
        summary: 'Valid example',
        value: {
          currentPassword: 'OldP@ssw0rd',
          newPassword: 'NewP@ssw0rd',
        },
      },
    },
  })
  @ApiOkResponse({ description: 'Password updated successfully.' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - invalid or missing JWT token.',
  })
  @ApiBadRequestResponse({
    description:
      'Invalid current password or new password does not meet criteria.',
  })
  changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @GetUser() user: User,
  ) {
    return this.authService.updatePassword(user.id, changePasswordDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete-account')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete User Account',
    description: 'Permanently delete the authenticated user account.',
  })
  @ApiNoContentResponse({ description: 'Account deleted successfully.' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - invalid or missing JWT token.',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden - cannot delete the account.',
  })
  deleteAccount(@GetUser() user: User) {
    return this.authService.deleteAccount(user.id);
  }
}
