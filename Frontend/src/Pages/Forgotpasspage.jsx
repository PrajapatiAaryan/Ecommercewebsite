import forgotpassimg from "/images/forgotpasswordimg.png";
import React, { useEffect, useState } from "react";
import logoimg from "/images/logo2.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotpassword } from "../redux/slices/authslice";

const Forgotpasspage = () => {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.auth);
  const [email, setemail] = useState("");
  const navigate = useNavigate();

  const handlenavigate = () => {
    navigate("/login");
  };

  const isValidEmail = (email) => {
    // Regular expression for validating an email
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      alert("Please enter your email");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    await dispatch(forgotpassword(email));
  };

  useEffect(() => {
    if (message === "OTP sent to your email") {
      navigate("/otp");
    }
  }, [message, navigate]);

  return (
    <>
      <div className="flex min-h-screen justify-center items-center">
        <div className="absolute lg:top-5 top-2 left-5 w-20">
          <img src={logoimg} alt="Logo" />
        </div>
        <div className="w-1/2 h-[100vh] hidden lg:block">
          <img src={forgotpassimg} alt="Forgot Password" className="h-full w-full" />
        </div>
        <div className="w-full lg:w-1/2 flex lg:ml-8 p-1 items-center justify-center lg:justify-start">
          <div className="px-5 py-3 w-full sm:w-[70%] md:w-[50%] lg:w-[70%] border border-orange-100 shadow-gray-200 shadow-xl rounded-xl">
            <h1
              className="flex items-center gap-1 mb-2 text-sm cursor-pointer"
              onClick={handlenavigate}
            >
              <span className="material-icons-outlined">arrow_back_ios</span>
              Back
            </h1>
            <h1 className="text-black font-semibold text-3xl mb-2">
              Forgot Password
            </h1>
            <h6 className="text-gray-500 text-sm mb-5">
              Enter your registered email address. We will send you a code to
              reset your password.
            </h6>
            <form className="flex flex-col px-4 py-2 gap-1" onSubmit={handlesubmit}>
              <label className="text-xs">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className="px-3 py-2 border border-black rounded-xl mb-3 outline-none"
                disabled={loading}
              />

              <button
                type="submit"
                disabled={loading}
                className={`${
                  loading ? "bg-gray-500 cursor-not-allowed" : "bg-black"
                } text-white flex justify-center items-center px-5 py-2 rounded-xl transition`}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>

            {/* Loading bar */}
            {loading && (
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className="bg-orange-500 h-2 animate-pulse w-full"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Forgotpasspage;
