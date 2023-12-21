import {Router} from "express";
import {CartManagerFile} from "../dao/managers/cartManagerFile.js"
import cartModel from "../dao/models/cart.model.js";

const path = "Carts.json";
const router = Router();
const cartManagerFile = new CartManagerFile(path);

router.get("/:cid", async (req,res)=>{
    const cid = req.params.cid;
    const cartID = await cartModel.find({_id:id})
    res.send({
        statys:"succes",
        msg:`Se trajo el carro con ID : ${cid}`,
        carro: cartID
    })
})

router.post("/", async (req,res)=>{
    const cart = req.body
    const carts = await cartModel.create(cart)
    res.send({
        statys:"succes",
        msg:"Carrito añadido",
        carrito: carts
    })
})

router.post("/:cid/product/:pid", async (req,res)=>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    res.send({
        statys:"succes",
        msg:`Ruta post car - Agrego prodcto al carrito. pid: ${pid} cid: ${cid}`
    })
})

router.delete("/:cid", async (req,res)=>{
    const cid = req.params.cid;
    const delCart = await cartModel.deleteOne({_id:id})
    res.send({
        statys:"succes",
        msg:`Se borro el carro con ID : ${cid}`,
        carrito: delCart
    })
})

export {router as cartRouter};