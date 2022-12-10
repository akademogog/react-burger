import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./OrdersPage.module.scss";
import {
  fetchLogout,
  fetchGetUser,
  fetchToken,
} from "../../store/asyncActions/userAuth";
import OrderBlock from "../../components/OrderBlock/OrderBlock";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import SimpleBar from "simplebar-react";
import { fetchFeeds } from "../../store/asyncActions/feeds";

const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const payload = useAppSelector((store) => store.feedReduser.payload);
  const profileForm = useAppSelector((store) => store.userReduser);
  let accessToken = useAppSelector((store) => store.userReduser.accessToken);
  const [offsetTopScrollBlock, setOffsetTopScrollBlock] = useState<number>(0);
  const scrollableNodeRef = useRef<HTMLDivElement | any>(null);

  const getCurrentOffsetIngredientBlock = () => {
    const currentScrolableRef = scrollableNodeRef.current;
    currentScrolableRef && setOffsetTopScrollBlock(currentScrolableRef.getBoundingClientRect().top);
  };

  useEffect(() => {
    getCurrentOffsetIngredientBlock();
  }, [])

  useEffect(() => {
    getFetchToken(fetchGetUser(profileForm.accessToken));
  }, [profileForm.accessToken]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(fetchLogout());
  };

  const getFetchToken = (callback) => {
    if (profileForm.accessToken) {
      dispatch(callback);
    } else {
      dispatch(fetchToken());
    }
  };

  useEffect(() => {
    getCurrentOffsetIngredientBlock();
    dispatch(fetchFeeds(accessToken));
  }, [])

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.profileNav} mr-15`}>
        <NavLink
          className={`text text_type_main-medium ${styles.profileNavLink}`}
          to="/profile"
          activeClassName={styles.activeNavLink}
          exact={true}
        >
          Профиль
        </NavLink>
        <NavLink
          className={`text text_type_main-medium ${styles.profileNavLink}`}
          to="/profile/orders"
          activeClassName={styles.activeNavLink}
          exact={true}
        >
          История заказов
        </NavLink>
        <a
          className={`text text_type_main-medium ${styles.profileNavLink}`}
          href="#"
          onClick={logout}
        >
          Выход
        </a>
        <p className={`text text_type_main-default mt-20 ${styles.text}`}>
          В этом разделе вы можете просмотреть свою историю заказов
        </p>
      </div>
      <SimpleBar
        style={{
          width: '100%',
          maxHeight: `calc(100vh - ${offsetTopScrollBlock}px - 1px)`,
        }}
        autoHide={false}
        scrollableNodeProps={{ ref: scrollableNodeRef }}
      >
        <div className={`${styles.orderContainer}`}>
        { payload && payload.orders.map((el) => <OrderBlock key={el._id} order={el} />)}
        </div>
      </SimpleBar>
    </div>
  );
};

export default OrdersPage;
