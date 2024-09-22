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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('register')
  @ApiOkResponse({ type: AuthEntity })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOkResponse({ type: AuthEntity })
  me(@GetUser() user: User) {
    return this.authService.getMe(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('basic-details')
  @ApiOkResponse({ type: AuthEntity })
  updateBasicDetails(
    @Body() updateDetailDto: UpdateDetailDto,
    @GetUser() user: User,
  ) {
    return this.authService.updateBasicDetails(user.id, updateDetailDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  @ApiOkResponse({ description: 'Password updated successfully.' })
  changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @GetUser() user: User,
  ) {
    return this.authService.updatePassword(user.id, changePasswordDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete-account')
  @ApiOkResponse({ description: 'Account deleted successfully.' })
  deleteAccount(@GetUser() user: User) {
    return this.authService.deleteAccount(user.id);
  }
}
