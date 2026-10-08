import { PartialType } from '@nestjs/swagger';
import { CreateProductImageDto } from './create-product-image.dto.js';

export class UpdateProductImageDto extends PartialType(CreateProductImageDto) {}
