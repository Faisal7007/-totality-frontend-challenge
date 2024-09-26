import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  const cartData = localStorage.getItem("cart");
  const favouriteData = localStorage.getItem("favourites");

  const initialState = {
    items: [],
    favourites: [],
    singleItem: [],
    totalPrice: 0,
    totalQuantity: 0,
    totalQuantityforFav: 0,
  };

  if (cartData) {
    const parsedCartData = JSON.parse(cartData);
    parsedCartData.favourites = favouriteData ? JSON.parse(favouriteData) : [];
    return parsedCartData;
  }
  return initialState;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromLocalStorage(),
  reducers: {
    addToCart(state, action) {
      const existingProduct = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          startDate: action.payload.startDate,
          endDate: action.payload.endDate,
        });
      }
      localStorage.setItem("cart", JSON.stringify(state));
      cartSlice.caseReducers.getCartTotal(state);
    },

    addToFavourite(state, action) {
      const existingFavourite = state.favourites.find(
        (item) => item.id === action.payload.id
      );

      if (!existingFavourite) {
        state.favourites.push(action.payload);
      }
      localStorage.setItem("favourites", JSON.stringify(state.favourites));
      cartSlice.caseReducers.getFavouritesTotalQuantity(state); // Call to update total favourite quantity
    },
    removeFromFavourite(state, action) {
      state.favourites = state.favourites.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("favourites", JSON.stringify(state.favourites));
      cartSlice.caseReducers.getFavouritesTotalQuantity(state); // Call to update total favourite quantity
    },
    getFavouritesTotalQuantity(state) {
      // Reducer to calculate total favourite quantity
      const totalFavouriteQuantity = state.favourites.reduce(
        (total, favouriteItem) => {
          return total + (favouriteItem.quantity || 1); // Default quantity is 1 if not defined
        },
        0
      );

      state.totalFavouriteQuantity = totalFavouriteQuantity;
    },
    goToProduct(state, action) {
      state.singleItem = [action.payload];
      localStorage.setItem("singleItem", JSON.stringify(state.singleItem));
    },

    goToProduct(state, action) {
      state.singleItem = [action.payload];
      localStorage.setItem("singleItem", JSON.stringify(state.singleItem));
    },

    getCartTotal(state) {
      const { totalPrice, totalQuantity } = state.items.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;
          cartTotal.totalPrice += itemTotal;
          cartTotal.totalQuantity += quantity;
          return cartTotal;
        },
        {
          totalPrice: 0,
          totalQuantity: 0,
        }
      );
      state.totalPrice = parseFloat(totalPrice.toFixed(2));
      state.totalQuantity = totalQuantity;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state));
      cartSlice.caseReducers.getCartTotal(state);
    },

    increaseItemQuantity(state, action) {
      const itemToIncrease = state.items.find(
        (item) => item.id === action.payload
      );

      if (itemToIncrease) {
        itemToIncrease.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(state));
        cartSlice.caseReducers.getCartTotal(state);
      }
    },

    decreaseItemQuantity(state, action) {
      const itemToDecrease = state.items.find(
        (item) => item.id === action.payload
      );
      if (itemToDecrease && itemToDecrease.quantity > 1) {
        itemToDecrease.quantity -= 1;
      } else if (itemToDecrease && itemToDecrease.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }

      localStorage.setItem("cart", JSON.stringify(state));
      cartSlice.caseReducers.getCartTotal(state);
    },
  },
});

export const {
  addToCart,
  goToProduct,
  getCartTotal,
  removeFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  addToFavourite,
  removeFromFavourite,
} = cartSlice.actions;

export default cartSlice.reducer;
