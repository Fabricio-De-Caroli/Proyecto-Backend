import mongoose from "mongoose";


const collection = "Carts";

const cartSchema = new mongoose.Schema({
    products:{
        type:[
            {
                id:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products",
                    require: true,
                },
                quantity:{
                    type :Number,
                    require: true,
                    default: 1
                }
            }
        ],
        
        default:[]
    }
});

cartSchema.pre("find",function(){
    this.populate("products.product")
})

const cartModel = mongoose.model(collection, cartSchema);

export default cartModel;