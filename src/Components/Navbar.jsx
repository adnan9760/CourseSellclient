import React, { useEffect, useState } from "react";
import logo from "../assets/Logo.svg";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { NavbarLinks } from "../data/navbar-link";
import apiconnector from "../services/apiconnector";
import { catagories } from "../services/apis";
import { useSelector, useDispatch } from "react-redux";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const [Sublink, setSublink] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchSublink = async () => {
      try {
        const result = await apiconnector("GET", catagories.CATAGORIES_API);
        setSublink(result.data.data || []);
      } catch (error) {
        console.error("Could not fetch the category list", error);
      }
    };

    fetchSublink();
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("totalItem");
    localStorage.removeItem("total");
    toast.success("Logout successfully");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-richblack-800 bg-richblack-900/95 backdrop-blur">
      <div className="mx-auto flex w-11/12 max-w-[1160px] items-center justify-between py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            height={32}
            width={160}
            alt="Logo"
            loading="lazy"
            className="h-8 w-auto"
          />
        </Link>

        {/* Center nav */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-8 text-sm font-medium text-richblack-100">
            {NavbarLinks.map((link, index) => (
              <li key={index} className="relative">
                {link.title === "Catalog" ? (
                  <div className="flex items-center gap-1 group">
                    <button
                      type="button"
                      className="flex items-center gap-1 text-richblack-100 hover:text-yellow-400 transition"
                    >
                      <span>Catalog</span>
                      <MdOutlineArrowDropDownCircle className="text-yellow-400" />
                    </button>

                    {/* Catalog dropdown */}
                    <div
                      className="
                        invisible opacity-0
                        group-hover:visible group-hover:opacity-100
                        absolute left-1/2 top-full z-40
                        -translate-x-1/2 mt-3
                        w-[260px] sm:w-[320px]
                        rounded-xl border border-richblack-700
                        bg-richblack-900/95 backdrop-blur
                        shadow-xl shadow-black/60
                        transition-all duration-200
                      "
                    >
                      {/* Arrow */}
                      <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-richblack-900/95 border-t border-l border-richblack-700" />

                      <div className="max-h-64 overflow-y-auto overscroll-contain p-3 space-y-1">
                        {Sublink.length > 0 ? (
                          Sublink.map((sublink, subIndex) => (
                            <Link
                              key={subIndex}
                              to={`/Catalog/${sublink.name}`}
                              className="
                                block w-full rounded-lg px-3 py-2 text-sm
                                text-richblack-50 hover:bg-richblack-800 hover:text-yellow-300
                                transition
                              "
                            >
                              {sublink.name}
                            </Link>
                          ))
                        ) : (
                          <p className="px-3 py-2 text-sm text-richblack-300">
                            Loading...
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className={`hover:text-yellow-400 transition ${
                      location.pathname === link.path
                        ? "text-yellow-400"
                        : "text-richblack-100"
                    }`}
                  >
                    {link.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-x-3 text-sm">
          {!isLoggedIn && (
            <>
              <Link to="/login">
                <button className="rounded-lg border border-richblack-700 bg-richblack-800 px-4 py-2 text-richblack-25 hover:border-yellow-400 hover:text-yellow-300 transition">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-lg bg-yellow-400 px-4 py-2 font-semibold text-black shadow-md shadow-yellow-500/40 hover:bg-yellow-300 transition">
                  Sign Up
                </button>
              </Link>
            </>
          )}

          {isLoggedIn && (
            <>
              {/* Cart */}
              <Link to="/cart" className="relative">
                <button
                  className="rounded-full p-2 text-richblack-25 hover:text-yellow-300 transition"
                  aria-label="Cart"
                >
                  <FaShoppingCart size={22} />
                </button>
                {cart.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-semibold text-white">
                    {cart.length}
                  </span>
                )}
              </Link>

              {/* Dashboard */}
              <Link to="/dashboard">
                <button className="hidden sm:inline-flex items-center rounded-lg border border-richblack-700 bg-richblack-800 px-4 py-2 text-richblack-25 hover:border-yellow-400 hover:text-yellow-300 transition">
                  Dashboard
                </button>
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="rounded-lg border border-richblack-700 bg-richblack-900 px-4 py-2 text-richblack-100 hover:border-red-500 hover:text-red-400 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
