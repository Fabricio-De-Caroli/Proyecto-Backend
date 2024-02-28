import { generateToken } from "../utils.js";
import userModel from "../dao/models/Users.model.js";
import { validatePassword } from "../utils.js";

const users = []
class sessionController{
    static register = async(req,res)=>{
        const {name, email, password}=  req.body
        const user ={
            name,
            email,
            password
        }
        users.push(user);
        const access_token = generateToken(user);
        res.send({
            status:"success",
            access_token
        })
    }
    static login =  async(req,res) =>{
        const {email,password} = req.body;
        const user = await userModel.findOne({"email":email})
        const existUser= validatePassword(password, user)
        if (!existUser){
            console.log(user)
            res.status(400).send({
                status:"error",
                error:"Datos incorrectos"
            })
        }else{
            const access_token = generateToken(user);
            res.send({
                status:"success",
                access_token})
        
        }
    }
    static failRegister = async (req,res)=>{
        console.log("Fallo el registro");
        res.send({error:"fallo en el registro"})
    }
    static failLogin = (req, res)=>{
        res.send({error:"fail login"})
    }
    static getGithub = async (req,res)=>{}
    static githubCallBack = async (req,res) =>{
        req.session.user = req.user;
        res.redirect("/")
    }
    static logout = (req,res)=>{
        req.session.destroy(err=>{
            if(err){
                return res.status(500).send({
                    status: "error",
                    error:"No se pudo desloguear"
                })
            }
            res.redirect("/login");
        })
    }
}

export {sessionController}