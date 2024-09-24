import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';

/**
 * Data Transfer Object (DTO) for updating a category.
 *
 * This class extends the `PartialType` of `CreateCategoryDto`,
 */
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
