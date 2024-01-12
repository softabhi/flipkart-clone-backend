import { addToCart } from "../models/cartModel.js";
import { UserDb } from "../models/userModel.js";
import { productDb } from "../models/productModel.js";


export const addCartFunc = async (req, res) => {
  const { userId, produId } = req.body;
  console.log(produId.product)

  //  res.write("");

  // addToCart.findOne({ user: req.body.produId }).exec((error, cart) => {
  //   if (error) return res.status(400).json({ error });
  //   if (cart) {
  //     //if cart already exists then update cart by quantity
  //     let promiseArray = [];

  //     req.body.cartItems.forEach((cartItem) => {
  //       const product = product_id.product;
  //       const item = cart.product_id.find((c) => c.product == product);
  //       let condition, update;
  //       if (item) {
  //         condition = { user: req.body.produId, "product_id.product": product };
  //         update = {
  //           $set: {
  //             "product_id.$": cartItem,
  //           },
  //         };
  //       } else {
  //         condition = { user: req.body.produId };
  //         update = {
  //           $push: {
  //             product_id: cartItem,
  //           },
  //         };
  //       }
  //       promiseArray.push(runUpdate(condition, update));
  //       //Cart.findOneAndUpdate(condition, update, { new: true }).exec();
  //       // .exec((error, _cart) => {
  //       //     if(error) return res.status(400).json({ error });
  //       //     if(_cart){
  //       //         //return res.status(201).json({ cart: _cart });
  //       //         updateCount++;
  //       //     }
  //       // })
  //     });
  //     Promise.all(promiseArray)
  //       .then((response) => res.status(201).json({ response }))
  //       .catch((error) => res.status(400).json({ error }));
  //   } else {
  //     //if cart not exist then create a new cart
  //     const cart = new addToCart({
  //       user: req.body.produId,
  //       product_id: req.body.produId,
  //     });
  //     cart.save((error, cart) => {
  //       if (error) return res.status(400).json({ error });
  //       if (cart) {
  //         return res.status(201).json({ cart });
  //       }
  //     });
  //   }
  // });





  try {

    let userCart = await addToCart.findOne({ user: userId })
    // console.log(userCart)
    if (userCart) {

      let productExist = userCart.cartItems.find(c => c.product == produId.product)
      console.log(productExist)
      if (productExist) {
         let res = await addToCart.findOneAndUpdate({ "user": userId,"cartItems.product":produId.product }, {
          $set: { cartItems:{...cartItems,quantiy:productExist.quantiy + 1}  }
        })
        console.log(res)
        res.send({ "massage": "quantity increse cart item added" })
      } else {
        await addToCart.findOneAndUpdate({ user: userId }, {
          $addToSet: { cartItems: produId }
        })
        res.send({ "massage": "other cart item added" })
      }



    }
    else {
      const updatedCartItem = new addToCart({
        user: userId,
        cartItems: produId

      })

      await updatedCartItem.save();
      // console.log(updatedCartItem)
      res.send({ "massage": "cart item added" })
    }












    // const updateCartItem =await UserDb.updateOne({ _id: req.body.userId },
    //   {
    //     $addToSet: { cart: req.body.produId }
    //   })

    // // await updateCartItem.save();
    // res.send({ "massage": "cart item added" })




    //   console.log(cartDb);
    //   console.log(result);
    // res.status(200).send("cart item added")
  } catch (error) {
    res.send("not cart item added");
  }
};






export const gettingCartProducts = async (req, res) => {

  const { id } = req.params;
  // const { userId } = req.body;
  // const  {userId} = req.body;
  // console.log("mona")
  // console.log(id)
  try {
    // const result = await UserDb.findOne({ _id: id }).populate('cart')
    const result = await addToCart.findOne({ user: id }).populate('cartItems.product')
    .then((data)=>{
      console.log(data)
    })

    // res.send({ "massage": "I HAVE GOTTED CART ITEMS", result });

  } catch (error) {
    console.log(error);
    res.send(error);
  }
}





// export const DeleteCart = async (req, res) => {

//   // const { id } = req.params;
//   const { userId,itemdId } = req.body;

//   console.log(userId)
//   // console.log(id)
//   try {


//     UserDb.findByIdAndUpdate(
//       userId,
//       { $pull: { cart: { _id: itemdId } } },
//       { new: true },
//       (err, updatedParent) => {
//         if (err) {
//           console.error('Error:', err);
//         } else {
//           console.log('Updated Parent:', updatedParent);
//         }
//       }
//     );


//   } catch (error) {
//     console.log(error);
//     res.send(error);
//   }
// }

export const DeleteCart = async (req, res) => {
  const { userId, itemId } = req.body;
  console.log("enter", itemId)
  console.log(req.body)
  try {
    const updatedUser = await UserDb.findByIdAndUpdate(
      userId,
      { $pull: { cart: { _id: itemId } } },
      { new: true }
    );
    console.log('Updated User:', updatedUser);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}