// import Usermodel from "../models/Usermodel";
const Usermodel = require("../models/Usermodel");
const jwt = require("jsonwebtoken");

// admin credntials
const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "admin123";

const usersignup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existinguser = await Usermodel.findOne({ email });
    if (existinguser)
      return res.status(400).json({ message: "user already exist" });

    const user = await Usermodel.create({
      firstName,
      lastName,
      email,
      password,
    });
    const token = user.generatetoken();
    res.status(200).json({ message: "user signup successfully", token, user });
    console.log("user signup created successfully");
  } catch (error) {
    res.status(201).json({ messge: "usersignup error", error });
    console.log("usersignup error", error);
  }
};

const userlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Usermodel.findOne({ email });
    if (!user) return res.status(201).json({ message: "user not exist" });

    const cheakpassword = await user.comparepassword(password);
    if (!cheakpassword)
      return res.status(201).json({ message: "password is not valid" });

    const token = user.generatetoken();
    // admin verifications
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      res.status(200).json({
        message: "Admin login successful",
        role: "admin",
        token: token,
      });

      return;
    }
    res.cookie("token", token, {
      httpOnly: true, // Prevents JavaScript from accessing the token
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 10 * 1000, // 7 days expiration
    });

    res
      .status(200)
      .json({ message: "user login successfull", role: "user", token });
    console.log("user login successfull");
  } catch (error) {
    res.status(201).json({ message: "userlogin error", error });
    console.log("userlogin error", error);
  }
};

const userlogout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0), // Expire immediately
  });

  res.status(200).json({ message: "User logged out successfully" });
};

const adduseraddress = async (req, res) => {
  const userid = req.user.id;
  const { fullName, phone, address, city, state, pincode } = req.body;
  try {
    let user = await Usermodel.findOne({ _id: userid });
    if(!user)return res.status(401).json({message:"user not found"})
      // user.address = []  
    user.address.push({fullName,phone,address,city,state,pincode})
    await user.save()
    res.status(200).json({message:"this is user" , user})
  } catch (error) {
    res.status(401).json({ message: "adduseraddress error", error });
    console.log("add user address error", error);
  }
};

const getuser = async(req,res)=>{
  const userid = req.user.id;
  try {
    let user = await Usermodel.findOne({ _id: userid });
    if(!user)return res.json({message:"login first"})
    res.status(200).json({message:"this is user" , user})  
  } catch (error) {
    res.status(401).json({message:"getuseraddress error" , error});
    console.log("getuseraddress error" , error)
  }
}


const edituseraddress = async (req,res)=>{
  const userid = req.user.id;
  const { fullName, phone, address, city, state, pincode } = req.body;
  const addressid = req.params.id;
  try {
    let user = await Usermodel.findOne({ _id: userid });
    if(!user)return res.status(401).json({message:"user not found"})
      user.address = user.address.filter((item)=>item._id.toString() !== addressid)
    user.address.push({fullName,phone,address, city, state, pincode })
    await user.save()
    res.status(200).json({message:"user",user})
  } catch (error) {
    res.status(401).json({ message: "edituseraddress error", error });
    console.log("edituseraddress error", error);
  }
}

const deleteaddress = async(req,res)=>{
  const userid = req.user.id;
  const addressid = req.params.id;
  try {
    const user = await Usermodel.findOne({_id:userid})
    if(!user)return res.json({message:"user not found"})
    user.address = user.address.filter((item)=>item._id.toString()!==addressid)  
    await user.save()
    res.status(200).json({message:"the address is delted" , user})
  } catch (error) {
    res.status(401).json({message:"delete address error" , error});
    console.log("deleteaddress error" , error)
  }
}
const adduserprofileimg = async (req, res) => {
  const userId = req.user.id;
  const image = req.file ? `https://amart-wil3.onrender.com/uploads/${req.file.filename}` : null;

  try {
    const user = await Usermodel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.profileimg = image;
    await user.save();

    res.status(200).json({ message: "User profile image updated", profileimg: image });
  } catch (error) {
    console.error("add user profile img error", error);
    res.status(500).json({ message: "Add user profile image error", error });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await Usermodel.find().select("-password"); // Exclude password for security
    res.status(200).json({ message: "All users fetched successfully", users });
  } catch (error) {
    console.error("getAllUsers error", error);
    res.status(500).json({ message: "Error fetching users", error });
  }
};

module.exports = { usersignup, userlogin, userlogout,adduseraddress,edituseraddress,getuser ,deleteaddress ,adduserprofileimg ,getAllUsers};
