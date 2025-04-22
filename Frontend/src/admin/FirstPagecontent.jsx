import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/slices/productslice";
import { getallorders } from "../redux/slices/orderslice";
import { getAllUsers } from "../redux/slices/authslice";
import BarChart from "../charts/BarChart";
import LineChart from "../charts/LineChart";
import DoughnutChart from "../charts/DoughnutChart";

const FirstPagecontent = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const { order } = useSelector((state) => state.order);
  const { allUsers } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getProducts()); // Fetch products when the component mounts
    dispatch(getallorders());
    dispatch(getAllUsers());
  }, [dispatch]);
  const totalproduct = products?.length;
  const totalorders = order?.orders.length;
  const totalsales = order?.orders?.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );
  const totalusers = allUsers?.users?.length;
  // const totalsales = order?.orders
  return (
    <>
      <div className="p-6 space-y-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-blue-400 text-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center">
            <h1 className="text-lg font-medium">Total Products</h1>
            <span className="text-3xl font-bold text-black mt-2">
              {totalproduct}
            </span>
          </div>

          <div className="bg-green-400 text-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center">
            <h1 className="text-lg font-medium">Total Users</h1>
            <span className="text-3xl font-bold text-black mt-2">
              {totalusers}
            </span>
          </div>

          <div className="bg-yellow-400 text-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center">
            <h1 className="text-lg font-medium">Total Sales</h1>
            <span className="text-3xl font-bold text-black mt-2">
              ₹{totalsales}
            </span>
          </div>

          <div className="bg-purple-400 text-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center">
            <h1 className="text-lg font-medium">Total Orders</h1>
            <span className="text-3xl font-bold text-black mt-2">
              {totalorders}
            </span>
          </div>
        </div>

        {/* Charts Section */}
        <div className="space-y-10">
          <div className="bg-white p-6 rounded-2xl shadow-lg h-[60vh] flex justify-center items-center flex-col">
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">
               Products Category (Bar Chart)
            </h2>
            <BarChart />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg h-[60vh] flex flex-col justify-center items-center">
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">
              Sales  (Line Chart)
            </h2>
            <LineChart />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg  h-[60vh] flex justify-center items-center flex-col">
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">
              Order Status (Doughnut Chart)
            </h2>
            <DoughnutChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default FirstPagecontent;
