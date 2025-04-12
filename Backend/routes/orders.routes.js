const express = require("express");
const router = express.Router()
const verifytoken = require('../middleware/verifytokenmiddleware');
const { addtoorder, getorder } = require("../controllers/orders.controller");

router.post('/addtoorder' ,verifytoken ,addtoorder);
router.get('/getorder' , verifytoken , getorder)


module.exports = router