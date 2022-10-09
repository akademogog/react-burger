import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import styles from "./BurgerConstructor.module.scss";
import SimpleBar from "simplebar-react";
import MyModal from "../MyModal/MyModal";
import OrderDetails from "../OrderDetails/OrderDetails";

const BurgerConstructor = ({ ingredientCards }) => {
  const [bun, setBun] = useState({});
  const [heightTopScrollBlock, setHeightTopScrollBlock] = useState(0);
  const [visibleModal, setVisibleModal] = useState(false);
  
  const scrollableNodeRef = useRef();

  useMemo(() => {
    setBun(ingredientCards[0]);
  }, [ingredientCards]);

  // Расчитываем и устанавливаем текущую высоту блока ингридиентов
  const getCurrentOffsetIngredientBlock = () => {
    const windowInnerHeight = window.innerHeight;
    const offsetTopScrollBlock =
      scrollableNodeRef.current.getBoundingClientRect().top;
    const maxBlockHeigth = Math.floor(windowInnerHeight - offsetTopScrollBlock - 252)
    if (maxBlockHeigth < 104) {
      setHeightTopScrollBlock(104);
      return;
    }
  
    setHeightTopScrollBlock(maxBlockHeigth);
  };

  // Вызываем функцию при ресайзе
  const resizeIngredientBlock = useCallback(() => {
    getCurrentOffsetIngredientBlock();
  }, []);  

  useEffect(() => {
    getCurrentOffsetIngredientBlock();
    window.addEventListener("resize", resizeIngredientBlock, true);
  }, []);

  return (
    <div className={`${styles.burgerConstructor} ml-10`}>
      <div className={`${styles.constructorList} constructorList`}>
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
            {ingredientCards.map(
              (card) =>
                card.type !== 'Булка' && (
                  <div
                    key={card._id}
                    className={`${styles.constructorDragableElement} mb-4`}
                  >
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
            <CurrencyIcon type="primary" />
          </div>
          <Button
            type="primary"
            size="large"
            onClick={() => {
              setVisibleModal(true);
            }}
            htmlType='button'
          >
            Оформить заказ
          </Button>
        </div>
        <MyModal visible={visibleModal} setVisible={setVisibleModal}>
          <OrderDetails />
        </MyModal>
      </div>
    </div>
  );
};

const ingredientCardPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number,
});

BurgerConstructor.propTypes = {
  ingredientCards: PropTypes.arrayOf(ingredientCardPropTypes).isRequired
};

export default BurgerConstructor;
