import { Test, TestingModule } from '@nestjs/testing';
import { ProductImageController } from './product-image.controller.js';
import { ProductImageService } from './product-image.service.js';

describe('ProductImageController', () => {
  let controller: ProductImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductImageController],
      providers: [ProductImageService],
    }).compile();

    controller = module.get<ProductImageController>(ProductImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
