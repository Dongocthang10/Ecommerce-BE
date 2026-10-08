import { Module } from '@nestjs/common';
import { ProductImageService } from './product-image.service.js';
import { ProductImageController } from './product-image.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../product/entities/product.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductImageController],
  providers: [ProductImageService],
})
export class ProductImageModule {}
