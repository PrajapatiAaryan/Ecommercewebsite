import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addtocart, decreseqty, getcart, removecartitems } from "../redux/slices/cartslice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Feature from "../components/Feature";
import RelatedProducts from "../components/RelatedProducts";
import { useNavigate } from "react-router-dom";

const Cartpage = () => {
  const { cart, loading, error } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setqty] = useState(1)
  const [carttotalprice, setcarttotalprice] = useState(() => Number(localStorage.getItem("cartTotal")) || 0);
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

     const handleaddtocart = async(id ,qty)=>{
         console.log(id,qty)
          dispatch(addtocart({productid:id ,quantity:Number(qty)}))
          window.location.reload()
          // setqty(1)
      }  
      const handledecreseqty = (id)=>{
        dispatch(decreseqty(id));
        window.location.reload()
      }
      const handleremovefromcart = (id)=>{
        dispatch(removecartitems(id))
        window.location.reload()
      }
      const handlecheakout = ()=>{
            navigate('/cheakout')
      }
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items- px-20 pt-4 w-full pb-10">
        <h1 className="text-black text-3xl font-semibold py-3 ">Cheakout</h1>
        <div className="flex gap-12 w-full">
          <div className="   bg-white text-black w-[70%] flex flex-col gap-3 px-3 pb-5">
            <div className="flex gap-10">
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
                    <div className="flex gap-10">
                      <div className="w-[60%] flex gap-10">
                        <img
                          src={item.productid.image}
                          alt="img1"
                          className="w-24"
                        />
                        <div className="flex flex-col ">
                          <h1>{item.productid.title}</h1>
                          <h6>Size:L</h6>
                          <button className="w-8 text-red-600 cursor-pointer py-4 pr-36" onClick={()=>handleremovefromcart(item.productid._id)}>
                          <span className="material-icons-outlined">delete</span>
                        </button>
                        </div>
                      </div>
                      <div className="flex justify-between w-[40%] ">
                        <h1>₹{item.productid.offerPrice}</h1>
                        <div className="border border-black text-black px-3 rounded-2xl flex items-center gap-4 h-fit py-2">
                          <h1 className="text-xl cursor-pointer" onClick={()=>handledecreseqty(item.productid._id )}>-</h1>
                          <h1 className="text-xl">{item.quantity}</h1>
                          <h1 className="text-xl cursor-pointer" onClick={()=>handleaddtocart(item.productid._id ,qty)}>+</h1>
                          
                        </div>
                        <h1>${item.productid.offerPrice * item.quantity}</h1>
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
                <label className="text-sm text-gray-700">Enter Discountcoupn</label>
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
                  Delivery Charge <span>₹5</span>
                </h1>
                <h1 className="flex justify-between items-center py-2">
                  Grand total <span>₹{carttotalprice + 5}</span>
                </h1>
                <button className="bg-black text-white text-xl flex justify-center items-center px-5 py-2 border border-black rounded-xl w-full cursor-pointer " onClick={()=>handlecheakout()}>
                  Cheakout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RelatedProducts/>
      <Feature/>
      <Footer />
    </>
  );
};

export default Cartpage;
