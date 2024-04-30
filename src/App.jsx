import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./store/store";

import RegistrationForm from "./components/registrationForm";
import OnboardingForm from "./components/onboarding/OnboardingForm";
import Login from "./components/login";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/onboarding/create" element={<OnboardingForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
