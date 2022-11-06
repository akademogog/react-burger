import React, { useEffect, useState } from 'react'
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from 'react-router-dom';
import styles from './RegisterPage.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister } from "../../store/asyncActions/userAuth";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(store => store.userReduser.isAuth);
  
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const reg = (e) => {
    e.preventDefault();
    dispatch(fetchRegister(registerForm));
  };

  if (isAuth) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    );
  }

  return (
    <form className={`${styles.registerForm}`} onSubmit={reg}>
      <p className="text text_type_main-medium mb-6">Регистрация</p>
      <div className="mb-6">
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={e => setRegisterForm({...registerForm, name: e.target.value})}
          value={registerForm.name}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
      </div>
      <div className="mb-6">
        <Input
          type={'text'}
          placeholder={'E-mail'}
          onChange={e => setRegisterForm({...registerForm, email: e.target.value})}
          value={registerForm.email}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
      </div>
      <div className="mb-6">
        <Input
          type={'password'}
          placeholder={'Пароль'}
          onChange={e => setRegisterForm({...registerForm, password: e.target.value})}
          value={registerForm.password}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          icon={'ShowIcon'}
        />
      </div>
      <div className="mb-20">
        <Button type="primary" size="medium">Зарегистрироваться</Button>
      </div>
      <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь? <Link className={`${styles.link}`} to="/login">Войти</Link></p>
    </form>
  )
}

export default RegisterPage
