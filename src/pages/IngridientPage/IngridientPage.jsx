import React, { useEffect, useState } from "react";
import styles from "./IngridientPage.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchIngredients } from "../../store/asyncActions/ingredients";

const IngridientPage = () => {
  const dispatch = useDispatch();
  const thisId = useParams();
  const { ingredients } = useSelector(
    (store) => store.burgerIngredientsReduser
  );
  const [currentIngredient, setCurrentIngredient] = useState([]);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  useEffect(() => {
    if (ingredients.length) {
      setCurrentIngredient(ingredients.find((el) => el._id === thisId.id));
    }
  }, [ingredients]);

  console.log(currentIngredient);

  return (
    <div className={`${styles.ingredientPage}`}>
      <div className={`${styles.titleBlock}`}>
        <h2 className={`text text_type_main-large`}>Детали ингредиента</h2>
      </div>
      <img
        src={currentIngredient.image_large}
        alt=""
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

export default IngridientPage;
