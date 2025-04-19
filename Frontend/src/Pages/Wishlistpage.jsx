import React, { useEffect, useState } from "react";
import { addtocart, decreseqty, getcart, removecartitems } from "../redux/slices/cartslice";
import { useDispatch, useSelector } from "react-redux";
import { addtowhishlist, getwhishlist, removefromwhishlist } from "../redux/slices/whishlistslice";
import { useNavigate } from "react-router-dom";

const Wishlistpage = () => {
  const { whishlist, loading, error } = useSelector((state) => state.whishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [qty, setqty] = useState(1)
  useEffect(() => {
    dispatch(getwhishlist());
  }, []);
  console.log(whishlist)

      const handleremovefromwhishlist = (id)=>{
        dispatch(removefromwhishlist(id))
        window.location.reload()
      }
      const handleoneproductpage =async(id)=>{
        // console.log(id)
        localStorage.setItem("id", id)
        navigate(`/details`)
      }
      
  return (
    <>
      <div className="">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {whishlist[0]?.whishlist?.items?.map((item ,idx) => (
                  <div
                    key={idx}
                    className="relative rounded-xl cursor-pointer group overflow-hidden bg-gray-50 p-6  transition-all duration-300"
                    onClick={()=>handleoneproductpage(item.productid._id)}
                  >
                    {/* Image Section */}
                    <div className="relative w-full h-60 flex justify-center items-center">
                      <img
                        src={item.productid.image}
                        alt="product"
                        className="w-full h-full object-contain rounded-lg"
                      />

                      {/* Hover Icons (Visible on Hover) */}
                      <div className="absolute top-3 right-3 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="material-icons-outlined p-3 bg-white text-red-700 rounded-full shadow-md hover:bg-gray-200" onClick={()=>handleremovefromwhishlist(item.productid._id)}>delete</span>
                      </div>

                      {/* Add to Cart Button (Visible on Hover) */}
                      <button className="absolute bottom-3 bg-white text-black py-2 px-6 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer" onClick={()=>handleoneproductpage(item.productid._id)}>
                        Add to Cart
                      </button>
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col gap-2 px-2 mt-4">
                      <h1 className="text-lg font-semibold text-gray-900">
                        {item.productid.title}
                      </h1>
                      <h2 className="text-gray-600">{item.productid.titleDescription}</h2>
                      <h1 className="text-xl font-bold text-black">
                        ${item.productid.offerPrice}{" "}
                        <span className="line-through text-gray-500 text-lg">
                          ${item.productid.actualPrice}
                        </span>
                      </h1>
                    </div>
                  </div>
                ))}
              </div>
              
            </div>
    </>
  );
};

export default Wishlistpage;
