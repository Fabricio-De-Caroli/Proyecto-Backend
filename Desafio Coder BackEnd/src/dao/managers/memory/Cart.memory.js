import fs from "fs";
import __dirname from "../../../utils.js"
import {v4 as uuidv4} from "uuid"

class cartMemory{
    constructor(){
        this.carts = [];
    }
    getCarts = async () =>{
        return this.carts
    }
    addCart = async (cart) =>{
        cart.id = uuidv4();
        this.carts.push(cart);
    }
    getCartsById = async (id) =>{
        const cart = this.carts.find(c=>c.id === id);
        if(!cart){
            throw new Error("No se encontro el carrito");
        }
        return cart;
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

export {cartMemory};