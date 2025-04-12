const express = require("express")
const { sendOtp, resetPassword } = require("../controllers/otp.controller")
const router = express.Router()


router.post('/sendotp', sendOtp)
router.post('/resetpassword', resetPassword)


module.exports = router;