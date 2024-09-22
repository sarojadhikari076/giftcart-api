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
} from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiTags('Carts')
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Cart created successfully' })
  create(@GetUser() user: User, @Body() createCartDto: CreateCartDto) {
    return this.cartsService.create(createCartDto, user.id);
  }

  @Get()
  @ApiOkResponse({ description: 'Retrieved all carts' })
  findAll(@GetUser() user: User) {
    return this.cartsService.findAll(user.id);
  }

  @Get('/summary')
  @ApiOkResponse({ description: 'Retrieved cart summary' })
  summary(@GetUser() user: User) {
    return this.cartsService.summary(user.id);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Retrieved cart by ID' })
  @ApiNotFoundResponse({ description: 'Cart not found' })
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.cartsService.findOne(+id, user.id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Cart updated successfully' })
  @ApiNotFoundResponse({ description: 'Cart not found' })
  update(
    @Param('id') id: string,
    @Body() updateCartDto: UpdateCartDto,
    @GetUser() user: User,
  ) {
    return this.cartsService.update(+id, updateCartDto, user.id);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Cart removed successfully' })
  @ApiNotFoundResponse({ description: 'Cart not found' })
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.cartsService.remove(+id, user.id);
  }
}
