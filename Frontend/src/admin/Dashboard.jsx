import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  // If the role is not admin, navigate to a different page (e.g., home page)
  useEffect(() => {
    if (role !== "admin") {
      navigate("/"); // Redirect to homepage if not admin
    }
  }, [role, navigate]);

  // If role is admin, render the dashboard
  if (role !== "admin") {
    return null; // Avoid rendering the rest of the content if not admin
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-[30%] border-b md:border-x md:border-gray-600">
          <ol className="list-none flex flex-col gap-6 text-2xl p-5">
            <Link to="/admin" className="cursor-pointer">
              <li className="border-b border-gray-400 px-5 py-3">Dashboard</li>
            </Link>
            <Link to="/admin/products" className="cursor-pointer">
              <li className="border-b border-gray-400 px-5 py-3">All Products</li>
            </Link>
            <Link to="/admin/add-product" className="cursor-pointer">
              <li className="border-b border-gray-400 px-5 py-3">Add Products</li>
            </Link>
          </ol>
        </div>

        {/* Content Area */}
        <div className="w-full md:w-[70%] p-5">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
