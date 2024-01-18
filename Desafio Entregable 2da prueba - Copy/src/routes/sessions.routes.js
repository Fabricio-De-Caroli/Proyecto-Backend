import { Router } from "express";
import  userModel from  "../dao/models/Users.model.js"
import { createHash, validatePassword } from "../utils.js";
import passport from "passport";

const router = Router();

router.post("/register", passport.authenticate("register",{failureRedirect:"/api/sessions/failregister"}),
async(req,res)=>{
    res.send({status:"success", message:"User registrado"})
})
router.get("/failregister", async (req,res)=>{
    console.log("Fallo el registro");
    res.send({error:"fallo en el registro"})
})

router.post("/login",passport.authenticate("login", {failureRedirect:"/api/sessions/faillogin"}),
async (req,res) =>{
    if(!req.user){
        return res.status(400).send({status:"error"})
    }
    req.session.user ={
        full_name:`${req.user.first_name}${req.user.last_name}`,
        age:req.user.age,
        email:req.user.email,
        rol:"User"
    }
    if(req.user.email === "adminCoder@coder.com" || req.user.password === "adminCod3r123"){
        req.session.user ={
            full_name:`${req.user.first_name}${req.user.last_name}`,
            email: user.email,
            age: user.age,
            rol: "Admin"
        }
    }

    res.send({status:"success", payload:req.user})
}
)

router.get("/faillogin", (req, res)=>{
    res.send({error:"fail login"})
})

router.get("/github", passport.authenticate("github", {scope:["user:email"]}), async (req,res)=>{})

router.get("/githubcallback",  passport.authenticate("github", {failureRedirect:"/login"}), async (req,res) =>{
    req.session.user = req.user;
    res.redirect("/")
})

router.get("/logout",(req,res)=>{
    req.session.destroy(err=>{
        if(err){
            return res.status(500).send({
                status: "error",
                error:"No se pudo desloguear"
            })
        }
        res.redirect("/login");
    })
})

export {router as sessionRouter};