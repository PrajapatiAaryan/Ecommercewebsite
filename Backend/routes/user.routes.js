const express = require("express")
const { usersignup, userlogin, userlogout } = require("../controllers/user.controller")
const protect = require("../middleware/authmiddleware")
const router = express.Router()


router.post('/signup' , usersignup)
router.post('/login' ,userlogin)
router.post('/logout', userlogout)


router.get('/profile', protect ,(req,res)=>{
  res.send("this line you can only see if you have the token")
})

module.exports = router