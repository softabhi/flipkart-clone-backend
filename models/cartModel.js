import mongoose from "mongoose";

const cartSchema =new  mongoose.Schema({
      user:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'userDb',
         required:true
      },
      cartItems:[
        {
         product:{type:mongoose.Schema.Types.ObjectId,ref:'productDb',required:true},
         quantiy:{type:Number,default:1}
        }
      ]
}) 

export const addToCart = new mongoose.model("addToCart",cartSchema)