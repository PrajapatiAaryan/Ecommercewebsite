import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../redux/slices/productslice'
import Navbar from '../components/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import Feature from '../components/Feature'
import Footer from '../components/Footer'

const Searchedproductpage = () => {
  const dispatch = useDispatch()
  const {products} = useSelector((state)=>state.product)
  useEffect(() => {
    dispatch(getProducts())
  }, [])
  const {word} = useParams() 
  console.log(word)
  
  const navigate = useNavigate()
  const [selectedcategory, setselectedcategory] = useState([]);
  const filterdproducts =
    selectedcategory.length === 0
      ? products
      : products.filter((product) =>
          selectedcategory.includes(product.category)
        );
  
  const handlecategorychange = (category) => {
    setselectedcategory((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const itemsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  

  const searchProducts = (searchText, products) => {
    return products?.filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    );
  };
  const filteredproducts = searchProducts(word ,products)

   
  const currentProducts = filteredproducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const produtcategories = [
    "Men",
    "Women",
    "kids",
    "accessories",
    "Belts",
    "Wallets",
    "Bags",
    "Watches",
    "winterwear",
  ];
  const colors = ["red", "blue", "pink", "gray", "green", "yellow"];
  const sizes = ["s", "m", "l", "xl", "xxl"];
  const [isopen, setisopen] = useState(false);
  const [coloropen, setcoloropen] = useState(false);
  const [sizeopen, setsizeopen] = useState(false);

  const handleoneproductpage =async(id)=>{
    // console.log(id)
    localStorage.setItem("id", id)
    navigate(`/details`)
  }

  
  return (
   <>
   <Navbar/>
   <div className="min-h-screen px-20 flex justify-center pt-10">
        <div className=" w-full h-full">
          <h1 className=" py-5 px-3">Home{">"}Allproduct</h1>
          <div className="flex">
            <div className="w-[30%] flex flex-col">
              <h1
                className="border border-gray-400 px-4 py-3 flex items-center justify-between cursor-pointer"
                onClick={() => setisopen(!isopen)}
              >
                Product Categories{" "}
                <span className="material-icons-outlined">
                  keyboard_arrow_down
                </span>
              </h1>
              {isopen && (
                <div className="pb-5">
                  {produtcategories.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center py-1 px-2 cursor-pointer "
                    >
                      <input
                        type="checkbox"
                        className="text-xl w-5 h-5 accent-black "
                        onChange={() => handlecategorychange(item)}
                        checked={selectedcategory.includes(item)}
                      />
                      <h1 className="flex justify-between items-center w-full px-4 py-1">
                        {item} <span className="text-2xl">+</span>
                      </h1>
                    </div>
                  ))}
                </div>
              )}
              <h1 className="border border-gray-400 px-4 py-3 flex items-center justify-between ">
                Filter by Price{" "}
                <span className="material-icons-outlined">
                  keyboard_arrow_down
                </span>
              </h1>

              <h1
                className="border border-gray-400 px-4 py-3 flex items-center justify-between cursor-pointer"
                onClick={() => setcoloropen(!coloropen)}
              >
                Filter by Color{" "}
                <span className="material-icons-outlined">
                  keyboard_arrow_down
                </span>
              </h1>
              {coloropen && (
                <div>
                  {colors.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-3 ">
                      <h1 className={`bg-${item}-500 h-4 w-4 `}></h1>
                      <h1 className="flex justify-between items-center w-full text-xl py-1">
                        {item} <span>(16)</span>
                      </h1>
                    </div>
                  ))}
                </div>
              )}
              <h1
                className="border border-gray-400 px-4 py-3 flex items-center justify-between cursor-pointer"
                onClick={() => setsizeopen(!sizeopen)}
              >
                Filter by Size{" "}
                <span className="material-icons-outlined">
                  keyboard_arrow_down
                </span>
              </h1>
              {sizeopen && (
                <div className="pb-5">
                  {sizes.map((item, idx) => (
                    <div key={idx} className="flex items-center py-1 px-2">
                      <input
                        type="checkbox"
                        className="text-xl w-5 h-5 accent-black "
                      />
                      <h1 className="flex justify-between items-center w-full px-4 py-1">
                        {item} <span className="text-2xl">(15)</span>
                      </h1>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="w-[70%]">
              <div className="flex justify-between px-10 py-2 items-center">
                <h1>Showing 1-16 of 57</h1>
                <h1 className=" px-4 py-3 flex items-center justify-between ">
                  Sort by Latest{" "}
                  <span className="material-icons-outlined">
                    keyboard_arrow_down
                  </span>
                </h1>
              </div>
              <div className="grid grid-cols-3">
                {currentProducts?.map((item) => (
                  <div
                    key={item._id}
                    className="relative rounded-xl cursor-pointer group overflow-hidden bg-gray-50 p-6  transition-all duration-300"
                    onClick={()=>handleoneproductpage(item._id)}
                  >
                    {/* Image Section */}
                    <div className="relative w-full h-60 flex justify-center items-center">
                      <img
                        src={item.image}
                        alt="product"
                        className="w-full h-full object-contain rounded-lg"
                      />

                      {/* Hover Icons (Visible on Hover) */}
                      <div className="absolute top-3 right-3 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="material-icons-outlined p-3 bg-white text-gray-700 rounded-full shadow-md hover:bg-gray-200">
                          favorite
                        </span>
                        <span className="material-icons-outlined p-3 bg-white text-gray-700 rounded-full shadow-md hover:bg-gray-200">
                          compare_arrows
                        </span>
                        <span className="material-icons-outlined p-3 bg-white text-gray-700 rounded-full shadow-md hover:bg-gray-200">
                          visibility
                        </span>
                      </div>

                      {/* Add to Cart Button (Visible on Hover) */}
                      <button className="absolute bottom-3 bg-white text-black py-2 px-6 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300">
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
                        ${item.offerPrice}{" "}
                        <span className="line-through text-gray-500 text-lg">
                          ${item.actualPrice}
                        </span>
                      </h1>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-2 py-3">
                <div
                  className="  text-black p-2 w-10 flex justify-center items-center cursor-pointer"
                  onClick={() => changePage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <span className="material-icons-outlined">
                    keyboard_backspace
                  </span>
                </div>
                {[...Array(totalPages)].map((_, index) => (
                  <div
                    key={index}
                    className="border border-black bg-white text-black p-2 w-10 flex justify-center items-center rounded-xl cursor-pointer"
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </div>
                ))}
                <div
                  className="  text-black p-2 w-10 flex justify-center items-center cursor-pointer"
                  onClick={() => changePage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <span className="material-icons-outlined">east</span>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    <Feature/>
    <Footer/>
   </>
  )
}

export default Searchedproductpage
