import { Injectable } from '@nestjs/common';
import { AddProductRequest, AddProductResponse, DeleteProductByIdRequest, Empty, Product, UpdateProductRequest, getProductByIdRequest } from './product.pb';

@Injectable()
export class ProductService {
    addProduct(request: AddProductRequest): PromiseLike<AddProductResponse> {
        const newProduct: Product = {
            name: request.name,
            description: request.description,
            price: request.price,
            id: Math.random().toString(), // Este es solo un ejemplo, deberías generar un ID único de alguna manera
        };
        return Promise.resolve({ product: newProduct, error: undefined });
    }

    getAllProducts(request: Empty): import("./product.pb").GetAllProductsResponse | PromiseLike<import("./product.pb").GetAllProductsResponse> {
        throw new Error('Method not implemented.');
    }

    getProductById(request: getProductByIdRequest): import("./product.pb").getProductByIdResponse | PromiseLike<import("./product.pb").getProductByIdResponse> {
        throw new Error('Method not implemented.');
    }

    deleteProductById(request: DeleteProductByIdRequest): import("./product.pb").DeleteProductByIdResponse | PromiseLike<import("./product.pb").DeleteProductByIdResponse> {
        throw new Error('Method not implemented.');
    }

    updateProduct(request: UpdateProductRequest): import("./product.pb").UpdateProductResponse | PromiseLike<import("./product.pb").UpdateProductResponse> {
        throw new Error('Method not implemented.');
    }

}
