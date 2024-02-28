export class createProductsDto{
    constructor(product){
        this.title = product.title
        this.description = product.description
        this.code = product.code
        this.price = product.price
        this.status = product.status
        this.stock = product.stock
        this.category = product.category
        this.thumbnails = product.thumbnails
    }
}

export class getProductDto{
    constructor(productDB){
        this.title = productDB.title;
        this.price = productDB.price;
        this.stock = productDB.stock;
        this.category = productDB.category;
    }
}