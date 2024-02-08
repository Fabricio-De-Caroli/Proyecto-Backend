import { CartManagerMongo } from "../service/cartManagerDB.js";

class cartController{
    static getCart = async (req,res)=>{
        const cid = req.params.cid;
        const cartID = await CartManagerMongo.getCart({_id:id})
        res.send({
            status:"succes",
            msg:`Se trajo el carro con ID : ${cid}`,
            carro: cartID
        })
    }
    static createCart = async (req,res)=>{
        const cart = req.body
        const carts = await CartManagerMongo.createCart()
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
    
        const cart =  await  CartManagerMongo.addProductInCart(pid,  cid,  quantity)
        res.send({
            statys:"succes",
            msg: cart
        })
    }
    static deleteCart = async (req,res)=>{
        const cid = req.params.cid;
        const delCart = await CartManagerMongo.deleteCart({_id:cid})
        res.send({
            statys:"succes",
            msg:`Se borro el carro con ID : ${cid}`,
            carrito: delCart
        })
    }
}

export {cartController}