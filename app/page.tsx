"use client";
import React, { useState, useEffect, useContext } from "react";
import Navbar from "./components/navbar";
import SwiperCard from "./components/swiperCard";
import Cart from "./components/cart";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Checkout from "./components/Checkout";
import PropertiesListing from "./components/PropertiesListing";
import { Toaster } from "react-hot-toast";
import Login from "./components/login";
import AuthContext from "./context/AuthContext";


interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Product {
  id: number;
  location: string;
  price: number;
  bedrooms: number;
}

export default function Home() {
  const authContext = useContext(AuthContext);

  
  if (!authContext) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  const { isLoginOpen, toggleLogin } = authContext; 
  const [isRegistered, setIsRegistered] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isFavListOpen, setIsFavListOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckout, setIsCheckout] = useState<boolean>(false);
  const { auth }:any = useContext(AuthContext);
//  const {toggleLogin} = useContext(AuthContext)


  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    setIsFavListOpen(false);
  };

  const toggleFavourite = () => {
    setIsFavListOpen(!isFavListOpen);
    setIsCartOpen(!isCartOpen);
  };

  const proceedToCheckout = () => {
    if (auth) {
    
      setIsCheckout(true);
      setIsCartOpen(false) 
  
    }
    else{
      toggleLogin();

    }
  };

  const closeCheckout = () => {
    setIsCheckout(false);
  };

  return (
    <div>
      <Toaster />
      <Navbar
        toggleCart={toggleCart}
        toggleLogin={toggleLogin}
        toggleFavourite={toggleFavourite}
      />
      <button
        onClick={toggleCart}
        className="fixed z-40 bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
        aria-label="Open Cart"
      >
        <AiOutlineShoppingCart className="text-2xl" />
      </button>
      <SwiperCard />
      <PropertiesListing isCartOpen={isCartOpen} />


      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <Cart
            onProceedToCheckout={proceedToCheckout}
            isCartOpen={isCartOpen}
            isFavListOpen={isFavListOpen}
            toggleCart={toggleCart}
          />
        </div>
      )}

   
      {isCheckout && (
        <div className="fixed inset-0 bg-white flex justify-center items-center z-50">
          <Checkout onClose={closeCheckout} />
        </div>
      )}

      {isLoginOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <Login
            toggleLogin={toggleLogin}
            isRegistered={isRegistered}
            setIsRegistered={setIsRegistered}
            onClose={() => {}}
            isLoginOpen={false}
          />
        </div>
      )}
    </div>
  );
}