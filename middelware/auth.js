import jwt from 'jsonwebtoken';
import express from 'express'
import { SellerDb } from '../models/sellerModel.js';

const secreate= "afdfdfdfsdfdsf";

 export const authentication = async(req,res,next)=>{
  console.log("hello i")
  // jwt.sign({name:"abhi"},secreate,{expiresIn:'300s'},(err, token)=>{
  //      res.status(200).json({
  //       token
  //      })
  // })

  // const webToken = jwt.sign({user},secreate,{expiresIn:'300s'});
// localStorage.setItem('token',webToken)

// const currUserToken = req.headers.cookie;
// var secuityToken = JSON.parse(localStorage.getItem('userdata'))
let tauken = req.headers['x-access-token']
console.log(tauken)


// let currenToken = tauken.split(" ")[1];
// // console.log(currenToken)

// if(!tauken){
//   res.status(400).json({message:"token not found"})
  
// }

// jwt.verify(String(currenToken),secreate,(err,user)=>{
//   if(err){
//     res.status(400).json({message:"invalid token"})
//   }
//   console.log(user.id);
//   req.id = user.id;
// })



try {
  const decoded = jwt.verify(tauken, secreate)
  const email = decoded.email
  const user = await SellerDb.findOne({ email: email })
  
  // return res.json({ status: 'ok' })
} catch (error) {
  console.log(error)
  res.json({ status: 'error', error: 'invalid token' })
}

next();
}




// export const verifyToke = (req,res,next)=>{

//     next();
// }

