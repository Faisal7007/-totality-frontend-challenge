"use client";
import React, { useState } from "react";
import Navbar from "./components/navbar";
import SwiperCard from "./components/swiperCard";
import Cart from "./components/cart";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Checkout from "./components/Checkout";
import PropertiesListing from "./components/PropertiesListing";
import { Toaster } from "react-hot-toast";
import { log } from "console";
import Login from "./components/login";

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [login, setLogin] = useState(false)

  const [isFavListOpen, setIsFavListOpen] = useState(false);

  const [cartItems, setCartItems] = useState([]);
  const [isCheckout, setIsCheckout] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    setIsFavListOpen(false);

  };

  const toggleLogin = () => {
   setIsLoginOpen(!isLoginOpen)

  };

  const toggleFavourite = () => {
    setIsFavListOpen(!isFavListOpen);
    setIsCartOpen(!isCartOpen);

  };

  const addItemToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const proceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckout(true);
  };

  const closeCheckout = () => {
    setIsCheckout(false);
  };

  const closeLogin=()=>{
    setIsLoginOpen(!isLoginOpen)
  }

  return (
    <div>
      <Toaster />
      <Navbar toggleCart={toggleCart} toggleLogin={toggleLogin} toggleFavourite={toggleFavourite}  cartItemCount={cartItems.length} />
      <button
        onClick={toggleCart}
        className="fixed z-40 bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
        aria-label="Open Cart"
      >
        <AiOutlineShoppingCart className="text-2xl" />
      </button>
      <SwiperCard />
      <PropertiesListing addItemToCart={addItemToCart} />

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50  flex justify-center items-center z-50">
          
            <Cart
              items={cartItems}
              onProceedToCheckout={proceedToCheckout}
              isCartOpen={isCartOpen}
              isFavListOpen={isFavListOpen}
              toggleCart={toggleCart}
              // toggleFavourite={toggleFavourite}
            />
          
        </div>
      )}

      {/* Checkout Component */}
      {isCheckout && (
        <div className="fixed inset-0 bg-white flex justify-center items-center z-50">
          <Checkout onClose={closeCheckout} />
        </div>
      )}


      
      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50  flex justify-center items-center z-50">
          
            <Login
              isLoginOpen={isLoginOpen}
              onClose={closeLogin}
              login={login}
              setLogin={setLogin}
            />
          
        </div>
      )}
    </div>
  );
}
