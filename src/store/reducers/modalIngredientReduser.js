import {
  SET_CURRENT_INGREDIENT
} from "../actions/burgerIngredientsActions";

const modalIngredientState = {
  currentIngredient: null,
};

export const modalIngredientReduser = (state = modalIngredientState, action) => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.ingredient,
      };
    }
    default:
      return state;
  }
};