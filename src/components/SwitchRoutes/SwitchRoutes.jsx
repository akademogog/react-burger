import React from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import MainPage from "../../pages/MainPage/MainPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import Page404 from "../../pages/404/Page404";
import MyModal from "../MyModal/MyModal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import IngridientPage from "../../pages/IngridientPage/IngridientPage";

function SwitchRoutes() {
  const location = useLocation();
  const history = useHistory();

  let background = location.state && location.state.background;
  const modalGoBack = () => {
    history.goBack();
  };

  return (
    <div>
      <Switch location={background || location}>
        <Route path="/" exact={true}>
          <MainPage />
        </Route>
        <Route path="/login" exact={true}>
          <LoginPage />
        </Route>
        <Route path="/register" exact={true}>
          <RegisterPage />
        </Route>
        <Route path="/forgot-password" exact={true}>
          <ForgotPassword />
        </Route>
        <Route path="/reset-password" exact={true}>
          <ResetPassword />
        </Route>
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

      {background && (
        <Route path="/ingredients/:id">
          <MyModal modalGoBack={modalGoBack}>
            <IngredientDetails />
          </MyModal>
        </Route>
      )}
    </div>
  );
}

export default SwitchRoutes;
