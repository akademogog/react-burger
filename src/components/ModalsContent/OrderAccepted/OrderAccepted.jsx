import React from 'react'
import Done from '../../../img/done.svg'
import styles from './OrderAccepted.module.scss'
const OrderAccepted = () => {
  return (
    <div className={`${styles.orderAcceptedBlock}`}>
      <h2 className="text text_type_digits-large mb-8">034536</h2>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img src={Done} alt="" className="mb-15" />
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

export default OrderAccepted
