import "./App.module.scss";
import AppHeader from "../AppHeader/AppHeader";
import MainPage from "../../pages/MainPage/MainPage";
import { useMemo, useState } from "react";

function App() {
  const ingredientsUrl = "https://norma.nomoreparties.space/api/ingredients";
  const [takeIngredientCards, setTakeIngredientCards] = useState({
    isLoading: false,
    ingredientCards: [],
  });

  useMemo(() => {
    fetch(ingredientsUrl)
      .then((response) => response.json())
      .then((success) => {
        const dataCards = success.data;
        dataCards.map((card) => {
          if (card.type === "bun") {
            card.type = "Булка";
          }

          if (card.type === "main") {
            card.type = "Начинки";
          }

          if (card.type === "sauce") {
            card.type = "Соусы";
          }

          return card;
        });
        setTakeIngredientCards({
          ...takeIngredientCards,
          ingredientCards: dataCards,
          isLoading: true,
        });
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <AppHeader />
      {takeIngredientCards.isLoading ? (
        <MainPage ingredientCards={takeIngredientCards.ingredientCards} />
      ) : (
        <h1>Не удалось загрузить данные</h1>
      )}
      <div id="react-modals"></div>
    </div>
  );
}

export default App;
