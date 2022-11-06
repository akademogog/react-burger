import React, { useState } from 'react'
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from 'react-router-dom';
import styles from './ForgotPassword.module.scss'

const ForgotPassword = () => {
  const [redirect, setRedirect] = useState(false);
  const [forgotForm, setForgotForm] = useState({
    email: ''
  });

  const forgotPass = async (e) => {
    e.preventDefault();
    await fetch('https://norma.nomoreparties.space/api/password-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(forgotForm)
    }).then(res => res.json())
    .then(responce => {
      if (responce.success) {
        setRedirect(true);
      }
    });
  }

  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: '/reset-password'
        }}
      />
    );
  }

  return (
    <form className={`${styles.forgotForm}`}>
      <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
      <div className="mb-6">
        <Input
          type={'text'}
          placeholder={'Укажите e-mail'}
          onChange={e => setForgotForm({...forgotForm, email: e.target.value})}
          value={forgotForm.email}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
      </div>
      <div className="mb-20">
        <Button type="primary" onClick={forgotPass} size="medium">Восстановить</Button>
      </div>
      <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link className={`${styles.link}`} to="/login">Войти</Link></p>
    </form>
  )
}

export default ForgotPassword
