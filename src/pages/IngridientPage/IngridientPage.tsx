import React, { useEffect, useState } from "react";
import styles from "./IngridientPage.module.scss";
import { useParams } from "react-router-dom";
import { IDrgagItem } from "../../utils/types";
import { useAppSelector } from "../../hooks/hooks";

type TthisId = {
  id: string;
}

const IngridientPage = () => {
  const thisId = useParams<TthisId>();
  const ingredients = useAppSelector(
    (store) => store.burgerIngredientsReduser.ingredients
  );
  const [currentIngredient, setCurrentIngredient] =
    useState<IDrgagItem>();

  useEffect(() => {
    if (ingredients.length) {
      setCurrentIngredient(ingredients.find((el: IDrgagItem) => el._id === thisId.id));
    }
  }, [ingredients]);

  return (
    <div className={`${styles.ingredientPage}`}>
      <div className={`${styles.titleBlock}`}>
        <h2 className={`text text_type_main-large`}>Детали ингредиента</h2>
      </div>
      <img
        src={currentIngredient?.image_large}
        alt={currentIngredient?.name}
        className={`${styles.ingredientImage} mb-4`}
      />
      <h3
        className={`${styles.ingredientName} mb-8 text text_type_main-medium`}
      >
        {currentIngredient?.name}
      </h3>
      <div className={`${styles.energyValueContainer}`}>
        <div className={`${styles.energyValueBlock}`}>
          <span className="text text_type_main-default text_color_inactive mb-2">
            Калории,ккал
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {currentIngredient?.calories}
          </span>
        </div>
        <div className={`${styles.energyValueBlock}`}>
          <span className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {currentIngredient?.proteins}
          </span>
        </div>
        <div className={`${styles.energyValueBlock}`}>
          <span className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {currentIngredient?.fat}
          </span>
        </div>
        <div className={`${styles.energyValueBlock}`}>
          <span className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {currentIngredient?.carbohydrates}
          </span>
        </div>
      </div>
    </div>
  );
};

export default IngridientPage;
