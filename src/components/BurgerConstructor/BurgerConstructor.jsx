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
  useContext,
} from "react";
import styles from "./BurgerConstructor.module.scss";
import SimpleBar from "simplebar-react";
import MyModal from "../MyModal/MyModal";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientContext from "../../context/ingredientsContext.js";
import submitOrder from "../../utils/submitOrder.js";
const INGREDIENTS_URL = "https://norma.nomoreparties.space/api/orders";

const BurgerConstructor = () => {
  const [ingredientCards] = useContext(IngredientContext);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const [curentBun, setCurentBun] = useState({});
  const [totalSumm, setTotalSumm] = useState(0);
  const [heightTopScrollBlock, setHeightTopScrollBlock] = useState(0);
  const [visibleModal, setVisibleModal] = useState(false);
  const [order, setOrder] = useState({ name: null, number: null });

  const scrollableNodeRef = useRef();

  useMemo(() => {
    setSelectedIngredients(ingredientCards.ingredients);
  }, [ingredientCards.ingredients]);

  useEffect(() => {
    calculateSumm();
  }, [selectedIngredients]);

  useEffect(() => {
    setBud();
    getCurrentOffsetIngredientBlock();
    window.addEventListener("resize", resizeIngredientBlock, true);
  }, []);

  // Переносим ингредиенты в локальный стейт для более удобной работы с ними и устанавливаем булку в конструктор
  const setBud = () => {
    let isSetBun = false;
    const currentSelected = selectedIngredients.filter((ingredient) => {
      if (ingredient["type"] === "Булка") {
        if (!isSetBun) {
          isSetBun = true;
          setCurentBun(ingredient);
          return ingredient;
        }
        return;
      }
      return ingredient;
    });
    setSelectedIngredients(currentSelected);
  };

  // Вычисляем итоговую сумму
  const calculateSumm = () => {
    let thisTotalSumm = 0;
    for (const key in selectedIngredients) {
      const element = selectedIngredients[key];
      if (element.type === "Булка") {
        thisTotalSumm += element.price * 2;
      } else {
        thisTotalSumm += element.price;
      }
    }
    setTotalSumm(thisTotalSumm);
  };

  // Отправляем заказ
  const sendOrder = async () => {
    const currentIngredentID = selectedIngredients.map(
      (ingredient) => ingredient["_id"]
    );
    submitOrder(INGREDIENTS_URL, currentIngredentID).then((result) => {
      if (result.success) {
        setOrder({
          name: result.name,
          number: result.order.number,
        });
      }
    });
  };

  // Удаляем эллемент из конструктора
  const handleClose = (curentId) => {
    const currentSelected = selectedIngredients.filter((ingredient) => {
      if (ingredient["_id"] === curentId) {
        return;
      }
      return ingredient;
    });
    setSelectedIngredients(currentSelected);
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

  return (
    <div className={`${styles.burgerConstructor} ml-10`}>
      <div className={`${styles.constructorList} constructorList`}>
        <div className={`${styles.constructorBudTop}`}>
          <div className={`mb-4`}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${curentBun.name} - верх`}
              price={curentBun.price}
              thumbnail={curentBun.image}
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
            {selectedIngredients.map(
              (card) =>
                card.type !== "Булка" && (
                  <div
                    key={card._id}
                    className={`${styles.constructorDragableElement} mb-4`}
                  >
                    <DragIcon type="primary" />
                    <ConstructorElement
                      text={card.name}
                      price={card.price}
                      thumbnail={card.image}
                      handleClose={() => handleClose(card._id)}
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
              text={`${curentBun.name} - низ`}
              price={curentBun.price}
              thumbnail={curentBun.image}
            />
          </div>
        </div>
        <div className={`${styles.constructorSumm} mt-10`}>
          <div className={`${styles.constructorSummText} mr-10`}>
            <span className="text text_type_main-large mr-2">{totalSumm}</span>
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
