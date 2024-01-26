import mongoose from "mongoose";

const userSchema = mongoose.Schema({
   
    name: {
        type:String,
        required:true
    },
   
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    role: {
        type:String,
        
    },
    profileImg: {
        type:String,
        required:true
    }
   
},{timestamps:true})

export const SellerDb = new mongoose.model("SellerDb", userSchema);