import fs from "fs"
import { __dirname } from "../../../utils.js"
import {v4 as uuidv4} from "uuid"

class productMemory{
    constructor(){
        this.products = [];
    }
    getProducts = async () =>{
        return this.products
    }
    addProduct = async (product) =>{
        product.id = uuidv4();
        this.products.push(product)
    }
    
    getProductsById = async (id) =>{
        const product = this.products.find(p=>p.id === id);
        if(!product){
            throw new Error("No se pudo encontrar el producto");
        }
        return product;
    }
    deleteProduct = async (id) =>{
        try{
            const products = await this.getProducts();
            const productIndex = products.findIndex(prod => prod.id == id);
            if(productIndex !== -1){
                products.splice(productIndex, 1);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
                console.log("el producto fue eliminado")
                return "Producto elminado";
            }else{
                console.log("el producto no existe");
                return "el producto no existe";
            }
        }catch(error){
            console.log(error);
        }
    }
    updateProduct = async (id, title, description, price, thumbnail, code, stock) =>{
        const products = await this.getProducts();
        const productIndex = products.findIndex(u=> u.id == id);

        if(productIndex !== -1){
            products[productIndex].title = title
            products[productIndex].description = description
            products[productIndex].price = price
            products[productIndex].thumbnail = thumbnail
            products[productIndex].code = code
            products[productIndex].stock = stock
        }else{
            console.log("producto no encontrado")
        }
        console.log(product)
    }

}

export { productMemory };