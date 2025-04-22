// components/charts/DoughnutChart.jsx
import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { getallorders } from "../redux/slices/orderslice";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const { order } = useSelector((state) => state.order);
  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(getallorders());
    }, [dispatch]);
    const Placed = order?.orders?.filter((item)=>item.orderStatus==="Placed").length
    const Processing = order?.orders?.filter((item)=>item.orderStatus==="Processing").length
    const Shipped = order?.orders?.filter((item)=>item.orderStatus==="Shipped").length
    const Delivered = order?.orders?.filter((item)=>item.orderStatus==="Delivered").length
    const Cancelled = order?.orders?.filter((item)=>item.orderStatus==="Cancelled").length
    
  const data = {
    labels: ["Placed", "Processing", "Shipped","Delivered","Cancelled"],
    datasets: [
      {
        label: "Order Status",
        data: [Placed, Processing, Shipped,Delivered ,Cancelled],
        backgroundColor:["#FF9F40", "#36A2EB", "#FFCE56", "#4BC0C0", "#FF6384" ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
};

export default DoughnutChart;
