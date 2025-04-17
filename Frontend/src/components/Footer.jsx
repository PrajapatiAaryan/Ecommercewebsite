import React from "react";
import logo from "/images/logo2.png";
import { FaBeer, FaCcAmex, FaCcMastercard, FaCcPaypal, FaCcVisa, FaFacebook, FaGooglePay, FaInstagram, FaInstagramSquare, FaPaypal, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="min-h-[30vh] bg-gray-950 text-white flex flex-col justify-center items-center">
        <div className="border-b border-gray-200 min-h-[25vh] w-[83%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 ">
          <div className=" flex flex-col gap-4 mt-10 mb-10   ">
            <img src={logo} alt="logoimg" className="w-14 invert mr-10 flex" />
            <h1 className="flex items-center gap-2 ">
              <span>
                <span className="material-icons-outlined">call</span>
              </span>
              (704)555-7585
            </h1>
            <h1 className="flex items-center gap-2">
              <span className="material-icons-outlined">mail</span>
              xyz@gmail.com
            </h1>
            <h1 className="flex items-center gap-2 ">
              <span className="material-icons-outlined">location_on</span>
              Address ,California 62639
            </h1>
          </div>
          <div className="mt-10 mb-10 flex flex-col gap-4 ">
            <h1 className="text-lg font-semibold">Information</h1>
            <ol className="list-none text-gray-500 flex flex-col gap-4  text-base">
              <li>My Account</li>
              <li>Login</li>
              <li>My Cart</li>
              <li>My Wishlist</li>
              <li>Cheakout</li>
            </ol>
          </div>
          <div className="mt-10 mb-10 flex flex-col gap-4">
            <h1 className="text-lg font-semibold">Services</h1>
            <ol className="list-none text-gray-500 flex flex-col gap-4  text-base">
              <li>About Us</li>
              <li>Careers</li>
              <li>Delivery Information</li>
              <li>Privacy Pollicy</li>
              <li>Terms & Conditions</li>
            </ol>
          </div>
          <div className="mt-10 mb-10 flex flex-col gap-4 ">
            <h1 className="text-lg font-semibold">Subscribe</h1>
            <ol className="list-none text-gray-500 flex flex-col gap-4  text-base">
              <p>
                Enter your email below to be the first to know about new
                collection and product launches{" "}
              </p>
              <div className="flex items-center border border-gray-300 px-3 py-3 rounded-xl   gap-1 ">
                <h1 className="flex items-center">
                  <span className="material-icons-outlined text-white">mail</span>
                </h1>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="outline-none  mr-20"
                />
                {/* <h1 className="flex items-center text-white">
                  <span className="material-icons-outlined ">
                    arrow_right_alt
                  </span>
                </h1> */}
              </div>
            </ol>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:flex-row justify-around items-center py-2 w-full">
          <div className="flex gap-3">
          <FaCcVisa className="size-9"/>
          <FaCcMastercard className="size-9"/>
          <FaGooglePay className="size-9"/>
          <FaCcAmex className="size-9"/>
          <FaPaypal className="size-9"/>
          </div>
          <h1>@2025 AMart ALL Rights are Reserved </h1>
          <div className="flex gap-4">
          <FaInstagram className="size-9"/>
          <FaTwitter className="size-9"/>
          <FaFacebook className="size-9"/>
          
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
