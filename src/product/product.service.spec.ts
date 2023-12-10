import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { ProductModule } from './product.module';
import { getModelToken } from '@nestjs/mongoose';
import { Product } from '../mongoose/product.schema';
import {AddProductResponse} from './product.pb'

describe('ProductService', () => {
  let service: ProductService;
  let mockProductModel;

  beforeEach(async () => {
    mockProductModel = {
      findOne: jest.fn().mockReturnThis(),
      find: jest.fn().mockReturnThis(),
      lean: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValueOnce([]),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [ProductModule],
    })
      .overrideProvider(getModelToken(Product.name))
      .useValue(mockProductModel)
      .compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a new product', async () => {
    const dbMock: Product[] = [
      {
        id: '123',
        name: 'Test 1',
        description: 'Test',
        price: 19990,
      },
    ];
    
    // Espiar el método findOne del mockProductModel
    jest.spyOn(mockProductModel, 'find').mockResolvedValue(null);

    const productData = {
      name: 'Test Product',
      description: 'Test Description',
      price: 19.99,
    };

    const result = await service.addProduct(productData);
    console.log(result);
    expect(result).toBeDefined();
    expect(result).toHaveProperty('product');
    expect(result).toHaveProperty('error');


  });

  it('should get all products', async () => {
    // Ejecuta la función getAllProducts
    const result = await service.getAllProducts({});

    // Verifica si los métodos fueron llamados
    console.log(result);
    expect(result).toBeDefined();
    expect(result).toHaveProperty('products');
    expect(result).toHaveProperty('error');
  });

  
});
