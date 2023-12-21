import mongoose from "mongoose";

const collection = "Carts";

const cartSchema = new mongoose.Schema({
    id:String,
    product:Array
})

const cartModel = mongoose.model(collection, cartSchema);

export default cartModel;