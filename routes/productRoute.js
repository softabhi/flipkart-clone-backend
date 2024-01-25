import  express from "express";
import multer from "multer";

const upload = multer({ dest: 'uploads/'})
import {deleteProduct, getSigleProduct, gettingProducsts, newProduct } from "../controliars/productControlar.js";
import { DeleteCart, addCartFunc, decreaseCartItemFunc, gettingCartProducts, increaseCartItemFunc } from "../controliars/addCartControlar.js";


const router = express.Router();

router.post("/addProduct",upload.single('produImg'),newProduct)
router.get("/products",gettingProducsts)
router.get("/singleproduct/:id",getSigleProduct)
router.delete("/deleteProduct/:id",deleteProduct)
router.post("/addCart",addCartFunc)
router.post("/increaseCartItem",increaseCartItemFunc)
router.post("/decreaseCartItem",decreaseCartItemFunc)
router.get("/cartItems/:id",gettingCartProducts)
router.post("/deleteCartItem/",DeleteCart)

export default router