"use client"; 
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  loadCartFromLocalStorage,
  loadFavouritesFromLocalStorage,
} from "./cartSlice"; // Adjust the path accordingly

const CartLoader: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    const favouriteData = localStorage.getItem("favourites");

    if (cartData) {
      dispatch(loadCartFromLocalStorage(JSON.parse(cartData)));
    }

    if (favouriteData) {
      dispatch(loadFavouritesFromLocalStorage(JSON.parse(favouriteData)));
    }
  }, [dispatch]);

  return null; // This component does not render anything
};

export default CartLoader;
