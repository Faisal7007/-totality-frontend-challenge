"use client";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { BsBagCheck } from "react-icons/bs";
import { MdOutlineOtherHouses } from "react-icons/md";
import { FaHeart, FaRegUser } from "react-icons/fa";
import Image from "next/image";
import AuthContext from "@/app/context/AuthContext";

const Navbar = ({ toggleCart, toggleLogin, toggleFavourite }: any) => {
  const { auth }:any = useContext(AuthContext);
  const [userState, setUserState] = useState<any>(null); 
  const [isOpen, setIsOpen] = useState(false);
  const items = useSelector((state: any) => state.cart); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (auth) {
      const loginData = JSON.parse(localStorage.getItem("login") || "{}");
      console.log("s", loginData);
      setUserState(loginData);
    }
  }, [auth]);
  const handleLogout = () => {
    localStorage.removeItem("login");
  };
  return (
    <div className="sticky top-0 z-40">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <MdOutlineOtherHouses className="text-2xl md:text-3xl" />
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-10">
              <div
                className="relative flex items-center cursor-pointer"
                onClick={toggleCart}
              >
                <div className="flex items-center gap-2 text-blue-600 text-lg font-medium hover:text-blue-800 transition-colors duration-300">
                  <span className="relative after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-blue-600 after:transition-transform after:scale-x-0 hover:after:scale-x-100 duration-300">
                    Bookings:
                  </span>
                  <div className="relative text-2xl">
                    <BsBagCheck />
                    <span className="absolute left-5 bottom-2 bg-red-600 text-white text-[16px] h-6 w-6 flex items-center justify-center rounded-full shadow-lg">
                      {items.totalQuantity}
                    </span>
                  </div>
                </div>
              </div>

              <div
                className="relative flex items-center cursor-pointer"
                onClick={toggleFavourite}
              >
                <div className="flex items-center gap-2 text-blue-600 text-lg font-medium hover:text-blue-800 transition-colors duration-300">
                  <FaHeart className="text-2xl" />
                </div>
              </div>

              <div
                onClick={toggleLogin}
                className="text-blue-600 hover:text-blue-800 transition-colors duration-300 cursor-pointer"
              >
                {auth ? (
                  <div
                    onClick={handleLogout}
                    className="flex items-center bg-gray-100 p-2 rounded-md shadow-sm"
                  >
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                      Logout
                    </button>
                    <span className="font-semibold text-gray-800 ml-2">
                      {userState?.name.charAt(0).toUpperCase() +
                        userState?.name.slice(1)}
                    </span>
                  </div>
                ) : (
                  "LogIn"
                )}
              </div>

              <div>
                {auth ? (
                  <img
                    src={userState?.img}
                    alt={"User Image"}
                    // width={50}
                    // height={50}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                ) : null}
              </div>
            </div>
{/* Mobile responsive code */}
            <div className="flex md:hidden">
              <button
                onClick={toggleMenu}
                className="text-blue-600 hover:text-blue-800 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      isOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>

          {isOpen && (
            <div className="md:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                <div
                  onClick={toggleCart}
                  className="flex items-center text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  <BsBagCheck className="text-2xl mr-2" />
                  Bookings
                  <span className="ml-2 bg-red-600 text-white h-5 w-5 flex items-center justify-center rounded-full">
                    {items.totalQuantity}
                  </span>
                </div>
                <div
                  onClick={toggleFavourite}
                  className="flex items-center text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  <FaHeart className="text-2xl mr-2" />
                  Favourite
                </div>
                <div
                  onClick={toggleLogin}
                  className="flex items-center text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  <FaRegUser className="text-2xl mr-2" />
                  Login
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
