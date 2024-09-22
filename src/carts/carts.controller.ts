import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { GetUser } from 'src/users/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from '@prisma/client';
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiOperation,
} from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Carts')
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new cart',
    description:
      'Creates a new cart for the authenticated user with the provided cart details.',
  })
  @ApiCreatedResponse({ description: 'Cart created successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid cart data provided.' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - invalid or missing JWT token.',
  })
  create(@GetUser() user: User, @Body() createCartDto: CreateCartDto) {
    return this.cartsService.create(createCartDto, user.id);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all carts for the authenticated user',
    description: 'Retrieves all carts associated with the authenticated user.',
  })
  @ApiOkResponse({ description: 'Retrieved all carts.' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - invalid or missing JWT token.',
  })
  findAll(@GetUser() user: User) {
    return this.cartsService.findAll(user.id);
  }

  @Get('/summary')
  @ApiOperation({
    summary: 'Get cart summary',
    description:
      'Retrieves a summary of the cart for the authenticated user, including item counts and total cost.',
  })
  @ApiOkResponse({ description: 'Retrieved cart summary.' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - invalid or missing JWT token.',
  })
  summary(@GetUser() user: User) {
    return this.cartsService.summary(user.id);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a specific cart by ID',
    description: 'Retrieves a cart by its ID for the authenticated user.',
  })
  @ApiOkResponse({ description: 'Retrieved cart by ID.' })
  @ApiNotFoundResponse({ description: 'Cart not found.' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - invalid or missing JWT token.',
  })
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.cartsService.findOne(+id, user.id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a specific cart by ID',
    description:
      'Updates a cart’s details by its ID for the authenticated user.',
  })
  @ApiOkResponse({ description: 'Cart updated successfully.' })
  @ApiNotFoundResponse({ description: 'Cart not found.' })
  @ApiBadRequestResponse({ description: 'Invalid cart data provided.' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - invalid or missing JWT token.',
  })
  update(
    @Param('id') id: string,
    @Body() updateCartDto: UpdateCartDto,
    @GetUser() user: User,
  ) {
    return this.cartsService.update(+id, updateCartDto, user.id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a specific cart by ID',
    description: 'Removes a cart by its ID for the authenticated user.',
  })
  @ApiOkResponse({ description: 'Cart removed successfully.' })
  @ApiNotFoundResponse({ description: 'Cart not found.' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - invalid or missing JWT token.',
  })
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.cartsService.remove(+id, user.id);
  }
}
