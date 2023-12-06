import {Router} from "express";
import ProductManager from "../managers/ProductManagers.js"

const path = "products.json";
const router = Router();
const productManagerFile = new ProductManager(path);

router.get("/", async (req,res)=>{
    const products = await productManagerFile.getProducts()

    res.send({
        statys:"succes",
        productos: products
    })
})

router.get("/:pid", async (req,res)=>{
    const pid = req.params.pid;
    const product = await productManagerFile.getProductsById(pid)
    res.send({
        statys:"succes",
        msg:`Se trajo el producto con ID : ${pid}`,
        product: product
    })
})

router.post("/", async (req,res)=>{
    const product = req.body;
    const products = await productManagerFile.addProduct(product)

    /* res.send({
        statys:"succes",
        msg:"Producto añadido",
        productos: products
    }) */
    console.log(product)
})

router.put("/:pid", async (req,res)=>{
    const pid = req.params.pid;
    const product = req.body
    const upProduct = await productManagerFile.updateProduct(pid, product)
    res.send({
        statys:"succes",
        msg:`Se actualizo el produdcto con ID : ${pid}`,
        producto: upProduct 
    })
})

router.delete("/:pid", async (req,res)=>{
    const pid = req.params.pid;
    const delProduct = await productManagerFile.deleteProduct(pid)

    res.send({
        statys:"succes",
        msg:`Se elimino el producto con ID : ${pid}`,
        producto: delProduct 
    })
})

export {router as productRouter};