import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  startDate?: Date;
  endDate?: Date;
  quantity: number;
  price : number;
}

interface FavouriteItem {
  id: string;
  quantity?: number;
}

interface CartSliceState {
  items: CartItem[];
  favourites: FavouriteItem[];
  singleItem: CartItem[];
  totalPrice: number;
  totalQuantity: number;
  totalQuantityforFav: number;
}

const initialState: CartSliceState = {
  items: [],
  favourites: [],
  singleItem: [],
  totalPrice: 0,
  totalQuantity: 0,
  totalQuantityforFav: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadCartFromLocalStorage(state, action: PayloadAction<CartSliceState>) {
      return { ...state, ...action.payload };
    },
    loadFavouritesFromLocalStorage(state, action: PayloadAction<FavouriteItem[]>) {
      state.favourites = action.payload;
      state.totalQuantityforFav = action.payload.reduce(
        (total, item) => total + (item.quantity || 1),
        0
      );
    },
    addToCart(state, action: PayloadAction<CartItem>) {
      const existingProduct = state.items.find((item) => item.id === action.payload.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state));
      cartSlice.caseReducers.getCartTotal(state);
    },
    addToFavourite(state, action: PayloadAction<FavouriteItem>) {
      const existingFavourite = state.favourites.find((item) => item.id === action.payload.id);
      if (!existingFavourite) {
        state.favourites.push(action.payload);
      }
      localStorage.setItem("favourites", JSON.stringify(state.favourites));
      cartSlice.caseReducers.getFavouritesTotalQuantity(state);
    },
    removeFromFavourite(state, action: PayloadAction<string>) {
      state.favourites = state.favourites.filter((item) => item.id !== action.payload);
      localStorage.setItem("favourites", JSON.stringify(state.favourites));
      cartSlice.caseReducers.getFavouritesTotalQuantity(state);
    },
    getFavouritesTotalQuantity(state) {
      const totalFavouriteQuantity = state.favourites.reduce(
        (total: number, favouriteItem: FavouriteItem) => total + (favouriteItem.quantity || 1),
        0
      );
      state.totalQuantityforFav = totalFavouriteQuantity;
    },
    goToProduct(state, action: PayloadAction<CartItem>) {
      state.singleItem = [action.payload];
      localStorage.setItem("singleItem", JSON.stringify(state.singleItem));
    },
    getCartTotal(state) {
      const { totalPrice, totalQuantity } = state.items.reduce(
        (cartTotal: { totalPrice: number; totalQuantity: number }, cartItem: CartItem) => {
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
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state));
      cartSlice.caseReducers.getCartTotal(state);
    },
    increaseItemQuantity(state, action: PayloadAction<string>) {
      const itemToIncrease = state.items.find((item) => item.id === action.payload);
      if (itemToIncrease) {
        itemToIncrease.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(state));
        cartSlice.caseReducers.getCartTotal(state);
      }
    },
    decreaseItemQuantity(state, action: PayloadAction<string>) {
      const itemToDecrease = state.items.find((item) => item.id === action.payload);
      if (itemToDecrease) {
        if (itemToDecrease.quantity > 1) {
          itemToDecrease.quantity -= 1;
        } else {
          state.items = state.items.filter((item) => item.id !== action.payload);
        }
        localStorage.setItem("cart", JSON.stringify(state));
        cartSlice.caseReducers.getCartTotal(state);
      }
    },
  },
});

export const {
  addToCart,
  loadCartFromLocalStorage,
  loadFavouritesFromLocalStorage,
  goToProduct,
  getCartTotal,
  removeFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  addToFavourite,
  removeFromFavourite,
} = cartSlice.actions;

export default cartSlice.reducer;