import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice.js";
import applicationReducer from "./slices/application.slice.js";
import visaReducer from "./slices/visa.slice.js";
import facilityReportsReducer from "./slices/facilityReports.slice.js";
import housingReducer from "./slices/housing.slice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    application: applicationReducer,
    visa: visaReducer,
    facilityReports: facilityReportsReducer,
    housing: housingReducer,
  },
});

export default store;
