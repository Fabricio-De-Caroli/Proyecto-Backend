import ProductManager from "./managers/ProductManagers.js";

const path = "./files/products.json"

const productManager = new ProductManager(path);

const env = async ()=>{
    let products = await productManager.getProducts();
    /* let product = {
        title: "rdr2",
        description: "cualquiera",
        price: 60,
        thumbnail: "cualquiera",
        code: 1,
        stock: 23,
    } */
    /* let productos = await productManager.addProduct(product) */
    /* let idProd = await productManager.deleteProduct(1) */
    console.log(products)
}

env();