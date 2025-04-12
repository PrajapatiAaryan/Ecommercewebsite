import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getcart, removecartitems } from "../redux/slices/cartslice";
import { FaBitcoin, FaBox, FaDumpster } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Minicart = () => {
  const { cart, loading, error  } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [carttotalprice, setcarttotalprice] = useState(0)
  const navigate = useNavigate()
  // console.log(cart)
  useEffect(() => {
    const newarray = cart[0]?.cart?.items?.map((item)=>item.productid.
  offerPrice)
  setcarttotalprice(newarray?.reduce((acc, cur)=>acc+cur) || 0)
    dispatch(getcart());
  }, []);

  const handledelete =(id)=>{
    dispatch(removecartitems(id._id))
    window.location.reload()
    // toast("items deleted")
  }
  const viewcart = ()=>{
    navigate('/cart')
  }


  return (
    <>
      <div className="absolute top-16 right-4 border border-black bg-white text-black h-[500px] w-[20%] z-10 flex flex-col gap-3 px-3">
        <h1>You Have {cart[0]?.cart?.items.length} Items in your cart</h1>
        <div className="flex flex-col gap-3 h-[340px] overflow-scroll no-scrollbar">
          {cart.length >= 1 ? (
            cart[0]?.cart?.items?.map((item, idx) => (
              <div key={idx}>
                <div>
                  <div className="border-b border-gray-500 flex gap-3">
                    <div className="flex justify-center items-center px-4 py-4 bg-gray-50">
                      <img
                        src={item.productid.image}
                        alt="img1"
                        className="w-12"
                      />
                    </div>
                    <div className="px-3 py-2">
                      <h1>Title:{item.productid.title}</h1>
                      <div className="flex justify-between items-center">
                        <h1>Price:{item.productid.offerPrice}</h1>
                        <button className="w-8 text-red-600 cursor-pointer" onClick={()=>handledelete(item.productid)}>
                          <span className="material-icons-outlined">delete</span>
                        </button>
                      </div>
                      {/* <h1>Size: {item.productid.availableSizes}</h1> */}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>no items in your cart go and shop</div>
          )}
          <h1 className="flex items-center justify-between">
            subtotal: <span>${carttotalprice}</span>
          </h1>
        </div>
        <button className="flex justify-center items-center px-5 py-2 border border-black bg-white text-black text-xl rounded-xl cursor-pointer" onClick={viewcart}>
          View Cart
        </button>
        <button className="flex justify-center items-center px-5 py-2 border border-black bg-black text-white text-xl rounded-xl cursor-pointer">
          Cheakout
        </button>
      </div>
    </>
  );
};

export default Minicart;
