import { productDb } from "../models/productModel.js";

export const newProduct = async(req, res) => {

    const productImg = req.file.path;
      const  {productName ,price , quantity,discount } =  req.body;

     
      console.log("i running");

        const newProduct = new productDb({
            productName,
            price,
            discount,
            quantity,
            produImg:productImg

        })

     await newProduct.save();
     res.send("new product added succesfully");

}

export const gettingProducsts = async(req ,res)=>{
  try{
       const products = await productDb.find({})
       .then((data)=>{
        res.send(data)
       })
       
          
       
    //    console.log()
  }catch(error){
     res.send("not found data");
  } 
}

export const getSigleProduct =async (req,res)=>{
   const id = req.pramas;

   const singleProduct = await productDb.findOne({_id:id});
}