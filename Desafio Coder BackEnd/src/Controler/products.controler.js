import userModel from "../dao/models/Users.model.js";
import { productDao } from "../dao/factory.js"
import { productService } from "../repository/index.js";

class productController{
    static getProducts = async (req,res)=>{
        const products = await productService.getProducts()
        const user = userModel.findOne()
        req.session.user = {
            full_name: `${user.first_name}${user.last_name}`}
    
        res.send({
            status:"succes",
            productos: products
        })
    }
    static getProductByID = async (req,res)=>{
        const pid = req.params.pid;
        const product = await productDao.find({_id:id})
        res.send({
            statys:"succes",
            msg:`Se trajo el producto con ID : ${pid}`,
            product: product
        })
    }
    static createProduct = async (req,res)=>{
        const product = req.body;
        const products = await productService.createProduct(product)
    
        res.send({
            status:"success",
            msg:"Producto añadido",
            productos: products
        })
        console.log(product)
    }
    static updateProduct = async (req,res)=>{
        const pid = req.params.pid;
        const product = req.body
        const upProduct = await productDao.updateOne({_id:id},{$set:product})
        res.send({
            statys:"succes",
            msg:`Se actualizo el produdcto con ID : ${pid}`,
            producto: upProduct 
        })
    }
    static deleteProduct = async (req,res)=>{
        const pid = req.params.pid;
        const delProduct = await productDao.deleteOne({_id:id})
    
        res.send({
            statys:"succes",
            msg:`Se elimino el producto con ID : ${pid}`,
            producto: delProduct 
        })
    }
}

export {productController}