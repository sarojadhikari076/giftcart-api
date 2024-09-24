import { ApiProperty } from '@nestjs/swagger';

/**
 * Represents a frequently asked question.
 */
export class Faq {
  /**
   * The ID of the FAQ.
   * @example 1
   */
  @ApiProperty({
    description: 'The ID of the FAQ.',
    example: 1,
  })
  id: number;

  /**
   * The question being asked.
   * @example 'What is the meaning of life?'
   */
  @ApiProperty({
    description: 'The question being asked.',
    example: 'What is the meaning of life?',
  })
  question: string;

  /**
   * The answer to the question.
   * @example 'The meaning of life is 42.'
   */
  @ApiProperty({
    description: 'The answer to the question.',
    example: 'The meaning of life is 42.',
  })
  answer: string;
}
