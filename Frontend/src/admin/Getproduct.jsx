import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteproduct, getProducts } from "../redux/slices/productslice"; // Import the action
import { toast } from "react-toastify";

const Getproduct = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts()); // Fetch products when the component mounts
  }, [dispatch]);
 
  const handledleteproduct = async(id)=>{
    dispatch(deleteproduct(id))
     toast("product is deleted")
  }
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {products?.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={item.image}
              alt="product image"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h1 className="text-black font-semibold text-xl">{item.title}</h1>
              <p className="text-gray-600 text-base mt-2">
                {item.titleDescription}
              </p>
              <div className="flex items-center mt-3 justify-between">
                <div>
                  <span className="text-xl text-black font-bold">
                    ${item.offerPrice}
                  </span>
                  <span className="text-gray-500 text-sm line-through ml-2">
                    ${item.actualPrice}
                  </span>
                </div>
                <button className="flex justify-center items-center border border-black px-4 py-2 bg-red-300 rounded-2xl cursor-pointer" onClick={()=>handledleteproduct(item._id)}>delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Getproduct;
