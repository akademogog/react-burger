import { createStore } from "redux";
import { burgerIngredientsReduser } from "./reducers/burgerIngredientsRedusers";

export const store = createStore(burgerIngredientsReduser);