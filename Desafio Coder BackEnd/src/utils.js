import {fileURLToPath} from "url";
import { dirname } from "path";
import bcrypt from  "bcrypt"
import jwt from "jsonwebtoken"
import { Faker, es, en } from "@faker-js/faker";

const private_key = "CoderKey"

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const validatePassword = (password, user) => bcrypt.compareSync(password, user.password)
export const generateToken =(user) =>{
    const token =jwt.sign({user},private_key,{expiresIn:"1d"})
    return token
}
export const authToken =(req,res,next)=>{
    const authHeader =req.headers.authorization
    const token = authHeader.split(` `)[1];
    if(token === "null"){
        return res.status(401).send({status:"error", error:"No autorizado"});
    }
    jwt.verify(token,private_key,(error,credentials)=>{
        console.log(error);
        if(error){
            return res.status(401).send({status:"error", error:"No autorizado"});
        }
        req.user = credentials.user;
        next()
        }
    )
}

export const customFaker = new Faker({locale: [en]})

const { commerce, image, database, string, internet, person, phone, lorem } = customFaker;

export const generateProduct = ()=>{
    return{
        id: database.mongodbObjectId(),
        title: commerce.productName(),
        description: commerce.productDescription(),
        code:string.alphanumeric(10),
        price:parseFloat(commerce.price()),
        status:commerce.productStatus,
        stock:parseInt(string.numeric(2)),
        category:commerce.productCategory,
        thumbnails:image.url()
    }
}

export const showProduct = ()=>{
    const productNumber = Math.ceil(Math.random()*10);
    let products = [];
    for (let i = 0; i < productNumber; i++) {
        const product = generateProduct();
        products.push(product);
    }
    return products;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;