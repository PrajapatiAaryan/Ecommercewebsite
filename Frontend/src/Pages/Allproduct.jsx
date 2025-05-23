import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Feature from "../components/Feature";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addtowhishlist } from "../redux/slices/whishlistslice";

const Allproduct = () => {
  const { category } = useParams();
  const { products } = useSelector((state) => state.product);
  const [filterproducts, setfilterproducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [qty, setqty] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  // Filters state
  const [priceRange, setPriceRange] = useState([0, 9999]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  // Filter dropdown toggles
  const [coloropen, setcoloropen] = useState(false);
  const [sizeopen, setsizeopen] = useState(false);
  const [priceRangeOpen, setPriceRangeOpen] = useState(false);

  const colors = ["red", "blue", "pink", "gray", "green", "yellow"];
  const sizes = ["s", "m", "l", "xl", "xxl"];

  useEffect(() => {
    let filtered = products;

    // Filter by price
    filtered = filtered.filter(
      (item) =>
        item.offerPrice >= priceRange[0] && item.offerPrice <= priceRange[1]
    );

    // Filter by selected colors (check if any color in the product matches selected colors)
    if (selectedColors.length > 0) {
      filtered = filtered.filter((item) =>
        item.color?.some((c) => selectedColors.includes(c.toLowerCase()))
      );
    }

    // Filter by selected sizes (check if any size in the product matches selected sizes)
    if (selectedSizes.length > 0) {
      filtered = filtered.filter((item) =>
        item.availableSizes?.some((s) =>
          selectedSizes.includes(s.toLowerCase())
        )
      );
    }

    setfilterproducts(filtered);
  }, [products, category, priceRange, selectedColors, selectedSizes]);
  // console.log("this is all products", products);

  const handleCheckbox = (value, list, setList) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  const handleoneproductpage = (id) => {
    localStorage.setItem("id", id);
    navigate(`/details`);
  };

  // pages logic
  const productsPerPage = 9;
  const totalPages = Math.ceil(filterproducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filterproducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
    window.scrollTo(0,0)
  };

  // const handleaddtowhishlist =(id, qty) => {
  //   console.log("button is clicket whishlist")
  //   dispatch(addtowhishlist({ productid: id, quantity: Number(qty) }));
  //   window.location.reload();
  //   setqty(1);
  // };
  
  // whishlist handling
  const handleaddtowhishlist = async (id, qty) => {
    try {
      const result = await dispatch(addtowhishlist({ productid: id, quantity: Number(qty) }));
  
      if (addtowhishlist.fulfilled.match(result)) {
        setqty(1);
        // Optionally show a toast or alert here
        // toast.success("Item added to wishlist!");
      } else {
        // Optionally show error
        // toast.error("Failed to add to wishlist.");
        console.error("Failed to add to wishlist:", result.payload);
      }
    } catch (error) {
      console.error("Error in handleaddtowhishlist:", error);
    }
  };
  

  return (
    <>
      <Navbar />

      <div className="w-full flex gap-4 px-2 lg:px-20 pt-10 flex-col lg:flex-row">
        {/* -------- Filter Section -------- */}
        <div className="w-full lg:w-[30%] flex flex-row lg:flex-col mr-3">
          {/* Clear Filters Button */}
          <button
            onClick={() => {
              setPriceRange([0, 9999]);
              setSelectedColors([]);
              setSelectedSizes([]);
            }}
            className="mb-4 p-2 bg-gray-500 text-white font-semibold rounded hover:bg-gray-700 w-fit h-fit lg:w-full"
          >
            <span className="hidden lg:block">Clear All Filters</span>
            <span className="block lg:hidden">Clear</span>
          </button>

          {/* Price Filter Dropdown */}
          <div className="border border-gray-400 lg:px-4 lg:py-3 mb-2 h-fit p-1">
            <div className="flex justify-between items-center font-semibold cursor-pointer">
              <h1 className="hidden lg:block">Filter by Price</h1>
              <h1 className="block lg:hidden"> Price</h1>
              <button
                onClick={() =>
                  setcoloropen(false) ||
                  setsizeopen(false) ||
                  setPriceRangeOpen(!priceRangeOpen)
                }
              >
                <span className="material-icons-outlined">
                  keyboard_arrow_down
                </span>
              </button>
            </div>
            {priceRangeOpen && (
              <div className="mt-2">
                {[
                  { label: "All", range: [0, 9999] },
                  { label: "Below ₹500", range: [0, 500] },
                  { label: "₹500 - ₹1000", range: [500, 1000] },
                  { label: "₹1000 - ₹2000", range: [1000, 2000] },
                  { label: "Above ₹2000", range: [2000, 80000] },
                ].map(({ label, range }, index) => (
                  <label key={index} className="block">
                    <input
                      type="radio"
                      name="price"
                      checked={
                        priceRange[0] === range[0] && priceRange[1] === range[1]
                      }
                      onChange={() => setPriceRange(range)}
                    />{" "}
                    {label}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Color Filter Dropdown */}
          <div className="border border-gray-400 lg:px-4 lg:py-3 mb-2 h-fit p-1">
            <div className="flex justify-between items-center font-semibold cursor-pointer">
              <h1 className="hidden lg:block">Filter by Color</h1>
              <h1 className="block lg:hidden">Color</h1>

              <button
                onClick={() =>
                  setsizeopen(false) ||
                  setPriceRangeOpen(false) ||
                  setcoloropen(!coloropen)
                }
              >
                <span className="material-icons-outlined">
                  keyboard_arrow_down
                </span>
              </button>
            </div>
            {coloropen && (
              <div className="mt-2">
                {colors.map((color, idx) => (
                  <label key={idx} className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      checked={selectedColors.includes(color)}
                      onChange={() =>
                        handleCheckbox(color, selectedColors, setSelectedColors)
                      }
                    />
                    <span className="capitalize">{color}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Size Filter Dropdown */}
          <div className="border border-gray-400 lg:px-4 lg:py-3 h-fit p-1">
            <div className="flex justify-between items-center font-semibold cursor-pointer">
              <h1 className="hidden lg:block">Filter by Size</h1>
              <h1 className="block lg:hidden">Size</h1>
              <button
                onClick={() =>
                  setcoloropen(false) ||
                  setPriceRangeOpen(false) ||
                  setsizeopen(!sizeopen)
                }
              >
                <span className="material-icons-outlined">
                  keyboard_arrow_down
                </span>
              </button>
            </div>
            {sizeopen && (
              <div className="mt-2">
                {sizes.map((size, idx) => (
                  <label key={idx} className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      checked={selectedSizes.includes(size)}
                      onChange={() =>
                        handleCheckbox(size, selectedSizes, setSelectedSizes)
                      }
                    />
                    <span className="uppercase">{size}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* -------- Product Section -------- */}
        <div className="w-full lg:w-[70%]">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {filterproducts.length === 0 ? (
              <h2 className="col-span-3 text-center text-xl font-semibold">
                No products found.
              </h2>
            ) : (
              currentProducts.map((item) => (
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
              ))
            )}
          </div>
            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-8 space-x-2  sticky">
              {/* Left Arrow */}
              <button
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <span className="material-icons-outlined">west</span>
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => changePage(index + 1)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full font-semibold  ${
                    currentPage === index + 1
                      ? "bg-black text-white p-2"
                      : "bg-gray-200 text-gray-700"
                  }  hover:bg-gray-300 transition-all`}
                >
                  {index + 1}
                </button>
              ))}

              {/* Right Arrow */}
              <button
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <span className="material-icons-outlined">east</span>
              </button>
            </div>
        </div>
      </div>

      <Feature />
      <Footer />
    </>
  );
};

export default Allproduct;
