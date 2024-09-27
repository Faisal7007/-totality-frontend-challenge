import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const STATUSES = {
    IDLE: 'IDLE',
    ERROR: 'ERROR',
    LOADING: 'LOADING',
} as const;

// Define types for the product and the slice state
interface Product {
    id: number;
    title: string;
    price: number;
    // Add any other relevant product fields
}

interface ProductState {
    data: Product[];
    status: keyof typeof STATUSES; // Status must match the STATUSES object keys
}

// Initial state with proper typing
const initialState: ProductState = {
    data: [],
    status: STATUSES.IDLE,
};

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk<Product[]>(
    'products/fetch',
    async () => {
        const response = await axios.get('data/properties.json');
        return response.data;
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.data = action.payload;
        },
        setStatus: (state, action: PayloadAction<keyof typeof STATUSES>) => {
            state.status = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.status = STATUSES.ERROR;
            });
    },
});

// Export the actions if you want to use them elsewhere
export const { setProducts, setStatus } = productSlice.actions;

// Export the reducer
export default productSlice.reducer;
