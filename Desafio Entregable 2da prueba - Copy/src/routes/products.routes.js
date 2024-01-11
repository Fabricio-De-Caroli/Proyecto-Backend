import {Router} from "express";
import { ProductManagerDB } from "../dao/dbManagers/productManagerDB.js";
import productModel from "../dao/models/product.model.js";

const router = Router();
const productManagerFile = new ProductManagerDB();

router.get("/", async (req,res)=>{
    const products = await productModel.find()
    req.session.user = {
        full_name: `${user.first_name}${user.last_name}`}

    res.send({
        status:"succes",
        productos: products
    })
})

router.get("/:pid", async (req,res)=>{
    const pid = req.params.pid;
    const product = await productModel.find({_id:id})
    res.send({
        statys:"succes",
        msg:`Se trajo el producto con ID : ${pid}`,
        product: product
    })
})

router.post("/", async (req,res)=>{
    const product = req.body;
    const products = await productModel.create(product)

    res.send({
        statys:"succes",
        msg:"Producto añadido",
        productos: products
    })
    console.log(product)
})

router.put("/:pid", async (req,res)=>{
    const pid = req.params.pid;
    const product = req.body
    const upProduct = await productModel.updateOne({_id:id},{$set:product})
    res.send({
        statys:"succes",
        msg:`Se actualizo el produdcto con ID : ${pid}`,
        producto: upProduct 
    })
})

router.delete("/:pid", async (req,res)=>{
    const pid = req.params.pid;
    const delProduct = await productModel.deleteOne({_id:id})

    res.send({
        statys:"succes",
        msg:`Se elimino el producto con ID : ${pid}`,
        producto: delProduct 
    })
})

export {router as productRouter};