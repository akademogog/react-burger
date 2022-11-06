import React, { useState } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./LoginPage.module.scss";
import { useDispatch } from "react-redux";
import { fetchLogin } from "../../store/asyncActions/userAuth";
import { useForm } from "../../hooks/useForm";

const LoginPage = () => {
  const dispatch = useDispatch();
  const {values, handleChange} = useForm({});

  const login = (e) => {
    e.preventDefault();
    dispatch(fetchLogin(values));
  };

  return (
    <form className={`${styles.loginForm}`} onSubmit={login}>
      <p className="text text_type_main-medium mb-6">Вход</p>  
      <div className="mb-6">
        <Input
          type={"text"}
          placeholder={"E-mail"}
          onChange={handleChange}
          value={values.email}
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
          value={values.password}
          name={"password"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          icon={"ShowIcon"}
        />
      </div>
      <div className="mb-20">
        <Button type="primary" size="medium">
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
