import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./store/store";

import RegistrationForm from "./components/registration/registrationForm";
import Login from "./components/login";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import Onboarding from "./components/onboarding/Onboarding";
import Visa from "./components/visa/Visa";
import Profile from "./components/profile/profile"

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration/:token" element={<RegistrationForm />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/visa" element={<Visa />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
