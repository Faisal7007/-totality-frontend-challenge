"use client";
import React from "react";

interface FiltersProps {
  setLocation: (location: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setBedrooms: (bedrooms: number) => void;
  priceRange: [number, number];
}

const Filters: React.FC<FiltersProps> = ({ setLocation, setPriceRange, setBedrooms, priceRange }) => {
  return (
    <div className="flex flex-col gap-10 bg-white">
      <select
        onChange={(e) => setLocation(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        defaultValue=""
      >
        <option value="">All Locations</option>
        <option value="New York City, NY">New York City</option>
        <option value="Los Angeles, CA">Los Angeles</option>
        <option value="Chicago, IL">Chicago</option>
      </select>

      <div>
        <label className="block mb-2 font-semibold text-lg">
          Price Range: &#x20B9;{priceRange[0]} - &#x20B9;{priceRange[1]}
        </label>

        <input
          type="range"
          min={0}
          max={100000}
          value={priceRange[0]}
          onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
          className="w-full mb-2 appearance-none h-2 bg-gray-300 rounded-lg"
          style={{
            background: `linear-gradient(to right, #4A90E2 ${
              (priceRange[0] / 100000) * 100
            }%, #d1d5db ${(priceRange[0] / 100000) * 100}%)`,
          }}
        />

        <input
          type="range"
          min={0}
          max={100000}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          className="w-full appearance-none h-2 bg-gray-300 rounded-lg"
          style={{
            background: `linear-gradient(to right, #4A90E2 ${
              (priceRange[1] / 100000) * 100
            }%, #d1d5db ${(priceRange[1] / 100000) * 100}%)`,
          }}
        />
      </div>

      <select
        onChange={(e) => setBedrooms(Number(e.target.value))}
        className="border border-gray-300 rounded-lg p-2  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        defaultValue={0}
      >
        <option value={0}>All Bedrooms</option>
        <option value={1}>1 Bedroom</option>
        <option value={2}>2 Bedrooms</option>
        <option value={3}>3 Bedrooms</option>
        <option value={4}>4 Bedrooms</option>
        <option value={5}>5 Bedrooms</option>
      </select>
    </div>
  );
};

export default Filters;
