import { request } from "./request";

const submitOrder = async (INGREDIENTS_URL: string, ingredientsID: object) => {  
  const promise = await request(INGREDIENTS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ ingredients: ingredientsID }),
  })
    .catch((error) => error);

  return promise;
};

export default submitOrder;
