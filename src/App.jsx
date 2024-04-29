import { Provider } from "react-redux";
import store from "./store/store";

import RegistrationForm from "./components/registrationForm";
const App = () => {
  return (
    <Provider store={store}>
      <>put content here</>
      <RegistrationForm />
    </Provider>
  );
};

export default App;
