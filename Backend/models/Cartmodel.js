const mongoose = require('mongoose');

const cartschema = new mongoose.Schema({
  userid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  },
  items:[
    {
      productid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true,
      },
      quantity:{
        type:Number,
        required:true,
        default: 1
      },
    }
  ]
});


const Cart = mongoose.model('Cart' , cartschema);
module.exports = Cart;