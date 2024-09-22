import { Controller, Get } from '@nestjs/common';
import { FaqsService } from './faqs.service';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { FaqEntity } from './entities/faq.entity';

@ApiTags('FAQs')
@Controller('faqs')
export class FaqsController {
  constructor(private readonly faqsService: FaqsService) {}

  // Retrieve all FAQs
  @Get()
  @ApiOperation({
    summary: 'Get all FAQs',
    description: 'Fetch a list of all frequently asked questions.',
  })
  @ApiOkResponse({
    description: 'List of FAQs retrieved successfully.',
    type: [FaqEntity],
  })
  findAll() {
    return this.faqsService.findAll();
  }
}
