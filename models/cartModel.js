import mongoose from "mongoose";

const cartSchema =new  mongoose.Schema({
      userId:{
        type:String,
        required:true
      },
      productId:{
        type:String,
        required:true
      },
      productName:{
        type:String,
        required:true
      },
      productQty:{
        type:Number,
        default:1
      },
      productPrice:{
        type:String,
        required:true
      },
      productImg:{
        type:String,
        required:true
      },
}) 

export const addToCart = new mongoose.model("addToCart",cartSchema)