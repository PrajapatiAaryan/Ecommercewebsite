const jwt = require('jsonwebtoken')
const User = require('../models/Usermodel')

const verifytoken = async(req,res,next)=>{
  // for post man use  below code for token
  // console.log("this is token" ,req.headers.authorization.split(" ")[2])
  try {
    const token =req.headers.authorization.split(" ")[1];
    // const token =req.headers.authorization;
    // console.log("this is token" ,req.headers.authorization)
    if(!token)return res.status(201).json({message:"token not found"})
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = decoded  
    next()
  } catch (error) {
    res.status(401).json({ message: "no user found plese login first" , error });
    console.log("verifytoken middleware error" , error)
  }
}

module.exports=verifytoken