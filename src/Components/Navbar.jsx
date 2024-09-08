import React, { useEffect, useState } from "react";
import logo from "../assets/Logo.svg";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";
import Searchbar from "./Searchbar";
import { NavbarLinks } from "../data/navbar-link";
import apiconnector from "../services/apiconnector";
import {catagories} from "../services/apis"
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { useLocation } from "react-router-dom";

const Navbar = (props) => {
  const [Sublink, setSublink] = React.useState([]);
  useEffect(() => { 
    const fetchSublink = async () => {
      try {
        const result = await apiconnector("GET", catagories.CATAGORIES_API);
        console.log(result.data.data);
        setSublink(result.data.data);
      } catch (error) {
        console.log("Could not fetch the category List");
      }
    };
  
    fetchSublink();
  },[]);

  
  
  const isLoggedIn = props.isLoggedIn;
  const setIsLoggedIn = props.setIsLoggedIn;
  return (
    <div className="flex justify-between bg-richblack-900 items-center w-11/12 max-w-[1160px] py-4 mx-auto">
      <Link to="/">
        <img src={logo} height={32} width={160} alt="load..." loading="lazy" />
      </Link>

      <nav>
        <ul className="flex gap-x-6 text-richblack-100">
         {
          NavbarLinks.map((link,index)=>{
            return(
             <li key={index}>
              {
                link.title === "Catalog" ? (<div className="flex relative items-center gap-2 group">
                 <p>{link.title}</p>
                 <MdOutlineArrowDropDownCircle></MdOutlineArrowDropDownCircle>
                 <div className="invisible translate-x-[-50%] translate-y-[25%] absolute left-[50%] top-[50%] flex flex-col rounded-md bg-white p-4 text-black opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]">
                  <div className="absolute left-[50%] top-0 translate-x-[80%] translate-y-[-40%] h-6 w-6 rotate-45 rounded bg-white">
                    
                  </div>
                  {
                      Sublink.length ? (
                       Sublink.map((sublink, index) => (
                        <Link key={index} to={"/Catalog/" +sublink.name}><button className=" rounded mb-2">{sublink.name}</button></Link>
                      
                       ))
                      ) : (<div></div>)
                     }
                 </div>
                </div>):(
                  <Link to={link.path}>{link.title}</Link>
                )
              }
             </li>
            )
          })
         }
        </ul>
      </nav>

      {/* Button - Login = Signup = Logout = Dashboard  */}
    <Searchbar></Searchbar>
      <div className="flex items-center gap-x-4 text-richblack-100">
       
        {isLoggedIn && (
          <Link to="/login">
            <button className="bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700">
              Login
            </button>
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/signup">
            <button className="bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700">
              Sign Up
            </button>
          </Link>
        )}
         {!isLoggedIn && (
          <Link to="/Cart">
            <button className=" py-[8px] px-[12px]">
              <FaShoppingCart size={24}></FaShoppingCart>
            </button>
          </Link>
        )}
        {!isLoggedIn && (
          <Link to="/">
            <button
              onClick={() => {
                setIsLoggedIn(true);
                toast.success("Logout Sucessfully");
              }}
              className="bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700"
            >
              Log Out
            </button>
          </Link>
        )}
        {!isLoggedIn && (
          <Link to="/dashboard">
            <button className="bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700">
              Dashboard
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
