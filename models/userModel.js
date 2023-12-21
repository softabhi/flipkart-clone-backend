import mongoose from "mongoose";

const userSchema = mongoose.Schema({
   
    name: {
        type:String,
        required:true
    },
    userName: {
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
    profileImg: {
        type:String,
        required:true
    },
    address: {
        type:String,
        required:true
    },
    mobileNumber: {
        type:String,    
        required:true
    },
    cart:[{type:mongoose.Schema.Types.ObjectId,ref:'productDb',required:true}]
},{timestamps:true})

export const UserDb = new mongoose.model("UserDb", userSchema);