import enterotp from "/images/enterotpimg.png";
import forgotpassimg from "/images/forgotpasswordimg.png";
import React, { useEffect, useRef, useState } from "react";
import loginimg from "/images/loginimg.png";
import logoimg from "/images/logo2.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetpassword } from "../redux/slices/authslice";

// import signupimg from "/images/signupimg.png";

const Enterotp = () => {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.auth);
  const [visiblity, setvisiblity] = useState(false);
  const [formdata, setformdata] = useState({
    email: "",
    newpassword: "",
  });
  const handleformchange = (e) => {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value });
  };
  const handlevisiblity = () => {
    setvisiblity(!visiblity);
  };
  const navigate = useNavigate();
  const handlenavigate = () => {
    navigate("/forgotpassword");
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    const newformdata = {
      email: formdata.email,
      newPassword: formdata.newpassword,
      otp: Number(otpnumber.join("")),
    };
    const response = await dispatch(resetpassword(newformdata));
    console.log("responsedata", response);
    console.log("formdata", newformdata);
  };
  useEffect(() => {
    if (
      message ===
      "Password reset successful. You can now login with your new password."
    ) {
      console.log(message)
      navigate("/login"); // Change "/enterotp" to your actual OTP page route
    }
  }, [message, navigate]);
  const [otpnumber, setotpnumber] = useState(new Array(6).fill(""));

  const otpref = useRef([]);
  useEffect(() => {
    otpref.current[0]?.focus();
  }, []);

  const handlechange = (value, index) => {
    if (isNaN(value)) return;
    const newvalue = value.trim();
    const newarr = [...otpnumber];
    newarr[index] = newvalue.slice(-1);
    setotpnumber(newarr);
    newvalue && otpref.current[index + 1]?.focus();
  };
  const handlebackspace = (e, index) => {
    if (!e.target.value && e.key === "Backspace") {
      otpref.current[index - 1]?.focus();
    }
  };
  // const handlesubmit = ()=>{
  //   console.log(otpnumber.join(""))
  // }
  return (
    <>
      <div className="flex  min-h-screen justify-center items-center">
        <div className="absolute lg:top-5 top-2 left-5 w-20">
          <img src={logoimg} alt="" />
        </div>
        <div className="w-1/2 h-[100vh] hidden lg:block">
          <img src={enterotp} alt="" className="h-full w-full " />
        </div>
        <div className="  w-full lg:w-1/2 flex lg:ml-8 p-1 items-center justify-center lg:justify-start ">
          <div className=" px-5 py-3  w-full sm:w-[70%] md:w-[50%] lg:w-[70%] border border-orange-100 shadow-gray-200 shadow-xl rounded-xl mt-10 lg:mt-0">
            <h1
              className="flex items-center gap-1 mb-2 text-sm cursor-pointer"
              onClick={handlenavigate}
            >
              <span className="material-icons-outlined ">arrow_back_ios</span>
              Back
            </h1>
            <h1 className="text-black font-semibold text-3xl mb-2">
              Enter OTP
            </h1>
            <h6 className="text-gray-500 text-sm mb-5">
              We have share a code of your registered email address
              robertfox@example.com
            </h6>
            <form className="flex flex-col  px-4 py-2 gap-1">
              <label className="text-xs">Email Address</label>
              <input
                type="email"
                name="email"
                value={formdata.email}
                onChange={(e) => handleformchange(e)}
                className="px-3 py-2 border border-black rounded-xl mb-3 outline-none"
              />
              <label className="text-xs">Enter New Password</label>
              <div className="flex items-center justify-between px-3  border border-black rounded-xl">
                <input
                  type={visiblity ? "text" : "password"}
                  name="newpassword"
                  value={formdata.newpassword}
                  onChange={(e) => handleformchange(e)}
                  className="px-2 py-2 outline-none  "
                />
                {visiblity ? (
                  <span
                    className="material-icons-outlined cursor-pointer"
                    onClick={handlevisiblity}
                  >
                    visibility_off
                  </span>
                ) : (
                  <span
                    className="material-icons-outlined cursor-pointer"
                    onClick={handlevisiblity}
                  >
                    visibility
                  </span>
                )}
              </div>
              <label className="text-xs mt-3">Enter OTP</label>
              <div className="flex gap-2  w-full">
                {otpnumber.map((item, idx) => (
                  <input
                    key={idx}
                    type="text"
                    ref={(input) => (otpref.current[idx] = input)}
                    className=" border border-black text-black bg-white w-[12%] text-xl text-center  p-2 rounded-lg"
                    value={otpnumber[idx]}
                    onChange={(e) => handlechange(e.target.value, idx)}
                    onKeyDown={(e) => handlebackspace(e, idx)}
                  />
                ))}
              </div>
              <div className="flex justify-between items-center py-1 "></div>
              <input
                type="submit"
                value="Verify"
                className="bg-black text-white flex justify-center items-center px-5 py-2 "
                onClick={(e) => handlesubmit(e)}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Enterotp;
