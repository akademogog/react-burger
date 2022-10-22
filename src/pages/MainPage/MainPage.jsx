import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector, useDispatch } from "react-redux";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import styles from "./MainPage.module.scss";
import loadIngredients from "../../utils/loadIngredients";
import { INGREDIENTS_URL, INGREDIENT_TYPE } from "../../utils/constants";

const MainPage = () => {
  const { isLoading, ingredients = [] } = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    loadIngredients(INGREDIENTS_URL, INGREDIENT_TYPE).then((response) => {
      dispatch({ type: "LOAD_INGREDIENTS", payload: response });
    });
  }, []);

  return (
    <div className={`${styles.mainContainer}`}>
      <h1 className="text text_type_main-large pt-10">Соберите бургер</h1>
      <div className={`${styles.secondContainer}`}>
        {isLoading ? (
          <h1 className={`text text_type_main-medium ${styles.errorH1}`}>
            Грузим ингредиенты, пожалуйста подожите
          </h1>
        ) : ingredients.length ? (
          <>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </>
        ) : (
          <h1 className={`text text_type_main-medium ${styles.errorH1}`}>
            Не удалось загрузить данные, пожалуйста попробуйте перезагрузить
            страницу
          </h1>
        )}
      </div>
    </div>
  );
};

export default MainPage;
