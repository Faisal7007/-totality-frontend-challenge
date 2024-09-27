"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useSelector } from 'react-redux';

interface CheckoutProps {
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const Checkout: React.FC<CheckoutProps> = ({ onClose }) => {
  const { items, totalPrice } = useSelector((state:any) => state.cart);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Checkout data:", formData);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <h3 className="text-xl font-semibold mb-2">Total Price: ₹{totalPrice.toFixed(2)}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 w-full rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 w-full rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 w-full rounded-md"
          />
        </div>
        <div>
          <h4 className="font-semibold mt-4">Payment Details</h4>
          <div>
            <label className="block text-sm font-medium mb-1">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 w-full rounded-md"
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Expiry Date</label>
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                placeholder="MM/YY"
                required
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">CVV</label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                required
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>
          </div>
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
          Complete Checkout
        </button>
      </form>
      <button 
        onClick={onClose} 
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
      >
        Go Back 
      </button>
    </div>
  );
};

export default Checkout;
