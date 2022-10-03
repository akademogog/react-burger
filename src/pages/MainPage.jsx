import React from "react";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import BurgerIngridients from "../components/BurgerIngridients/BurgerIngridients";
import { ingridientCards } from "../mok.js";

const MainPage = () => {
  return (
    <div className="mainContainer">
      <h1 className="text text_type_main-large pt-10">Соберите бургер</h1>
      <div style={{display: 'flex', justifyContent: "space-between"}}>
        <BurgerIngridients ingridientCards={ingridientCards}/>
        <BurgerConstructor ingridientCards={ingridientCards}/>
      </div>
    </div>
  );
};

export default MainPage;
