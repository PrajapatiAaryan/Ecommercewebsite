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

const Paymentmethod = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
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

  const [selectedOption, setSelectedOption] = useState("");

  const options = ["Cash On Delivery", "Pay Now", "Udhar"];
  const handlecontinue = () => {
    localStorage.setItem("paymentmethod", selectedOption);
    navigate("/placeorder");
  };
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center px-3 md:px-20 pt-4 w-full pb-10">
        <h1
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => {
            navigate("/cheakout");
          }}
        >
          <span className="material-icons-outlined ">arrow_back_ios</span>Back
        </h1>
        <h1 className="text-black text-3xl font-semibold py-3 ">
          Payment Method
        </h1>
        <div className="flex gap-12 w-full items-start pt-7 flex-col lg:flex-row">
          <div className="   bg-white text-black lg:w-[70%] w-full flex flex-col gap-3 px-3 pb-5">
            <div className="flex w-full items-center">
              <div className="border border-gray-100 p-3 flex justify-center items-center bg-black text-white rounded-xl">
                <FaHome className="scale-150" />
              </div>
              <div className="bg-gray-800 py-0.5 w-full h-0.5 "></div>
              {/* <div className="relative w-full h-1 bg-gray-300 overflow-hidden">
                <div className="loading-bar"></div>
              </div> */}
              <div className="border border-gray-300 p-3 flex justify-center items-center bg-black text-white rounded-xl">
                <FaCreditCard />
              </div>
              <div className="bg-gray-50 py-0.5 w-full h-0.5"></div>
              <div className="border border-gray-300 p-3 flex justify-center items-center bg-gray-100 text-black rounded-xl">
                <FaRegFileAlt />
              </div>
            </div>
            <div>
              <h1 className="text-black font-semibold text-2xl">
                Select Payment Method
              </h1>
              <div>
                <div className="p-5 text-xl">
                  <h2 className="text-xl font-semibold mb-3">
                    Select an Option
                  </h2>
                  <div className="space-y-2">
                    {options.map((option, index) => (
                      <label
                        key={index}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          value={option}
                          checked={selectedOption === option}
                          onChange={(e) => setSelectedOption(e.target.value)}
                          className="hidden"
                        />
                        <div
                          className={`w-5 h-5 rounded-full border-2 ${
                            selectedOption === option
                              ? "bg-black border-gray-700"
                              : "border-gray-400"
                          }`}
                        ></div>
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                  <p className="mt-3 text-sm text-gray-600">
                    Selected: {selectedOption || "None"}
                  </p>
                </div>
                <div>
                  <button
                    className={`flex justify-center items-center px-5 py-3  border-black rounded-xl text-xl cursor-pointer ${selectedOption?"bg-black text-white border ":"bg-gray-400 text-black"}`}
                    onClick={handlecontinue}
                    disabled={!selectedOption}
                  >
                    Continue
                  </button>
                </div>
              </div>
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

export default Paymentmethod;
