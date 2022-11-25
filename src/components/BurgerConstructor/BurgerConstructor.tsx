import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.scss";
import SimpleBar from "simplebar-react";
import MyModal from "../MyModal/MyModal";
import OrderDetails from "../OrderDetails/OrderDetails";
import ConstructorDraggableIngredient from "../ConstructorDraggableIngredient/ConstructorDraggableIngredient";
import { v4 as uuidv4 } from "uuid";
import { fetchOrder } from "../../store/asyncActions/order";
import { useHistory } from "react-router-dom";
import { DEL_CONSTRUCTOR_INGREDIENTS, SET_CONSTRUCTOR_BUN, SET_CONSTRUCTOR_INGREDIENTS, SET_CONSTRUCTOR_PRICE, UPDATE_CONSTRUCTOR_INGREDIENTS } from "../../store/actions/burgerIngredientsActions";
import { IDrgagItem, IIngredientItem } from "../../utils/types";
import { TState } from "../../store/rootReduser";

const BurgerConstructor = () => {
  const history = useHistory();
  const { ingredients } = useSelector(
    (store: TState) => store.burgerIngredientsReduser
  );
  const constructorIngredients = useSelector(
    (store: TState) => store.constructorReduser.constructorIngredients
  );
  const constructorBun = useSelector(
    (store: TState) => store.constructorReduser.constructorBun
  );
  const totalConstructorPrice = useSelector(
    (store: TState) => store.constructorReduser.totalConstructorPrice
  );
  const order = useSelector((store: TState) => store.modalOrderReduser);
  const token = useSelector((store: TState) => store.userReduser.accessToken);

  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [heightTopScrollBlock, setHeightTopScrollBlock] = useState<number>(0);

  const dispatch: Function = useDispatch();
  const scrollableNodeRef = useRef<HTMLDivElement>(null);
  const constructorBottomBlock = useRef<HTMLDivElement>(null);

  const [, dropTarget] = useDrop({
    accept: "card",
    drop(ingredient: IIngredientItem) {
      if (ingredient["type"] === "Булка") {
        dispatch({ type: SET_CONSTRUCTOR_BUN, ingredient });
      } else {
        dispatch({
          type: SET_CONSTRUCTOR_INGREDIENTS,
          ingredient: {
            ...ingredient,
            dragId: uuidv4(),
          },
        });
      }
    },
  });

  useEffect(() => {
    if (order.number) {
      setVisibleModal(true);
    }
  }, [order]);

  useEffect(() => {
    setPrice();
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
    if (token) {
      let orderId = constructorIngredients.map((ingr) => ingr._id);
      orderId = [constructorBun._id, ...orderId, constructorBun._id];
      dispatch(fetchOrder(orderId));
    } else {
      history.push("/login");
    }
  };

  // Удаляем эллемент из конструктора
  const handleClose = (curentIndex: number) => {
    dispatch({ type: DEL_CONSTRUCTOR_INGREDIENTS, curentIndex });
  };

  // Расчитываем и устанавливаем текущую высоту блока ингридиентов
  const getCurrentOffsetIngredientBlock = () => {
    const windowInnerHeight = window.innerHeight;
    const offsetTopScrollBlock: any =
      scrollableNodeRef?.current?.getBoundingClientRect().top;
    const heigthConstructorBottomBlock: any =
      constructorBottomBlock?.current?.offsetHeight;
    const maxBlockHeigth = Math.floor(
      windowInnerHeight - offsetTopScrollBlock - heigthConstructorBottomBlock
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

  const setPrice = () => {
    let thisTotalSumm = 0;

    for (const key in constructorIngredients) {
      const element = constructorIngredients[key];
      thisTotalSumm += element.price;
    }

    if (constructorBun) {
      thisTotalSumm += constructorBun.price * 2;
    }

    dispatch({ type: SET_CONSTRUCTOR_PRICE, thisTotalSumm });
  };

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = constructorIngredients[dragIndex];
      const newCards = [...constructorIngredients];
      newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, dragCard);
      dispatch({
        type: UPDATE_CONSTRUCTOR_INGREDIENTS,
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
                (card: IDrgagItem, index: number) =>
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

        <div ref={constructorBottomBlock} className="pt-4 pb-8">
          <div className={`${styles.constructorBudBottom}`}>
            <div>
              {constructorBun ? (
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${constructorBun["name"]} - низ`}
                  price={constructorBun["price"]}
                  thumbnail={constructorBun["image"]}
                />
              ) : (
                <div className="constructor-element constructor-element_pos_bottom">
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
              disabled={!constructorBun}
              type="primary"
              size="large"
              onClick={sendOrder}
              htmlType="button"
            >
              Оформить заказ
            </Button>
          </div>
        </div>

        {visibleModal && (
          <MyModal modalClose={setVisibleModal}>
            <OrderDetails />
          </MyModal>
        )}
      </div>
    </div>
  );
};

export default BurgerConstructor;
