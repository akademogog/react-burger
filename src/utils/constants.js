const BASE_API_URL = 'https://norma.nomoreparties.space/api';

export const INGREDIENTS_URL = `${BASE_API_URL}/ingredients`;
export const ORDERS_URL = `${BASE_API_URL}/orders`;
export const REGISTER_URL = `${BASE_API_URL}/auth/register`;
export const LOGIN_URL = `${BASE_API_URL}/auth/login`;
export const TOKEN_URL = `${BASE_API_URL}/auth/token`;
export const LOGOUT_URL = `${BASE_API_URL}/auth/logout`;
export const GET_USER_URL = `${BASE_API_URL}/auth/user`;
export const PASSWORD_URL = `${BASE_API_URL}/password-reset`;
export const PASSWORD_RESET_URL = `${PASSWORD_URL}/reset`;

export const INGREDIENT_TYPE = { bun: "Булка", main: "Начинки", sauce: "Соус" };