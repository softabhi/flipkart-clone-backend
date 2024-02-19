import { addToCart } from "../models/cartModel.js";
import { orderDb } from "../models/orderModel.js";




export const orderItemAdd = async (req, res) => {

  const { userId, cartItems } = req.body;

  console.log(cartItems[0])
  console.log("i running");
  //    console.log(req.body.orderItems)

  try {


    // let checkItemExist = await orderDb.findOne({ userId: userId })


    // if (checkItemExist) {
    //   // console.log(checkProExist)
    //   const updateOrderItems = await orderDb.findOneAndUpdate({ userId: userId }, {
    //     $push: {
    //         orderItems:cartItems 
    //     }
    //   }, { new: true });

    //   await updateOrderItems.save();
    //   await addToCart.deleteMany({userId: userId});
    //   res.send({ "massage": "Order Place Successfully" })
    // } else {

    // const addingNewItem = new orderDb({
    //     userId:userId,
    //     orderItems:cartItems,  
    //   })

    //   await addingNewItem.save();
    //   await addToCart.deleteMany({userId: userId});
    // }




    const addingNewItem = new orderDb({
     
      orderItems: cartItems,
    })

    await addingNewItem.save();
    await addToCart.deleteMany({ userId: userId });
    res.send({ "massage": "Order Place Successfully" });














    // for(var c=0;c<=cartItems.length();c++){

    //   console.log(cartItems[c])

    //   const addingNewItem = new orderDb({
    //     userId: userId,
    //     productName: cartItems[c].productName,
    //     productQty: cartItems[c].productQty,
    //     productPrice: cartItems[c].productPrice,
    //     productImg: cartItems[c].productImg

    //   })
    //   await addingNewItem.save();
    // }



    // await addingNewItem.save();
    // await addToCart.deleteMany({ userId: userId });
    // res.send({ "massage": "Order Place Successfully" });

  } catch (error) {

    res.send({ "massage": "something went wrong" })

  }


}

export const gettingOrders = async (req, res) => {

  const { id } = req.params;

  try {
    const orderProducts = await orderDb.find({})
      .then((data) => {
        res.send(data)
        console.log(data)
      })




    //    console.log()
  } catch (error) {
    res.send("not found data");
  }
}