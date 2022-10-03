import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import styles from './DetailIngridients.module.scss'

const DetailIngridients = ({closeModal, ingridientCard}) => {
  return (
    <div className={`${styles.ingridientModal}`}>
      <div className={`${styles.titleBlock}`}>
        <h2 className={`${styles.titleBlock} text text_type_main-large`}>Детали ингредиента</h2>
        <div className={`${styles.closeButton}`} onClick={() => closeModal(false)}>
          <CloseIcon type="primary"/>
        </div>
      </div>
      <img src={ingridientCard.image_large} alt="" className={`${styles.ingridientImage} mb-4`}/>
      <h3 className={`${styles.ingridientName} mb-8 text text_type_main-medium`}>{ingridientCard.name}</h3>
      <div className={`${styles.energyValueContainer}`}>
        <div className={`${styles.energyValueBlock}`}>
          <span className='text text_type_main-default text_color_inactive mb-2'>Калории,ккал</span>
          <span className="text text_type_digits-default text_color_inactive">{ingridientCard.calories}</span>
        </div>
        <div className={`${styles.energyValueBlock}`}>
          <span className='text text_type_main-default text_color_inactive mb-2'>Белки, г</span>
          <span className="text text_type_digits-default text_color_inactive">{ingridientCard.proteins}</span>
        </div>
        <div className={`${styles.energyValueBlock}`}>
          <span className='text text_type_main-default text_color_inactive mb-2'>Жиры, г</span>
          <span className="text text_type_digits-default text_color_inactive">{ingridientCard.fat}</span>
        </div>
        <div className={`${styles.energyValueBlock}`}>
          <span className='text text_type_main-default text_color_inactive mb-2'>Углеводы, г</span>
          <span className="text text_type_digits-default text_color_inactive">{ingridientCard.carbohydrates}</span>
        </div>
      </div>
    </div>
  )
}

export default DetailIngridients
