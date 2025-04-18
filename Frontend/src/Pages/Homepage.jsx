import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Feature from "../components/Feature";
import Footer from "../components/Footer";
import AddProduct from "../admin/Addproduct";
import baner from "/images/freepik__adjust__12200.png";
import HomeCarousel from "../components/HomeCarousel ";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/slices/productslice";
import CountdownTimer from "../components/CountdownTimer";
import { FaBeer, FaInstagram, FaInstagramSquare } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { addtocart } from "../redux/slices/cartslice";
import Carousle from "../components/Carousle";
import Carousle2 from "../components/Carousle2";
import { addtowhishlist } from "../redux/slices/whishlistslice";
import { toast } from "react-toastify";

const Homepage = () => {
  const { products } = useSelector((state) => state.product);
  const { cart, loading, error } = useSelector((state) => state.cart);
  const [qty, setqty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setvisible] = useState(false);
  // console.log(products.filter((item)=>item.offerPrice > 2000))
  useEffect(() => {
    dispatch(getProducts()); // Fetch products when the component mounts
  }, [dispatch]);
  const handleoneproductpage = async (id) => {
    // console.log(id)
    localStorage.setItem("id", id);
    navigate(`/details`);
    window.scrollTo(0, 0);
  };
  const handleaddtocart = async (id, qty) => {
    dispatch(addtocart({ productid: id, quantity: Number(qty) }));
    window.location.reload();
    setqty(1);
  };
  const handleaddtowhishlist = async (id, qty) => {
    dispatch(addtowhishlist({ productid: id, quantity: Number(qty) }));
    window.location.reload();
    setqty(1);
  };


  // thsi is for toast of success 
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const status = query.get("status");

    if (status === "success") {
      toast.success("Order placed successfully 🎉");
    } else if (status === "failed") {
      toast.error("Payment failed. Order not placed ❌");
    }

    if (status) {
      // Remove the status query from the URL after showing toast
      const cleanUrl = location.pathname;
      navigate(cleanUrl, { replace: true }); // replaces the current history entry
    }
  }, [location, navigate]);

  return (
    <>
      <Navbar />

      <HomeCarousel />
      <Carousle />
      {/* <section>
        <div className="flex justify-center md:px-20 flex-col">
          <div className="flex justify-between items-center p-10">
            <h1 className="text-4xl ">Shop by Categories</h1>
            <div className="flex gap-2 items-center ">
              <button className="flex justify-center items-center p-4 border border-white bg-gray-50 rounded-md">
                <span className="material-icons-outlined">west</span>
              </button>
              <button className="flex justify-center items-center p-4 border border-white bg-gray-800 rounded-md text-white">
                <span className="material-icons-outlined">east</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-10 place-items-center py-3 gap-10">
            <div className="bg-gray-50 min-h-[50vh] flex flex-col  items-center py-2 ">
              <h1 className="text-gray-600 text-7xl opacity-30 absolute font-bold">
                Casual
              </h1>
              <img
                src="/images/Casual.png"
                alt=""
                className="h-[45vh] w-full z-10 object-contain"
              />
              <button className="flex justify-center items-center px-20 py-4 bg-white rounded-xl border border-black text-xl absolute mt-60 z-10 ">
                {" "}
                Casual Wear
              </button>
            </div>
            <div className="bg-gray-50 min-h-[50vh] flex flex-col  items-center py-2 ">
              <h1 className="text-gray-600 text-7xl opacity-30 absolute font-bold">
                Ethic
              </h1>
              <img
                src="/images/ethic.png"
                alt=""
                className="h-[45vh] w-full z-10 object-contain"
              />
              <button className="flex justify-center items-center px-20 py-4 bg-white rounded-xl border border-black text-xl absolute mt-60 z-10 ">
                {" "}
                Ethic Wear
              </button>
            </div>
            <div className="bg-gray-50 min-h-[50vh]  flex flex-col  items-center py-2 ">
              <h1 className="text-gray-600 text-7xl opacity-30 absolute font-bold">
                Western
              </h1>
              <img
                src="/images/western.png"
                alt=""
                className="h-[45vh] w-full z-10 object-contain"
              />
              <button className="flex justify-center items-center px-20 py-4 bg-white rounded-xl border border-black text-xl absolute mt-60 z-10 ">
                {" "}
                western Wear
              </button>
            </div>
            <div className="bg-gray-50 min-h-[50vh] w-full flex flex-col  items-center py-2 ">
              <h1 className="text-gray-600 text-7xl opacity-30 absolute font-bold">
                Kids
              </h1>
              <img
                src="/images/kids.png"
                alt=""
                className="h-[45vh] w-full z-10 object-contain"
              />
              <button className="flex justify-center items-center px-20 py-4 bg-white rounded-xl border border-black text-xl absolute mt-60 z-10 ">
                {" "}
                Kids Wear
              </button>
            </div>
          </div>
        </div>
        
      </section> */}
      <section>
        <div className="flex flex-col justify-center items-center md:px-20 w-full">
          <div className="p-6 text-center">
            <h1 className="text-4xl font-semibold">Our Bestseller</h1>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-5 py-2 gap-6 w-full">
            {products?.slice(0, 8).map((item) => (
              <div
                key={item._id}
                className="relative rounded-xl cursor-pointer group overflow-hidden bg-gray-50 p-6  transition-all duration-300"
              >
                {/* Image Section */}
                <div className="relative w-full h-60 flex justify-center items-center">
                  <img
                    src={item.image}
                    alt="product"
                    className="w-full h-full object-contain rounded-lg"
                    onClick={() => handleoneproductpage(item._id)}
                  />

                  {/* Hover Icons (Visible on Hover) */}
                  <div className="absolute top-3 right-3 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span
                      className="material-icons-outlined p-3 bg-white text-gray-700 rounded-full shadow-md hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleaddtowhishlist(item._id, qty)}
                    >
                      favorite
                    </span>
                    <span className="material-icons-outlined p-3 bg-white text-gray-700 rounded-full shadow-md hover:bg-gray-200">
                      compare_arrows
                    </span>
                    <span
                      className="material-icons-outlined p-3 bg-white text-gray-700 rounded-full shadow-md hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleoneproductpage(item._id)}
                    >
                      visibility
                    </span>
                  </div>

                  {/* Add to Cart Button (Visible on Hover) */}
                  <button
                    className="absolute bottom-3 bg-white text-black py-2 px-6 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-200"
                    onClick={() => handleoneproductpage(item._id)}
                  >
                    Add to Cart
                  </button>
                </div>

                {/* Product Details */}
                <div className="flex flex-col gap-2 px-2 mt-4">
                  <h1 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h1>
                  <h2 className="text-gray-600">{item.titleDescription}</h2>
                  <h1 className="text-xl font-bold text-black">
                    ₹{item.offerPrice}{" "}
                    <span className="line-through text-gray-500 text-lg">
                      ₹{item.actualPrice}
                    </span>
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="flex  justify-center items-center  lg:px-8  w-full px-3">
          <div className="flex justify-between items-center md:flex-row flex-col-reverse w-full pt-20 ">
            <div className="md:pl-6 flex justify-center items-center w-fit  md:w-1/2 overflow-hidden  px-4">
              <div className="flex flex-col gap-3  p-3">
                <h1 className="lg:text-3xl text-black text-xl text-center lg:text-start font-semibold">
                  Deals of the Month
                </h1>
                <p className="text-sm lg:text-xl text-gray-900  ">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Aliquam delectus quidem, sab ex maiores magni. Eius enim
                  tempore nostrum quia quasi?quidem, sab ex maiores magni. Eius
                  enim tempore nostrum quia quasi?quidem, sab ex maiores magni.
                  Eius enim tempore nostrum quia quasi?quidem, sab ex maiores
                  magni. Eius enim tempore nostrum quia quasi?
                </p>
                <div className="lg:px-20 py-2">
                  <CountdownTimer />
                </div>
                <div>
                  <button
                    className="bg-gray-900 rounded-xl text-white flex justify-center items-center px-7 py-3 border border-gray-50 gap-3 cursor-pointer"
                    onClick={() => {
                      navigate("/allproducts");
                      window.scrollTo(0, 0);
                    }}
                  >
                    View All Products{" "}
                    <span className="material-icons-outlined">
                      arrow_right_alt
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className=" md:w-1/2 flex justify-center md:justify-end pr-4 items-center ">
              <img
                src="/images/dealofmonth.png"
                alt=""
                className="h-[80%] w-[80%] object-contain"
              />
            </div>
          </div>
        </div>
      </section>
      {/* <section>
        <div className="min-h-[70vh]  bg-gray-50 my-10 flex justify-center items-center md:px-20">
          <div className="w-full flex flex-col  gap-12 min-h-[60vh]">
            <div className="flex justify-between px-3 w-full">
              <h1 className="text-3xl text-black font-semibold">
                What Our Customer Say's
              </h1>
              <div className="flex gap-2 items-center">
                <button className="flex justify-center items-center p-4 border border-white bg-gray-200 rounded-md">
                  <span className="material-icons-outlined">west</span>
                </button>
                <button className="flex justify-center items-center p-4 border border-white bg-gray-800 rounded-md text-white">
                  <span className="material-icons-outlined">east</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="flex flex-col justify-center gap-3 bg-white  rounded-2xl px-3 py-3 h-[35vh]">
                <h1>⭐⭐⭐⭐⭐</h1>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Earum officiis in nesciunt consequuntur excepturi, expedita
                  facilis harum, quos molestias culpa itaque alias. Illo,
                  voluptate!
                </p>
                <div className="flex gap-5 pt-5">
                  <img
                    src="/images/user1.jpeg"
                    alt=""
                    className="w-12 rounded-full"
                  />
                  <div>
                    <h1 className="text-xl text-black font-semibold">
                      jecob jones
                    </h1>
                    <h1 className="text-gray-600">model</h1>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-3 bg-white  rounded-2xl px-3 py-3 h-[35vh]">
                <h1>⭐⭐⭐⭐⭐</h1>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Earum officiis in nesciunt consequuntur excepturi, expedita
                  facilis harum, quos molestias culpa itaque alias. Illo,
                  voluptate!
                </p>
                <div className="flex gap-5 pt-5">
                  <img
                    src="/images/user1.jpeg"
                    alt=""
                    className="w-12 rounded-full"
                  />
                  <div>
                    <h1 className="text-xl text-black font-semibold">
                      jecob jones
                    </h1>
                    <h1 className="text-gray-600">model</h1>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-3 bg-white  rounded-2xl px-3 py-3 h-[35vh]">
                <h1>⭐⭐⭐⭐⭐</h1>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Earum officiis in nesciunt consequuntur excepturi, expedita
                  facilis harum, quos molestias culpa itaque alias. Illo,
                  voluptate!
                </p>
                <div className="flex gap-5 pt-5">
                  <img
                    src="/images/user1.jpeg"
                    alt=""
                    className="w-12 rounded-full"
                  />
                  <div>
                    <h1 className="text-xl text-black font-semibold">
                      jecob jones
                    </h1>
                    <h1 className="text-gray-600">model</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <Carousle2 />
      <section>
        <div className="flex justify-center items-center md:px-20 w-full  ">
          <div className="min-h-[100%] pt-32  w-full">
            <div className="flex justify-center items-center pb-14">
              <h1 className="text-3xl text-black font-semibold">
                Our Instagram Stories
              </h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-4">
              <div className="h-[40vh] ">
                <img
                  src="/images/insta3.jpg"
                  alt="img1"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="h-[40vh]">
                <img
                  src="/images/insta1.webp"
                  alt="img1"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="h-[40vh]">
                <img
                  src="/images/insta4.jpg"
                  alt="img1"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="h-[40vh]">
                <img
                  src="/images/insta2.jpg"
                  alt="img1"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Feature />
      <Footer />
    </>
  );
};

export default Homepage;
