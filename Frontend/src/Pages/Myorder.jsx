import React, { useEffect, useState } from "react";
import {
  addtocart,
  decreseqty,
  getcart,
  removecartitems,
} from "../redux/slices/cartslice";
import { useDispatch, useSelector } from "react-redux";
import {
  addtowhishlist,
  getwhishlist,
  removefromwhishlist,
} from "../redux/slices/whishlistslice";
import { useNavigate } from "react-router-dom";

const Myorder = () => {
  const { whishlist, loading, error } = useSelector((state) => state.whishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setqty] = useState(1);
  useEffect(() => {
    dispatch(getwhishlist());
  }, []);
  console.log(whishlist);

  // useEffect(() => {
  //   if (whishlist.length > 0 && whishlist[0]?.whishlist?.items) {
  //     const total = whishlist[0].whishlist.items.reduce(
  //       (acc, item) => acc + item.productid.offerPrice * item.quantity,
  //       0
  //     );
  //     setcarttotalprice(total);
  //     localStorage.setItem("cartTotal", total); // Store total in localStorage
  //   }
  // }, [whishlist]);

  const handleaddtocart = async (id, qty) => {
    console.log(id, qty);
    dispatch(addtocart({ productid: id, quantity: Number(qty) }));
    window.location.reload();
    // setqty(1)
  };
  const handleremovefromwhishlist = (id) => {
    dispatch(removefromwhishlist(id));
    window.location.reload();
  };
  const handleoneproductpage = async (id) => {
    // console.log(id)
    localStorage.setItem("id", id);
    navigate(`/details`);
  };
  // whishlist[0]?.whishlist?.items?.map((item ,idx) => (
  return (
    <>
      <div className="flex flex-col gap-7">
        {whishlist[0]?.whishlist?.items?.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <div>
                  <img src={item.productid.image} alt="img"  className="w-20 h-20"/>
                </div>
                <div>
                  <h1>{item.productid.title}</h1>
                  <h1>Size:l</h1>
                  <h1>qty:1</h1>
                </div>
              </div>
              <div>
                <h1>${item.productid.offerPrice}</h1>
              </div>
              <div className="flex flex-col gap-4">
                <button className="border border-gray-500 text-black bg-white rounded-xl px-4 py-2 flex justify-center items-center cursor-pointer">
                  View Order
                </button>
                <button className="border border-gray-500 text-white bg-black rounded-xl px-4 py-2 flex justify-center items-center cursor-pointer">
                  Write a Review
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <h1 className="bg-gray-200 text-green-400 border border-gray-200 rounded-xl px-4 py-2 flex justify-center items-center text-xl">
                Delivered
              </h1>
              <p>Your Prodcut Has Been Deliverd</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Myorder;
