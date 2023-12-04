/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "product";

export interface Empty {
}

export interface Error {
  message: string;
}

export interface Product {
  name: string;
  description: string;
  price: number;
  id: string;
}

export interface AddProductRequest {
  name: string;
  description: string;
  price: number;
}

export interface AddProductResponse {
  product: Product | undefined;
  error: Error | undefined;
}

export interface UpdateProductRequest {
  name: string;
  description: string;
  price: number;
}

export interface UpdateProductResponse {
  product: Product | undefined;
  error: Error | undefined;
}

export interface getProductByIdRequest {
  id: string;
}

export interface getProductByIdResponse {
  product: Product | undefined;
  error: Error | undefined;
}

export interface GetAllProductsResponse {
  products: Product[];
  error: Error | undefined;
}

export interface DeleteProductByIdRequest {
  id: string;
}

export interface DeleteProductByIdResponse {
  isDeleted: boolean;
  error: Error | undefined;
}

export const PRODUCT_PACKAGE_NAME = "product";

export interface ProductServiceClient {
  addProduct(request: AddProductRequest): Observable<AddProductResponse>;

  updateProduct(request: UpdateProductRequest): Observable<UpdateProductResponse>;

  getProductById(request: getProductByIdRequest): Observable<getProductByIdResponse>;

  getAllProducts(request: Empty): Observable<GetAllProductsResponse>;

  deleteProductById(request: DeleteProductByIdRequest): Observable<DeleteProductByIdResponse>;
}

export interface ProductServiceController {
  addProduct(
    request: AddProductRequest,
  ): Promise<AddProductResponse> | Observable<AddProductResponse> | AddProductResponse;

  updateProduct(
    request: UpdateProductRequest,
  ): Promise<UpdateProductResponse> | Observable<UpdateProductResponse> | UpdateProductResponse;

  getProductById(
    request: getProductByIdRequest,
  ): Promise<getProductByIdResponse> | Observable<getProductByIdResponse> | getProductByIdResponse;

  getAllProducts(
    request: Empty,
  ): Promise<GetAllProductsResponse> | Observable<GetAllProductsResponse> | GetAllProductsResponse;

  deleteProductById(
    request: DeleteProductByIdRequest,
  ): Promise<DeleteProductByIdResponse> | Observable<DeleteProductByIdResponse> | DeleteProductByIdResponse;
}

export function ProductServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "addProduct",
      "updateProduct",
      "getProductById",
      "getAllProducts",
      "deleteProductById",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ProductService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ProductService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const PRODUCT_SERVICE_NAME = "ProductService";
