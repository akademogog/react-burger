import React, { useEffect } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useLocation } from "react-router-dom";
import styles from "./LoginPage.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchLogin, fetchToken } from "../../store/asyncActions/userAuth";
import { useForm } from "../../hooks/useForm";

const LoginPage = () => {
  const location = useLocation<any>();
  const dispatch = useAppDispatch();
  const token = useAppSelector((store) => store.userReduser.accessToken);

  const { values, handleChange } = useForm({});

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchLogin(values));
  };

  useEffect(() => {
    if (!token) {
      dispatch(fetchToken());
    }
  }, []);

  if (token) {
    return <Redirect to={location?.state?.from || "/"} />;
  }

  return (
    <form className={`${styles.loginForm}`} onSubmit={login}>
      <p className="text text_type_main-medium mb-6">Вход</p>
      <div className="mb-6">
        <Input
          type={"text"}
          placeholder={"E-mail"}
          onChange={handleChange}
          value={values.email || ""}
          name={"email"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
      </div>
      <div className="mb-6">
        <Input
          type={"password"}
          placeholder={"Пароль"}
          onChange={handleChange}
          value={values.password || ""}
          name={"password"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          icon={"ShowIcon"}
        />
      </div>
      <div className="mb-20">
        <Button htmlType="submit" type="primary" size="medium">
          Войти
        </Button>
      </div>
      <p className="text text_type_main-default text_color_inactive">
        Вы — новый пользователь?{" "}
        <Link className={`${styles.link}`} to="/register">
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль?{" "}
        <Link className={`${styles.link}`} to="/forgot-password">
          Восстановить пароль
        </Link>
      </p>
    </form>
  );
};

export default LoginPage;
