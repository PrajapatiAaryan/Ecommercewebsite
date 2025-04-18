import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PaymentGateway = ({ amount, orderData }) => {
  const handleClick = async () => {
    toast("Redirecting to payment...");

    try {
      const token = localStorage.getItem("token");
      const transactionId = "T" + Date.now();

      const response = await axios.post(
        "http://localhost:4000/payment/order",
        {
          name: orderData.shippingAddress.fullName,
          amount,
          number: orderData.shippingAddress.phone,
          MID: "MID" + Date.now(),
          transactionId,
          orderData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token in headers
          },
        }
      );

      const { success, data } = response.data;

      if (success) {
        // Save order temporarily in localStorage so backend can validate it after success
        localStorage.setItem("pendingOrder", JSON.stringify({ orderData, transactionId }));

        // Redirect to PhonePe payment page
        window.location.href = data.instrumentResponse.redirectInfo.url;
      } else {
        toast.error("Payment initiation failed.");
      }
    } catch (error) {
      console.error("Payment initiation error:", error);
      toast.error("Something went wrong during payment.");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-black text-white border border-black flex justify-center items-center text-2xl rounded-2xl px-6 py-2 cursor-pointer mt-5 w-full"
    >
      Place Order
    </button>
  );
};

export default PaymentGateway;
