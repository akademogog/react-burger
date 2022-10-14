import React from "react";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import styles from "./MainPage.module.scss";

const MainPage = () => {
  return (
    <div className={`${styles.mainContainer}`}>
      <h1 className="text text_type_main-large pt-10">Соберите бургер</h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </div>
  );
};

export default MainPage;
