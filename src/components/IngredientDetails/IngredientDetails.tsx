import React from "react";
import { useAppSelector } from "../../hooks/hooks";
import styles from "./IngredientDetails.module.scss";
import { useParams } from "react-router-dom";
import { TuseParams } from "../OrderDetail/OrderDetail";

const IngredientDetails = () => {
  const ingredients = useAppSelector((store) => store.burgerIngredientsReduser.ingredients);
  let { id } = useParams<TuseParams>();
  const currentIngredient = ingredients.find(el => el._id === id);

  return (
    currentIngredient ?
    <div className={`${styles.ingredientModal}`} data-testid="ingredientModal">
      <div className={`${styles.titleBlock}`}>
        <h2 className={`${styles.titleBlock} text text_type_main-large`}>
          Детали ингредиента
        </h2>
      </div>
      <img
        src={currentIngredient.image_large}
        alt={currentIngredient.name}
        data-testid="ingredientImage"
        className={`${styles.ingredientImage} mb-4`}
      />
      <h3
        className={`${styles.ingredientName} mb-8 text text_type_main-medium`} data-testid="ingredientName"
      >
        {currentIngredient.name}
      </h3>
      <div className={`${styles.energyValueContainer}`}>
        <div className={`${styles.energyValueBlock}`}>
          <span className="text text_type_main-default text_color_inactive mb-2">
            Калории,ккал
          </span>
          <span className="text text_type_digits-default text_color_inactive" data-testid="ingredientCal">
            {currentIngredient.calories}
          </span>
        </div>
        <div className={`${styles.energyValueBlock}`}>
          <span className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </span>
          <span className="text text_type_digits-default text_color_inactive" data-testid="ingredientProt">
            {currentIngredient.proteins}
          </span>
        </div>
        <div className={`${styles.energyValueBlock}`}>
          <span className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </span>
          <span className="text text_type_digits-default text_color_inactive" data-testid="ingredientFat">
            {currentIngredient.fat}
          </span>
        </div>
        <div className={`${styles.energyValueBlock}`}>
          <span className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </span>
          <span className="text text_type_digits-default text_color_inactive" data-testid="ingredientCar">
            {currentIngredient.carbohydrates}
          </span>
        </div>
      </div>
    </div>
    : null
  );
};

export default IngredientDetails;
