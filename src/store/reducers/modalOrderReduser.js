import {
  SET_ORDER_NUMBER
} from "../actions/burgerIngredientsActions.js";

const modalOrderState = {
  number: null,
};

export const modalOrderReduser = (state = modalOrderState, action) => {
  switch (action.type) {
    case SET_ORDER_NUMBER: {
      return {
        ...state,
        number: action.payload,
      };
    }
    default:
      return state;
  }
};

export const setOrderNumber = (payload) => ({
  type: SET_ORDER_NUMBER,
  payload,
});
