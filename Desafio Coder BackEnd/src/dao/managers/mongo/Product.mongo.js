import productModel from "../../models/product.model.js";

class productMongo{
    constructor(){
        this.model = productModel
    }
    getProduct =  async (req, res) =>{
        try{
            const { page } = req.query;
            const  products =  await this.model.paginate(
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
    createProduct = async (product)=>{
        try {
            const product = await this.model.create({});
            return product;
        } catch (error) {
            throw new Error(`Hubo un error al querer crear un nuevo producto error ${error.message}`)
        }

    }
    getProductByID =  async(pid) =>{
        try {
            const product  = await this.model.findOne({_id: pid});
            return product;
        } catch (error) {
            throw new Error(`Hubo un error al querer traer un producto error ${error.message}`)
        }
    }
    updateProduct = async(pid) =>{
        try {
            const upProduct = await this.model.updateOne({_id:id},{$set:product})
            return upProduct;
        } catch (error) {
            throw new Error(`Hubo un error al querer actualizar un producto error ${error.message}`)
        }
    }
    deleteProduct = async(pid)=>{
        try {
            const delProduct =  await this.model.deleteOne({_id:pid})
            return delProduct;
        } catch (error) {
            throw new Error(`Hubo un error al querer borrar un producto error ${error.message}`)
        }
    }
}

export {productMongo}