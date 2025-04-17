import React from "react";

const Feature = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:px-10 px-2 py-2 place-items-center md:px-28 md:py-12">
        <div className=" px-2 py-2 w-full">
          <span className="material-symbols-outlined">package_2</span>
          <h1 className="font-semibold mt-2">Free Shipping</h1>
          <h4>Free Shipping On Order Above $150</h4>
        </div>
        <div className=" px-2 py-2 w-full">
          <span className="material-icons-outlined">paid</span>
          <h1 className="font-semibold mt-2">Money Guarantee</h1>
          <h4>Within 30 Days For An Exchange  </h4>
        </div>
        <div className=" px-2 py-2 w-full">
          <span className="material-icons-outlined">headphones</span>
          <h1 className="font-semibold mt-2">Online Support</h1>
          <h4>24Hours a day ,7 Days a Week</h4>
        </div>
        <div className="px-2 py-2 w-full">
          <span className="material-icons-outlined">credit_card</span>
          <h1 className="font-semibold mt-2">Flexible Payment</h1>
          <h4>Pay With Multiple Credit Cards</h4>
        </div>
      </div>
    </>
  );
};

export default Feature;
