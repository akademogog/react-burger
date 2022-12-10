import React, { useEffect, useState } from 'react'
import styles from "./OrderDetail.module.scss";
import {
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import SimpleBar from "simplebar-react";
import { useParams } from "react-router-dom";
import { useAppSelector } from '../../hooks/hooks';
import { getDate, getFeedStatus, getTotalPrice, sortIngredients } from '../../utils/feed';

type TElCount = {
  count: number;
  dragId?: string | undefined;
  index?: number | undefined;
  id?: number | undefined;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  image: string;
  image_large: string;
  image_mobile: string;
  __v: number;
  _id: string;
  price: number;
}

const OrderDetail: any = () => {
  let { id } = useParams();  
  const currentFeed = useAppSelector((store) => store.feedReduser.payload?.orders.find(el => el.number == id));
  const ingredients = useAppSelector((store) => store.burgerIngredientsReduser.ingredients)
  const [sortedIngredients, setSortedIngredients] = useState<TElCount[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>();
  const [timeString, setTimeString] = useState<string>();
  const [feedStatus, setFeedStatus] = useState<string>();

  useEffect(() => {
    if (ingredients && currentFeed) {
      sortIngredients(currentFeed, ingredients, setSortedIngredients);
      getDate(currentFeed, setTimeString);
      getFeedStatus(currentFeed, setFeedStatus);
    }
  }, [currentFeed]);

  useEffect(() => {
    if (sortedIngredients.length) {
      getTotalPrice(sortedIngredients, setTotalPrice);
    }
  }, [sortedIngredients]);

  if (currentFeed) {
    return (
      <div className={`${styles.orderContainer}`}>
        <p className={`${styles.orderNumber} text text_type_digits-default mb-10`}>#{id}</p>
        <h2 className={`mb-3 text text_type_main-medium`}>{currentFeed.name}</h2>
        <p className={`mb-15 text text_type_main-small ${(feedStatus === 'Выполнен') && styles.orderStatusSuccess}`}>{feedStatus}</p>
        <h2 className={`mb-6 text text_type_main-medium`}>Состав:</h2>
        <SimpleBar
          style={{
            width: '100%',
            maxHeight: `312px`,
          }}
          autoHide={false}
        >
          <div className="pr-4">
            { sortedIngredients && sortedIngredients.map((el, index) => {
              return (
                <div key={index} className={`${styles.orderIngredient}`}>
                  <div className={`${styles.orderIngredientImage}`}>
                    <img src={el.image} alt="" />
                  </div>
                  <p className={`${styles.orderIngredientTitle} text text_type_main-default`}>
                    {el.name}
                  </p>
                  <p className={`${styles.orderIngredientPrice} text text_type_digits-default`}>
                    <span>{el.count} x {el.price}</span>
                    <CurrencyIcon type="primary"/>
                  </p>
                </div>
              )
              })
            }
            
          </div>
        </SimpleBar>
        
        <div className={`${styles.orderBottom} mt-4`}>
          <p className={`${styles.orderDate} text text_type_main-default text_color_inactive`}>{timeString}</p>
          <p className={`${styles.orderPrice} text text_type_digits-default`}>
            <span className='mr-2'>
              { totalPrice }
            </span>
            <CurrencyIcon type="primary"/></p>
        </div>
      </div>
    )
  } else {
    return ('')
  }
}

export default OrderDetail
