import React, { useEffect, useState } from "react";
import { FaCreditCard, FaEdit, FaHome, FaRegFileAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Feature from "../components/Feature";
import Footer from "../components/Footer";
import Paymentgateway from "../payment/Paymentgateway";
import { useDispatch, useSelector } from "react-redux";
import { clearcart, getcart, removecartitems } from "../redux/slices/cartslice";
import { getuser } from "../redux/slices/authslice";
import { placedorder } from "../redux/slices/orderslice";
import { toast } from "react-toastify";
const Placeorder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [carttotalprice, setcarttotalprice] = useState(
    () => Number(localStorage.getItem("cartTotal")) || 0
  );

  useEffect(() => {
    dispatch(getcart());
    dispatch(getuser());
  }, []);

  let id = localStorage.getItem("selectedAddressId");
  const [paymentmethod, setpaymentmethod] = useState(
    localStorage.getItem("paymentmethod") || "Cash on Delivery"
  );
  const [currentaddress, setcurrentaddress] = useState(null);

  // cart total price
  useEffect(() => {
    if (cart.length > 0 && cart[0]?.cart?.items) {
      const total = cart[0].cart.items.reduce(
        (acc, item) => acc + item.productid.offerPrice * item.quantity,
        0
      );
      setcarttotalprice(total);
      localStorage.setItem("cartTotal", total);
    }
  }, [cart]);

  useEffect(() => {
    if (user?.user?.address && id) {
      const selected = user.user.address.find((item) => item._id === id);
      setcurrentaddress(selected);
    }
  }, [user, id]);



  const orderItems = cart[0]?.cart?.items?.map((item) => ({
    productId: item.productid._id,
    quantity: item.quantity,
    price: item.productid.offerPrice * item.quantity,
  }));

  
  const deliveryCharge = 21;

  const [enteredCoupen, setEnteredCoupen] = useState("");
  const [selectedCoupen, setSelectedCoupen] = useState("new0");

  const coupens = {
    new0: 0,
    new10: 0.1,
    new20: 0.2,
    new30: 0.3,
    new40: 0.4,
    new50: 0.5,
    new60: 0.6,
    new70: 0.7,
  };

  const discount = (carttotalprice + deliveryCharge) * coupens[selectedCoupen];
  const grandTotal = carttotalprice + deliveryCharge - discount;

  const handleApplyCoupen = (e) => {
    e.preventDefault();
    const lowerCaseCode = enteredCoupen.toLowerCase();
    if (coupens[lowerCaseCode] !== undefined) {
      setSelectedCoupen(lowerCaseCode);
      toast.success("Coupon applied successfully!");
    } else {
      toast.error("Invalid coupon code");
    }
  };

  const orderData = {
    items: orderItems,
    totalAmount: grandTotal,
    paymentStatus: paymentmethod === "Cash On Delivery" ? "Pending" : "Paid",
    orderStatus: "Placed",
    shippingAddress: {
      fullName: currentaddress?.fullName,
      phone: currentaddress?.phone,
      address: currentaddress?.address,
      city: currentaddress?.city,
      state: currentaddress?.state,
      pincode: currentaddress?.pincode,
    },
  };

  const handleplaceorder = (e) => {
    e.preventDefault();
    dispatch(placedorder(orderData));
    dispatch(clearcart());
    toast("Order placed successfully 🤩");
    navigate("/profile/myorders");
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center px-3 md:px-20 pt-4 w-full pb-10">
        <h1
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => {
            navigate("/payment");
          }}
        >
          <span className="material-icons-outlined">arrow_back_ios</span>Back
        </h1>
        <h1 className="text-black text-3xl font-semibold py-3 ">
          Review Your Order
        </h1>
        <div className="flex gap-12 w-full items-start pt-7 flex-col lg:flex-row">
          <div className="bg-white text-black lg:w-[70%] w-full flex flex-col gap-3 px-3 pb-5">
            <div className="flex w-full items-center">
              <div className="border border-gray-100 p-3 flex justify-center items-center bg-black text-white rounded-xl">
                <FaHome className="scale-150" />
              </div>
              <div className="bg-gray-800 py-0.5 w-full h-0.5"></div>
              <div className="border border-gray-300 p-3 flex justify-center items-center bg-black text-white rounded-xl">
                <FaCreditCard />
              </div>
              <div className="bg-gray-800 py-0.5 w-full h-0.5"></div>
              <div className="border border-gray-300 p-3 flex justify-center items-center bg-black text-white rounded-xl">
                <FaRegFileAlt />
              </div>
            </div>

            <h1 className="text-black font-semibold text-lg lg:text-xl py-2">
              Estimated Delivery : 22 April 2025
            </h1>
            <div className="flex flex-col gap-3">
              {cart.length >= 1 ? (
                cart[0]?.cart?.items?.map((item, idx) => (
                  <div key={idx} className="flex gap-10">
                    <div className="w-[90%] flex gap-10">
                      <img
                        src={item.productid.image}
                        alt="img1"
                        className="w-14"
                      />
                      <div className="flex gap-10 items-center w-full">
                        <div className="w-full lg:w-[50%]">
                          <h1>{item.productid.title}</h1>
                          <h6>Size: {item.size}</h6>
                          <h1>Price: ₹{item.productid.offerPrice}</h1>
                          <h1>Quantity: {item.quantity}</h1>
                          <h1>
                            Total: ₹{item.productid.offerPrice * item.quantity}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>No items in your cart. Go and shop!</div>
              )}
            </div>

            <div className="pt-5">
              <h1 className="text-2xl font-bold text-black py-2">
                Shipping Address
              </h1>
              <div className="flex justify-between w-full border border-gray-200 px-3 py-1 rounded-2xl">
                <div>
                  <h1 className="text-xl font-bold text-black">
                    {currentaddress?.fullName}
                  </h1>
                  <p className="text-lg text-gray-700">
                    {currentaddress?.address}
                  </p>
                  <p className="text-lg text-gray-700">
                    {currentaddress?.city}, {currentaddress?.pincode}
                  </p>
                </div>
                <FaEdit
                  className="scale-125 cursor-pointer"
                  onClick={() => navigate("/cheakout")}
                />
              </div>
            </div>

            <div className="pt-5">
              <h1 className="text-2xl font-bold text-black py-2">
                Payment Method
              </h1>
              <div className="flex justify-between w-full border border-gray-200 px-3 py-1 rounded-2xl">
                <div>
                  <h1 className="text-xl font-bold text-black">
                    {currentaddress?.fullName}
                  </h1>
                  <p className="text-lg text-gray-700">{paymentmethod}</p>
                </div>
                <FaEdit
                  className="scale-125 cursor-pointer"
                  onClick={() => navigate("/payment")}
                />
              </div>
            </div>
          </div>

          {/* right section */}
          <div className="lg:w-[25%] border-8 border-white h-fit px-3 shadow-sm shadow-gray-500 flex flex-col py-3">
            <h1 className="flex justify-between items-center py-2 text-2xl w-full">
              Subtotal <span>₹{carttotalprice}</span>
            </h1>
            <form
              className="flex border border-black rounded-xl w-full mb-2"
              onSubmit={handleApplyCoupen}
            >
              <input
                type="text"
                className="outline-none px-4 py-2 w-[80%]"
                value={enteredCoupen}
                onChange={(e) => setEnteredCoupen(e.target.value)}
                placeholder="Enter coupon code"
              />
              <button className="bg-black text-white px-1 py-2 w-[20%] rounded-r-xl">
                Apply
              </button>
            </form>
            <h1 className="flex justify-between items-center py-2">
              Delivery Charge <span>₹{deliveryCharge}</span>
            </h1>
            <h1 className="flex justify-between items-center py-2 font-semibold text-2xl border-t border-gray-200">
              Grand Total: <span>₹{grandTotal.toFixed(2)}</span>
            </h1>
            {paymentmethod === "Cash On Delivery" ||
            paymentmethod === "Udhar" ? (
              <button
                className="flex justify-center items-center px-5 py-3 border border-gray-200 rounded-2xl bg-black w-full mt-4 cursor-pointer text-white text-2xl"
                onClick={handleplaceorder}
              >
                Place
              </button>
            ) : (
              <Paymentgateway amount={grandTotal} orderData={orderData} />
            )}
          </div>
        </div>
      </div>
      <Feature />
      <Footer />
    </>
  );
};

export default Placeorder;
