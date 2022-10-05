import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./IngredientCard.module.scss";

const IngredientCard = ({ ingredientCard, openModal }) => {
  return (
    <div className={styles.ingredientCard} onClick={() => openModal(ingredientCard)}>
      <div className={`${styles.ingredientCounter} text text_type_digits-default`}>
        <span>1</span>
      </div>
      <img
        src={ingredientCard.image}
        alt=""
        className={`${styles.ingredientImage} mb-2`}
      />
      <div className={`${styles.ingredientPrice} mb-2`}>
        <span className={`text text_type_digits-default mr-2`}>
          {ingredientCard.price}
        </span>{" "}
        <CurrencyIcon type="primary" />
      </div>
      <div
        className={`${styles.ingredientName} name text text_type_main-default`}
      >
        {ingredientCard.name}
      </div>
    </div>
  );
};

export default IngredientCard;
