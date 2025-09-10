// store/store.js

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productsReducer from "./addSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
     product: productsReducer,
  },
});
// "use client";
// import { configureStore } from "@reduxjs/toolkit";
// import { Provider } from "react-redux";
// import productsReducer  from "./cartSlice"

// export const store = configureStore({
//   reducer: {
//     products: productsReducer,
//   },
// });

// export function Providers({ children }) {
//   return <Provider store={store}>{children}</Provider>;
// }
