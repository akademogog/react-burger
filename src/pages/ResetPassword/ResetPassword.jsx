import React from 'react'
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import styles from './ResetPassword.module.scss'
import { PASSWORD_RESET_URL } from '../../utils/constants';
import { useForm } from '../../hooks/useForm';
import { request } from '../../utils/request';

const ResetPassword = () => {
  const {values, handleChange} = useForm({});

  const resetPass = async (e) => {
    e.preventDefault();
    await request(PASSWORD_RESET_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(values)
    }).then(responce => {
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
          onChange={handleChange}
          value={values.password}
          name={'password'}
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
          onChange={handleChange}
          value={values.token}
          name={'token'}
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
