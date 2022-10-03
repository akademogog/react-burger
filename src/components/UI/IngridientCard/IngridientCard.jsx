import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./IngridientCard.module.scss";

const IngridientCard = ({ ingridientCard, openModal }) => {
  return (
    <div className={styles.ingridientCard} onClick={() => openModal(ingridientCard)}>
      <div className={`${styles.ingridientCounter} text text_type_digits-default`}>
        <span>1</span>
      </div>
      <img
        src={ingridientCard.image}
        alt=""
        className={`${styles.ingridientImage} mb-2`}
      />
      <div className={`${styles.ingridientPrice} mb-2`}>
        <span className={`text text_type_digits-default mr-2`}>
          {ingridientCard.price}
        </span>{" "}
        <CurrencyIcon type="primary" />
      </div>
      <div
        className={`${styles.ingridientName} name text text_type_main-default`}
      >
        {ingridientCard.name}
      </div>
    </div>
  );
};

export default IngridientCard;
