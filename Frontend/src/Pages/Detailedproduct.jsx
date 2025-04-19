import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Feature from "../components/Feature";
import Footer from "../components/Footer";
import { getdetailproduct } from "../redux/slices/productslice";
import RelatedProducts from "../components/RelatedProducts";
import { addtocart, getcart } from "../redux/slices/cartslice";
import { addtowhishlist, getwhishlist } from "../redux/slices/whishlistslice";
import { toast } from "react-toastify";

const DetailedProduct = () => {
  const { detailproduct } = useSelector((state) => state.product);
  const { cart, loading, error } = useSelector((state) => state.cart);
  const [qty, setqty] = useState(1);
  const [selcetedcolor, setselcetedcolor] = useState("");
  const [selectedsize, setselectedsize] = useState("l");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getdetailproduct());
  }, [dispatch]);

  const handlechangeqty = (value) => {
    if (isNaN(value)) return;
    setqty(value);
  };

  const handleaddtocart = async (id, qty) => {
    dispatch(addtocart({ productid: id, quantity: Number(qty) ,color:selcetedcolor ,size:selectedsize}))
    alert("item is added to cart")
    // dispatch(getcart()); // Refresh cart in Redux after adding
    window.location.reload();
    setqty(1);
  };

  const handleaddtowhishlist = async (id, qty) => {
    dispatch(addtowhishlist({ productid: id, quantity: Number(qty) }))
    window.location.reload()
    setqty(1);
  };

  const [activetab, setactivetab] = useState("Description");

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center lg:px-20 pt-10">
        <div className="w-full p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Section: Images */}
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded-lg shadow-md overflow-hidden">
                <img
                  src={detailproduct?.image}
                  alt="Product"
                  className="h-[500px] w-full object-contain transition-transform duration-300 hover:scale-110 -z-10"
                />
              </div>
              {/* Thumbnails */}
              <div className="flex justify-center gap-4">
                {[detailproduct.image, detailproduct.image, detailproduct.image, detailproduct.image].map((imgSrc, i) => (
                  <img
                    key={i}
                    src={imgSrc}
                    alt={`Thumbnail ${i}`}
                    className="w-20 h-20 object-contain border-2 border-gray-300 rounded-md p-1 cursor-pointer transition-all hover:border-black "
                  />
                ))}
              </div>
            </div>

            {/* Right Section: Product Info */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-900">{detailproduct.title}</h1>
              <h2 className="text-gray-600 text-lg">{detailproduct.titleDescription}</h2>

              <div className="flex items-center gap-2 text-yellow-500">
                ⭐⭐⭐⭐⭐ <span className="text-gray-600 text-sm">(121 Reviews)</span>
              </div>

              <div className="text-2xl font-semibold text-black">
                ₹{detailproduct.offerPrice}{" "}
                <span className="text-gray-500 line-through text-lg">₹{detailproduct.actualPrice}</span>
              </div>

              <p className="text-gray-700 leading-relaxed">
                {detailproduct.shortDescription} Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>

              {/* Colors */}
              <div>
                <h3 className="font-semibold text-lg">Available Colors</h3>
                <div className="flex gap-2 pt-2">
                  {detailproduct?.color?.map((color) => (
                    <div
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
                        selcetedcolor === color ? "border-black" : "border-gray-300"
                      } hover:border-black`}
                      style={{ backgroundColor: color }}
                      onClick={() => setselcetedcolor(color)}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="font-semibold text-lg">Sizes</h3>
                <div className="flex gap-2 pt-2">
                  {detailproduct?.availableSizes?.map((size, idx) => (
                    <div
                      key={idx}
                      className={`w-10 h-10 flex items-center justify-center border-2 rounded-md text-lg font-semibold cursor-pointer ${
                        selectedsize === size ? "border-black" : "border-gray-300"
                      } hover:border-black`}
                      onClick={() => setselectedsize(size)}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-400 px-4 py-2 rounded-md gap-4 text-xl">
                  <button className="text-gray-600 hover:text-black cursor-pointer" onClick={() => setqty((prev) => (prev <= 1 ? 1 : prev - 1))}>
                    -
                  </button>
                  <input type="text" value={qty} onChange={(e) => handlechangeqty(e.target.value)} className="w-8 outline-none pl-3" />
                  <button className="text-gray-600 hover:text-black cursor-pointer" onClick={() => setqty((prev) => prev + 1)}>
                    +
                  </button>
                </div>
                <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all" onClick={() => handleaddtocart(detailproduct._id, qty)}>
                  Add to Cart
                </button>
                <div className="p-2 border border-gray-400 rounded-lg cursor-pointer hover:border-black flex justify-center items-center" onClick={() => handleaddtowhishlist(detailproduct._id, qty)}>
                  <span className="material-icons-outlined text-gray-600">favorite</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-10">
            <div className="flex gap-6 border-b border-gray-300 text-lg w-[80%] overflow-scroll no-scrollbar">
              {["Description", "Additional Information", "Reviews"].map((tab) => (
                <h1
                  key={tab}
                  className={`px-6 py-3 cursor-pointer font-semibold transition-all ${
                    activetab === tab ? "border-b-2 border-black text-black font-bold" : "text-gray-600 hover:text-black"
                  }`}
                  onClick={() => setactivetab(tab)}
                >
                  {tab}
                </h1>
              ))}
            </div>

            <div className="pt-7 text-gray-700 leading-relaxed">
              {activetab === "Description" && <p>{detailproduct.longDescription} Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nemo facere et esse, alias ad sit ipsam, fugiat eum cumque quis quibusdam voluptate eius?</p>}
              {activetab === "Additional Information" && <p>{detailproduct.additionalInformation} Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum temporibus quidem nemo, commodi maiores quaerat nisi ut animi perspiciatis, atque praesentium exercitationem eius repellat.</p>}
              {activetab === "Reviews" && <p>Customer reviews will be displayed here.</p>}
            </div>
          </div>
        </div>
      </div>
      <RelatedProducts />
      <Feature />
      <Footer />
    </>
  );
};

export default DetailedProduct;
