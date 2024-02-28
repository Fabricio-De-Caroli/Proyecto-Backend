import mongoose from "mongoose";

const ticketsCollection = "tickets";

const ticketsSchema = new mongoose.Schema({
    code:{
        type:String,
        require:true,
        unique:true
    },
    purchase_datetime:Date,
    amount:Number,
    purchaser:{
        type:String,
        requiere:true
    }
});

export const ticketsModel = mongoose.model(ticketsCollection,ticketsSchema);