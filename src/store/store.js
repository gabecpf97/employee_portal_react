import { configureStore } from "@reduxjs/toolkit";
import registrationReducer from "./slices/registration.slice.js"

const store = configureStore({
  reducer: {
    user: registrationReducer,
  },
});

export default store;
