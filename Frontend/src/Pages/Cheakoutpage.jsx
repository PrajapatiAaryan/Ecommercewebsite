import React, { useEffect, useState } from "react";
import {
  FaCreditCard,
  FaDrumstickBite,
  FaDumpster,
  FaEdit,
  FaHome,
  FaNotesMedical,
  FaRegFileAlt,
  FaRegStickyNote,
  FaTasks,
  FaUserEdit,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Feature from "../components/Feature";
import Footer from "../components/Footer";
import GooglePayQR from "./GooglePayQR ";
import Paymentgateway from "../payment/Paymentgateway";
import { useDispatch, useSelector } from "react-redux";
import { getcart } from "../redux/slices/cartslice";

const Cheakoutpage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {cart} = useSelector((state)=>state.cart)
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
  console.log(carttotalprice)

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center px-3 md:px-20 pt-4 w-full pb-10">
        <h1
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => {
            navigate("/cart");
          }}
        >
          <span className="material-icons-outlined ">arrow_back_ios</span>Back
        </h1>
        <h1 className="text-black text-3xl font-semibold py-3 ">
          Shipping Address
        </h1>
        <div className="flex gap-12 w-full items-start pt-7 flex-col lg:flex-row">
          <div className="   bg-white text-black lg:w-[70%] w-full flex flex-col gap-3 px-3 pb-5">
            <div className="flex w-full items-center">
              <div className="border border-gray-100 p-3 flex justify-center items-center bg-black text-white rounded-xl">
                <FaHome className="scale-150" />
              </div>
              <div className="bg-gray-50 py-0.5 w-full h-0.5"></div>
              <div className="border border-gray-300 p-3 flex justify-center items-center bg-gray-100 text-black rounded-xl">
                <FaCreditCard />
              </div>
              <div className="bg-gray-50 py-0.5 w-full h-0.5"></div>
              <div className="border border-gray-300 p-3 flex justify-center items-center bg-gray-100 text-black rounded-xl">
                <FaRegFileAlt />
              </div>
            </div>
            <div className="flex gap-2 flex-col pt-3">
              <h1 className="text-black font-bold text-2xl">
                Select a Delivery Address
              </h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
                similique corporis natus quas inventore ex accusantium incidunt
                ipsa reprehenderit, amet repudiandae, eos modi dolorum.
                Obcaecati optio non inventore.
              </p>
            </div>
            <div className="w-full flex lg:gap-8 gap-2">
              <div className="border border-gray-200 bg-gray-50 text-black w-1/2 flex flex-col gap-3 px-3 lg:py-2">
                <h1 className="flex justify-between w-full items-center lg:text-3xl font-semibold px-4 py-2">
                  Robert Fox{" "}
                  <input type="checkbox" className="lg:w-6 lg:h-6 accent-black" />
                </h1>
                <p className="text-black lg:text-xl px-3 pt-2">
                  4575 Washingtion Ave ,Manchester ,
                </p>
                <h1 className="text-black text-xl px-3 ">Kentucky 39454</h1>
                <div className="flex px-3 py-2 justify-center lg:gap-10 gap-1">
                  <button className="flex gap-2 items-center border border-gray-200 bg-gray-100 w-1/2 px-4 py-2 rounded-2xl justify-center">
                    <FaEdit />
                    Edit
                  </button>
                  <button className="flex gap-2 items-center border border-gray-200 bg-red-100 w-1/2 px-4 py-2 rounded-2xl justify-center">
                    <span className="material-icons-outlined  text-red-700  hover:bg-gray-200">
                      delete
                    </span>
                    Delete
                  </button>
                </div>
              </div>
              <div className="border border-gray-200 bg-gray-50 text-black w-1/2 flex flex-col gap-3 px-3 lg:py-2">
                <h1 className="flex justify-between w-full items-center lg:text-3xl font-semibold px-4 py-2">
                  Robert Fox{" "}
                  <input type="checkbox" className="lg:w-6 lg:h-6 accent-black" />
                </h1>
                <p className="text-black lg:text-xl px-3 pt-2">
                  4575 Washingtion Ave ,Manchester ,
                </p>
                <h1 className="text-black text-xl px-3 ">Kentucky 39454</h1>
                <div className="flex px-3 py-2 justify-center lg:gap-10 gap-1">
                  <button className="flex gap-2 items-center border border-gray-200 bg-gray-100 w-1/2 px-4 py-2 rounded-2xl justify-center">
                    <FaEdit />
                    Edit
                  </button>
                  <button className="flex gap-2 items-center border border-gray-200 bg-red-100 w-1/2 px-4 py-2 rounded-2xl justify-center">
                    <span className="material-icons-outlined  text-red-700  hover:bg-gray-200">
                      delete
                    </span>
                    Delete
                  </button>
                </div>
              </div>
              
            </div>
            <div className="py-3">
              <button className="cursor-pointer flex justify-center items-center px-5 py-3 text-xl text-white bg-black w-1/2 border border-gray-500 rounded-2xl" onClick={()=>{
                navigate('/payment')
              }}>
                Deliver Here
              </button>
            </div>
            <div className="w-full  px-3 py-2">
              <form className="flex flex-col gap-4">
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    className="outline-none w-full py-3 px-3 border border-black rounded-xl"
                  />
                </div>
                <div>
                  <label>Mobile no</label>
                  <input
                    type="text"
                    className="outline-none w-full py-3 px-3 border border-black rounded-xl"
                  />
                </div>
                <div>
                  <label>
                    Flat , House no , Building , Company , Apartment
                  </label>
                  <input
                    type="text"
                    className="outline-none w-full py-3 px-3 border border-black rounded-xl"
                  />
                </div>
                <div>
                  <label>Area , Colony , Street , Sector , Village</label>
                  <input
                    type="text"
                    className="outline-none w-full py-3 px-3 border border-black rounded-xl"
                  />
                </div>
                <div>
                  <label>City</label>
                  <input
                    type="text"
                    className="outline-none w-full py-3 px-3 border border-black rounded-xl"
                  />
                </div>
                <div>
                  <label>Pincode</label>
                  <input
                    type="text"
                    className="outline-none w-full py-3 px-3 border border-black rounded-xl"
                  />
                </div>
                <div>
                  <label>State</label>
                  <input
                    type="text"
                    className="outline-none w-full py-3 px-3 border border-black rounded-xl"
                  />
                </div>
                <button className="w-1/2 border-gray-500 bg-black text-white px-3 py-2 flex justify-center items-center rounded-xl">
                  Add New Address
                </button>
              </form>
            </div>
          </div>
          <div className="lg:w-[25%] border-8  border-white h-fit px-3 shadow-sm shadow-gray-500 flex flex-col py-3">
            <div>
              <h1 className="flex justify-between items-center py-2 text-2xl w-full">
                Subtotal <span>${carttotalprice}</span>
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
                  Delivery Charge <span>$5</span>
                </h1>
                <h1 className="flex justify-between items-center py-2 font-semibold text-2xl border-t border-gray-200">
                  Grand total <span>${carttotalprice + 5}</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <GooglePayQR/> */}
      <Feature />
      <Footer />
    </>
  );
};

export default Cheakoutpage;
