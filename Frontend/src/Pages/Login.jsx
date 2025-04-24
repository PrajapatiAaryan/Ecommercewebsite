import React, { useState } from "react";
import loginimg from "/images/loginimg.png";
import logoimg from "/images/logo2.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userlogin } from "../redux/slices/authslice";

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [logindata, setlogindata] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [visiblity, setvisiblity] = useState(false);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setlogindata({ ...logindata, [name]: value });
  };

  // Email and Password Validation
  const validate = () => {
    const newErrors = {};
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!logindata.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailPattern.test(logindata.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!logindata.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (logindata.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return; // If validation fails, stop form submission
    }
    
    const response = await dispatch(userlogin(logindata));
    // console.log(response);
    // console.log(response.payload.message);

    if (response.payload.token) {
      localStorage.setItem('token', response.payload.token);
      localStorage.setItem('role', response.payload.role);

      if (response.payload.role === "admin") {
        navigate('/admin');
      } else if (response.payload.role === "user") {
        navigate('/');
      }
    }
    // console.log(logindata);
  };

  const handlevisiblity = () => {
    setvisiblity(!visiblity);
  };

  const navigate = useNavigate();
  const handlenavigate = () => {
    navigate("/register");
  };

  const handlenavtoforgotpage = () => {
    navigate("/forgotpassword");
  };

  return (
    <>
      <div className="flex min-h-screen justify-center items-center">
        <div className="absolute lg:top-5 top-2 left-5 w-20">
          <img src={logoimg} alt="" />
        </div>
        <div className="w-1/2 h-[100vh] hidden lg:block">
          <img src={loginimg} alt="" className="h-full w-full " />
        </div>
        <div className="w-full lg:w-1/2 flex lg:ml-8 p-1 items-center justify-center lg:justify-start ">
          <div className="px-5 py-3 w-full sm:w-[70%] md:w-[50%] lg:w-[70%] border border-orange-100 shadow-gray-200 shadow-xl rounded-xl">
            <h1 className="text-black font-semibold text-3xl mb-2">
              Welcome👋
            </h1>
            <h6 className="text-gray-500 text-sm mb-5">Please login here</h6>
            <form className="flex flex-col px-4 py-2 gap-1">
              <label className="text-xs">Email Address</label>
              <input
                type="email"
                name="email"
                value={logindata.email}
                onChange={(e) => handlechange(e)}
                className="px-3 py-2 border border-black rounded-xl mb-3 outline-none"
              />
              {errors.email && (
                <span className="text-red-500 text-xs">{errors.email}</span>
              )}
              
              <label className="text-xs">Password</label>
              <div className="flex items-center justify-between px-3 border border-black rounded-xl">
                <input
                  type={visiblity ? "text" : "password"}
                  className="px-2 py-2 outline-none"
                  name="password"
                  value={logindata.password}
                  onChange={(e) => handlechange(e)}
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
              {errors.password && (
                <span className="text-red-500 text-xs">{errors.password}</span>
              )}

              <div className="flex justify-between items-center py-1 mb-3">
                <h1 className="flex gap-2">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="accent-black scale-120"
                  />
                  Remember me
                </h1>
                <h1
                  className="text-blue-500 cursor-pointer"
                  onClick={handlenavtoforgotpage}
                >
                  Forgot password?
                </h1>
              </div>
              <input
                type="submit"
                value="Login"
                className="bg-black text-white flex justify-center items-center px-5 py-2 rounded-xl"
                onClick={(e) => handlesubmit(e)}
              />
              <h1 className="">
                New to the website?{" "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={handlenavigate}
                >
                  Create a new account
                </span>
              </h1>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
