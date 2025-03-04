import { createAppSlice } from "@/lib/store/createAppSlice";
import { SelectProduct } from "@/server/db/schema";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AccountSliceState {
  status: "idle" | "loading" | "failed";
  products: SelectProduct[];
  newOffset: number | null;
  totalProducts: number
}

const initialState: AccountSliceState = {
  status: "idle",
  products: [],
  newOffset: null,
  totalProducts: 0
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
        const apiUrl = process.env.NEXT_PUBLIC_API_BASEURL + "/products";
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        });
        return await response.json();
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          console.log(action.payload);
          state.status = "idle";
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
  }),
});

export const { setProductSliceBits, getProducts } = productSlice.actions;
export const productReducer = productSlice.reducer;
