import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./IngredientCard.module.scss";
import PropTypes from "prop-types";

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

const ingredientCardPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number,
});

IngredientCard.propTypes = {
  ingredientCard: ingredientCardPropTypes,
  openModal: PropTypes.func
};

export default IngredientCard;
