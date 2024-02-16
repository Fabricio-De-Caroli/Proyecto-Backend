import mongoose from "mongoose";

const collection = "Users";

const schema = new  mongoose.Schema({
    first_name:{
        type:String,
        require:true
    },
    last_name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    age: Number,
    password:{
        type:String,
        require:true
    },
    cartId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"carts"
    },
    rol: {
        type:String,
        enum:["user","admin"],
        default:"user"
    }
})

const userModel =  mongoose.model(collection, schema);

export default userModel;