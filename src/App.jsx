import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./store/store";

import RegistrationForm from "./components/registration/registrationForm";
import Login from "./components/login/login";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import Onboarding from "./components/onboarding/Onboarding";
import Visa from "./components/visa/Visa";

import Profile from "./components/profile/profile";
import HousingSummary from "./components/housing/housingSummary";
import FacilityReports from "./components/housing/facilityReports";
//import Navbar from "./components/NavBar";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

const App = () => {
  //const isLoggedin = localStorage.getItem("authToken");
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* {isLoggedin && <Navbar />} */}
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/registration/:token" element={<RegistrationForm />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/visa" element={<Visa />} />
            <Route path="/housing/:housingId" element={<HousingSummary />} />
            <Route path="/housing/reports" element={<FacilityReports />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
