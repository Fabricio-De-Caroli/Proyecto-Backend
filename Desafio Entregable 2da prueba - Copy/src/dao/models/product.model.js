import mongoose from "mongoose";

const collection = "Products";

const productSchema = new mongoose.Schema({
    title:String,
    description:String,
    code:String,
    price:Number,
    status:Boolean,
    stock:Number,
    category:String,
    thumbnails:Array
})

const productModel = mongoose.model(collection, productSchema);

export default productModel;