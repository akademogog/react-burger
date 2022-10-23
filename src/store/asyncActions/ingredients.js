import { INGREDIENTS_URL, INGREDIENT_TYPE } from "../../utils/constants";
import { loadIngredientsRequest, loadIngredientsSuccess, loadIngredientsError } from "../reducers/burgerIngredientsReduser";

export const fetchIngredients = () => {
  return (dispatch) => {
    dispatch(loadIngredientsRequest(true));
    fetch(INGREDIENTS_URL)
      .then((response) => response.json())
      .then((responseResult) => {
        const responseResultData = responseResult.data;

        if (INGREDIENT_TYPE) {
          responseResultData.map((card) => {
            const curentType = card.type;

            for (const key in INGREDIENT_TYPE) {
              if (curentType === key) {
                card.type = INGREDIENT_TYPE[key];
              }
            }
            return card;
          });
        }

        dispatch(loadIngredientsRequest(false));
        dispatch(loadIngredientsSuccess(responseResultData));
      })
      .catch((error) => {
        dispatch(loadIngredientsRequest(false));
        dispatch(loadIngredientsError(true));
      });
  };
};
