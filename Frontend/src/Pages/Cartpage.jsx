import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addtocart,
  decreseqty,
  getcart,
  increseqty,
  removecartitems,
} from "../redux/slices/cartslice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Feature from "../components/Feature";
import RelatedProducts from "../components/RelatedProducts";
import { useNavigate } from "react-router-dom";

const Cartpage = () => {
  const { cart, loading, error } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setqty] = useState(1);
  const [carttotalprice, setcarttotalprice] = useState(
    () => Number(localStorage.getItem("cartTotal")) || 0
  );
  useEffect(() => {
    dispatch(getcart());
  }, []);

  useEffect(() => {
    if (cart.length > 0 && cart[0]?.cart?.items) {
      const total = cart[0].cart.items.reduce(
        (acc, item) => acc + item.productid.offerPrice * item.quantity,
        0
      );
      setcarttotalprice(total);
      localStorage.setItem("cartTotal", total); // Store total in localStorage
    }
  }, [cart]);

  const handleaddtocart = async (id, qty ,color ,size) => {
    console.log(id,qty,color,size , "this is the data passed in add to cart")
    try {
      await dispatch(addtocart({ productid: id, quantity: Number(qty) ,color ,size }));
      dispatch(getcart());
    } catch (error) {
      console.error("Error in handleaddtocart:", error);
    }
  };
  
  const handleincreseqty = async(id)=>{
    try {
      await dispatch(increseqty(id));
      dispatch(getcart());
    } catch (error) {
      console.error("Error in increseqty:", error);
    }
  }

  const handledecreseqty = async (id) => {
    try {
      await dispatch(decreseqty(id));
      dispatch(getcart());
    } catch (error) {
      console.error("Error in handledecreseqty:", error);
    }
  };
  const handleremovefromcart = async (id) => {
    try {
      // Dispatch action to remove item
      await dispatch(removecartitems(id));
  
      // Optionally, you can dispatch getcart to make sure you fetch the latest cart data
      dispatch(getcart());
    } catch (error) {
      console.error("Error in handleremovefromcart:", error);
    }
  };
  const handlecheakout = () => {
    navigate("/cheakout");
  };
  return (
    <>
      <Navbar />
      {cart[0]?.cart?.items.length >= 1 ? (
        <div className="flex flex-col justify-center px-2  lg:px-20 pt-4 w-full pb-10">
          <h1 className="text-black text-3xl font-semibold py-3 ">Cheakout</h1>
          <div className="flex gap-12 w-full flex-col lg:flex-row">
            <div className="   bg-white text-black w-full lg:w-[70%] flex flex-col gap-3 px-3 pb-5">
              <div className="hidden md:flex gap-10">
                <h1 className="w-[60%]">Product</h1>
                <div className="flex justify-between w-[40%]">
                  <h1>Price</h1>
                  <h1>Quantity</h1>
                  <h1>TotalPrice</h1>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {cart.length >= 1 ? (
                  cart[0]?.cart?.items?.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex gap-10 flex-col md:flex-row">
                        <div className="w-[60%] flex gap-10">
                          <img
                            src={item.productid.image}
                            alt="img1"
                            className="w-24 md:object-contain"
                          />
                          <div className="flex flex-col ">
                            <h1>{item.productid.title}</h1>
                            <h6>color:{item.color}</h6>
                            <h6>Size:{item.size}</h6>
                            <div className="flex justify-between md:w-[40%]   flex-col md:flex-row md:hidden">
                              <div className="border border-black text-black lg:px-3 rounded-2xl flex items-center gap-2 lg:gap-4 h-fit lg:py-2 p-2 w-fit">
                                Qty:
                                <h1
                                  className="text-xl cursor-pointer"
                                  onClick={() =>
                                    handledecreseqty(item.productid._id)
                                  }
                                >
                                  -
                                </h1>
                                <h1 className="text-xl">{item.quantity}</h1>
                                <h1
                                  className="text-xl cursor-pointer"
                                  onClick={() =>
                                    handleaddtocart(item.productid._id, 1 ,item.color ,item.size)
                                  }
                                >
                                  +
                                </h1>
                              </div>
                              <h1>
                                Price:₹
                                {item.productid.offerPrice * item.quantity}
                              </h1>
                            </div>
                            <button
                              className="w-8 text-red-600 cursor-pointer py-4 pr-36"
                              onClick={() =>
                                handleremovefromcart(item.productid._id)
                              }
                            >
                              <span className="material-icons-outlined">
                                delete
                              </span>
                            </button>
                          </div>
                        </div>
                        <div className="hidden md:flex justify-between md:w-[40%] items-center  flex-col md:flex-row">
                          <h1>₹{item.productid.offerPrice}</h1>
                          <div className="border border-black text-black lg:px-3 rounded-2xl flex items-center gap-2 lg:gap-4 h-fit lg:py-2 p-2">
                            <h1
                              className="text-xl cursor-pointer"
                              onClick={() =>
                                handledecreseqty(item.productid._id)
                              }
                            >
                              -
                            </h1>
                            <h1 className="text-xl">{item.quantity}</h1>
                            <h1
                              className="text-xl cursor-pointer"
                              onClick={() =>
                                handleaddtocart(item.productid._id, 1 ,item.color ,item.size)
                              }
                            >
                              +
                            </h1>
                          </div>
                          <h1>₹{item.productid.offerPrice * item.quantity}</h1>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>no items in your cart go and shop</div>
                )}
              </div>
            </div>
            <div className="w-fit border-8  border-white h-fit px-3 shadow-sm shadow-gray-500 flex flex-col items-start">
              <div>
                <h1 className="flex justify-between items-center py-2">
                  Subtotal <span>₹{carttotalprice}</span>
                </h1>
                <div>
                  <label className="text-sm text-gray-700">
                    Enter Discountcoupn
                  </label>
                  <div className="flex border border-black rounded-xl w-full">
                    <input
                      type="text"
                      className="outline-none px-4 py-2 w-[80%]"
                    />
                    <button className="flex justify-center items-center bg-black text-white px-1 py-2 w-[20%] rounded-r-xl">
                      Apply
                    </button>
                  </div>
                  <h1 className="flex justify-between items-center py-2">
                    Delivery Charge <span>₹21</span>
                  </h1>
                  <h1 className="flex justify-between items-center py-2">
                    Grand total <span>₹{carttotalprice + 21}</span>
                  </h1>
                  <button
                    className="bg-black text-white text-xl flex justify-center items-center px-5 py-2 border border-black rounded-xl w-full cursor-pointer "
                    onClick={() => handlecheakout()}
                  >
                    Cheakout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center text-2xl text-red-500 py-5">
          <h1>there is no product in your cart </h1>
        </div>
      )}
      <RelatedProducts />
      <Feature />
      <Footer />
    </>
  );
};

export default Cartpage;
