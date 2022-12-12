import React, { useEffect } from "react";
import OrderDetail from "../../components/OrderDetail/OrderDetail";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import styles from "./OrderPage.module.scss";
import { useLocation } from "react-router-dom";
import { WS_CONNECTION_CLOSE, WS_CONNECTION_START } from "../../store/middleware/socketActionsTypes";

const OrderPage = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(store => store.userReduser.accessToken);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.indexOf('profile/orders') !== -1) {
      dispatch({ type: WS_CONNECTION_START, payload: `?token=${accessToken && accessToken.replace('Bearer ', '')}` });
    } else {
      dispatch({ type: WS_CONNECTION_START, payload: '/all' });
    }

    return (() => {
      dispatch({ type: WS_CONNECTION_CLOSE });
    })
  }, [])

  return (
    <div className={`${styles.container}`}>
      <OrderDetail />
    </div>
  );
};

export default OrderPage;
