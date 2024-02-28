import { cartMongo } from "../dao/managers/mongo/Cart.mongo.js";
import { cartDao } from "../dao/factory.js"; 
import productModel from "../dao/models/product.model.js";
import { ticketsModel } from "../dao/models/ticket.model.js";
import {v4 as uuidv4} from "uuid";
import cartModel from "../dao/models/cart.model.js";

class cartController{
    static getCart = async (req,res)=>{
        const cid = req.params.cid;
        const cartID = await cartDao.getCart({_id:id})
        res.send({
            status:"succes",
            msg:`Se trajo el carro con ID : ${cid}`,
            carro: cartID
        })
    }
    static createCart = async (req,res)=>{
        const cart = req.body
        const carts = await cartDao.createCart()
        res.send({
            statys:"succes",
            msg:"Carrito añadido",
            carrito: carts
        })
    }
    static addProductInCart = async (req,res)=>{
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = req.params.quantity;
    
        const cart =  await  cartMongo.addProductInCart(pid,  cid,  quantity)
        res.send({
            statys:"succes",
            msg: cart
        })
    }
    static deleteCart = async (req,res)=>{
        const cid = req.params.cid;
        const delCart = await cartMongo.deleteCart({_id:cid})
        res.send({
            statys:"succes",
            msg:`Se borro el carro con ID : ${cid}`,
            carrito: delCart
        })
    }
    static purchase = async (req,res)=>{
        try {
            const cartId = req.params.cid;
            const cart = await cartModel.findById(cartId);
            if(cart){
                if(!cart.products.length){
                    return res.send("es necesario que agrege productos antes de realizar la compra")
                }
                const ticketProducts = [];
                const rejectedProducts = [];
                for(let i=0; i<cart.products.length;i++){
                    const cartProduct = cart.products[i];
                    const productDB = await productModel.findById(cartProduct.id);
                    if(cartProduct.quantity <= productDB.stock){
                        ticketProducts.push(cartProduct);
                    }else{
                        rejectedProducts.push(cartProduct);
                    }
                }
                console.log("ticketProducts",ticketProducts)
                console.log("rejectedProducts",rejectedProducts)
                const newTicket = {
                    code:uuidv4(),
                    purchase_datetime: new Date().toLocaleString(),
                    amount:500,
                    purchaser:req.user.email
                }
                const ticketCreated = await ticketsModel.create(newTicket);
                res.send(ticketCreated)
            }else{
                res.send("El carrito no existe")
            }
        } catch (error) {
            res.send(error.message)
        }
    }
}

export {cartController}