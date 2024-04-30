import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./store/store";

import RegistrationForm from "./components/registrationForm";
import OnboardingForm from "./components/onboarding/OnboardingForm";
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/onboarding/create" element={<OnboardingForm />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
