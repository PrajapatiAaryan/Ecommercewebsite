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
    res.status(200).json({ message: "user signup successfully",token ,user });
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
        token:token,
      });
      
      return;
    }
    res.cookie("token", token, {
      httpOnly: true, // Prevents JavaScript from accessing the token
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 10 * 1000, // 7 days expiration
    });

    res.status(200).json({ message: "user login successfull",role: "user" , token });
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

module.exports = { usersignup, userlogin, userlogout };
