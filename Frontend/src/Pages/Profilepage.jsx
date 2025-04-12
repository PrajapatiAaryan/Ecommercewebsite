import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaBell,
  FaBoxes,
  FaCarSide,
  FaCcMastercard,
  FaCog,
  FaCreditCard,
  FaCube,
  FaCubes,
  FaHeart,
  FaMapMarkerAlt,
  FaPaypal,
  FaUser,
} from "react-icons/fa";
import { useDispatch } from "react-redux";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { userlogout } from "../redux/slices/authslice";

const Profilepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlelogout = () => {
    navigate("/");
    dispatch(userlogout());
  };
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center md:px-20 pt-4 px-2">
        <div className=" w-full">
          <h1 className="text-black text-3xl font-semibold py-5">My Profile</h1>
          <div className="w-full flex gap-5 pb-10">
            <div className=" w-[30%] flex flex-col border border-gray-100 shadow-lg shadow-orange-100 ">
              <div className="flex gap-4 items-center border border-gray-100 px-2 py-5">
                <img
                  src="/images/u1.jpeg"
                  alt="user"
                  className="w-12 rounded-full"
                />
                <div>
                  <h1 className="text-lg text-gray-500">Hello👋</h1>
                  <h1 className="text-xl font-semibold">Virat Kohli</h1>
                </div>
              </div>
              <ul className="list-none gap-5 text-xl ">
                <NavLink to={"/profile"} className={({isActive})=>`rounded-md transition flex px-5 py-4 gap-5 items-center border border-gray-100  ${
                      isActive
                        ? "bg-white text-black"
                        : "border-gray-100 hover:bg-gray-200"
                    }`} >
                  <FaUser /> Personal Information
                </NavLink>
                <NavLink className="flex px-5 py-3 gap-5 items-center border border-gray-100"><FaCube /> My Orders</NavLink>
                <NavLink
                  to={"/profile/wishlist"}
                  className={({ isActive }) =>
                    ` rounded-md transition flex px-5 py-4 gap-5 items-center border border-gray-100 ${
                      isActive
                        ? "bg-black text-white"
                        : "border-gray-100 hover:bg-gray-200"
                    }`
                  }
                ><FaHeart /> Whislist
                </NavLink>
                <NavLink className="flex px-5 py-3 gap-5 items-center border border-gray-100"><FaMapMarkerAlt /> Manage Addresses
                </NavLink>
                <NavLink className="flex px-5 py-3 gap-5 items-center border border-gray-100"> <FaCreditCard /> Saved Card
                </NavLink>
                <NavLink className="flex px-5 py-3 gap-5 items-center border border-gray-100">
                    <FaBell /> Notifications
                </NavLink>
                <NavLink className="flex px-5 py-3 gap-5 items-center border border-gray-100">
                    <FaCog /> Settings
                </NavLink>
                <NavLink className="flex px-5 py-3 gap-5 items-center border border-gray-100" onClick={() => handlelogout()}>
                  {" "}
                    <FaCog /> Logout
                </NavLink>
              </ul>
            </div>
            <div className=" w-[70%]">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profilepage;
