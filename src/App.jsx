import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import store from "./store/store";

import RegistrationForm from "./components/registration/registrationForm";
import Login from "./components/login";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import Onboarding from "./components/onboarding/Onboarding";
import Visa from "./components/visa/Visa";

import Profile from "./components/profile/profile";
import HousingSummary from "./components/housing/housingSummary";
import FacilityReports from "./components/housing/facilityReports";
import Navbar from "./components/NavBar";

const App = () => {
  const isLoggedin = localStorage.getItem("authToken");
  return (
    <Provider store={store}>
      <BrowserRouter>
        {isLoggedin && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration/:token" element={<RegistrationForm />} />
          <Route
            path="/onboarding"
            element={isLoggedin ? <Onboarding /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={isLoggedin ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/profile"
            element={isLoggedin ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/visa"
            element={isLoggedin ? <Visa /> : <Navigate to="/login" />}
          />
          <Route
            path="/housing/:housingId"
            element={isLoggedin ? <HousingSummary /> : <Navigate to="/login" />}
          />
          <Route
            path="/housing/reports"
            element={
              isLoggedin ? <FacilityReports /> : <Navigate to="/login" />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
