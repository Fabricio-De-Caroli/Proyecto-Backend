import { createProductsDto, getProductDto } from "../dao/DTO/products.Dto.js";

export class productRepository{
    constructor(dao){
        this.dao = dao;
    }
    getProducts(){
        /* const product = await  */
        return this.dao.getProducts()
        console.log(product);
    }
    async createProduct(product){
        const productDto = new createProductsDto(product);
        const productCreated = await this.dao.post(productDto);
        const productFront = new getProductDto(productCreated);
        return productFront;
    }
}
