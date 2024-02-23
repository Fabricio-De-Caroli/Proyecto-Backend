import fs from "fs";
import path from "path"
import __dirname from "../../../utils.js"

class CartManagerFile{
    constructor(pathFile){
        this.path = path.join(__dirname,`/files/${pathFile}`);
    }
    getCarts = async () =>{
        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path, "utf-8");
            const carts = JSON.parse(data);
            return carts
        }else{
            return []
        }
    }
    addCart = async (cart) =>{
        const Carts = await this.getCarts();
        if(Carts.length === 0){
            cart.id = 1;
        }else{
            cart.id = Carts[Carts.length-1].id + 1;
        }
        Carts.push(cart);
        await fs.promises.writeFile(this.path, JSON.stringify(Carts, null, "\t"))
        return Carts;
    }
    getCartsById = async (id) =>{
        const carts = await this.getCarts();
        let cart = carts.find(p => p.id == id); 
        if(cart){
            return cart;
        }else{
            return console.log("not found");
        }
    }
    deleteCart = async (id) =>{
        try{
            const carts = await this.getCarts();
            const cartIndex = carts.findIndex(ca => ca.id == id);
            if(cartIndex !== -1){
                carts.splice(cartIndex, 1);
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
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
}

export {CartManagerFile};