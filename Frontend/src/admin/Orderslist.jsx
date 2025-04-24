import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallorders, updateorder, updatepayment } from "../redux/slices/orderslice";
import axios from "axios";
import { toast } from "react-toastify";

const Orderslist = () => {
  const { order } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [orderproduct, setorderproduct] = useState([]);
  const [statusToUpdate, setStatusToUpdate] = useState(null);
  const [paymentStatusToUpdate, setPaymentStatusToUpdate] = useState(null);

  useEffect(() => {
    dispatch(getallorders());
  }, [dispatch]);

  useEffect(() => {
    const fetchAllOrderProducts = async () => {
      if (!order?.orders || !Array.isArray(order.orders)) return;

      const finalOrders = await Promise.all(
        order.orders.map(async (ord) => {
          const itemsWithDetails = await Promise.all(
            ord.items.map(async (item) => {
              const response = await axios.get(
                `https://amart-wil3.onrender.com/product/detailproduct/${item.productId}`
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

  // ✅ Function to update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      dispatch(updateorder({ orderId, newStatus }));
      dispatch(getallorders());
      // window.location.reload();
    } catch (error) {
      console.error("Error updating order status", error);
    }
  };

  // ✅ Function to update payment status
  const updatePaymentStatus = async (orderId, newPaymentStatus) => {
    try {
      dispatch(updatepayment({ orderId, newPaymentStatus }));
      dispatch(getallorders());
      // window.location.reload();
    } catch (error) {
      console.error("Error updating payment status", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-7 h-[90vh] overflow-scroll no-scrollbar">
        {orderproduct.map((order) => (
          <div key={order._id} className="border p-4 mb-5 rounded-2xl border-gray-200 shadow-xl shadow-gray-50">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Order ID: {order._id}</h2>
              <span className="text-sm text-green-600">
                {order.orderStatus}
              </span>
            </div>

            {/* Payment Status */}
            <div className="mt-2">
              {order.paymentStatus === "Paid" ? (
                <p>Payment Status: {order.paymentStatus}</p>
              ) : (
                <div className="flex items-center gap-3">
                  <select
                    value={
                      paymentStatusToUpdate?.orderId === order._id
                        ? paymentStatusToUpdate.status
                        : order.paymentStatus
                    }
                    onChange={(e) =>
                      setPaymentStatusToUpdate({
                        orderId: order._id,
                        status: e.target.value,
                      })
                    }
                    className="border border-gray-400 px-2 py-1 rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                  </select>

                  {paymentStatusToUpdate?.orderId === order._id &&
                    paymentStatusToUpdate.status !== order.paymentStatus && (
                      <button
                        onClick={() =>
                          updatePaymentStatus(
                            order._id,
                            paymentStatusToUpdate.status
                          )
                        }
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Update Payment
                      </button>
                    )}
                </div>
              )}
            </div>

            <p>Total: ₹{order.totalAmount}</p>

            {/* Order Items */}
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex gap-3 border border-gray-200 rounded-2xl p-3 shadow-xl shadow-gray-50">
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

            {/* Dropdown to update Order Status */}
            <div className="mt-4 border border-black w-fit p-2 rounded">
              <select
                value={
                  statusToUpdate?.orderId === order._id
                    ? statusToUpdate.status
                    : order.orderStatus
                }
                onChange={(e) =>
                  setStatusToUpdate({
                    orderId: order._id,
                    status: e.target.value,
                  })
                }
                className="outline-none"
              >
                <option value="Placed">Placed</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {statusToUpdate?.orderId === order._id &&
              statusToUpdate.status !== order.orderStatus && (
                <button
                  onClick={() =>
                    updateOrderStatus(order._id, statusToUpdate.status)
                  }
                  className="mt-3 bg-blue-500 text-white p-2 rounded"
                >
                  Update Status
                </button>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orderslist;
