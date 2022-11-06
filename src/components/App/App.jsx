
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { store } from "../../store/store";
import AppHeader from "../AppHeader/AppHeader";
import MainPage from "../../pages/MainPage/MainPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import IngridientPage from "../../pages/IngridientPage/IngridientPage";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import { ProtectedRoute } from '../../components/ProtectedRoute/ProtectedRoute';
import { ProtectedFromAuth } from '../../components/ProtectedFromAuth/ProtectedFromAuth';
import Page404 from "../../pages/404/Page404";

function App() {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <AppHeader />
          <Switch>
            <Route path="/" exact={true}>
              <MainPage />
            </Route>
            <ProtectedFromAuth path="/login" exact={true}>
              <LoginPage />
            </ProtectedFromAuth>
            <ProtectedFromAuth path="/register" exact={true}>
              <RegisterPage />
            </ProtectedFromAuth>
            <ProtectedFromAuth path="/forgot-password" exact={true}>
              <ForgotPassword />
            </ProtectedFromAuth>
            <ProtectedFromAuth path="/reset-password" exact={true}>
              <ResetPassword />
            </ProtectedFromAuth>
            <Route path="/ingredients/:id" exact={true}>
              <IngridientPage />
            </Route> 
            <ProtectedRoute path="/profile" exact={true}>
              <ProfilePage />
            </ProtectedRoute>
            <ProtectedRoute path="/profile/orders" exact={true}>
              <ProfilePage />
            </ProtectedRoute>
            <Route path="*">
              <Page404 />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
