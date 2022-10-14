import "./App.module.scss";
import AppHeader from "../AppHeader/AppHeader";
import MainPage from "../../pages/MainPage/MainPage";
import { useEffect, useState } from "react";
import loadIngredients from "../../utils/loadIngredients.js";
import IngredientContext from "../../context/ingredientsContext.js";
const INGREDIENTS_URL = "https://norma.nomoreparties.space/api/ingredients";
const INGREDIENT_TYPE = { bun: "Булка", main: "Начинки", sauce: "Соус" };

function App() {
  const [ingredientCards, setIngredientCards] = useState({
    isLoading: true,
    isError: false,
    ingredients: [],
  });

  useEffect(() => {
    loadIngredients(INGREDIENTS_URL, INGREDIENT_TYPE).then((result) => {
      const resultStatus = result.status;
      const resultData = result.data;

      if (resultStatus === "success") {
        setIngredientCards({
          ...ingredientCards,
          ingredients: resultData,
          isLoading: false,
        });
      } else {
        setIngredientCards({
          ...ingredientCards,
          isError: resultData,
          isLoading: false,
        });
      }
    });
  }, []);

  return (
    <IngredientContext.Provider value={[ingredientCards, setIngredientCards]}>
      <div>
        <AppHeader />
        {ingredientCards.isLoading ? (
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
        ) : ingredientCards.ingredients.length ? (
          <MainPage />
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
    </IngredientContext.Provider>
  );
}

export default App;
