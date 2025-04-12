import { configureStore } from "@reduxjs/toolkit";
import authreducer from './slices/authslice';
import productreducer from './slices/productslice'
import cartreducer from './slices/cartslice';
import whishlistreducer from './slices/whishlistslice'


const store = configureStore({
  reducer:{
    auth:authreducer,
    product:productreducer,
    cart:cartreducer,
    whishlist:whishlistreducer,
  }
})


export default store