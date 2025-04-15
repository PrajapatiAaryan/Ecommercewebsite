const express = require("express");
const router = express.Router()
const verifytoken = require('../middleware/verifytokenmiddleware');
const { addtoorder, getorder, getallorder, updateorder, updatepayment } = require("../controllers/orders.controller");

router.post('/addtoorder' ,verifytoken ,addtoorder);
router.get('/getorder' , verifytoken , getorder);
router.get('/getallorders', getallorder);
router.put('/updateorder/:orderId' , updateorder);
router.put('/updatepayment/:orderId' ,updatepayment)


module.exports = router