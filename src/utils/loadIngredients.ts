import { request } from "./request";
import { TingredientType } from "./types";

const loadIngredients = async (INGREDIENTS_URL: string, INGREDIENT_TYPE: TingredientType): Promise<any> => {
  const promise = await request(INGREDIENTS_URL)
    .then((responseResult: any) => {
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
