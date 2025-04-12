const express =require('express');
const verifytoken = require('../middleware/verifytokenmiddleware');
const { addtowhishlist, getwhishlist, removefromwhishlist } = require('../controllers/whishlist.controller');
const router = express.Router()


router.post('/addtowhihslist' , verifytoken , addtowhishlist);
router.get('/getwhishlist' , verifytoken , getwhishlist);
router.delete('/removewhishlist/:id' , verifytoken , removefromwhishlist);


module.exports = router