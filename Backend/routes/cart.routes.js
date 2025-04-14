const express = require('express');
const verifytoken = require('../middleware/verifytokenmiddleware');
const { addtocart, getcart, removefromcart, decreseqty, clearcart } = require('../controllers/usercart.controller');
const router = express.Router();

router.post('/addtocart' , verifytoken , addtocart);
router.get('/getcart' , verifytoken ,getcart);
router.delete('/removefromcart/:id' , verifytoken , removefromcart)
router.delete('/decreseqty/:id' , verifytoken , decreseqty)
router.delete('/clearcart' , verifytoken ,clearcart)

module.exports = router