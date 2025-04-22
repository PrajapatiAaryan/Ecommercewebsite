import React, { useEffect } from "react";
import { Link, Outlet, useNavigate, NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const links = [
    { path: "/admin", label: "Dashboard", exact: true },
    { path: "/admin/products", label: "All Products" },
    { path: "/admin/add-product", label: "Add Products" },
    { path: "/admin/order", label: "Orders" },
  ];

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
        <div className="w-full md:w-[30%] bg-white p-6 rounded-2xl shadow-lg">
          <ol className="list-none flex flex-col gap-6 text-2xl p-5">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/admin"} // only add "end" for dashboard
                className={({ isActive }) =>
                  `border-b border-gray-300 px-5 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-black text-white font-semibold"
                      : "hover:bg-gray-100 text-black"
                  }`
                }
              >
                <li>{link.label}</li>
              </NavLink>
            ))}
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
