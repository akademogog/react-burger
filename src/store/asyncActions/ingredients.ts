import { INGREDIENTS_URL, INGREDIENT_TYPE } from "../../utils/constants";
import { request } from "../../utils/request";
import { AppDispatch, AppThunk } from "../../utils/types";
import { loadIngredientsRequest, loadIngredientsSuccess, loadIngredientsError } from "../actions/burgerIngredientsActions";

export const fetchIngredients: AppThunk = () => {
  return (dispatch: AppDispatch) => {
    dispatch(loadIngredientsRequest(true));
    request(INGREDIENTS_URL)
      .then((responseResult: any) => {
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
