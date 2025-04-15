import React, { useEffect, useState } from "react";
import {
  addtocart,
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
import { useNavigate } from "react-router-dom";
import { getorder } from "../redux/slices/orderslice";
import axios from "axios";

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
        order?.order.map(async (ord) => {
          const itemsWithDetails = await Promise.all(
            ord.items.map(async (item) => {
              const response = await axios.get(
                `http://localhost:4000/product/detailproduct/${item.productId}`
              );

              return {
                productDetails: response.data.product,
                quantity: item.quantity,
                price: item.price,
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



  
  return (
    <>
      <div className="flex flex-col gap-7 h-[70vh] overflow-scroll no-scrollbar">
        {/* {whishlist[0]?.whishlist?.items?.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <div>
                  <img src={item.productid.image} alt="img"  className="w-20 h-20"/>
                </div>
                <div>
                  <h1>{item.productid.title}</h1>
                  <h1>Size:l</h1>
                  <h1>qty:1</h1>
                </div>
              </div>
              <div>
                <h1>${item.productid.offerPrice}</h1>
              </div>
              <div className="flex flex-col gap-4">
                <button className="border border-gray-500 text-black bg-white rounded-xl px-4 py-2 flex justify-center items-center cursor-pointer">
                  View Order
                </button>
                <button className="border border-gray-500 text-white bg-black rounded-xl px-4 py-2 flex justify-center items-center cursor-pointer">
                  Write a Review
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <h1 className="bg-gray-200 text-green-400 border border-gray-200 rounded-xl px-4 py-2 flex justify-center items-center text-xl">
                Delivered
              </h1>
              <p>Your Prodcut Has Been Deliverd</p>
            </div>
          </div>
        ))} */}

        {/* order details */}
        {orderproduct.map((order) => (
          <div key={order._id} className="border p-4 mb-5 rounded">
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
                <div key={idx} className="flex gap-3 border p-3 rounded">
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
    </>
  );
};

export default Myorder;
