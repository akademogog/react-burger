import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useLocation } from "react-router-dom";
import styles from "./ForgotPassword.module.scss";
import { useForm } from "../../hooks/useForm";
import { PASSWORD_URL } from "../../utils/constants";
import { request } from "../../utils/request";
import { fetchToken } from "../../store/asyncActions/userAuth";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const ForgotPassword = () => {
  const location = useLocation<any>();
  const dispatch = useAppDispatch();
  const token = useAppSelector((store) => store.userReduser.accessToken);
  const [redirect, setRedirect] = useState(false);
  const { values, handleChange } = useForm({});

  const forgotPass = async (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    await request(PASSWORD_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(values),
    }).then((responce: any) => {
      if (responce.success) {
        setRedirect(true);
      }
    });
  };

  useEffect(() => {
    if (!token) {
      dispatch(fetchToken());
    }
  }, []);

  if (token) {
    return <Redirect to={{ pathname: location?.state?.from || "/" }} />;
  }

  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: "/reset-password",
          state: { from: location },
        }}
      />
    );
  }

  return (
    <form className={`${styles.forgotForm}`}>
      <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
      <div className="mb-6">
        <Input
          type={"text"}
          placeholder={"Укажите e-mail"}
          onChange={handleChange}
          value={values.email || ""}
          name={"email"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
      </div>
      <div className="mb-20">
        <Button
          htmlType={"submit"}
          type="primary"
          onClick={forgotPass}
          size="medium"
        >
          Восстановить
        </Button>
      </div>
      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль?{" "}
        <Link className={`${styles.link}`} to="/login">
          Войти
        </Link>
      </p>
    </form>
  );
};

export default ForgotPassword;
