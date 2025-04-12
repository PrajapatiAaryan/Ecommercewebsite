const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const Usermodel = require("../models/Usermodel");

// Email Configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Email
    pass: process.env.EMAIL_PASS, // Your App Password
  },
});

//Send OTP via Email
const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await Usermodel.findOne({ email });
    if (!user) return res.status(201).json({ message: "User not found" });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(otp);
    const otpExpiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    // Save OTP and expiry to user model
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send OTP via email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`,
    };
    await transporter.sendMail(mailOptions);

    res.json({ message: "OTP sent to your email", status: 200 });
  } catch (error) {
    res.status(500).json({ message: "Error sending OTP", error });
    console.log("error in sending otp", error);
  }
};

//  2️ Reset Password using OTP
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    console.log({email, otp, newPassword})
    // Check if user exists
    const user = await Usermodel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ message: "email is not in data base not found" });

    // Verify OTP
    if (user.otp !== otp || Date.now() > user.otpExpiry) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    // console.log("Old Hashed Password:", user.password);
    user.password = newPassword;

    // Clear OTP fields after reset
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();
    // console.log("New Hashed Password:", user.password);
    res.json({
      message:
        "Password reset successful. You can now login with your new password.",
    });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password", error });
  }
};

module.exports = { sendOtp, resetPassword };
