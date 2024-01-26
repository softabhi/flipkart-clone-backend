import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    category:{
        type:String,
        // required:true
    },
    price:{
        type:String,
        required:true
    },
    discount:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true
    },
    description:{
        type:String,
        // required:true
    },
    produImg:{
        type:String,
        required:true
    }
})


export const productDb = new mongoose.model("productDb", productSchema);