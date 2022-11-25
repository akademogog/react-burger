import React from "react";
import { useSelector } from "react-redux";
import styles from "./IngredientDetails.module.scss";
import { useParams } from "react-router-dom";
import { TState } from "../../store/rootReduser";
import { IIngredientItem } from "../../utils/types";

const IngredientDetails = () => {
  const { ingredients } = useSelector((store: TState) => store.burgerIngredientsReduser);
  let { id } = useParams();
  const currentIngredient: IIngredientItem = ingredients.find(el => el._id === id);

  return (
    currentIngredient &&
    <div className={`${styles.ingredientModal}`}>
      <div className={`${styles.titleBlock}`}>
        <h2 className={`${styles.titleBlock} text text_type_main-large`}>
          Детали ингредиента
        </h2>
      </div>
      <img
        src={currentIngredient.image_large}
        alt={currentIngredient.name}
        className={`${styles.ingredientImage} mb-4`}
      />
      <h3
        className={`${styles.ingredientName} mb-8 text text_type_main-medium`}
      >
        {currentIngredient.name}
      </h3>
      <div className={`${styles.energyValueContainer}`}>
        <div className={`${styles.energyValueBlock}`}>
          <span className="text text_type_main-default text_color_inactive mb-2">
            Калории,ккал
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {currentIngredient.calories}
          </span>
        </div>
        <div className={`${styles.energyValueBlock}`}>
          <span className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {currentIngredient.proteins}
          </span>
        </div>
        <div className={`${styles.energyValueBlock}`}>
          <span className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {currentIngredient.fat}
          </span>
        </div>
        <div className={`${styles.energyValueBlock}`}>
          <span className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {currentIngredient.carbohydrates}
          </span>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
