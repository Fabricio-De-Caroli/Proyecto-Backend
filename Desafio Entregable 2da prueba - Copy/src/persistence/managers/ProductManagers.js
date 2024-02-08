import fs from "fs"
import path from "path"
import __dirname from "../../utils.js"

export default class ProductManager{
    constructor(pathFile){
        this.path = path.join(__dirname,`/files/${pathFile}`);
    }
    getProducts = async () =>{
        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path, "utf-8");
            const products = JSON.parse(data);
            return products
        }else{
            return []
        }
    }
    addProduct = async (product) =>{
        const products = await this.getProducts();
        if(products.length === 0){
            product.id = 1;
        }else{
            product.id = products[products.length-1].id + 1;
        }
        products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"))
        return products;
    }
    
    getProductsById = async (id) =>{
        const products = await this.getProducts();
        let product = products.find(p => p.id == id); 
        if(product){
            return product;
        }else{
            return console.log("not found");
        }
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


/* const productManager = new ProductManager();

productManager.addProduct("rdr2", "cualquiera", 60, "cualquiera", 1, 29)
productManager.addProduct("nfs", "safsa", 30, "sfafsa", 2, 54)

let takeProduct = productManager.getProductsById(2) */




/* console.log(takeProduct) */