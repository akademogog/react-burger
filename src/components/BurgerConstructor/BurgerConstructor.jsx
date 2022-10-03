import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import styles from "./BurgerConstructor.module.scss";
import SimpleBar from "simplebar-react";
import MyModal from "../UI/MyModal/MyModal";
import OrderAccepted from "../ModalsContent/OrderAccepted/OrderAccepted";

const BurgerConstructor = ({ ingridientCards }) => {
  const [bun, setBun] = useState(ingridientCards[0]);
  const [heightTopScrollBlock, setHeightTopScrollBlock] = useState(0);
  const [visibleModal, setVisibleModal] = useState(false);
  const scrollableNodeRef = useRef();

  const getCurrentOffsetIngridientBlock = () => {
    const windowInnerHeight = window.innerHeight;
    const offsetTopScrollBlock = scrollableNodeRef.current.getBoundingClientRect().top;
    setHeightTopScrollBlock(Math.floor((windowInnerHeight - offsetTopScrollBlock - 252) / 96) * 96 - 16);
  };

  window.addEventListener('resize', function() {
    getCurrentOffsetIngridientBlock();
  }, true);

  useEffect(() => {
    getCurrentOffsetIngridientBlock();
  }, []);

  return (
    <div className={`${styles.burgerConstructor} ml-10`}>
      <div className="constructorList">
        <div className={`${styles.constructorBudTop}`}>
          <div className={`mb-4`}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bun.name}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        </div>
        <div className={`${styles.constructorMain}`}>
          <SimpleBar
            style={{
              maxHeight: `${heightTopScrollBlock}px`,
            }}
            autoHide={false}
            scrollableNodeProps={{ ref: scrollableNodeRef }}
          >
            {ingridientCards.map(
              (card) =>
                card.constructor === true && (
                  <div key={card._id} className={`${styles.constructorDragableElement} mb-4`}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                      text={card.name}
                      price={card.price}
                      thumbnail={card.image}
                    />
                  </div>
                )
            )}
          </SimpleBar>
        </div>
        <div className={`${styles.constructorBudBottom}`}>
          <div className="mt-4">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun.name}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        </div>
        <div className={`${styles.constructorSumm} mt-10`}>
          <div className={`${styles.constructorSummText} mr-10`}>
            <span className="text text_type_main-large mr-2">610</span>
            <CurrencyIcon type="primary"/>
          </div>
          <Button type="primary" size="large" onClick={() => {
            setVisibleModal(true);
          }}>
            Оформить заказ
          </Button>
        </div>
        <MyModal visible={visibleModal} setVisible={setVisibleModal}>
          <OrderAccepted/>
        </MyModal>
      </div>
    </div>
  );
};

BurgerConstructor.propTypes = {
  ingridientCards: PropTypes.object.isRequired
}

export default BurgerConstructor;
