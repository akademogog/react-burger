import { TingredientType } from "./types";

const BASE_API_URL: string = 'https://norma.nomoreparties.space/api';

export const INGREDIENTS_URL: string = `${BASE_API_URL}/ingredients`;
export const ORDERS_URL: string = `${BASE_API_URL}/orders`;
export const REGISTER_URL: string = `${BASE_API_URL}/auth/register`;
export const LOGIN_URL: string = `${BASE_API_URL}/auth/login`;
export const TOKEN_URL: string = `${BASE_API_URL}/auth/token`;
export const LOGOUT_URL: string = `${BASE_API_URL}/auth/logout`;
export const GET_USER_URL: string = `${BASE_API_URL}/auth/user`;
export const PASSWORD_URL: string = `${BASE_API_URL}/password-reset`;
export const PASSWORD_RESET_URL: string = `${PASSWORD_URL}/reset`;

export const INGREDIENT_TYPE: TingredientType = { bun: "Булка", main: "Начинки", sauce: "Соус" };