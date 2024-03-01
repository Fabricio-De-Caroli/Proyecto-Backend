import { showProduct } from "../utils.js";

class mokingProductsControler{
    static getMokingProducts = (req,res)=>{
        const cant = parseInt(req.query.cant) || 100;
        let products = [];
        for (let i = 0; i < cant; i++) {
            const product = showProduct();
            products.push(product);
        }
        res.json({status:"success", payload: products})
    }
}

export {mokingProductsControler}