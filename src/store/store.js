import { createStore, applyMiddleware, compose } from "redux";
import { burgerIngredientsReduser } from "./reducers/burgerIngredientsRedusers";

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose; 

const enhancer = composeEnhancers();

export const store = createStore(burgerIngredientsReduser, enhancer);