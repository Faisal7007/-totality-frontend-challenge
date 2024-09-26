"use client";
import React, { useEffect, useState } from "react";
import PropertyCard from "../propertyCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/app/store/productSlice";
import Filters from "../Filters";
import { RootState } from "@/app/store"; // Import RootState for typed useSelector

// Define types for props
interface PropertiesListingProps {
  isCartOpen: boolean;
}

// Define types for product and cart slices
interface Property {
  id: number;
  location: string;
  price: number;
  bedrooms: number;
}

interface CartState {
  favourites: Property[];
}

interface ProductState {
  data: Property[];
  status: "loading" | "success" | "error";
}

const PropertiesListing: React.FC<PropertiesListingProps> = ({ isCartOpen }) => {
  const dispatch = useDispatch();
  
  // Typed useSelector hooks
  const { data: properties, status } = useSelector(
    (state: RootState) => state.product
  ) as ProductState;
  
  const { favourites } = useSelector(
    (state: RootState) => state.cart
  ) as CartState;

  const [location, setLocation] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [bedrooms, setBedrooms] = useState<number>(0);

  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProperties = properties.filter((property) => {
    const isLocationMatch = location
      ? property.location.includes(location)
      : true;
    const isPriceMatch =
      property.price >= priceRange[0] && property.price <= priceRange[1];
    const isBedroomsMatch = bedrooms ? property.bedrooms === bedrooms : true;

    return isLocationMatch && isPriceMatch && isBedroomsMatch;
  });

  // Calculate favourite property IDs
  const getFavouritePropertyIds = () => {
    return properties
      .filter((property) =>
        favourites.some((favourite) => favourite.id === property.id)
      )
      .map((property) => property.id);
  };

  // Store favourite property IDs in a state variable (optional)
  const [favouritePropertyIds, setFavouritePropertyIds] = useState<number[]>([]);

  useEffect(() => {
    const ids = getFavouritePropertyIds();
    setFavouritePropertyIds(ids); // Set the state with the favourite property IDs
  }, [properties, favourites]); // Add properties to the dependency array as well

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "error") {
    return <div>Error fetching properties.</div>;
  }

  return (
    <div className="flex ">
      {/* Fixed Filters Sidebar */}
      <aside className="w-1/4 p-4 bg-gray-100 shadow-lg rounded-lg h-screen sticky top-0 flex flex-col justify-center max-sm:hidden">
        <h2 className="font-semibold text-xl mb-4 text-center">Filters</h2>
        <Filters
          setLocation={setLocation}
          setPriceRange={setPriceRange}
          setBedrooms={setBedrooms}
          priceRange={priceRange}
        />
      </aside>

      {/* Properties Listing */}
      <main
        className="flex-1 p-4 overflow-y-auto"
        style={{ maxHeight: "100vh" }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Property Listings
        </h1>

        <div className="grid grid-cols-3 justify-items-center gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavourite={favouritePropertyIds.includes(property.id)} // Use the state
              />
            ))
          ) : (
            <div className="col-span-3 text-center text-lg font-semibold">
              Nothing Found
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PropertiesListing;
