import { ORDERS_URL } from "../../utils/constants";
import { request } from "../../utils/request.js";
import { setOrderNumber } from "../reducers/modalOrderReduser.js";

export const fetchOrder = (ingredientsID) => {
  return (dispatch) => {
    request(ORDERS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ ingredients: ingredientsID }),
    })
      .then(res => {
        if (res.success) {
          dispatch(setOrderNumber(res.order.number))
        }
      })
      .catch((error) => error)
  };
};