import {Router} from "express";
import {CartManagerMongo} from "../dao/dbManagers/cartManagerDB.js"
import cartModel from "../dao/models/cart.model.js";

const router = Router();
const cartManagerFile = new CartManagerMongo();

router.get("/:cid", async (req,res)=>{
    const cid = req.params.cid;
    const cartID = await CartManagerMongo.getCart({_id:id})
    res.send({
        statys:"succes",
        msg:`Se trajo el carro con ID : ${cid}`,
        carro: cartID
    })
})

router.post("/", async (req,res)=>{
    const cart = req.body
    const carts = await CartManagerMongo.createCart()
    res.send({
        statys:"succes",
        msg:"Carrito añadido",
        carrito: carts
    })
})

router.post("/:cid/product/:pid", async (req,res)=>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.params.quantity;

    const cart =  await  CartManagerMongo.addProductInCart(pid,  cid,  quantity)
    res.send({
        statys:"succes",
        msg: cart
    })
})

router.delete("/:cid", async (req,res)=>{
    const cid = req.params.cid;
    const delCart = await CartManagerMongo.deleteCart({_id:cid})
    res.send({
        statys:"succes",
        msg:`Se borro el carro con ID : ${cid}`,
        carrito: delCart
    })
})

export {router as cartRouter};