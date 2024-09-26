"use client";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToFavourite } from "@/app/store/cartSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast"; // Import toast
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import AuthContext from "../../context/AuthContext";

const PropertyCard = ({ property, isFavourite }) => {
  const {auth,isLoginOpen,toggleLogin} = useContext(AuthContext)
  console.log("auth",toggleLogin);
  
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  

  const handleAdd = () => {
    if (!startDate || !endDate) {
      toast.error("Please select booking dates.");
      return;
    }
    if (endDate <= startDate) {
      toast.error("End date must be after start date.");
      return;
    }

    const bookingDetails = {
      ...property,
      startDate,
      endDate,
    };

    dispatch(addToCart(bookingDetails));
    setIsBookingOpen(false);
    toast.success("Booking confirmed!");
  };

  const handleLikeClick = () => {
    setLiked(!liked);
    if (auth) {
    
      if (liked === false) {
        toast.success("Added to your favourite list");
  
      } else {
        toast.error("Removed from your list.");
      }
      console.log("yes");
    }else{
      toggleLogin("hi")
      console.log("not");
      
    }

    const bookingDetails = {
      ...property,
    };
    dispatch(addToFavourite(bookingDetails));
  };

  useEffect(() => {
    if (isFavourite) {
      setLiked(true);
    }
  }, [isFavourite])
  
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg mx-auto my-6 bg-white transition-transform duration-300 transform hover:scale-105">
      <div className="p-4 ">
        <Image
          src={`/images${property.image}`}
          alt={property.title}
          width={200}
          height={200}

          className="w-full h-48 object-cover rounded-md mb-4 shadow-md"
        />
        <h3 className="text-lg font-semibold text-gray-800">{property.title}</h3>
        <p className="text-gray-600">{property.description}</p>
        <p className="text-gray-500">Location: {property.location}</p>
        <p className="text-gray-500">Bedrooms: {property.bedrooms}</p>
        <p className="text-blue-600 font-bold text-xl">Price: ₹{property.price}</p>
        <div className="flex justify-between items-center">

          <button
            onClick={() => setIsBookingOpen(!isBookingOpen)}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 transition duration-300"
          >
            {isBookingOpen ? "Cancel" : "Book Now"}
          </button>
          <span className="cursor-pointer ">
            <FaHeart className={`${liked ? 'text-red-500' : 'text-gray-400'} size-6`} onClick={handleLikeClick}
              style={{
                cursor: 'pointer',
                // Change color based on liked state
                fontSize: '16px',
                transition: 'color 0.3s ease',
              }} />
          </span>
        </div>

        {isBookingOpen && (
          <div className="mt-4  bg-gray-50 p-4 rounded-md shadow">
            <p className="font-semibold mb-2">Select Booking Dates:</p>
            <div className="flex  justify-center gap-2">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Start Date"
                className="border w-24 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="End Date"
                className="border w-24 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-center">

              <button
                onClick={handleAdd}
                className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md shadow hover:bg-green-600 transition duration-300"
              >
                Confirm Booking
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
