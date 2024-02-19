import { addToCart } from "../models/cartModel.js";
import { UserDb } from "../models/userModel.js";
import { productDb } from "../models/productModel.js";


export const addCartFunc = async (req, res) => {
  const { userId, addProduct } = req.body;
  // console.log(addProduct.productName)

  try {

    

    let checkProExist = await addToCart.findOne({ userId: userId, productId: addProduct._id })


    if (checkProExist) {
      // console.log(checkProExist)
      const updateProduct = await addToCart.findOneAndUpdate({ userId: userId, productId: addProduct._id }, {
        $set: {
          productQty: checkProExist.productQty + 1
        }
      }, { new: true });

      await updateProduct.save();
      res.send({ "massage": "same product quintiy increse" })
    } else {

      const addingNewCart = new addToCart({
        userId: userId,
        productId: addProduct._id,
        productName: addProduct.productName,
        productPrice: addProduct.price,
        productImg: addProduct.produImg

      })

      await addingNewCart.save();

    }

    res.send({ "massage": "cart item added" })






    // const updateCartItem =await UserDb.updateOne({ _id: req.body.userId },
    //   {
    //     $addToSet: { cart: req.body.produId }
    //   })

    // await updateCartItem.save();
    // res.send({ "massage": "cart item added" })




    //   console.log(cartDb);
    //   console.log(result);
    // res.status(200).send("cart item added")
  } catch (error) {
    res.send("not cart item added");
  }
};



export const increaseCartItemFunc = async (req, res) => {

  // console.log("mona")

  const { userId, itemId } = req.body;
 
  // console.log(req.body)
  let checkProExist = await addToCart.findOne({ userId: userId, _id: itemId })


  if (checkProExist) {
    // console.log(checkProExist)
    const updateProduct = await addToCart.findOneAndUpdate({ userId: userId, _id: itemId }, {
      $set: {
        productQty: checkProExist.productQty + 1
      }
    }, { new: true });

    await updateProduct.save();
    res.send({ "massage": "same product quintiy increse" })

  }

}

export const decreaseCartItemFunc = async (req, res) => {

  console.log("mona")

  const { userId, itemId } = req.body;
 
  console.log(req.body)
  let checkProExist = await addToCart.findOne({ userId: userId, _id: itemId })


  if (checkProExist) {
    // console.log(checkProExist)
    const updateProduct = await addToCart.findOneAndUpdate({ userId: userId, _id: itemId }, {
      $set: {
        productQty: checkProExist.productQty - 1
      }
    }, { new: true });

    await updateProduct.save();
    res.send({ "massage": "Same Product Quintiy Decrese" })

  }

}

  export const gettingCartProducts = async (req, res) => {

    const { id } = req.params;
    // const { userId } = req.body;
    // const  {userId} = req.body;
    // console.log("mona")
    // console.log(id)
    try {
      // const result = await UserDb.findOne({ _id: id }).populate('cart')
      const result = await addToCart.find({ userId: id })
      // .then((data)=>{
      //   console.log(data)
      // })

      // console.log(result)
      res.send({ "massage": "I HAVE GOTTED CART ITEMS", result });

    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }





  
  export const DeleteCart = async (req, res) => {
    const { userId, itemId } = req.body;
    // console.log("enter", itemId)
    // console.log(req.body)
    try {
     
      const deleteSingCartItem = await addToCart.findByIdAndDelete({ userId: userId, _id: itemId })
      res.send({"massage":"Cart Item Deleted"})

    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }