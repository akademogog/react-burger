import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAppSelector } from "../../hooks/hooks";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import styles from "./MainPage.module.scss";

const MainPage = () => {
  const { isLoading, ingredients, isError } = useAppSelector(
    (store) => store.burgerIngredientsReduser
  );

  return (
    <div className={`${styles.mainContainer}`}>
      <h1 className="text text_type_main-large pt-10">Соберите бургер</h1>
      <div className={`${styles.secondContainer}`}>
        {isLoading && !isError && !ingredients.length && (
          <h1 className={`text text_type_main-medium ${styles.errorH1}`}>
            Грузим ингредиенты, пожалуйста подожите
          </h1>
        )}

        {!isLoading && !isError && ingredients.length && (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        )}

        {!isLoading && isError && !ingredients.length && (
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
