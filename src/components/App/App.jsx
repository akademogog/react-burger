import AppHeader from "../AppHeader/AppHeader";
import MainPage from "../../pages/MainPage/MainPage";
import { Provider } from "react-redux";
import { store } from "../../store/store";

function App() {
  return (
    <div>
      <Provider store={store}>
        <AppHeader />
        <MainPage />
      </Provider>
    </div>
  );
}

export default App;
