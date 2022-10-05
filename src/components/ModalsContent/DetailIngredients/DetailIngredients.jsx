import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import styles from './DetailIngredients.module.scss'

const DetailIngredients = ({closeModal, ingredientCard}) => {
  return (
    <div className={`${styles.ingredientModal}`}>
      <div className={`${styles.titleBlock}`}>
        <h2 className={`${styles.titleBlock} text text_type_main-large`}>Детали ингредиента</h2>
        <div className={`${styles.closeButton}`} onClick={() => closeModal(false)}>
          <CloseIcon type="primary"/>
        </div>
      </div>
      <img src={ingredientCard.image_large} alt="" className={`${styles.ingredientImage} mb-4`}/>
      <h3 className={`${styles.ingredientName} mb-8 text text_type_main-medium`}>{ingredientCard.name}</h3>
      <div className={`${styles.energyValueContainer}`}>
        <div className={`${styles.energyValueBlock}`}>
          <span className='text text_type_main-default text_color_inactive mb-2'>Калории,ккал</span>
          <span className="text text_type_digits-default text_color_inactive">{ingredientCard.calories}</span>
        </div>
        <div className={`${styles.energyValueBlock}`}>
          <span className='text text_type_main-default text_color_inactive mb-2'>Белки, г</span>
          <span className="text text_type_digits-default text_color_inactive">{ingredientCard.proteins}</span>
        </div>
        <div className={`${styles.energyValueBlock}`}>
          <span className='text text_type_main-default text_color_inactive mb-2'>Жиры, г</span>
          <span className="text text_type_digits-default text_color_inactive">{ingredientCard.fat}</span>
        </div>
        <div className={`${styles.energyValueBlock}`}>
          <span className='text text_type_main-default text_color_inactive mb-2'>Углеводы, г</span>
          <span className="text text_type_digits-default text_color_inactive">{ingredientCard.carbohydrates}</span>
        </div>
      </div>
    </div>
  )
}

export default DetailIngredients
