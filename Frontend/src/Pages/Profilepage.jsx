import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getuser, userlogout } from "../redux/slices/authslice";

const Profilepage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlelogout = () => {
    navigate("/");
    dispatch(userlogout());
  };

  useEffect(() => {
    dispatch(getuser());
  }, [dispatch]);
  
   const [navbaropen, setnavbaropen] = useState(false)
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center lg:px-20 pt-4 px-2 border border-black">
        <div className=" w-full">
          <h1 className="text-black text-3xl font-semibold py-5">My Profile</h1>
          <div className="w-full flex gap-5 pb-10 flex-col md:flex-row">
            <div className="w-full md:w-[30%] flex flex-col border border-gray-100 shadow-lg shadow-orange-100 h-fit">
              <div className="flex gap-4 items-center justify-between border border-gray-100 px-2 py-5">
                <div className="flex gap-4 items-center">
                  <img
                    src={user?.user?.profileimg}
                    alt="user"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h1 className=" text-gray-500 ">Hello👋</h1>
                    <h1 className="font-semibold text-2xl">
                      {user?.user?.firstName.charAt(0).toUpperCase() +
                        user?.user?.firstName.slice(1)}{" "}
                      {user?.user?.lastName}
                    </h1>
                  </div>
                </div>
                <div className="md:hidden flex">
                  {navbaropen ? (
                    <span
                      className="material-icons-outlined"
                      onClick={() => setnavbaropen(!navbaropen)}
                    >
                      close
                    </span>
                  ) : (
                    <span
                      className="material-icons-outlined"
                      onClick={() => setnavbaropen(!navbaropen)}
                    >
                      menu
                    </span>
                  )}
                </div>
              </div>
              <ul className={"list-none gap-5 text-xl hidden md:block"}>
                <NavLink
                  to={"/profile"}
                  className={({ isActive }) =>
                    `rounded-md transition flex px-5 py-4 gap-5 items-center border border-gray-100  ${
                      isActive
                        ? "bg-white text-black"
                        : "border-gray-100 hover:bg-gray-200"
                    }`
                  }
                >
                  <FaUser /> Personal Information
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    ` rounded-md transition flex px-5 py-4 gap-5 items-center border border-gray-100 ${
                      isActive
                        ? "bg-black text-white"
                        : "border-gray-100 hover:bg-gray-200"
                    }`
                  }
                  to={"/profile/myorders"}
                >
                  <FaCube /> My Orders
                </NavLink>
                <NavLink
                  to={"/profile/wishlist"}
                  className={({ isActive }) =>
                    ` rounded-md transition flex px-5 py-4 gap-5 items-center border border-gray-100 ${
                      isActive
                        ? "bg-black text-white"
                        : "border-gray-100 hover:bg-gray-200"
                    }`
                  }
                >
                  <FaHeart /> Whislist
                </NavLink>

                {/* optional features */}
                {/* <NavLink className="flex px-5 py-3 gap-5 items-center border border-gray-100">
                  <FaMapMarkerAlt /> Manage Addresses
                </NavLink>
                <NavLink className="flex px-5 py-3 gap-5 items-center border border-gray-100">
                  {" "}
                  <FaCreditCard /> Saved Card
                </NavLink>
                <NavLink className="flex px-5 py-3 gap-5 items-center border border-gray-100">
                  <FaBell /> Notifications
                </NavLink>
                <NavLink className="flex px-5 py-3 gap-5 items-center border border-gray-100">
                  <FaCog /> Settings
                </NavLink> */}

                <NavLink
                  className="flex px-5 py-3 gap-5 items-center border border-gray-100"
                  onClick={() => handlelogout()}
                >
                  {" "}
                  <FaCog /> Logout
                </NavLink>
              </ul>
              {navbaropen&&
              <ul className={"list-none gap-5 text-xl "}>
                <NavLink
                  to={"/profile"}
                  className={({ isActive }) =>
                    `rounded-md transition flex px-5 py-4 gap-5 items-center border border-gray-100  ${
                      isActive
                        ? "bg-white text-black"
                        : "border-gray-100 hover:bg-gray-200"
                    }`
                  }
                >
                  <FaUser /> Personal Information
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    ` rounded-md transition flex px-5 py-4 gap-5 items-center border border-gray-100 ${
                      isActive
                        ? "bg-black text-white"
                        : "border-gray-100 hover:bg-gray-200"
                    }`
                  }
                  to={"/profile/myorders"}
                >
                  <FaCube /> My Orders
                </NavLink>
                <NavLink
                  to={"/profile/wishlist"}
                  className={({ isActive }) =>
                    ` rounded-md transition flex px-5 py-4 gap-5 items-center border border-gray-100 ${
                      isActive
                        ? "bg-black text-white"
                        : "border-gray-100 hover:bg-gray-200"
                    }`
                  }
                >
                  <FaHeart /> Whislist
                </NavLink>

                {/* optional features */}
                {/* <NavLink className="flex px-5 py-3 gap-5 items-center border border-gray-100">
                  <FaMapMarkerAlt /> Manage Addresses
                </NavLink>
                <NavLink className="flex px-5 py-3 gap-5 items-center border border-gray-100">
                  {" "}
                  <FaCreditCard /> Saved Card
                </NavLink>
                <NavLink className="flex px-5 py-3 gap-5 items-center border border-gray-100">
                  <FaBell /> Notifications
                </NavLink>
                <NavLink className="flex px-5 py-3 gap-5 items-center border border-gray-100">
                  <FaCog /> Settings
                </NavLink> */}

                <NavLink
                  className="flex px-5 py-3 gap-5 items-center border border-gray-100"
                  onClick={() => handlelogout()}
                >
                  {" "}
                  <FaCog /> Logout
                </NavLink>
              </ul>
              }
            </div>
            <div className=" md:w-[70%] w-full">
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
