/* import ProductManager from "../managers/ProductManagers.js"; */
import express from "express";
import { cartRouter } from "./routes/carts.routes.js";
import { productRouter } from "./routes/products.routes.js";

const port = 8080;

const app = express();

app.use(express.urlencoded({extended:true}))

app.listen(port, ()=>{
    console.log(`Server funcionando en el puerto: ${port}`)
})


app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
/* const path = "./files/products.json"

const productManager = new ProductManager(path);

const getProduct = productManager.getProducts()

app.get(`/products`, async(req, res)=>{
    const product = await getProduct

    const limit = req.query.limit;

    if(!limit){
        return res.send({product})
    }

    const productLimit = product.slice(0, limit);

    res.send(productLimit);
})

app.get(`/products/idp`, async(req,res)=>{
    const idproduct = req.params.idp

    const product = getProduct.find(prod =>{
        return prod.id === idproduct
    })

    if(!usuario){
        return res.send({
            error: "Usuarios no encontrados"
        })
    }
    res.send({product})
}) */