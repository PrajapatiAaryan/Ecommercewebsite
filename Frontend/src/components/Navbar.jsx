import React, { useEffect, useState } from "react";
import logo from "/images/logo2.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userlogout } from "../redux/slices/authslice";
import { getProducts } from "../redux/slices/productslice";
import Minicart from "./Minicart";
import { getcart } from "../redux/slices/cartslice";
import { toast } from "react-toastify";

const Navbar = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const { products} = useSelector((state)=>state.product)
  const token = localStorage.getItem("token");
  const [navbaropen, setnavbaropen] = useState(false);
  const [megamenu, setmegamenu] = useState(false);
  const [profile, setprofile] = useState(false);
  const [search, setsearch] = useState("")
  const [opencart, setopencart] = useState(false)
  // console.log("token is =" , token)
  const {cart } = useSelector((state)=>state.cart)
  const megamenudat = {
    Men: [
      "T-Shirts",
      "Casual Shirts",
      "Formal Shirts",
      "Jackets",
      "Blazers&Coats",
    ],
    women: [
      "Kurta & Suits",
      "Sarees",
      "Ethic Wears",
      "Lahenga Cholis",
      "Jackets",
    ],
    footwear: [
      "Flats",
      "Casual Shoes",
      "Heels",
      "Boots",
      "Sports Shoes & Floaters",
    ],
    kids: [
      "T-Shirts",
      "Casual Shirts",
      "Jeans",
      "Trousers",
      "Party Wear",
      "Innerwear & Thermal",
      "Track Pants",
      "Value Pack",
    ],
  };

  // get products
  useEffect(() => {
    dispatch(getProducts())
  }, [])
  
//  navigate functions
  const navigate = useNavigate();
  const handlenavigate = () => {
    navigate("/login");
  };

  // logout
  const handlelogout = () => {
    dispatch(userlogout());
  };
  
  // search filter
  const searchText ="t-shirt"
  const searchProducts = (searchText, products) => {
    return products?.filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    );
  };
  // console.log("this is the output of search filter" ,searchProducts(searchText ,products))

  const handlesearch = (e)=>{
    e.preventDefault()
    navigate(`/search/${search}`)
    setsearch(" ")
  }

    
    const handlecart = async()=>{

      const response = await dispatch(getcart());
      setopencart(!opencart)
      console.log(response)
    }

    const handlewhishlist = async()=>{
      navigate('/profile/wishlist')
    }
    const handleprofile = async()=>{
      navigate('/profile')
    }

  return (
    <>
      <nav className="border border-black w-full bg-white">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <div>
            <img src={logo} alt="logoimg" className="w-12" />
          </div>

          {/* Navbar Links */}
          <div className="hidden md:flex items-center gap-10">
            <NavLink to="/">Home</NavLink>
            <NavLink
              className="cursor-pointer"
              // onMouseEnter={() => setmegamenu(true)}
              onClick={() => setmegamenu(!megamenu)}
            >
              Shop
            </NavLink>
            <NavLink to="/allproducts">All Products</NavLink>
            <NavLink to="/admin">Admin</NavLink>
          </div>

          <form className="w-[30%] border border-black flex items-center px-3 rounded-full" onSubmit={(e)=>handlesearch(e)}>
          <input type="text" placeholder="search anything you want" className="outline-none  py-2 text-xl w-full" name="search" value={search} onChange={(e)=>setsearch(e.target.value)}/>
          <span className="material-icons-outlined cursor-pointer" onClick={(e)=>handlesearch(e)}>search</span>
          </form>
          {/* Navbar Icons and Login Button */}
          <div className="flex gap-6 items-center">
            <button className="cursor-pointer " onClick={()=>handlewhishlist()}>
              <span className="material-icons-outlined">favorite</span>
            </button>
            <button className="cursor-pointer" onClick={()=>handlecart()}>
              <span className="material-icons-outlined">shopping_cart</span>
            </button>
            {opencart&&(
              <Minicart/>
            )}
            {token ? (
              <div>
                <button
                  className="cursor-pointer"
                  onClick={() => handleprofile()}
                >
                  <span className="material-icons-outlined ">
                    account_circle
                  </span>
                </button>
                <button
                  className={
                    profile
                      ? " absolute top-16 right-28 bg-black text-white px-6 py-2 rounded-xl border border-black cursor-pointer z-10"
                      : "hidden"
                  }
                  onClick={() => handlelogout()}
                >
                  logout
                </button>
              </div>
            ) : (
              <button
                className="bg-black text-white px-6 py-2 rounded-xl border border-black cursor-pointer"
                onClick={() => handlenavigate()}
              >
                Login
              </button>
            )}
          </div>

          {/* Hamburger Menu (Mobile) */}
          <div className="md:hidden">
            {navbaropen ? (
              <span
                className="material-icons-outlined"
                onClick={() => setnavbaropen(!navbaropen)}
              >
                close
              </span>
            ) : (
              <span
                className="material-icons-outlined"
                onClick={() => setnavbaropen(!navbaropen)}
              >
                menu
              </span>
            )}
          </div>
        </div>

        {/* Mega Menu - Desktop */}
        {megamenu && (
          <div className="hidden absolute z-10 md:flex justify-center items-center bg-white border-2  border-gray-400 shadow-lg shadow-gray-500  text-black w-[70%] px-10 py-4 left-52 top-16">
            <div className="grid grid-cols-4 gap-10">
              <div className="flex flex-col gap-5 list-none border-r border-gray-500">
                {megamenudat.Men.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </div>
              <div className="flex flex-col gap-5 list-none border-r border-gray-500">
                {megamenudat.women.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </div>
              <div className="flex flex-col gap-5 list-none border-r border-gray-500">
                {megamenudat.footwear.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </div>
              <div className="flex flex-col gap-5 ">
                {megamenudat.kids.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {navbaropen && (
          <div className="md:hidden flex flex-col bg-white border-t border-black p-5">
            <NavLink to="/" className="py-2">
              Home
            </NavLink>
            <div
              className="py-2 cursor-pointer"
              onClick={() => setmegamenu(!megamenu)}
            >
              Shop
            </div>
            <NavLink className="py-2">Our Story</NavLink>
            <NavLink className="py-2">Blog</NavLink>
            <NavLink className="py-2">Contact Us</NavLink>
            <NavLink to="/admin" className="py-2">
              Admin
            </NavLink>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
