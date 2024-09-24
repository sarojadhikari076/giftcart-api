import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

/**
 * AppController handles the incoming requests for the application.
 */
@Controller()
@ApiTags('App')
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Returns a greeting message.
   *
   * @returns {string} A greeting message.
   */
  @Get()
  @ApiOperation({ summary: 'Get greeting message' })
  @ApiResponse({
    status: 200,
    description: 'Successfully returns a greeting message.',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
