import React, { useState } from 'react'
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import styles from './ResetPassword.module.scss'

const ResetPassword = () => {
  const [resetForm, setResetForm] = useState({
    password: '',
    token: ''
  });

  const resetPass = async (e) => {
    e.preventDefault();
    await fetch('https://norma.nomoreparties.space/api/password-reset/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(resetForm)
    }).then(res => res.json())
    .then(responce => {
      if (responce.success) {
        console.log(responce);
      }
    });
  }

  return (
    <form className={`${styles.resetForm}`}>
      <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
      <div className="mb-6">
        <Input
          type={'text'}
          placeholder={'Введите новый пароль'}
          onChange={e => setResetForm({...resetForm, password: e.target.value})}
          value={resetForm.password}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          icon={'ShowIcon'}
        />
      </div>
      <div className="mb-6">
        <Input
          type={'password'}
          placeholder={'Введите код из письма'}
          onChange={e => setResetForm({...resetForm, token: e.target.value})}
          value={resetForm.token}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
      </div>
      <div className="mb-20">
        <Button type="primary" onClick={resetPass} size="medium">Сохранить</Button>
      </div>
      <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link className={`${styles.link}`} to="/login">Войти</Link></p>
    </form>
  )
}

export default ResetPassword
