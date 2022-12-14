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
import { WS_CONNECTION_CLOSE, WS_CONNECTION_START } from "../../store/middleware/socketActionsTypes";
import { IDrgagItem } from "../../utils/types";

const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(store => store.userReduser.accessToken);
  const message = useAppSelector((store) => store.wsReducer.messages);
  const profileForm = useAppSelector((store) => store.userReduser);
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

  const logout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(fetchLogout());
  };

  const getFetchToken = (callback: any) => {
    if (profileForm.accessToken) {
      dispatch(callback);
    } else {
      dispatch(fetchToken());
    }
  };

  useEffect(() => {
    getCurrentOffsetIngredientBlock();
    dispatch({ type: WS_CONNECTION_START, payload: `?token=${accessToken && accessToken.replace('Bearer ', '')}` });

    return (() => {
      dispatch({ type: WS_CONNECTION_CLOSE });
    })
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
          ??????????????
        </NavLink>
        <NavLink
          className={`text text_type_main-medium ${styles.profileNavLink}`}
          to="/profile/orders"
          activeClassName={styles.activeNavLink}
          exact={true}
        >
          ?????????????? ??????????????
        </NavLink>
        <a
          className={`text text_type_main-medium ${styles.profileNavLink}`}
          href="#"
          onClick={logout}
        >
          ??????????
        </a>
        <p className={`text text_type_main-default mt-20 ${styles.text}`}>
          ?? ???????? ?????????????? ???? ???????????? ?????????????????????? ???????? ?????????????? ??????????????
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
        { message && message.orders.map((el: IDrgagItem) => <OrderBlock key={el._id} order={el} />)}
        </div>
      </SimpleBar>
    </div>
  );
};

export default OrdersPage;
