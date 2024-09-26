"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";
import { CiTrash } from "react-icons/ci";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
  removeFromCart,
  removeFromFavourite,
} from "@/app/store/cartSlice";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast"; // Import toast
import { RootState } from "@/app/store"; // Import the RootState for correct typing of Redux state

interface CartProps {
  onProceedToCheckout: () => void;
  isCartOpen: boolean;
  isFavListOpen: boolean;
  toggleCart: () => void;
}

const Cart: React.FC<CartProps> = ({
  onProceedToCheckout,
  isCartOpen,
  isFavListOpen,
  toggleCart,
}) => {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);
  const { favourites } = useSelector((state: RootState) => state.cart);

  const handleRemove = (id: string) => {
    toast.error("Remove from cart");
    dispatch(removeFromCart(id));
  };

  const handleRemoveFav = (id: string) => {
    toast.error("Removed from favourite");
    dispatch(removeFromFavourite(id));
  };

  return (
    <>
      {isCartOpen && !isFavListOpen ? (
        <div className="fixed w-1/3 between568-950:w-[70%] between280-568:w-[100%] h-screen p-6 bg-gray-50 rounded-lg flex items-center justify-between flex-col">
          <h2 className="text-3xl font-bold text-center h-[10%] text-blue-600">
            Your Cart
          </h2>
          <div className="h-[70vh]">
            {items.length === 0 ? (
              <p className="text-center text-gray-500 text-lg">
                Your cart is empty.
              </p>
            ) : (
              <>
                <div className="h-full">
                  <div className="h-full scrollbar-hide overflow-scroll bg-white rounded-lg p-6">
                    {items.map((product) => (
                      <div
                        key={product.id}
                        className="flex justify-between items-center border-b border-gray-200 py-4"
                      >
                        <Image
                          src={`/images${product.image}`}
                          alt={product.title}
                          height={100}
                          width={100}
                          className="w-20 h-20 object-cover rounded-lg shadow-sm"
                        />
                        <div className="flex-1 ml-4">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {product.title}
                          </h3>
                          {product.startDate && product.endDate ? (
                            <p className="text-gray-600">
                              Booking Dates:{" "}
                              {`${new Date(
                                product.startDate
                              ).toLocaleDateString()} - ${new Date(
                                product.endDate
                              ).toLocaleDateString()}`}
                            </p>
                          ) : (
                            <p className="text-gray-600">
                              Booking Dates: Not available
                            </p>
                          )}
                          <div className="flex items-center space-x-3 mt-2">
                            <AiFillPlusSquare
                              className="cursor-pointer text-lg text-blue-600 hover:text-blue-800 transition duration-300"
                              onClick={() =>
                                dispatch(increaseItemQuantity(product.id))
                              }
                            />
                            <span className="font-semibold text-lg">
                              {product.quantity}
                            </span>
                            <AiFillMinusSquare
                              className={`cursor-pointer text-lg ${
                                product.quantity <= 1
                                  ? "text-gray-400 cursor-not-allowed"
                                  : "text-blue-600 hover:text-blue-800 transition duration-300"
                              }`}
                              onClick={() =>
                                product.quantity > 1 &&
                                dispatch(decreaseItemQuantity(product.id))
                              }
                            />
                          </div>
                        </div>
                        <div className="text-right">
                          <h5 className="text-lg font-semibold text-gray-800">
                            ₹{(product.price * product.quantity).toFixed(2)}
                          </h5>
                          <CiTrash
                            className="cursor-pointer text-xl text-red-500 hover:text-red-700 transition duration-300"
                            onClick={() => handleRemove(product.id)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Total Price: ₹{totalPrice.toFixed(2)}
            </h3>
          </div>
          <div className="flex justify-center items-center mt-4 gap-4">
            <button
              onClick={onProceedToCheckout}
              className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300 shadow-md"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={toggleCart}
              className="bg-red-500 inline-block py-2 px-6 text-white rounded-md"
            >
              Close Cart
            </button>
          </div>
        </div>
      ) : (
        <div className="fixed w-1/3 between568-950:w-[70%] between280-568:w-[100%] h-screen p-6 bg-gray-50 rounded-lg flex items-center justify-between flex-col">
          <h2 className="text-3xl font-bold text-center h-[10%] text-blue-600">
            Your Favourite List{" "}
            <span>{favourites.length > 0 ? favourites.length : null}</span>
          </h2>
          <div className="h-[70vh]">
            {favourites.length === 0 ? (
              <p className="text-center text-gray-500 text-lg">
                Your favourite list is empty.
              </p>
            ) : (
              <>
                <div className="h-full">
                  <div className="h-full scrollbar-hide overflow-scroll bg-white rounded-lg p-6">
                    {favourites.map((product) => (
                      <div
                        key={product.id}
                        className="flex justify-between items-center relative border-b border-gray-200 py-4"
                      >
                        <div className="flex justify-between items-center">
                          <Image
                            src={`/images${product.image}`}
                            alt={product.title}
                            height={100}
                            width={100}
                            className="w-20 h-20 object-cover rounded-lg shadow-sm mr-6"
                          />
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                              {product.title}
                            </h3>
                            <h5 className="text-lg font-semibold text-gray-800">
                              ₹{product.price}
                            </h5>
                          </div>
                        </div>
                        <RxCross2
                          className="cursor-pointer text-xl size-6 absolute -right-2 top-0 text-red-500 hover:text-red-700 transition duration-300"
                          onClick={() => handleRemoveFav(product.id)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="flex justify-center items-center mt-4 gap-4">
            <button
              onClick={onProceedToCheckout}
              className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300 shadow-md"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={toggleCart}
              className="bg-red-500 inline-block py-2 px-6 text-white rounded-md"
            >
              Close Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
