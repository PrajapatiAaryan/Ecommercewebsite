import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getdetailproduct, getProducts } from "../redux/slices/productslice";
import { useNavigate } from "react-router-dom";

const RelatedProducts = () => {
  const { detailproduct, products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  // console.log("detail product", detailproduct)
  useEffect(() => {
    dispatch(getdetailproduct())
    dispatch(getProducts());
  }, []);
  const relatedproucts = products
    .filter((item) => item.category === detailproduct.category)
    .filter((item) => item.subcategory === detailproduct.subcategory);
  
    const handleoneproductpage =async(id)=>{
      // console.log(id)
      localStorage.setItem("id", id)
      navigate('/details')
      window.location.reload()
      window.scrollTo(0,0)
    } 
    

  return (
    <>
      <div className="flex px-20">
        <div className="flex flex-col gap-3 ">
          <h1 className="text-2xl font-bold text-black pl-7 py-5">Products You May Like Also</h1>
          <div className="grid grid-cols-4 px-3 gap-5">
            {relatedproucts.map((item) => (
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
      </div>
    </>
  );
};

export default RelatedProducts;
