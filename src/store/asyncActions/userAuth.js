import { checkResponse } from "../../utils/checkResponse.js";
import { REGISTER_URL, LOGIN_URL, TOKEN_URL, LOGOUT_URL, GET_USER_URL } from "../../utils/constants";
import { userRegister, userLogin, userToken, userLogout, getUser, patchUser } from "../reducers/userReduser.js";

export const fetchRegister = ({ email, name, password }) => {
  return (dispatch) => {
    fetch(REGISTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ email, name, password }),
    })
      .then((response) => checkResponse(response))
      .then((res) => {
        if (res.success) {
          dispatch(userRegister(res));
        }
      })
      .catch((error) => error);
  };
};

export const fetchLogin = ({ email, password }) => {
  return (dispatch) => {
    fetch(LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => checkResponse(response))
      .then((res) => {
        if (res.success) {
          dispatch(userLogin(res));
        }
      })
      .catch((error) => error);
  };
};

export const fetchToken = () => {
  return (dispatch) => {
    fetch(TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
    })
      .then((response) => checkResponse(response))
      .then((res) => {
        if (res.success) {
          dispatch(userToken(res));
        }
      })
      .catch((error) => error);
  };
};

export const fetchLogout = () => {
  return (dispatch) => {
    fetch(LOGOUT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
    })
      .then((response) => checkResponse(response))
      .then((res) => {
        if (res.success) {
          dispatch(userLogout(res));
        }
      })
      .catch((error) => error);
  };
};

export const fetchGetUser = (accessToken) => {
  return (dispatch) => {
    fetch(GET_USER_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: accessToken,
      },
    })
      .then((response) => checkResponse(response))
      .then((res) => {
        if (res.success) {
          dispatch(getUser(res));
        }
      })
      .catch((error) => {
        if (!error.success) {
          dispatch(fetchToken());
        }
      });
  };
};

export const fetchPatchUser = ({ accessToken, email, name, password }) => {
  return (dispatch) => {
    fetch(GET_USER_URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: accessToken,
      },
      body: JSON.stringify({ email, name, password }),
    })
      .then((response) => checkResponse(response))
      .then((res) => {
        if (res.success) {
          dispatch(patchUser(res));
        }
      })
      .catch((error) => error);
  };
};

