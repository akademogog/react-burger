import React, { useState } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import styles from "./Page404.module.scss";

const ForgotPassword = () => {
  const [redirect, setRedirect] = useState(false);
  const [forgotForm, setForgotForm] = useState({
    email: "",
  });

  const forgotPass = async (e) => {
    e.preventDefault();
    await fetch("https://norma.nomoreparties.space/api/password-reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(forgotForm),
    })
      .then((res) => res.json())
      .then((responce) => {
        if (responce.success) {
          setRedirect(true);
        }
      });
  };

  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: "/reset-password",
        }}
      />
    );
  }

  return (
    <div className={`${styles.forgotForm}`}>
      <p className={`text text_type_main-large mb-8 ${styles.largeText}`}>404</p>
      <p className={`text text_type_main-medium mb-8 ${styles.smallText}`}>
        похоже данной страницы не существует :(
      </p>
      <Link to={"/"}>
        <Button>Вернуться в конструктор</Button>
      </Link>
    </div>
  );
};

export default ForgotPassword;
