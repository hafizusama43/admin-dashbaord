import { createAppSlice } from "@/lib/store/createAppSlice";
import { SelectProduct } from "@/server/db/schema";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AccountSliceState {
  status: "idle" | "loading" | "failed";
  deleteStatus: "idle" | "loading" | "failed";
  products: SelectProduct[];
  newOffset: number | null;
  totalProducts: number;
  product: SelectProduct | null;
  showEditModal: boolean;
  showViewModal: boolean;
  showDeleteModal: boolean;
  reFetch: boolean;
}

const initialState: AccountSliceState = {
  status: "idle",
  deleteStatus: "idle",
  products: [],
  product: null,
  newOffset: null,
  totalProducts: 0,
  showEditModal: false,
  showViewModal: false,
  showDeleteModal: false,
  reFetch: false,
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const productSlice = createAppSlice({
  name: "product",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    setProductSliceBits: create.reducer(
      (state, action: PayloadAction<{ bitToSet: keyof AccountSliceState; value: any }>) => {
        const { bitToSet, value } = action.payload;
        // @ts-ignore
        state[bitToSet] = value; // Update the specific bit
      }
    ),
    getProducts: create.asyncThunk(
      async (data: { [key: string]: string | number }) => {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASEURL;
        const apiUrl = new URL(`${baseUrl}/products`);

        // Append query parameters
        Object.entries(data).forEach(([key, value]) => {
          apiUrl.searchParams.append(key, String(value));
        });
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        return await response.json();
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.products = action.payload.products;
          state.newOffset = action.payload.newOffset;
          state.totalProducts = action.payload.totalProducts
          state.status = "idle";
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),

    deleteProduct: create.asyncThunk(
      async (data: { [key: string]: string | number }) => {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASEURL;
        const apiUrl = new URL(`${baseUrl}/product`);

        // Append query parameters
        Object.entries(data).forEach(([key, value]) => {
          apiUrl.searchParams.append(key, String(value));
        });
        const response = await fetch(apiUrl, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        return await response.json();
      },
      {
        pending: (state) => {
          state.deleteStatus = "loading";
        },
        fulfilled: (state, action) => {
          state.reFetch = true;
          state.deleteStatus = "idle";
        },
        rejected: (state) => {
          state.deleteStatus = "failed";
        },
      }
    ),
  }),
});

export const { setProductSliceBits, getProducts, deleteProduct } = productSlice.actions;
export const productReducer = productSlice.reducer;
