import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve a user by ID',
    description: 'Fetches the user details for the specified ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'User details retrieved successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
}
