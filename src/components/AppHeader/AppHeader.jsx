import React from 'react'
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import IconButton from '../UI/IconButton/IconButton'
import styles from './AppHeader.module.scss'

const AppHeader = () => {
  return (
    <header className={`${styles.header}`}>
      <div className={`${styles.headerContainer} container`}>
        <div className={`${styles.headerBlockLeft}`}>
          <IconButton text={'Конструктор'} active={true}>
            <BurgerIcon type="primary" />
          </IconButton>

          <IconButton text={'Лента заказов'}>
            <ListIcon type="secondary" />
          </IconButton>
        </div>

        <div className={`${styles.headerBlockCenter}`}>
          <Logo/>
        </div>

        <div className={`${styles.headerBlockRight}`}>
          <IconButton text={'Личный кабинет'}>
            <ProfileIcon type="secondary" />
          </IconButton>
        </div>
      </div>
    </header>
  )
}

export default AppHeader