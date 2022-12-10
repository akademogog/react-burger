import React from "react";
import {
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./Page404.module.scss";

const Page404 = () => {
  return (
    <div className={`${styles.forgotForm}`}>
      <p className={`text text_type_main-large mb-8 ${styles.largeText}`}>404</p>
      <p className={`text text_type_main-medium mb-8 ${styles.smallText}`}>
        похоже данной страницы не существует :(
      </p>
      <Link to={"/"}>
        <Button htmlType='button'>Вернуться в конструктор</Button>
      </Link>
    </div>
  );
};

export default Page404;
