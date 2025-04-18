import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Homepage from './Pages/Homepage'
import Timepassaforotp from "./Pages/Timepassaforotp";
import Login from "./Pages/Login"
import Registerpage from './Pages/Registerpage'
import Forgotpasspage from './Pages/Forgotpasspage'
import Enterotp from './Pages/Enterotp'
import Allproduct from './Pages/Allproduct'
import Detailedproduct from './Pages/Detailedproduct'
import Searchedproductpage from './Pages/Searchedproductpage'
import Cartpage from './Pages/Cartpage'
import Cheakoutpage from './Pages/Cheakoutpage'
import Profilepage from './Pages/Profilepage'
import Editprofile from './Pages/Editprofile'
import Wishlistpage from './Pages/Wishlistpage'
import Dashboard from './admin/Dashboard'
import AddProduct from "./admin/Addproduct";
import Getproduct from "./admin/Getproduct";
import Paymentmethod from "./Pages/Paymentmethod";
import Placeorder from "./Pages/Placeorder";
import Myorder from "./Pages/Myorder";
import Filterproductpage from "./Pages/Filterproductpage";
import Orderslist from "./admin/Orderslist";
import Filtersubcategorypage from "./Pages/Filtersubcategorypage";
function App() {
  
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/forgotpassword" element={<Forgotpasspage />} />
          <Route path="/otp" element={<Enterotp />} />
          <Route path="/allproducts" element={<Allproduct />} />
          <Route path="/details" element={<Detailedproduct />} />
          <Route path="/search/:word" element={<Searchedproductpage />} />
          <Route path="/category/:category" element={<Filterproductpage/>}/>
          <Route path="/subcategory/:category/:subcategory" element={<Filtersubcategorypage/>}/>
          <Route path="/cart" element={<Cartpage />} />
          <Route path="/cheakout" element={<Cheakoutpage />} />
          <Route path="/payment" element={<Paymentmethod/>}/>
          <Route path="/placeorder" element={<Placeorder/>}/>

          
          <Route path="/profile" element={<Profilepage />}>
            <Route index element={<Editprofile />} />
            <Route path="wishlist" element={<Wishlistpage />} />
            <Route path="myorders" element={<Myorder />} />
          </Route>

          
          <Route path="/admin" element={<Dashboard />}>
            <Route index element={<h1>Welcome to Admin Dashboard</h1>} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="products" element={<Getproduct />} />
            <Route path="order" element={<Orderslist />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
