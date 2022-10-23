import { combineReducers } from 'redux';
import { burgerIngredientsReduser } from "./reducers/burgerIngredientsReduser"
import { constructorReduser } from "./reducers/constructorReduser"
import { modalIngredientReduser } from "./reducers/modalIngredientReduser"
import { modalOrderReduser } from "./reducers/modalOrderReduser"

export const rootReducer = combineReducers({
  burgerIngredientsReduser,
  constructorReduser,
  modalIngredientReduser,
  modalOrderReduser
});