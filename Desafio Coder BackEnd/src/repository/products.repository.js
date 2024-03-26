import { createProductsDto, getProductDto } from "../dao/DTO/products.Dto.js";

export class productRepository{
    constructor(dao){
        this.dao = dao
    }
    async getProducts(){
        const product = await this.dao.get();
        return product;
    }
    async createProduct(product){
        const productDto = new createProductsDto(product);
        const productCreated = await this.dao.post(productDto);
        const productFront = new getProductDto(productCreated);
        return productFront;
    }
}