import { checkResponse } from "./checkResponse";
import { request } from "./request";

const loadIngredients = async (INGREDIENTS_URL, INGREDIENT_TYPE) => {
  const promise = await request(INGREDIENTS_URL)
    .then((responseResult) => {
      const responseResultData = responseResult.data;

      if (INGREDIENT_TYPE) {
        responseResultData.map((card) => {
          const curentType = card.type;

          for (const key in INGREDIENT_TYPE) {
            if (curentType === key) {
              card.type = INGREDIENT_TYPE[key]
            }
          }
          return card;
        });
      }

      return {status: 'success', data: responseResultData};
    }).catch((error) => ({status: 'error', data: error}));
  
  return promise;
};

export default loadIngredients;
