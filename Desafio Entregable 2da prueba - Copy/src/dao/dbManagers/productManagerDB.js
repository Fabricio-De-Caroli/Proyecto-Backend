import productModel from "../models/product.model.js";

class ProductManagerDB{

    getProduct =  async () =>{
        const  products =  await productModel.paginate(
            {},
            {
                limit: 5,
                lean: true,
                page: page
            }
        );
        return  {
            status:"success",
            msg: products
        }
    }
    createProduct = async (pruduct)=>{
        const product = await productModel.create({});
        return product;

    }
    getProductByID =  async(pid) =>{
        const product  = await productModel.findOne({_id: pid});
        return product;
    }
    updateProduct = async(pid) =>{
        const upProduct = await productModel.updateOne({_id:id},{$set:product})
        return upProduct;
    }
    deleteProduct = async(pid)=>{
        const delProduct =  await productModel.deleteOne({_id:pid})
        return delProduct;
    }
}

export {ProductManagerDB}