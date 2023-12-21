import express from "express";
import { cartRouter } from "./routes/carts.routes.js";
import { productRouter } from "./routes/products.routes.js";
import {engine} from "express-handlebars";
import __dirname from "./utils.js";
import {Server} from "socket.io";
import { viewRouters } from "./routes/view.routes.js";
import ProductManager from "./dao/managers/ProductManagers.js";
import mongoose from "mongoose";

const port = 8080;

const app = express();


const MONGO = "mongodb+srv://Fabricio:<password>@dbproyectobackend.5xkq1gk.mongodb.net/?retryWrites=true&w=majority"

/* const coneccion = mongoose.connect(MONGO); */

app.use(express.json());
app.use(express.urlencoded({extended:true}))

const httpServer = app.listen(port, ()=>{
    console.log(`Server funcionando en el puerto: ${port}`)
})

const socketServer = new Server(httpServer);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(express.static(__dirname + "/public"));
app.use("/", viewRouters);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

const productManager = new ProductManager(socketServer)

socketServer.on('connection', async (socket) => {
    try {
        console.log('Nuevo cliente conectado');

    const products = await productManager.getProducts();
        socketServer.to(socket.id).emit('realTimeProductsUpdate', { products });

    socket.on('addProduct', async (data) => {
        console.log('Mensaje recibido desde el cliente:', data);
        try {
                if (data === 'productChanged') {
                const products = await productManager.getProducts();
                io.emit('realTimeProductsUpdate', { products });
            }
        } catch (error) {
            console.error('Error al manejar el mensaje:', error.message);
        }
    });
    } catch (error) {
        console.error('Error en la conexión de socket:', error.message);
    }
});
