import express from "express";
import session  from "express-session"
import MongoStore from "connect-mongo"
import { cartRouter } from "./routes/carts.routes.js";
import { productRouter } from "./routes/products.routes.js";
import {engine} from "express-handlebars";
import __dirname from "./utils.js";
import {Server} from "socket.io";
import { viewRouters } from "./routes/view.routes.js";
import  { sessionRouter } from "./routes/sessions.routes.js"
import ProductManager from "./persistence/managers/ProductManagers.js";
import productModel from "./persistence/models/product.model.js";
import mongoose from "mongoose";
import passport from "passport";
import inicializePassport from "./config/passport.config.js";
import { authToken, generateToken } from "./utils.js";

//configuracion -> persistencia -> servicio -> controlador -> ruta -> app

const port = 8080;

const app = express();

const MONGO = "mongodb+srv://Fabricio:fabri@dbproyectobackend.5xkq1gk.mongodb.net/ProductosCoderHouse"

const coneccion = mongoose.connect(MONGO);

app.use(express.json());
app.use(express.urlencoded({extended:true}))

const httpServer = app.listen(port, ()=>{
    console.log(`Server funcionando en el puerto: ${port}`)
})

const socketServer = new Server(httpServer);

app.use(express.static(__dirname + "/public"));
app.use(session({
    store: new MongoStore({
        mongoUrl: MONGO,
        ttl:3600
    }),
    secret:"CoderSecret",
    resave:false,
    saveUninitialized:false

}))
inicializePassport()
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(express.static("./src/public"))
app.use("/", viewRouters);
app.use("/api/sessions", sessionRouter);
app.get("/products",  async(req,res)=>{
    const { page }=  req.query;
    
    const products = await productModel.paginate(
        {},
        {
            limit: 5,
            lean: true,
            page: page ?? 1
        }
    );
    res.render("home",{products, user:req.session.user})
})
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.post("/api/register",(req,res)=>{
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
})
app.post("/api/login",(req,res)=>{
    const {email,password} = req.body;
    const user = users.find(user=>user.email === email && user.password === password)
    if (!user){
        res.status(400).send({
            status:"error",
            error:"Datos incorrectos"
        })
    }
    const access_token = generateToken(user);
    res.send({status:"success",access_token})
})
app.get("/api/current",  authToken,(req,res)=>{
    res.send({status:"success", payload:req,user})
})


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
