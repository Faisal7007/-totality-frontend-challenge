"use client";
import React, { useEffect, useState } from "react";
import PropertyCard from "../propertyCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/app/store/productSlice";
import { AppDispatch, RootState } from "../../store/store";
import Filters from "../Filters";

interface PropertiesListingProps {
  isCartOpen: boolean;
}

const PropertiesListing: React.FC<PropertiesListingProps> = ({ isCartOpen }) => {
  const dispatch = useDispatch<AppDispatch>(); // Properly type dispatch

  const { data: properties, status } = useSelector(
    (state: RootState) => state.product
  );

  const { favourites } = useSelector((state: RootState) => state.cart);

  const [location, setLocation] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [bedrooms, setBedrooms] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchProducts()); // Now it works correctly
  }, [dispatch]);

  const filteredProperties = properties.filter((property: any) => {
    const isLocationMatch = location
      ? property.location.includes(location)
      : true;
    const isPriceMatch =
      property.price >= priceRange[0] && property.price <= priceRange[1];
    const isBedroomsMatch = bedrooms ? property.bedrooms === bedrooms : true;

    return isLocationMatch && isPriceMatch && isBedroomsMatch;
  });

  const getFavouritePropertyIds = () => {
    return properties
      .filter((property: any) =>
        favourites.some((favourite: any) => favourite.id === property.id)
      )
      .map((property: any) => property.id);
  };

  const [favouritePropertyIds, setFavouritePropertyIds] = useState<number[]>([]);

  useEffect(() => {
    const ids = getFavouritePropertyIds();
    setFavouritePropertyIds(ids);
  }, [properties, favourites]);


  return (
    <div className="flex">
      <aside className="w-1/4 p-4 bg-gray-100 shadow-lg rounded-lg h-screen sticky top-0 flex flex-col justify-center max-sm:hidden">
        <h2 className="font-semibold text-xl mb-4 text-center">Filters</h2>
        <Filters
          setLocation={setLocation}
          setPriceRange={setPriceRange}
          setBedrooms={setBedrooms}
          priceRange={priceRange}
        />
      </aside>

      <main className="flex-1 p-4 overflow-y-auto" style={{ maxHeight: "100vh" }}>
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Property Listings
        </h1>

        <div className="grid grid-cols-3 justify-items-center gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property: any) => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavourite={favouritePropertyIds.includes(property.id)}
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
