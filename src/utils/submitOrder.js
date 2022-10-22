import { checkResponse } from "./checkResponse.js";

const submitOrder = async (INGREDIENTS_URL, ingredientsID) => {
  const promise = await fetch(INGREDIENTS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ ingredients: ingredientsID }),
  })
    .then((response) => checkResponse(response))
    .catch((error) => error);

  return promise;
};

export default submitOrder;
