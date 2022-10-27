import { checkResponse } from "../../utils/checkResponse.js";
import { ORDERS_URL } from "../../utils/constants";
import { setOrderNumber } from "../reducers/modalOrderReduser.js";

export const fetchOrder = (ingredientsID) => {
  return (dispatch) => {
    fetch(ORDERS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ ingredients: ingredientsID }),
    })
      .then((response) => checkResponse(response))
      .then(res => {
        if (res.success) {
          dispatch(setOrderNumber(res.order.number))
        }
      })
      .catch((error) => error)
  };
};