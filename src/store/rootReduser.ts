import { combineReducers } from 'redux';
import { burgerIngredientsReduser } from "./reducers/burgerIngredientsReduser"
import { constructorReduser } from "./reducers/constructorReduser"
import { modalIngredientReduser } from "./reducers/modalIngredientReduser"
import { modalOrderReduser } from "./reducers/modalOrderReduser"
import { userReduser } from "./reducers/userReduser"
import { wsReducer } from "./middleware/socketReduser"

export const rootReducer = combineReducers({
  burgerIngredientsReduser,
  constructorReduser,
  modalIngredientReduser,
  modalOrderReduser,
  userReduser,
  wsReducer,
});

export type TState = ReturnType<typeof rootReducer>