import { options } from "../config/config.js"; 

const persistence = options.server.persistence;
let usersDao
let cartDao
let productDao

switch (persistence) {
    case "mongo":
        const { connectDB } = await import("../config/DBConnection.js");
        connectDB();
        const { usersMongo } = await import("./managers/mongo/User.mongo.js");
        usersDao = new usersMongo();
        const { cartMongo } = await import("./managers/mongo/Cart.mongo.js");
        cartDao = new cartMongo();
        const { productMongo } = await import("./managers/mongo/Product.mongo.js");
        productDao = new productMongo();
        break;
    case "memory":
        const { userMemory } = await import("./managers/memory/User.memory.js");
        usersDao = new userMemory();
        const { cartMemory } = await import("./managers/memory/Cart.memory.js");
        cartDao = new cartMemory();
        const { productMemory } = await import("./managers/memory/Product.memory.js");
        productDao = new productMemory();
        break;
    case "sql":
        
        break;    
}

export { usersDao };
export { cartDao };
export { productDao };