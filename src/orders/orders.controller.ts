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
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/users/get-user.decorator';
import { User } from '@prisma/client';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { OrderEntity } from './entities/order.entity';
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new order',
    description: 'Creates a new order for the authenticated user.',
  })
  @ApiResponse({
    status: 201,
    description: 'Order created successfully.',
    type: OrderEntity,
  })
  @ApiResponse({ status: 400, description: 'Invalid order data.' })
  create(@Body() createOrderDto: CreateOrderDto, @GetUser() user: User) {
    return this.ordersService.create(createOrderDto, user.id);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all orders for the user',
    description:
      'Retrieve a list of all orders placed by the authenticated user.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of orders retrieved successfully.',
    type: [OrderEntity],
  })
  @ApiResponse({ status: 401, description: 'Unauthorised.' })
  findAll(@GetUser() user: User) {
    return this.ordersService.findAll(user.id);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a specific order by ID',
    description: 'Retrieve a specific order by its ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Order retrieved successfully.',
    type: OrderEntity,
  })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.ordersService.findOne(+id, user.id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update an existing order by ID',
    description: 'Updates the details of an order specified by its ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Order updated successfully.',
    type: OrderEntity,
  })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @ApiResponse({ status: 400, description: 'Invalid update data.' })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an order by ID',
    description: 'Deletes an order by its ID.',
  })
  @ApiResponse({ status: 200, description: 'Order deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.ordersService.remove(+id, user.id);
  }
}
