import { Injectable } from '@nestjs/common';
import { AddProductRequest, AddProductResponse, DeleteProductByIdRequest, DeleteProductByIdResponse, Empty, GetAllProductsResponse, UpdateProductRequest, UpdateProductResponse, getProductByIdRequest, getProductByIdResponse, getProductsByIdsRequest } from './product.pb';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product, ProductDocument } from '../mongoose/product.schema';

@Injectable()
export class ProductService {


    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
    ) { }

    async addProduct(request: AddProductRequest): Promise<AddProductResponse> {
        try {
            const product = await this.productModel.findOne({ name: request.name }).exec();
            console.log(product);
            if (product !== null ) {
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
            throw new Error(`Error: ${error.message}`);
        }
    }


    async getAllProducts(request: Empty): Promise<GetAllProductsResponse> {
        try {
            const productList = await this.productModel.find().lean().exec();

            const transformedProducts = productList.map(product => {
                product.id = product._id.toString();
                delete product._id;
                return product;
            });

            return { products: transformedProducts, error: undefined };
        } catch (error) {
            throw new Error(`Error: ${error.message}`);
        }
    }

    async getProductsByIds(request: getProductsByIdsRequest): Promise<GetAllProductsResponse> {
        try {
            const productIds = request.ids.map(id => new Types.ObjectId(id));

            const productList = await this.productModel.find({ _id: { $in: productIds } }).lean().exec();

            const transformedProducts = productList.map(product => {
                product.id = product._id.toString();
                delete product._id;
                return product;
            });

            return { products: transformedProducts, error: undefined };
        } catch (error) {
            throw new Error(`Error: ${error.message}`);
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
            throw new Error(`Error: ${error.message}`);
        }
    }


    async deleteProductById(request: DeleteProductByIdRequest): Promise<DeleteProductByIdResponse> {
        try {
            const productId = request.id;

            const deletedProduct = await this.productModel.findByIdAndDelete(productId).exec();

            if (!deletedProduct) {
                return { isDeleted: false, error: { message: "Product not Found" } };
            }

            return { isDeleted: true, error: undefined};
        } catch (error) {
            throw new Error(`Error: ${error.message}`);
        }
    }

    
    async updateProduct(request: UpdateProductRequest): Promise<UpdateProductResponse> {
        try {
            const productId = request.id;
            const updatedFields: Partial<Product> = {};

            
            if (request.name) {
                updatedFields.name = request.name;
            }
            if (request.description) {
                updatedFields.description = request.description;
            }
            if (request.price) {
                updatedFields.price = request.price;
            }

            
            const updatedProduct = await this.productModel
                .findOneAndUpdate({ _id: productId }, updatedFields, { new: true })
                .exec();

            if (!updatedProduct) {
                return {
                    product: undefined,
                    error: { message: "Product not Found" },
                };
            }

            return {
                product: {
                    name: updatedProduct.name,
                    description: updatedProduct.description,
                    price: updatedProduct.price,
                    id: updatedProduct.id,
                },
                error: undefined,
            };
        } catch (error) {
            return {
                product: undefined,
                error: { message: error},
            };
        }
    }

}
