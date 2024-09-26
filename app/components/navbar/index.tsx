"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { BsBagCheck } from "react-icons/bs";
import { MdOutlineOtherHouses } from "react-icons/md";
import { FaHeart, FaRegUser } from "react-icons/fa";

// Define types for props
interface NavbarProps {
  toggleCart: () => void;
  toggleLogin: () => void;
  toggleFavourite: () => void;
}

// Define the type for cart state from Redux
interface CartState {
  totalQuantity: number;
}

// Define the root state type to be used by useSelector
interface RootState {
  cart: CartState;
}

const Navbar: React.FC<NavbarProps> = ({ toggleCart, toggleLogin, toggleFavourite }) => {
  const [isOpen, setIsOpen] = useState(false);
  const items = useSelector((state: RootState) => state.cart); // Use typed selector
  console.log(items);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sticky top-0 z-40">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <MdOutlineOtherHouses className="text-2xl md:text-3xl" />
              </Link>
            </div>

            {/* Menu Items */}
            <div className="hidden md:flex items-center gap-10">
              {/* Bookings */}
              <div className="relative flex items-center cursor-pointer" onClick={toggleCart}>
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

              {/* Favourites */}
              <div className="relative flex items-center cursor-pointer" onClick={toggleFavourite}>
                <div className="flex items-center gap-2 text-blue-600 text-lg font-medium hover:text-blue-800 transition-colors duration-300">
                  <FaHeart className="text-2xl" />
                </div>
              </div>

              {/* Login */}
              <div className="relative flex items-center cursor-pointer" onClick={toggleLogin}>
                <FaRegUser className="text-2xl text-blue-600 hover:text-blue-800 transition-colors duration-300" />
              </div>
            </div>

            {/* Hamburger Menu */}
            <div className="flex md:hidden">
              <button
                onClick={toggleMenu}
                className="text-blue-600 hover:text-blue-800 focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
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
