import React from 'react'
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import IconButton from '../UI/IconButton/IconButton'
import styles from './AppHeader.module.scss'
import { NavLink, Link } from 'react-router-dom';

const AppHeader = () => {
  return (
    <header className={`${styles.header}`}>
      <div className={`${styles.headerContainer} ${styles.container}`}>
        <div className={`${styles.headerBlockLeft}`}>
          <NavLink to="/" activeClassName={styles.active} exact={true}>
            <IconButton text='Конструктор'>
              <BurgerIcon type="secondary" />
            </IconButton>
          </NavLink>

          <NavLink to="/feed" activeClassName={styles.active} exact={true}>
            <IconButton text='Лента заказов'>
              <ListIcon type="secondary" />
            </IconButton>
          </NavLink>
        </div>

        <div className={`${styles.headerBlockCenter}`}>
          <Link to="/"><Logo/></Link>
        </div>

        <div className={`${styles.headerBlockRight}`}>
          <NavLink to="/profile" activeClassName={styles.active} exact={true}>
            <IconButton text='Личный кабинет'>
              <ProfileIcon type="secondary" />
            </IconButton>
          </NavLink>
        </div>
      </div>
    </header>
  )
}

export default AppHeader