import express from "express";
import {ProductManagerDB} from "../dao/dbManagers/productManagerDB.js";

const router = express.Router();
const productManager = new ProductManagerDB();

router.get("/", async(req, res) =>{
    try{
        const products = await ProductManagerDB.getProduct();
        res.render("products", {products});
    }catch(error){
        console.error("Error al obtener la lista de productos", error.message);
        res.status(500).send("Error interno del server")
        
    }
    
});

router.get("/realtimeproducts", (req, res) =>{
    res.render("realTimeProducs");
});

export {router as viewRouters};