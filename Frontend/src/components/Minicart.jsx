// src/components/Minicart.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getcart, removecartitems } from "../redux/slices/cartslice";
import { useNavigate } from "react-router-dom";

const Minicart = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [carttotalprice, setcarttotalprice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getcart());
  }, [dispatch]);

  useEffect(() => {
    const prices = cart[0]?.cart?.items?.map((item) => item.productid.offerPrice);
    if (prices && prices.length > 0) {
      setcarttotalprice(prices.reduce((acc, cur) => acc + cur, 0));
    } else {
      setcarttotalprice(0);
    }
  }, [cart]);

  const handledelete = (product) => {
    dispatch(removecartitems(product._id));
    window.location.reload();
  };

  const viewcart = () => {
    navigate("/cart");
  };

  const cartItems = cart[0]?.cart?.items || [];

  return (
    <div className="absolute top-16 right-4 border border-black bg-white text-black h-fit w-[20%] z-10 flex flex-col gap-3 px-3 pb-3">
      <h1 className="text-lg">
        {cartItems.length > 0
          ? `You have ${cartItems.length} items in your cart`
          : "Your cart is empty"}
      </h1>

      {cartItems.length > 0 ? (
        <>
          <div className="flex flex-col gap-3 h-[340px] overflow-scroll no-scrollbar">
            {cartItems.map((item, idx) => (
              <div key={idx} className="border-b border-gray-500 flex gap-3">
                <div className="flex justify-center items-center px-4 py-4 bg-gray-50">
                  <img src={item.productid.image} alt="img" className="w-12" />
                </div>
                <div className="px-3 py-2">
                  <h1>Title: {item.productid.title}</h1>
                  <div className="flex justify-between items-center">
                    <h1>Price: {item.productid.offerPrice}</h1>
                    <button
                      className="w-8 text-red-600 cursor-pointer"
                      onClick={() => handledelete(item.productid)}
                    >
                      <span className="material-icons-outlined">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h1 className="flex items-center justify-between">
            Subtotal: <span>₹{carttotalprice}</span>
          </h1>

          <button
            className="flex justify-center items-center px-5 py-2 border border-black bg-white text-black text-xl rounded-xl cursor-pointer"
            onClick={viewcart}
          >
            View Cart
          </button>

          <button className="flex justify-center items-center px-5 py-2 border border-black bg-black text-white text-xl rounded-xl cursor-pointer">
            Checkout
          </button>
        </>
      ) : (
        <div className="text-center text-red-600 py-10 text-xl">
          No items in your cart. Go and shop!
        </div>
      )}
    </div>
  );
};

export default Minicart;
