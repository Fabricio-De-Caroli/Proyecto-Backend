import productModel from "../persistence/models/product.model.js";

class productController{
    static getProducts = async (req,res)=>{
        const products = await productModel.find()
        req.session.user = {
            full_name: `${user.first_name}${user.last_name}`}
    
        res.send({
            status:"succes",
            productos: products
        })
    }
    static getProductByID = async (req,res)=>{
        const pid = req.params.pid;
        const product = await productModel.find({_id:id})
        res.send({
            statys:"succes",
            msg:`Se trajo el producto con ID : ${pid}`,
            product: product
        })
    }
    static createProduct = async (req,res)=>{
        const product = req.body;
        const products = await productModel.create(product)
    
        res.send({
            statys:"succes",
            msg:"Producto añadido",
            productos: products
        })
        console.log(product)
    }
    static updateProduct = async (req,res)=>{
        const pid = req.params.pid;
        const product = req.body
        const upProduct = await productModel.updateOne({_id:id},{$set:product})
        res.send({
            statys:"succes",
            msg:`Se actualizo el produdcto con ID : ${pid}`,
            producto: upProduct 
        })
    }
    static deleteProduct = async (req,res)=>{
        const pid = req.params.pid;
        const delProduct = await productModel.deleteOne({_id:id})
    
        res.send({
            statys:"succes",
            msg:`Se elimino el producto con ID : ${pid}`,
            producto: delProduct 
        })
    }
}

export {productController}