import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice.js";
import housingReducer from "./slices/housing.slice.js";
import facilityReportsReducer from "./slices/facilityReports.slice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    housing: housingReducer,
    facilityReports: facilityReportsReducer,
  },
});

export default store;
