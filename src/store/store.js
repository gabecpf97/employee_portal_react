import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice.js";
import applicationReducer from "./slices/application.slice.js";
import visaReducer from "./slices/visa.slice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    application: applicationReducer,
    visa: visaReducer,
  },
});

export default store;
