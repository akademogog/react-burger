import React from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import MainPage from "../../pages/MainPage/MainPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import OrdersPage from "../../pages/OrdersPage/OrdersPage";
import OrderPage from "../../pages/OrderPage/OrderPage";
import FeedPage from "../../pages/FeedPage/FeedPage";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import Page404 from "../../pages/404/Page404";
import MyModal from "../MyModal/MyModal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import IngridientPage from "../../pages/IngridientPage/IngridientPage";
import OrderDetail from "../OrderDetail/OrderDetail";

function SwitchRoutes() {
  const location = useLocation<any | undefined>();
  const history = useHistory();

  const modalGoBack = () => {
    history.goBack();
  };

  return (
    <div>
      <Switch location={ (location.state && location.state.background) || location }>
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
          <OrdersPage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders/:id" exact={true}>
          <OrderPage />
        </ProtectedRoute>
        <Route path="/feed" exact={true}>
          <FeedPage />
        </Route>
        <Route path="/feed/:id" exact={true}>
          <OrderPage />
        </Route>
        <Route path="*">
          <Page404 />
        </Route>
      </Switch>

      {(location.state && location.state.background) && (
        <Switch>
          <Route path="/ingredients/:id">
            <MyModal modalGoBack={modalGoBack}>
              <IngredientDetails />
            </MyModal>
          </Route>
          <ProtectedRoute path="/profile/orders/:id">
            <MyModal modalGoBack={modalGoBack}>
              <OrderDetail />
            </MyModal>
          </ProtectedRoute>
          <Route path="/feed/:id">
            <MyModal modalGoBack={modalGoBack}>
              <OrderDetail />
            </MyModal>
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default SwitchRoutes;
