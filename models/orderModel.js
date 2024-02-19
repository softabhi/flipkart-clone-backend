import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

  orderItems: [{
    userId: {
      type: String,
      required: true
    },
    productName: {
      type: String,
      required: true
    },
    productQty: {
      type: Number,
      required: true
    },
    productPrice: {
      type: Number,
      required: true
    },
    productImg: {
      type: String,
      required: true
    },
  }]

}, { timestamps: true })

export const orderDb = new mongoose.model("orderDb", orderSchema)