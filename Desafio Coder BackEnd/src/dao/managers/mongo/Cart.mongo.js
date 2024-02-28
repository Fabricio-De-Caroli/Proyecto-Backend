import cartModel from "../../models/cart.model.js";
import productModel from "../../models/product.model.js";

class cartMongo{
    constructor(){
        this.model = cartModel
    }
    getCarts = async () =>{
        const carts = await this.model.find()
        return carts;
    }
    getCart = async (cid) =>{
        const cart = await this.model.find({_id:cid})
        return cart;
    }
    createCart = async () =>{
        const cart = await this.model.create({});
        return cart
    }
    addProductInCart = async(cid, pid, quantity)=>{
        const cart = await this.model.findOne({_id:cid});
        if(!cart){
            return{
                status: "error",
                msg: "Carrito no existe"
            }
        };
        const product = await productModel.findOne({_id:pid});
        if(!product){
            return{
                status: "error",
                msg: "El producto no existe"
            }
        };

        const productInCart = cart.product;

        const indexProduct  = productInCart.findIndex((product)=> product.product == pid);

        if(indexProduct == -1){
            const  newProduct={
                product:pid,
                quantity: quantity
            }
            cart.product.push(newProduct);
        }else{
            cart.product[indexProduct].quantity += 1;
        }

        const newProduct = {
            product: pid,
            quantity: quantity
        }
        productInCart.push(newProduct);
        await cart.save();
        return cart;
    }
    deleteCart = async(cid)=>{
        const delCart = await CartManagerMongo.deleteOne({_id:cid})
        return delCart
    }
}

export {cartMongo};