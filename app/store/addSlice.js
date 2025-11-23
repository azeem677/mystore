import { createSlice } from "@reduxjs/toolkit";

// Load products from localStorage
// const loadProducts = () => {
//   if (typeof window !== "undefined") {
//     const saved = localStorage.getItem("products");
//     return saved ? JSON.parse(saved) : [];
//   }
//   return [];
// };

const productsSlice = createSlice({
  name: "products",
  initialState:[] ,// load from localStorage
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
      // Save updated state to localStorage
      localStorage.setItem("products", JSON.stringify(state));
    },
  },
});

export const { addProduct } = productsSlice.actions;
export default productsSlice.reducer;
