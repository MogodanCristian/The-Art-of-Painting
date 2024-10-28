import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import paintingsSlice from "./paintingsSlice";
import hackerSlice from "./hackerSlice"

export const store = configureStore({
  reducer: {
    user: authReducer,
    paintings: paintingsSlice,
    hacker: hackerSlice
  },
});