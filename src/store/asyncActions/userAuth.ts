import { REGISTER_URL, LOGIN_URL, TOKEN_URL, LOGOUT_URL, GET_USER_URL } from "../../utils/constants";
import { request } from "../../utils/request";
import { AppDispatch, AppThunk } from "../../utils/types";
import { userRegister, userLogin, userToken, userLogout, getUser, patchUser, IUserLogin } from "../actions/userActions";

type TStaringObj = {
  [name: string]: string;
}

export const fetchRegister: AppThunk | any = ({ email, name, password }: TStaringObj) => {
  return (dispatch: AppDispatch) => {
    request(REGISTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ email, name, password }),
    })
      .then((res: any) => {
        if (res.success) {
          dispatch(userRegister(res));
        }
      })
      .catch((error) => error);
  };
};

export const fetchLogin: AppThunk | any = ({ email, password }: TStaringObj) => {
  return (dispatch: AppDispatch) => {
    request(LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res: any) => {
        if (res.success) {
          dispatch(userLogin(res));
        }
      })
      .catch((error) => error);
  };
};

export const fetchToken: AppThunk | any = () => {
  return (dispatch: AppDispatch) => {
    request(TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
    })
      .then((res: any) => {
        if (res.success) {
          console.log(res);
          dispatch(userToken(res));
        }
      })
      .catch((error) => error);
  };
};

export const fetchLogout: AppThunk | any = () => {
  return (dispatch: AppDispatch) => {
    request(LOGOUT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
    })
      .then((res: any) => {
        if (res.success) {
          dispatch(userLogout(res));
        }
      })
      .catch((error) => error);
  };
};

export const fetchGetUser: AppThunk | any = (accessToken: string) => {
  return (dispatch: AppDispatch) => {
    request(GET_USER_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: accessToken,
      },
    })
      .then((res: any) => {
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

export const fetchPatchUser: AppThunk | any = ({ accessToken, email, name, password }: TStaringObj) => {
  return (dispatch: AppDispatch) => {
    request(GET_USER_URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: accessToken,
      },
      body: JSON.stringify({ email, name, password }),
    })
      .then((res: any) => {
        if (res.success) {
          dispatch(patchUser(res));
        }
      })
      .catch((error) => error);
  };
};

