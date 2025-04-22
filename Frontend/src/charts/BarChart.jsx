// components/charts/BarChart.jsx
import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/slices/productslice";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = () => {
  const { products, loading, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts()); // Fetch products when the component mounts
  }, [dispatch]);

  // Step 1: Create an object to store the count of products by category
  const categoryCount = products?.reduce((acc, product) => {
    let category = product?.category?.toLowerCase(); // Normalize to lowercase
    if (category) {
      acc[category] = acc[category] ? acc[category] + 1 : 1;
    }
    return acc;
  }, {});
  
  
  // Step 2 :Extract categories and their counts for chart
  const categories = Object.keys(categoryCount); // ['men', 'women', ...]
  const productCounts = Object.values(categoryCount); // [18, 17, ...]

  // Step 3: Assign a unique color to each category
  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Generate a unique color for each category
  const categoryColors = categories.map(() => generateRandomColor());

  const data = {
    labels: categories, // Categories as the labels on the x-axis
    datasets: [
      {
        label: "Products by Category",
        data: productCounts, // Number of products per category
        backgroundColor: categoryColors, // Array of random colors for each category
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Products",
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
