import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { placedorder } from "../redux/slices/orderslice";
import { clearcart } from "../redux/slices/cartslice";
const Paymentgateway = ({ amount, orderData }) => {
  const dispatch = useDispatch();
  let data = {
    name: "vikas",
    amount: amount,
    number: "9999999999",
    MID: "MID" + Date.now(),
    transactionId: "T" + Date.now(),
    orderData: orderData,
    token: localStorage.getItem("token"),
  };
  const HandleClick = async () => {
    toast("button is clicked");
    try {
      await axios
        .post("http://localhost:4000/payment/order", data)
        .then((res) => {
          if (res.data.success === true) {
          console.log("this res.data from frontend  payment gatewat",res.data)
            dispatch(placedorder(orderData));
            dispatch(clearcart());
            window.location.href =
              res.data.data.instrumentResponse.redirectInfo.url;
          }
        })
        .catch((err) => {
          console.log("fail");
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button
        onClick={HandleClick}
        className="bg-black text-white border border-black flex justify-center items-center text-2xl rounded-2xl px-6 py-2 cursor-pointer mt-5 w-full"
      >
        Place Order
      </button>
    </>
  );
};

export default Paymentgateway;
