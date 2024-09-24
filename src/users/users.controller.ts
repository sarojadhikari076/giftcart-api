import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { User } from '@prisma/client';

/**
 * @class UsersController
 * @classdesc Controller for handling user-related routes and operations.
 */
@Controller('users')
@ApiTags('Users')
export class UsersController {
  /**
   * @constructor
   * @param {UsersService} usersService - The service used for user-related operations.
   */
  constructor(private readonly usersService: UsersService) {}

  /**
   * Retrieve a user by ID.
   *
   * @async
   * @method findOne
   * @param {string} id - The ID of the user to retrieve.
   * @returns {Promise<User>} The user details.
   * @throws {Error} Throws an error if the user is not found.
   * @example
   * const user = await usersController.findOne('1');
   * console.log(user); // Output: { id: 1, name: 'John Doe', email: 'john.doe@example.com' }
   */
  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve a user by ID',
    description: 'Fetches the user details for the specified ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the user to retrieve',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'User details retrieved successfully.',
    schema: {
      example: {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }
}
