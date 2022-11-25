import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./IngredientCard.module.scss";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { ingredientCardPropTypes } from "../../utils/types";
import { useLocation, Link } from "react-router-dom";

const IngredientCard = ({ ingredientCard, total }) => {
  const location = useLocation();
  const [, dragRef] = useDrag({
    type: "card",
    item: ingredientCard,
  });

  return (
    <Link
      className={styles.link}
      to={{
        pathname: `/ingredients/${ingredientCard._id}`,
        state: { background: location },
      }}
    >
      <div
      ref={dragRef}
      className={styles.ingredientCard}
    >
      {total !== 0 && (
        <div
          className={`${styles.ingredientCounter} text text_type_digits-default`}
        >
          <span>{total}</span>
        </div>
      )}
      <img
        src={ingredientCard.image}
        alt={ingredientCard.name}
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
    </Link>
  );
};

IngredientCard.propTypes = {
  ingredientCard: ingredientCardPropTypes,
  openModal: PropTypes.func,
  total: PropTypes.number,
};

export default IngredientCard;
