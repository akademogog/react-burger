const submitOrder = async (INGREDIENTS_URL, ingredientsID) => {
  const promise = await fetch(INGREDIENTS_URL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({'ingredients': ingredientsID}),
  })
    .then((response) => response.json())
    .then((responseResult) => {
      return responseResult;
    })
    .catch((error) => (error));

  return promise;
};

export default submitOrder;
