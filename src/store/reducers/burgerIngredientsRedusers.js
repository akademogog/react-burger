import {
  LOAD_INGREDIENTS,
  SET_CURRENT_INGREDIENT,
  SET_CONSTRUCTOR_INGREDIENTS,
  UPDATE_CONSTRUCTOR_INGREDIENTS,
  DEL_CONSTRUCTOR_INGREDIENTS,
  SET_CONSTRUCTOR_BUN,
  SET_CONSTRUCTOR_PRICE,
  SET_ORDER,
} from "../actions/burgerIngredientsActions";

const initialState = {
  isLoading: true,
  isError: false,
  ingredients: [],
  currentIngredient: null,
  constructorIngredients: [],
  constructorBun: null,
  totalConstructorPrice: 0,
  order: {
    name: "",
    number: null,
    ingredients: [],
    orderIngredentID: [],
  },
};

export const burgerIngredientsReduser = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_INGREDIENTS: {
      return {
        ...state,
        isLoading: false,
        isError: action.payload.status === "error" && false,
        ingredients: action.payload.status === "success" && action.payload.data,
      };
    }
    case SET_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.ingredient,
      };
    }
    case SET_CONSTRUCTOR_INGREDIENTS: {
      return {
        ...state,
        constructorIngredients: [
          ...state.constructorIngredients,
          action.ingredient,
        ],
      };
    }
    case UPDATE_CONSTRUCTOR_INGREDIENTS: {
      return {
        ...state,
        constructorIngredients: action.ingredients,
      };
    }
    case DEL_CONSTRUCTOR_INGREDIENTS: {
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients].filter(
          (el, index) => index !== action.curentIndex
        ),
      };
    }
    case SET_CONSTRUCTOR_BUN: {
      return {
        ...state,
        constructorBun: action.ingredient,
      };
    }
    case SET_CONSTRUCTOR_PRICE: {
      let thisTotalSumm = 0;

      for (const key in state.constructorIngredients) {
        const element = state.constructorIngredients[key];
        thisTotalSumm += element.price;
      }

      if (state.constructorBun) {
        thisTotalSumm += state.constructorBun.price * 2;
      }

      return {
        ...state,
        totalConstructorPrice: thisTotalSumm,
      };
    }
    case SET_ORDER: {
      return {
        ...state,
        order: {
          number: action.number ? action.number : state.order.number,
          name: action.name ? action.name : state.order.name,
          ingredients:
            state.constructorBun !== null
              ? [state.constructorBun, ...state.constructorIngredients]
              : [...state.constructorIngredients],
          orderIngredentID:
            state.constructorBun !== null
              ? [state.constructorBun, ...state.constructorIngredients].map(
                  (e) => e["_id"]
                )
              : [...state.constructorIngredients].map((e) => e["_id"]),
        },
      };
    }

    default:
      return state;
  }
};
