import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ProductService } from './product.service';
import {
  AddProductRequest,
  AddProductResponse,
  UpdateProductRequest,
  UpdateProductResponse,
  getProductByIdRequest,
  getProductByIdResponse,
  GetAllProductsResponse,
  DeleteProductByIdRequest,
  DeleteProductByIdResponse,
  Empty,
} from './product.pb';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @GrpcMethod('ProductService', 'addProduct')
  async addProduct(request: AddProductRequest): Promise<AddProductResponse> {
    return this.productService.addProduct(request);
  }

  @GrpcMethod('ProductService', 'updateProduct')
  async updateProduct(request: UpdateProductRequest): Promise<UpdateProductResponse> {
    return this.productService.updateProduct(request);
  }

  @GrpcMethod('ProductService', 'getProductById')
  async getProductById(request: getProductByIdRequest): Promise<getProductByIdResponse> {
    return this.productService.getProductById(request);
  }

  @GrpcMethod('ProductService', 'getAllProducts')
  async getAllProducts(request: Empty): Promise<GetAllProductsResponse> {
    return this.productService.getAllProducts(request);
  }

  @GrpcMethod('ProductService', 'deleteProductById')
  async deleteProductById(request: DeleteProductByIdRequest): Promise<DeleteProductByIdResponse> {
    return this.productService.deleteProductById(request);
  }
}
