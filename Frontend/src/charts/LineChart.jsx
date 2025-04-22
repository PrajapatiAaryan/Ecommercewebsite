// components/charts/LineChart.jsx
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { getallorders } from "../redux/slices/orderslice";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const LineChart = () => {
  const { order } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    dispatch(getallorders()); // Fetch all orders when the component mounts
  }, [dispatch]);

  // Calculate total sales for the current month
  const totalsales = order?.orders?.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );

  // Temporary data for previous months (you can replace this with actual data if available)
  const previousMonthsSales = [500, 6100, 5500, 5800, 6500]; // Example sales data for Jan to May

  // Prepare sales data for the chart
  const salesDataForChart = [
    ...previousMonthsSales, // Previous months (Jan to May)
    totalsales, // Current month's sales
  ];

  // Labels for the months
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  const data = {
    labels: months, // Labels for the months on the x-axis
    datasets: [
      {
        label: "Monthly Sales",
        data: salesDataForChart, // Data for sales in each month
        fill: false,
        borderColor: "#3e95cd",
        tension: 0.3,
      },
    ],
  };

  return <Line data={data} />;
};

export default LineChart;
