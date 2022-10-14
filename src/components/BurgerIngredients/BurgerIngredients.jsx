import React, { useState, useRef, useEffect, useMemo, useContext } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import IngredientCard from "../IngredientCard/IngredientCard.jsx";
import IngredientBlock from "../IngredientBlock/IngredientBlock.jsx";
import styles from "./BurgerIngredients.module.scss";
import MyModal from "../MyModal/MyModal";
import IngredientDetails from "../IngredientDetails/IngredientDetails.jsx";
import IngredientContext from "../../context/ingredientsContext.js";

const BurgerIngredients = () => {
  const [ ingredientCards ] = useContext(IngredientContext);

  const returnType = ingredientCards.ingredients.map(
    (ingredientCard) => ingredientCard.type
  );
  const uniqTypes = [...new Set(returnType)];

  const [visibleModal, setVisibleModal] = useState(false);
  const [modalProps, setModalProps] = useState({});
  const [offsetTopScrollBlock, setOffsetTopScrollBlock] = useState(0);
  const [navChange, setNavChange] = useState({
    clickedBlock: uniqTypes[0],
    scrolledBlock: uniqTypes[0],
    currentEvent: "",
  });

  const scrollableNodeRef = useRef();
  const ingredientBlockRef = useRef([]);

  useMemo(() => {
    ingredientBlockRef.current = [];
  }, [ingredientCards.ingredients]);

  const addToBlockRefs = (el) => {
    if (el && !ingredientBlockRef.current.includes(el)) {
      ingredientBlockRef.current.push(el);
    }
  };

  const openModal = (ingredientCard) => {
    setModalProps(ingredientCard);
    setVisibleModal(true);
  };

  const closeModal = () => {
    setVisibleModal(false);
  };

  // устанавливает высоту блока ингридиентов
  const getCurrentOffsetIngredientBlock = () => {
    const currentScrolableRef = scrollableNodeRef.current;
    setOffsetTopScrollBlock(currentScrolableRef.getBoundingClientRect().top);
  };

  const eventListenerFunction = () => {
    const currentHeightIngredient =
      scrollableNodeRef.current.children[0].offsetHeight;
    const currentHeightScrollBlock = scrollableNodeRef.current.offsetHeight;
    const curentScrollTop = scrollableNodeRef.current.scrollTop;

    ingredientBlockRef.current.find((e, index) => {
      if (curentScrollTop >= e.offsetTop) {
        return setNavChange({
          ...navChange,
          scrolledBlock: uniqTypes[index],
        });
      }

      if (
        currentHeightIngredient ===
        curentScrollTop + currentHeightScrollBlock
      ) {
        return setNavChange({
          ...navChange,
          scrolledBlock: uniqTypes[uniqTypes.length - 1],
        });
      }
    });
  };

  // Активация табов при сколле
  const onScrollIngredients = () => {
    setNavChange({ ...navChange, currentEvent: "scrolled" });
    scrollableNodeRef.current.addEventListener("scroll", eventListenerFunction);
  };

  // Меняем активный таб при скролле
  const changeActiveTabScrolled = () => {
    if (navChange.scrolledBlock !== navChange.clickedBlock) {
      setNavChange({ ...navChange, scrolledBlock: navChange.scrolledBlock });
    }
  };

  // Меняем активный таб при клике
  const changeActiveTabClicked = (e) => {
    scrollableNodeRef.current.removeEventListener(
      "scroll",
      eventListenerFunction
    );
    setNavChange({ ...navChange, clickedBlock: e, currentEvent: "clicked" });
  };

  // скрол к блокам ингридиента при нажатии на табы
  const scrollToIngredient = () => {
    const currentScrolableRef = scrollableNodeRef.current;
    const currentTypeIndex = uniqTypes.indexOf(navChange.clickedBlock);
    const currentIngredientBlock = ingredientBlockRef.current[currentTypeIndex];
    const offsetTopCurrentIngredientBlock = currentIngredientBlock.offsetTop;

    currentScrolableRef.scrollTo({
      top: offsetTopCurrentIngredientBlock,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    getCurrentOffsetIngredientBlock();
    scrollToIngredient();
    onScrollIngredients();
  }, [navChange.currentEvent]);

  useEffect(() => {
    changeActiveTabScrolled();
  }, [navChange.scrolledBlock]);

  return (
    <>
      <div className={`${styles.burgerIngredients} mt-5`}>
        <div style={{ display: "flex" }} className="mb-10">
          {uniqTypes.map((uniqType, index) => (
            <Tab
              value={uniqType}
              active={
                (navChange.clickedBlock === uniqType &&
                  navChange.currentEvent === "clicked") ||
                (navChange.scrolledBlock === uniqType &&
                  navChange.currentEvent === "scrolled")
              }
              onClick={changeActiveTabClicked}
              key={uniqType}
            >
              {uniqType}
            </Tab>
          ))}
        </div>
        <SimpleBar
          style={{
            maxHeight: `calc(100vh - ${offsetTopScrollBlock}px - 1px)`,
          }}
          autoHide={false}
          scrollableNodeProps={{ ref: scrollableNodeRef }}
        >
          {uniqTypes.map((uniqType, index) => (
            <IngredientBlock
              key={uniqType}
              uniqType={uniqType}
              ref={addToBlockRefs}
            >
              {ingredientCards.ingredients.map(
                (ingredientCard) =>
                  ingredientCard.type === uniqType && (
                    <IngredientCard
                      key={ingredientCard._id}
                      ingredientCard={ingredientCard}
                      openModal={openModal}
                    />
                  )
              )}
            </IngredientBlock>
          ))}
        </SimpleBar>
      </div>
      <MyModal
        visible={visibleModal}
        setVisible={setVisibleModal}
        hideDefaultClose={true}
      >
        <IngredientDetails
          ingredientCard={modalProps}
          closeModal={closeModal}
        />
      </MyModal>
    </>
  );
};

export default BurgerIngredients;
