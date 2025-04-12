const jwt = require("jsonwebtoken");
const Usermodel = require("../models/Usermodel");

const protect  = async (req,res,next)=>{
  try {
    const token =  req.cookies.token;
    if(!token)return res.status(201).json({message:"unauthorized access"})

    const decoded = jwt.verify(token,process.env.JWT_SECRET) 
    req.user = await Usermodel.findById(decoded.id)
    // console.log(req.user)
    // res.json({user:req.user}) 
    next()
  } catch (error) {
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
}

module.exports = protect;