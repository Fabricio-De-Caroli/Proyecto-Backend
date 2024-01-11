import { Router } from "express";
import {ProductManagerDB} from "../dao/dbManagers/productManagerDB.js";

const router = Router();
const productManager = new ProductManagerDB();

/* router.get("/", async(req, res) =>{
    try{
        const products = await ProductManagerDB.getProduct();
        res.render("products", {products});
    }catch(error){
        console.error("Error al obtener la lista de productos", error.message);
        res.status(500).send("Error interno del server")
        
    }
    
}); */

const publicAccess = (req,res,next) =>{
    if(req.session.user){
        return res.redirect("/");
    }
    next();
}

const privateAccess = (req,res,next) =>{
    if(!req.session.user){
        return res.redirect("/login");
    }
    next();
}

router.get("/realtimeproducts", (req, res) =>{
    res.render("realTimeProducs");
});

router.get("/register", publicAccess,(req,res)=>{
    res.render("register")
})
router.get("/login", publicAccess,(req,res)=>{
    res.render("login")
})
router.get("/", privateAccess,(req,res)=>{
    res.render("profile", {user:req.session.user})
})


export {router as viewRouters};