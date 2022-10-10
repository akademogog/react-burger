import React from "react";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import styles from "./MainPage.module.scss";
import PropTypes from "prop-types";

const MainPage = ({ ingredientCards }) => {
  return (
    <div className={`${styles.mainContainer}`}>
      <h1 className="text text_type_main-large pt-10">Соберите бургер</h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <BurgerIngredients ingredientCards={ingredientCards} />
        <BurgerConstructor ingredientCards={ingredientCards} />
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

BurgerConstructor.propTypes = {
  ingredientCards: PropTypes.arrayOf(ingredientCardPropTypes).isRequired
};

export default MainPage;
