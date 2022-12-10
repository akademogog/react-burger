import React, { useEffect } from "react";
import OrderDetail from "../../components/OrderDetail/OrderDetail";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchFeeds } from "../../store/asyncActions/feeds";
import styles from "./OrderPage.module.scss";
import { useLocation } from "react-router-dom";

const OrderPage = () => {
  const accessToken = useAppSelector(store => store.userReduser.accessToken);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.indexOf('profile/orders') !== -1) {
      dispatch(fetchFeeds(accessToken));
    } else {
      dispatch(fetchFeeds());
    }
  }, [])

  return (
    <div className={`${styles.container}`}>
      <OrderDetail />
    </div>
  );
};

export default OrderPage;
