import "./App.module.scss";
import AppHeader from "../AppHeader/AppHeader";
import MainPage from "../../pages/MainPage/MainPage";
import { useEffect, useState } from "react";
import loadIngredients from "../../utils/loadIngredients.js";
const INGREDIENTS_URL = "https://norma.nomoreparties.space/api/ingredients";
const INGREDIENT_TYPE = { bun: "Булка", main: "Начинки", sauce: "Соус" };

function App() {
  const [takeIngredientCards, setTakeIngredientCards] = useState({
    isLoading: true,
    isError: false,
    ingredientCards: [],
  });

  useEffect(() => {
    loadIngredients(INGREDIENTS_URL, INGREDIENT_TYPE).then((result) => {
      const resultStatus = result.status;
      const resultData = result.data;

      if (resultStatus === "success") {
        setTakeIngredientCards({
          ...takeIngredientCards,
          ingredientCards: resultData,
          isLoading: false,
        });
      } else {
        setTakeIngredientCards({
          ...takeIngredientCards,
          isError: resultData,
          isLoading: false,
        });
      }
    });
  }, []);

  return (
    <div>
      <AppHeader />
      {takeIngredientCards.isLoading ? (
        <h1
          style={{
            textAlign: "center",
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "40px",
          }}
          className="text text_type_main-medium"
        >
          Грузим энгридиенты, пожалуйста подожите
        </h1>
      ) : takeIngredientCards.ingredientCards.length ? (
        <MainPage ingredientCards={takeIngredientCards.ingredientCards} />
      ) : (
        <h1
          style={{
            textAlign: "center",
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "40px",
          }}
          className="text text_type_main-medium"
        >
          Не удалось загрузить данные, пожалуйста попробуйте перезагрузить
          страницу
        </h1>
      )}
    </div>
  );
}

export default App;
