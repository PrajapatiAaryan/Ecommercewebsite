import React, { useEffect, useState } from "react";
import {
  addtocart,
  clearcart,
  decreseqty,
  getcart,
  removecartitems,
} from "../redux/slices/cartslice";
import { useDispatch, useSelector } from "react-redux";
import {
  addtowhishlist,
  getwhishlist,
  removefromwhishlist,
} from "../redux/slices/whishlistslice";
import { useLocation, useNavigate } from "react-router-dom";
import { getorder } from "../redux/slices/orderslice";
import axios from "axios";
import { toast } from "react-toastify";

const Myorder = () => {
  const { whishlist, loading, error } = useSelector((state) => state.whishlist);
  const { order } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setqty] = useState(1);
  const [orderproduct, setorderproduct] = useState([]);
  useEffect(() => {
    dispatch(getwhishlist());
    dispatch(getorder());
  }, []);

  useEffect(() => {
    const fetchAllOrderProducts = async () => {
      const finalOrders = await Promise.all(
        order?.order?.map(async (ord) => {
          const itemsWithDetails = await Promise?.all(
            ord.items.map(async (item) => {
              const response = await axios.get(
                `https://amart-wil3.onrender.com/product/detailproduct/${item.productId}`
              );

              return {
                productDetails: response.data.product,
                quantity: item.quantity,
                price: item.price,
                size: item.size,
                color: item.color,
              };
            })
          );

          return {
            _id: ord._id,
            orderStatus: ord.orderStatus,
            paymentStatus: ord.paymentStatus,
            totalAmount: ord.totalAmount,
            shippingAddress: ord.shippingAddress,
            items: itemsWithDetails,
          };
        })
      );

      setorderproduct(finalOrders);
    };

    fetchAllOrderProducts();
  }, [order]);

  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const status = query.get("status");

    if (status === "success") {
      toast.success("Order placed successfully 🎉");
      dispatch(clearcart());
    } else if (status === "failed") {
      toast.error("Payment failed. Order not placed ❌");
    }

    if (status) {
      // Remove the status query from the URL after showing toast
      const cleanUrl = location.pathname;
      navigate(cleanUrl, { replace: true }); // replaces the current history entry
    }
  }, [location, navigate]);

  console.log("my orders are ", order)
  return (
    <>
      <div className=" flex flex-col gap-7 h-[70vh] overflow-scroll no-scrollbar">
        {orderproduct?.length >= 1 ? (
          <div>
            {orderproduct.map((order) => (
              <div
                key={order._id}
                className="border p-4 mb-5 border-gray-200 shadow-xl shadow-gray-100 rounded-2xl"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold">Order ID: {order._id}</h2>
                  <span className="text-sm text-green-600">
                    {order.orderStatus}
                  </span>
                </div>
                <p>Payment Status: {order.paymentStatus}</p>
                <p>Total: ₹{order.totalAmount}</p>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-3 border p-3 rounded-2xl border-gray-200 shadow shadow-gray-200"
                    >
                      <img
                        src={item.productDetails.image}
                        alt={item.productDetails.title}
                        className="w-20 h-20 object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">
                          {item.productDetails.title}
                        </h3>
                        <p>Qty: {item.quantity}</p>
                        <p>Price: ₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center text-2xl text-green-500 h-1/2 px-20">
            <h1>
              you does not order anythin go and order now in first order you can
              get 70% off by using coupen{" "}
              <span className="text-2xl text-blue-600">new70</span>
            </h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Myorder;
