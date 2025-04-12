import signupimg from "/images/signupimg.png";
import React, { useState } from "react";
import loginimg from "/images/loginimg.png";
import logoimg from "/images/logo2.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { usersignup } from "../redux/slices/authslice";

// import signupimg from "/images/signupimg.png";

const Registerpage = () => {
  const dispatch = useDispatch();
  const {loading ,error} = useSelector((state)=>state.auth)
  const [formdata, setformdata] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
  })
 
  const handlechange = (e)=>{
    const {name , value} = e.target;
    setformdata({...formdata , [name]:value})
  }
 
  const handlesubmit = async(e)=>{
    e.preventDefault();
    const response = await dispatch(usersignup(formdata));
    console.log("reponse is ", response.payload.token)
    localStorage.setItem('token',response.payload.token)
    if(response.payload.token){
      navigate('/')
    }
    console.log("this is formdata",formdata)
  }
  
  const [visiblity, setvisiblity] = useState(false);
  const handlevisiblity = () => {
    setvisiblity(!visiblity);
  };
  const navigate  = useNavigate()
  const handlenavigate =()=>{
    navigate('/login')
  }
  return (
    <>
      <div className="flex  min-h-screen justify-center items-center">
        <div className="absolute lg:top-5 top-2 left-5 w-20">
          <img src={logoimg} alt="" />
        </div>
        <div className="w-1/2 h-[100vh] hidden lg:block">
          <img src={signupimg} alt="" className="h-full w-full " />
        </div>
        <div className="  w-full lg:w-1/2 flex lg:ml-8 p-1 items-center justify-center lg:justify-start ">
          <div className=" px-5 py-3  w-full sm:w-[70%] md:w-[50%] lg:w-[70%] border border-orange-100 shadow-gray-200 shadow-xl rounded-xl mt-32 lg:mt-0">
            <h1 className="text-black font-semibold text-3xl mb-2">
              Create New Account
            </h1>
            <h6 className="text-gray-500 text-sm mb-5">please enter details </h6>
            <form className="flex flex-col  px-4 py-2 gap-1">
              
              <label className="text-xs">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formdata.firstName}
                onChange={(e)=>handlechange(e)}
                className="px-3 py-2 border border-black rounded-xl mb-3 outline-none"
              />
              <label className="text-xs">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formdata.lastName}
                onChange={(e)=>handlechange(e)}
                className="px-3 py-2 border border-black rounded-xl mb-3 outline-none"
              />
              <label className="text-xs">Email Address</label>
              <input
                type="email"
                name="email"
                value={formdata.email}
                onChange={(e)=>handlechange(e)}
                className="px-3 py-2 border border-black rounded-xl mb-3 outline-none"
              />
              <label className="text-xs">Password</label>
              <div className="flex items-center justify-between px-3  border border-black rounded-xl">
                <input
                  type={visiblity ? "text" : "password"}
                  className="px-2 py-2 outline-none  "
                  name="password"
                  value={formdata.password}
                  onChange={(e)=>handlechange(e)}
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

              <div className="flex justify-between items-center py-1 mb-3">
                <h1 className="flex gap-2 ">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="accent-black scale-120"
                  />
                  I agree to the <span className="font-bold">Terms & Conditions</span>
                </h1>
                
              </div>
              <input
                type="submit"
                name="submit"
                onClick={(e)=>handlesubmit(e)}
                value="signup"
                placeholder="Login"
                className="bg-black text-white flex justify-center items-center px-5 py-2 rounded-xl"
              />
             <h1 className="">
                 Already have a account?{" "}
              <span
                  className="text-blue-500 cursor-pointer"
                  onClick={handlenavigate}
                >
                  Login
                </span>
              </h1>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registerpage;
