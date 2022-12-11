import React, { useEffect, useState, useRef } from "react";
import {
  Input,
  Button,
  EditIcon,
  ShowIcon,
  HideIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import styles from "./ProfilePage.module.scss";
import {
  fetchLogout,
  fetchGetUser,
  fetchToken,
  fetchPatchUser,
} from "../../store/asyncActions/userAuth";
import { useForm } from "../../hooks/useForm";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const profileForm = useAppSelector((store) => store.userReduser);
  const {values, handleChange, setValues} = useForm({});
  const [disabledInput, setDisabledInput] = useState({
    name: true,
    email: true,
    password: true,
    showPassIcon: false,
    showPass: false,
  });
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);

  useEffect(() => {
    setValues({
      ...profileForm,
      password: "",
    })
  }, [profileForm]);

  useEffect(() => {
    getFetchToken(fetchGetUser(profileForm.accessToken));
  }, [profileForm.accessToken]);

  const onIconClick = (ref) => {
    const currentRefName = ref.current.name;
    if (currentRefName === "password") {
      setDisabledInput({
        ...disabledInput,
        [currentRefName]: false,
        showPassIcon: true,
      });
    } else {
      setDisabledInput({ ...disabledInput, [currentRefName]: false });
    }
    setTimeout(() => {
      ref.current.focus();
    }, 100);
  };

  const passIconHandler = () => {
    setDisabledInput({ ...disabledInput, showPass: !disabledInput.showPass });
  };

  const logout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(fetchLogout());
  };

  const patch = (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    getFetchToken(fetchPatchUser(values));
    setDisabledInput({
      name: true,
      email: true,
      password: true,
      showPassIcon: false,
      showPass: false,
    });
  };

  const getFetchToken = (callback) => {
    if (profileForm.accessToken) {
      dispatch(callback);
    } else {
      dispatch(fetchToken());
    }
  };

  const resetForm = () => {
    setValues({
      ...profileForm,
      password: "",
    })
    setDisabledInput({
      name: true,
      email: true,
      password: true,
      showPassIcon: false,
      showPass: false,
    });
  };

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.profileNav} mr-15`}>
        <NavLink
          className={`text text_type_main-medium ${styles.profileNavLink}`}
          to="/profile"
          activeClassName={styles.activeNavLink}
          exact={true}
        >
          Профиль
        </NavLink>
        <NavLink
          className={`text text_type_main-medium ${styles.profileNavLink}`}
          to="/profile/orders"
          activeClassName={styles.activeNavLink}
          exact={true}
        >
          История заказов
        </NavLink>
        <a
          className={`text text_type_main-medium ${styles.profileNavLink}`}
          href="#"
          onClick={logout}
        >
          Выход
        </a>
        <p className={`text text_type_main-default mt-20 ${styles.text}`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <form className={`${styles.profileInputs}`}>
        <div className={`mb-6 ${styles.inputBlock}`}>
          <Input
            disabled={disabledInput.name}
            type={"text"}
            placeholder={"Имя"}
            onChange={handleChange}
            value={values.name || ''}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            ref={nameRef}
          />
          <div
            onClick={(e: React.MouseEvent<HTMLDivElement>) => onIconClick(nameRef)}
            className={`${styles.inputIcon}`}
          >
            <EditIcon type="primary" />
          </div>
        </div>
        <div className={`mb-6 ${styles.inputBlock}`}>
          <Input
            disabled={disabledInput.email}
            type={"text"}
            placeholder={"E-mail"}
            onChange={handleChange}
            value={values.email || ''}
            name={"email"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            ref={emailRef}
          />
          <div
            onClick={(e: React.MouseEvent<HTMLDivElement>) => onIconClick(emailRef)}
            className={`${styles.inputIcon}`}
          >
            <EditIcon type="primary" />
          </div>
        </div>
        <div className={`mb-6 ${styles.inputBlock}`}>
          <Input
            disabled={disabledInput.password}
            type={disabledInput.showPass ? "text" : "password"}
            placeholder={"Пароль"}
            onChange={handleChange}
            value={values.password || ''}
            name={"password"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            ref={passRef}
          />
          <div className={`${styles.inputIcon}`}>
            {!disabledInput.showPassIcon ? (
              <div onClick={() => onIconClick(passRef)}>
                <EditIcon type="primary" />
              </div>
            ) : (
              <div
                onClick={() => {
                  passIconHandler();
                }}
              >
                {disabledInput.showPass ? (
                  <HideIcon type="primary" />
                ) : (
                  <ShowIcon type="primary" />
                )}
              </div>
            )}
          </div>
        </div>
        {(profileForm.name !== values.name ||
          profileForm.email !== values.email ||
          values.password) && (
          <div>
            <Button
              type="primary"
              size="large"
              onClick={patch}
              htmlType={'submit'}
            >
              Сохранить
            </Button>
            <span className="ml-4">
              <Button
                type="primary"
                size="large"
                htmlType="button"
                onClick={resetForm}
              >
                Отмена
              </Button>
            </span>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfilePage;
