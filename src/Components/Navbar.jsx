import React, { useEffect, useState } from "react";
import logo from "../assets/Logo.svg";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { NavbarLinks } from "../data/navbar-link";
import apiconnector from "../services/apiconnector";
import { catagories } from "../services/apis";
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addProduct } from '../reducer/slices/cartSlice'
import { removeProduct } from '../reducer/slices/cartSlice'
import { clearCart } from '../reducer/slices/cartSlice'

const Navbar = (props) => {
  const cart = useSelector((state)=>state.cart.cart);
    const total = useSelector((state)=>state.cart.total);
    const dispatch = useDispatch();
    const totalitem = useSelector((state)=>state.cart.totalItem)
  const [Sublink, setSublink] = useState([]);
  const { isLoggedIn, setIsLoggedIn } = props;

  useEffect(() => {
    const fetchSublink = async () => {
      try {
        const result = await apiconnector("GET", catagories.CATAGORIES_API);
        console.log(result.data.data);
        setSublink(result.data.data);
      } catch (error) {
        console.error("Could not fetch the category list", error);
      }
    };

    fetchSublink();
  }, []);
  function handleclick(){

  }

  return (
    <div className="flex justify-between bg-richblack-900 items-center w-11/12 max-w-[1160px] py-4 mx-auto">
      <Link to="/">
        <img src={logo} height={32} width={160} alt="Logo" loading="lazy" />
      </Link>

      <nav>
        <ul className="flex gap-x-6 text-richblack-100">
          {NavbarLinks.map((link, index) => (
            <li key={index}>
              {link.title === "Catalog" ? (
                <div className="flex relative items-center gap-2 group">
                  <p>{link.title}</p>
                  <MdOutlineArrowDropDownCircle />
                  <div className="invisible translate-x-[-50%] translate-y-[25%] absolute left-[50%] top-[50%] flex flex-col rounded-md bg-white p-4 text-black opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]">
                    <div className="absolute left-[50%] top-0 translate-x-[80%] translate-y-[-40%] h-6 w-6 rotate-45 rounded bg-white" />
                    {Sublink.length > 0 ? (
                      Sublink.map((sublink, subIndex) => (
                        <Link key={subIndex} to={`/Catalog/${sublink.name}`}>
                          <button className="rounded mb-2">{sublink.name}</button>
                        </Link>
                      ))
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>
                </div>
              ) : (
                <Link to={link.path}>{link.title}</Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-x-4 text-richblack-100">
        {!isLoggedIn && (
          <>
            <Link to="/login">
              <button className="bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700">
                Sign Up
              </button>
            </Link>
          </>
        )}
        {isLoggedIn && (
          <>
            <Link to="/cart">
            <div className="relative">
              <button onClick={handleclick}  className="py-[8px] px-[12px]">
                <FaShoppingCart size={24} />
              </button>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
          {cart.length}
        </span>
              </div>
            </Link>
            <button
              onClick={() => {
                setIsLoggedIn(false);
                localStorage.removeItem("token");
                 localStorage.removeItem("user"); 
                toast.success("Logout successfully");
              }}
              className="bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700"
            >
              Log Out
            </button>
            <Link to="/dashboard">
              <button className="bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700">
                Dashboard
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
