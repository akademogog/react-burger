import React from "react";
import Done from "../../image/done.svg";
import styles from "./OrderDetails.module.scss";
import { useSelector } from "react-redux";

const OrderDetails = () => {
  const number = useSelector((store) => store.modalOrderReduser.number);
  
  return (
    <div className={`${styles.orderAcceptedBlock}`}>
      <h2 className="text text_type_digits-large mb-8">{number}</h2>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img src={Done} alt="" className="mb-15" />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
