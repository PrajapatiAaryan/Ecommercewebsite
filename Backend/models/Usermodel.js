const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usermodelschema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    isAdmin: {
      type: Boolean,
      default: false, // Normal user by default
    },
    otp: {
      type: Number,
      default: null, 
    },
    otpExpiry: {
      type: Date, // ✅ Changed from Number to Date
      default: null,
    },
    profileimg:{
      type:String,
      default:"http://localhost:4000/uploads/userprofile.jpeg"
    },
    address:[{
     fullName:{type:String},
     phone:{type:Number},
     address:{type:String},
     city:{type:String},
     state:{type:String},
     pincode:{type:String},
    }]
  },
  { timestamps: true }
);

// 🔹 Hash password before saving
usermodelschema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔹 Compare entered password with hashed password
usermodelschema.methods.comparepassword = async function (enteredpassword) {
  return await bcrypt.compare(enteredpassword, this.password);
};

// 🔹 Generate JWT Token
usermodelschema.methods.generatetoken = function () {
  return jwt.sign({ id: this._id, isAdmin: this.isAdmin }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY || "7d", // ✅ Use env variable for expiry
  });
};

const Usermodel = mongoose.model("User", usermodelschema);
module.exports = Usermodel;
