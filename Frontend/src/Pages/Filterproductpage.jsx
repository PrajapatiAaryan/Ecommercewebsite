import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Feature from "../components/Feature";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addtowhishlist } from "../redux/slices/whishlistslice";

const Filterproductpage = () => {
  const { category } = useParams();
  const { products } = useSelector((state) => state.product);
  const [filterproducts, setfilterproducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [qty, setqty] = useState(1)
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

    // Filter by category
    if (category) {
      filtered = filtered.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase()
      );
    }

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

 
  const handleaddtowhishlist = async (id, qty) => {
    try {
      const result = await dispatch(addtowhishlist({ productid: id, quantity: Number(qty) }));
  
      if (addtowhishlist.fulfilled.match(result)) {
        setqty(1);
        // Optional: show a message
        // toast.success("Item added to wishlist!");
      } else {
        console.error("Failed to add to wishlist:", result.payload);
        // Optional: show error
        // toast.error("Something went wrong.");
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
            <span className="lg:hidden">Clear</span>
            <span className="hidden lg:flex">Clear All Filters </span>
          </button>

          {/* Price Filter Dropdown */}
          <div className="border border-gray-400 lg:px-4 lg:py-3 mb-2 h-fit p-1">
            <div className="flex justify-between items-center font-semibold cursor-pointer">
              <h1 className="lg:hidden">Price</h1>
              <h1 className="hidden lg:flex">Filter by Price</h1>
              <button
                onClick={() =>
                  setcoloropen(false) ||
                  setsizeopen(false) ||
                  setPriceRangeOpen(!priceRangeOpen)
                }
              >
                <span className="material-icons-outlined ">
                  keyboard_arrow_down
                </span>
              </button>
            </div>
            {priceRangeOpen && (
              <div className="mt-2 w-fit">
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
              <h1 className="lg:hidden">Color</h1>
              <h1 className="hidden lg:flex">Filter by Color</h1>
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
              <h1 className="lg:hidden">Size</h1>
              <h1 className="hidden lg:flex">Filter by Size</h1>

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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filterproducts.length === 0 ? (
              <h2 className="col-span-3 text-center text-xl font-semibold">
                No products found.
              </h2>
            ) : (
              filterproducts.map((item) => (
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
        </div>
      </div>

      <Feature />
      <Footer />
    </>
  );
};

export default Filterproductpage;
