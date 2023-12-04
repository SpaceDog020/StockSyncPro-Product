import { Injectable } from '@nestjs/common';
import { AddProductRequest, AddProductResponse, DeleteProductByIdRequest, Empty, GetAllProductsResponse, UpdateProductRequest, getProductByIdRequest } from './product.pb';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/mongoose/product.schema';

@Injectable()
export class ProductService {


    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
    ) { }

    async addProduct(request: AddProductRequest): Promise<AddProductResponse> {
        try {
            const newProduct: Product = {
                name: request.name,
                description: request.description,
                price: request.price,
                id: undefined
            };
            const createdProduct = new this.productModel(newProduct);
            await createdProduct.save();
            return {
                product: createdProduct,
                error: undefined,
            };
        } catch (error) {
            return {
                product: undefined,
                error: error.message || 'Error al agregar el producto',
            };
        }
    }

   
    async getAllProducts(request: Empty): Promise<GetAllProductsResponse>  {
        try {
            return { products : await this.productModel.find().exec(), error : undefined};
        } catch (error) {
            // Manejo de errores, puedes personalizar según tus necesidades.
            throw new Error(`Error al obtener los productos: ${error.message}`);
        }
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
