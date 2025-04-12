const express = require("express");
const {  deleteproduct, getproduct, addProduct, productdetail } = require("../controllers/product.controller");
const upload = require("../middleware/uploadmiddleware");
const router = express.Router()


router.post('/addproduct',upload.single("image") , addProduct);
router.get('/getproduct' , getproduct);
router.delete('/deleteproduct/:id' , deleteproduct);
router.get('/detailproduct/:id' , productdetail)

module.exports =router