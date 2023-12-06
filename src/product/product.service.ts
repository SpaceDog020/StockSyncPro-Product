import { Injectable } from '@nestjs/common';
import { AddProductRequest, AddProductResponse, DeleteProductByIdRequest, Empty, GetAllProductsResponse, UpdateProductRequest, getProductByIdRequest, getProductByIdResponse } from './product.pb';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product, ProductDocument } from 'src/mongoose/product.schema';

@Injectable()
export class ProductService {


    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
    ) { }

    async addProduct(request: AddProductRequest): Promise<AddProductResponse> {
        try {
            const product = await this.productModel.findOne({ name: request.name }).exec();
            console.log(product);
            if (product !== null) {
                return { product: undefined, error: { message: "Product already exists" } }
            };

            const newProduct: Product = {
                name: request.name,
                description: request.description,
                price: request.price,
                id: undefined
            };
            const createdProduct = new this.productModel(newProduct);
            await createdProduct.save();
            return {
                product: {
                    name: createdProduct.name,
                    description: createdProduct.description,
                    price: createdProduct.price,
                    id: createdProduct._id
                },
                error: undefined,
            };
        } catch (error) {
            return {
                product: undefined,
                error: error.message || 'Error al agregar el producto',
            };
        }
    }


    async getAllProducts(request: Empty): Promise<GetAllProductsResponse> {
        try {
            const productList = await this.productModel.find().lean().exec();

            // Transforma cada documento en productList
            const transformedProducts = productList.map(product => {
                product.id = product._id.toString();
                delete product._id;
                return product;
            });

            return { products: transformedProducts, error: undefined };
        } catch (error) {
            // Manejo de errores, puedes personalizar según tus necesidades.
            throw new Error(`Error al obtener los productos: ${error.message}`);
        }
    }


    async getProductById(request: getProductByIdRequest): Promise<getProductByIdResponse> {
        try {
            let objectId;
            try {
                objectId = new Types.ObjectId(request.id);
            } catch (error) {
                // Si hay un error al convertir, es probable que el id no sea válido
                console.error(`Error al convertir el id a ObjectId: ${error.message}`);
                return { product: undefined, error: { message: "Product not Found" } };
            }

            const productFound = await this.productModel.findOne({ _id: request.id }).exec();
            
                const p = {
                    name: productFound.name,
                    description: productFound.description,
                    price: productFound.price,
                    id: productFound._id
                };
                return { product: p, error: undefined };

        } catch (error) {
            // Manejo de errores, puedes personalizar según tus necesidades.
            throw new Error(`Error al obtener los productos: ${error.message}`);
        }
    }


    deleteProductById(request: DeleteProductByIdRequest): import("./product.pb").DeleteProductByIdResponse | PromiseLike<import("./product.pb").DeleteProductByIdResponse> {
        throw new Error('Method not implemented.');
    }

    updateProduct(request: UpdateProductRequest): import("./product.pb").UpdateProductResponse | PromiseLike<import("./product.pb").UpdateProductResponse> {
        throw new Error('Method not implemented.');
    }

}
