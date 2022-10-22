import React, { useState, useEffect, useRef, useCallback } from "react";
import { ORDERS_URL } from "../../utils/constants";
import { useDrop, useDrag } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.scss";
import SimpleBar from "simplebar-react";
import MyModal from "../MyModal/MyModal";
import OrderDetails from "../OrderDetails/OrderDetails";
import submitOrder from "../../utils/submitOrder.js";
import ConstructorDraggableIngredient from "../ConstructorDraggableIngredient/ConstructorDraggableIngredient";
import { v4 as uuidv4 } from 'uuid';

const BurgerConstructor = () => {
  const {
    constructorIngredients,
    constructorBun,
    totalConstructorPrice,
    order,
  } = useSelector((store) => store);

  const [heightTopScrollBlock, setHeightTopScrollBlock] = useState(0);
  const [visibleModal, setVisibleModal] = useState(false);

  // useEffect(()=> {
  //   console.log(constructorIngredients);
  // }, [constructorIngredients])

  const dispatch = useDispatch();
  const scrollableNodeRef = useRef();

  const [, dropTarget] = useDrop({
    accept: "card",
    drop(ingredient) {
      if (ingredient["type"] === "Булка") {
        dispatch({ type: "SET_CONSTRUCTOR_BUN", ingredient });
      } else {
        dispatch({
          type: "SET_CONSTRUCTOR_INGREDIENTS",
          ingredient: {
            ...ingredient,
            dragId: uuidv4(),
          },
        });
      }
    },
  });

  useEffect(() => {
    dispatch({ type: "SET_CONSTRUCTOR_PRICE" });
    dispatch({ type: "SET_ORDER" });
  }, [constructorBun, constructorIngredients]);

  useEffect(() => {
    if (constructorIngredients.length) {
      getCurrentOffsetIngredientBlock();
    }
  }, [constructorIngredients]);

  useEffect(() => {
    window.addEventListener("resize", resizeIngredientBlock, true);
  }, []);

  // Отправляем заказ
  const sendOrder = () => {
    submitOrder(ORDERS_URL, order.orderIngredentID).then((result) => {
      if (result.success) {
        dispatch({
          type: "SET_ORDER",
          number: result.order.number,
          name: result.name,
        });
      }
    });
  };

  // Удаляем эллемент из конструктора
  const handleClose = (curentIndex) => {
    dispatch({ type: "DEL_CONSTRUCTOR_INGREDIENTS", curentIndex });
  };

  // Расчитываем и устанавливаем текущую высоту блока ингридиентов
  const getCurrentOffsetIngredientBlock = () => {
    const windowInnerHeight = window.innerHeight;
    const offsetTopScrollBlock =
      scrollableNodeRef.current.getBoundingClientRect().top;
    const maxBlockHeigth = Math.floor(
      windowInnerHeight - offsetTopScrollBlock - 252
    );
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

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = constructorIngredients[dragIndex];
      const newCards = [...constructorIngredients];
      newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, dragCard);
      dispatch({
        type: "UPDATE_CONSTRUCTOR_INGREDIENTS",
        ingredients: newCards,
      });
    },
    [constructorIngredients, dispatch]
  );

  return (
    <div className={`${styles.burgerConstructor} ml-10`}>
      <div
        className={`${styles.constructorList} constructorList`}
        ref={dropTarget}
      >
        <div className={`${styles.constructorBudTop}`}>
          <div className={`mb-4`}>
            {constructorBun ? (
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${constructorBun["name"]} - верх`}
                price={constructorBun["price"]}
                thumbnail={constructorBun["image"]}
              />
            ) : (
              <div className="constructor-element constructor-element_pos_top">
                <span
                  className={`constructor-element__text ${styles.constructorElementTextPreview}`}
                >
                  Перенесите сюда булку
                </span>
              </div>
            )}
          </div>
        </div>
        <div
          className={`${
            !constructorIngredients.length && styles.constructorMain
          }`}
        >
          {constructorIngredients.length ? (
            <SimpleBar
              style={{
                maxHeight: `${heightTopScrollBlock}px`,
              }}
              autoHide={false}
              scrollableNodeProps={{ ref: scrollableNodeRef }}
            >
              {constructorIngredients.map(
                (card, index) =>
                  card.type !== "Булка" && (
                    <ConstructorDraggableIngredient
                      key={card.dragId}
                      item={card}
                      index={index}
                      handleClose={handleClose}
                      moveCard={moveCard}
                    />
                  )
              )}
            </SimpleBar>
          ) : (
            <div className={`constructor-element ${styles.constructorElement}`}>
              <span
                className={`constructor-element__text ${styles.constructorElementTextPreview}`}
              >
                А сюда перетяните ингредиенты
              </span>
            </div>
          )}
        </div>
        <div className={`${styles.constructorBudBottom}`}>
          <div className="mt-4">
            {constructorBun ? (
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${constructorBun["name"]} - низ`}
                price={constructorBun["price"]}
                thumbnail={constructorBun["image"]}
              />
            ) : (
              <div className="constructor-element constructor-element_pos_bottom mt-4">
                <span
                  className={`constructor-element__text ${styles.constructorElementTextPreview}`}
                >
                  {"Или сюда :)"}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className={`${styles.constructorSumm} mt-10`}>
          <div className={`${styles.constructorSummText} mr-10`}>
            <span className="text text_type_main-large mr-2">
              {totalConstructorPrice}
            </span>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            type="primary"
            size="large"
            onClick={() => {
              setVisibleModal(true);
              sendOrder();
            }}
            htmlType="button"
          >
            Оформить заказ
          </Button>
        </div>
        <MyModal visible={visibleModal} setVisible={setVisibleModal}>
          <OrderDetails number={order.number} />
        </MyModal>
      </div>
    </div>
  );
};

export default BurgerConstructor;
