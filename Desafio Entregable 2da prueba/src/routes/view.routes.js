import express from "express";
import ProductManager from "../managers/ProductManagers.js";

const router = express.Router();
const productManaer = new ProductManager();

router.get("/", async(req, res) =>{
    try{
        const product = await productManaer.getProducts();

        res.render("home", {product});
    }catch(error){
        console.error("Error al obtener la lista de productos", error.message);
        res.status(500).send("Error interno del server")
    }
});

router.get("/realtimeproducts", (req, res) =>{
    res.render("realTimeProducs");
});

export {router as viewRouters};