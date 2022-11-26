export interface IIngredientItem {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface IDrgagItem extends IIngredientItem {
  dragId?: string;
  index?: number;
  id?: number;
}

export type Titem = {
  dragId?: string;
};

export type TburgerIngredientsState = {
  isLoading: boolean;
  isError: boolean;
  ingredients: IIngredientItem[];
};

export type TconstructorState = {
  constructorIngredients: IDrgagItem[];
  constructorBun: string;
  totalConstructorPrice: number;
};

export type TmodalIngredientState = {
  currentIngredient: IIngredientItem | null;
};

export type TmodalOrderState = {
  number: number | null
};

export type TuserState = {
  accessToken: string | null;
  email: string;
  name: string;
};

export type TingredientType = {
  [name: string]: string;
};

export type TConstructorDraggableIngredient = {
  index: number,
  item: IDrgagItem,
  handleClose: Function,
  moveCard: Function,
}