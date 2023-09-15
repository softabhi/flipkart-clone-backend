import  express from "express";
import multer from "multer";

const upload = multer({ dest: 'uploads/'})
import {deleteProduct, getSigleProduct, gettingProducsts, newProduct } from "../controliars/productControlar.js";


const router = express.Router();

router.post("/addProduct",upload.single('produImg'),newProduct)
router.get("/products",gettingProducsts)
router.get("/singleproduct/:id",getSigleProduct)
router.delete("/deleteProduct/:id",deleteProduct)

export default router