import productModel from "../dao/models/product.model.js";

class ProductManagerDB{

    getProduct =  async (req, res) =>{
        try{
            const { page } = req.query;
            const  products =  await productModel.paginate(
                {},
                {
                    limit: 5,
                    lean: true,
                    page: page ?? 1
                }
            );
            res.json({
                status: "success",
                payload: products.docs,
                totalPages:products.totalPages,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                page:  products.page,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevLink:  products.prevPage ? `/api/products?page=${products.prevPage}` : null,
                nextLink:  products.nextPage ? `/api/products?page=${products.nextPage}` : null
            })
        }catch(error){
            res.status(500).json({status: "error",   error: error.message});
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