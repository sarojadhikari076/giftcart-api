import { Controller, Get } from '@nestjs/common';
import { FaqsService } from './faqs.service';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Faq } from './entity/faq.entity'; // Assuming you have an entity called Faq

@ApiTags('FAQs')
@Controller('faqs')
export class FaqsController {
  /**
   * @constructor
   * @param {FaqsService} faqsService - The service used for handling FAQs.
   */
  constructor(private readonly faqsService: FaqsService) {}

  /**
   * Retrieve all FAQs.
   *
   * @async
   * @method findAll
   * @returns {Promise<Faq[]>} A promise that resolves to an array of FAQ objects.
   * @throws {Error} Throws an error if fetching FAQs fails.
   * @example
   * const faqs = await faqsController.findAll();
   * console.log(faqs); // Output: Array of FAQ objects
   */
  @Get()
  @ApiOperation({
    summary: 'Get all FAQs',
    description: 'Fetch a list of all frequently asked questions.',
  })
  @ApiOkResponse({
    description: 'List of FAQs retrieved successfully.',
    type: [Faq],
  })
  async findAll(): Promise<Faq[]> {
    return this.faqsService.findAll();
  }
}
