import { addToCart } from "../models/cartModel.js";
import { orderDb } from "../models/orderModel.js";




export const orderItemAdd = async(req, res) => {

    const { userId,cartItems } = req.body;

     console.log(cartItems)
      console.log("i running");
    //    console.log(req.body.orderItems)

    try {
        

        let checkItemExist = await orderDb.findOne({ userId: userId })


        if (checkItemExist) {
          // console.log(checkProExist)
          const updateOrderItems = await orderDb.findOneAndUpdate({ userId: userId }, {
            $push: {
                orderItems:cartItems 
            }
          }, { new: true });
    
          await updateOrderItems.save();
          await addToCart.deleteMany({userId: userId});
          res.send({ "massage": "Order Place Successfully" })
        } else {

        const addingNewItem = new orderDb({
            userId:userId,
            orderItems:cartItems,  
          })
    
          await addingNewItem.save();
          await addToCart.deleteMany({userId: userId});
        }
        
         res.send({"massage": "Order Place Successfully"});
    

    } catch (error) {
        
         res.send({"massage":"something went wrong"})

    }

     
}

// export const gettingProducsts = async(req ,res)=>{
//   try{
//        const products = await productDb.find({})
//        .then((data)=>{
//         res.send(data)
//        })
       
          
   
//     //    console.log()
//   }catch(error){
//      res.send("not found data");
//   } 
// }