const express = require("express")
const { usersignup, userlogin, userlogout, adduseraddress, edituseraddress, getuser, deleteaddress, adduserprofileimg } = require("../controllers/user.controller")
const protect = require("../middleware/authmiddleware")
const verifytoken = require('../middleware/verifytokenmiddleware')
const upload = require("../middleware/uploadmiddleware");
const router = express.Router()


router.post('/signup' , usersignup)
router.post('/login' ,userlogin)
router.post('/logout', userlogout)
router.post('/addaddress', verifytoken , adduseraddress)
router.get('/getuser' , verifytoken , getuser);
router.post('/editaddress/:id' , verifytoken ,edituseraddress)
router.delete('/deleteaddress/:id' , verifytoken , deleteaddress);
router.post('/profileimg',verifytoken,upload.single("profileimg"),adduserprofileimg )

router.get('/profile', protect ,(req,res)=>{
  res.send("this line you can only see if you have the token")
})

module.exports = router