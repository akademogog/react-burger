const USER_LOGIN = "USER_LOGIN";
const USER_REGISTER = "USER_REGISTER";
const USER_LOGOUT = "USER_LOGOUT";
const USER_TOKEN = "USER_TOKEN";
const GET_USER = "GET_USER";
const PATCH_USER = "PATCH_USER";

export {
  USER_LOGIN,
  USER_REGISTER,
  USER_LOGOUT,
  USER_TOKEN,
  GET_USER,
  PATCH_USER
};

export const userRegister = (payload) => ({type: USER_REGISTER, payload});
export const userLogin = (payload) => ({type: USER_LOGIN, payload});
export const userToken = (payload) => ({type: USER_TOKEN, payload});
export const userLogout = (payload) => ({type: USER_LOGOUT, payload});
export const getUser = (payload) => ({type: GET_USER, payload});
export const patchUser = (payload) => ({type: PATCH_USER, payload});