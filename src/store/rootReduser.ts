import { combineReducers } from 'redux';
import { burgerIngredientsReduser } from "./reducers/burgerIngredientsReduser.js"
import { constructorReduser } from "./reducers/constructorReduser.js"
import { modalIngredientReduser } from "./reducers/modalIngredientReduser.js"
import { modalOrderReduser } from "./reducers/modalOrderReduser.js"
import { userReduser } from "./reducers/userReduser.js"

export const rootReducer = combineReducers({
  burgerIngredientsReduser,
  constructorReduser,
  modalIngredientReduser,
  modalOrderReduser,
  userReduser
});

export type TState = ReturnType<typeof rootReducer>