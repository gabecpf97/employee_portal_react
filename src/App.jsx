import { Provider } from "react-redux";
import store from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
      <>put content here</>
    </Provider>
  );
};

export default App;
