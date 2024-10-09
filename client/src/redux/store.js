import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import paintingsSlice from "./paintingsSlice";

export const store = configureStore({
  reducer: {
    user: authReducer,
    paintings: paintingsSlice,
  },
});