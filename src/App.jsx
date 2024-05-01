import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./store/store";

import RegistrationForm from "./components/registration/registrationForm";
import OnboardingForm from "./components/onboarding/OnboardingForm";
import Login from "./components/login";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import HousingSummary from "./components/housing/housingSummary";
import FacilityReports from "./components/housing/facilityReports";
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration/:token" element={<RegistrationForm />} />
          <Route path="/onboarding/create" element={<OnboardingForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/housing/:housingId" element={<HousingSummary />} />
          <Route path="/housing/reports" element={<FacilityReports />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
