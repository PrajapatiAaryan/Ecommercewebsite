import React, { useEffect, useRef, useState } from "react";

const Timepassaforotp = () => {

  const [otpnumber, setotpnumber] = useState(new Array(5).fill(""));

  const otpref = useRef([])
useEffect(() => {
  otpref.current[0]?.focus();
}, [])


  const handlechange = (value, index) => {
    if(isNaN(value))return
    const newvalue = value.trim()
    const newarr = [...otpnumber];
    newarr[index] = newvalue.slice(-1);
    setotpnumber(newarr);
    newvalue&&otpref.current[index+1]?.focus();
  };
  const handlebackspace = (e,index)=>{
    if(!e.target.value && e.key === "Backspace"){
      otpref.current[index-1]?.focus();
    }
  }
  const handlesubmit = ()=>{
    console.log(otpnumber.join(""))
  }
  return (
    <>
      <div className="flex justify-center items-center min-h-screen ">
        <div className="flex gap-1">
          {otpnumber.map((item, idx) => (
            <input
              key={idx}
              type="text"
              ref={(input)=>otpref.current[idx] =input}
              className=" border border-black text-black bg-white h-20 w-20 text-4xl text-center  p-2"
              value={otpnumber[idx]}
              onChange={(e) => handlechange(e.target.value, idx)}
              onKeyDown={(e)=>handlebackspace(e,idx)}
            />
          ))}
        </div>
           <button className="flex justify-center items-center border border-black rounded-full px-20 py-8 bg-blue-400 text-black text-3xl cursor-pointer" onClick={(e)=>handlesubmit(e)} >enter</button>
      </div>
    </>
  );
};

export default Timepassaforotp;
