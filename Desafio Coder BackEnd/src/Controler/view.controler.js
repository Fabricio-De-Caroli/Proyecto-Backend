import { productMongo } from "../dao/managers/mongo/Product.mongo.js";

class viewController{
    static publicAccess = (req,res,next) =>{
        if(req.session.user){
            return res.redirect("/");
        }
        next();
    }
    static privateAccess = (req,res,next) =>{
        if(!req.session.user){
            return res.redirect("/login");
        }
        next();
    }
    static realTimeproducts = (req, res) =>{
        res.render("realTimeProducts");
    }
    static registerController = (req,res)=>{
        res.render("register")
    }
    static loginController = (req,res)=>{
        res.render("login")
    }
    static profileController = (req,res)=>{
        res.render("profile")
    }
}

export {viewController}