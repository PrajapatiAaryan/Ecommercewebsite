import React, { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getuser } from "../redux/slices/authslice";

const Editprofile = () => {
  const dispatch = useDispatch()
  const {user} = useSelector((state)=>state.auth)
  useEffect(() => {
    dispatch(getuser())
  }, [])
   console.log("user data" , user?.user)
  return (
    <>
      <div>
        <div className="w-full flex justify-between px-3 py-6">
          <div className="relative md:w-40 md:h-40 w-4">
        <img
          src="/images/u1.jpeg"
          alt="Profile"
          className="w-full h-full object-contain rounded-full border-4 border-white shadow-md"
        />
        <button className="absolute bottom-2 right-2 flex justify-center items-center rounded-xl shadow-md bg-black text-white p-2">
        <FaEdit className="scale-120 cursor-pointer" />
        </button>
      </div>
          <div className="flex justify-center items-center border border-gray-300   text-lg px-10 py-1 h-fit rounded-xl bg-black text-white">
            <button className="flex items-center gap-1 px-3 py-2 text-2xl"> <FaEdit className="scale-110 "/> Edit</button>
          </div>
        </div>
        <form>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col ">
              <label className="text-sm">First Name</label>
              <input
                type="text"
                className="outline-none border border-black px-4 py-3 text-xl rounded-xl text-black"
                placeholder={user?.user?.firstName}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm">Last Name</label>
              <input
                type="text"
                className="outline-none border border-black px-4 py-3 text-xl rounded-xl"
                placeholder={user?.user?.lastName}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col ">
              <label className="text-sm">Phone number</label>
              <input
                type="number"
                className="outline-none border border-black px-4 py-3 text-xl rounded-xl"
                placeholder={user?.user?.address[0]?.phone}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm">Email Address</label>
              <input
                type="email"
                className="outline-none border border-black px-4 py-3 text-xl rounded-xl"
                placeholder={user?.user?.email}
              />
            </div>
          </div>
          <div className="flex flex-col ">
            <label className="text-sm">Address</label>
            <textarea className="outline-none border border-black px-4 py-3 text-xl rounded-xl" placeholder={user?.user?.address[0]?.address}></textarea>
          </div>
        </form>
      </div>
    </>
  );
};

export default Editprofile;
