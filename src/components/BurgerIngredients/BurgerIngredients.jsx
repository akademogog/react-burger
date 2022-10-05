import React, { useState, useRef, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import IngredientCard from "../UI/IngredientCard/IngredientCard.jsx";
import IngredientBlock from "../IngredientBlock/IngredientBlock.jsx";
import styles from "./BurgerIngredients.module.scss";
import MyModal from "../UI/MyModal/MyModal";
import DetailIngredients from "../ModalsContent/DetailIngredients/DetailIngredients.jsx";

const BurgerIngredients = ({ ingredientCards }) => {
  const returnType = ingredientCards.map(
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
  const tabBloks = useRef();
  const ingredientBlockRef = useRef([]);

  useMemo(() => {
    ingredientBlockRef.current = [];
  }, [ingredientCards]) 

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
  const getCurrentOffsetIngredientBlock = (currentScrolableRef) => {
    setOffsetTopScrollBlock(currentScrolableRef.getBoundingClientRect().top);
  };

  // скрол к блокам ингридиента при нажатии на табы
  const scrollToIngredient = (currentScrolableRef) => {
    setNavChange({ ...navChange, currentEvent: "clicked" });
    // setCurrentEvent("clicked");
    const currentTypeIndex = uniqTypes.indexOf(navChange.clickedBlock);
    const currentIngredientBlock = ingredientBlockRef.current[currentTypeIndex];
    const offsetTopCurrentIngredientBlock = currentIngredientBlock.offsetTop;
    currentScrolableRef.scrollTo({
      top: offsetTopCurrentIngredientBlock,
      behavior: "smooth",
    });
  };

  // скрол к блокам ингридиента при сколле
  const onScrollIngredients = () => {
    setNavChange({ ...navChange, currentEvent: "scrolled" });
    scrollableNodeRef.current.addEventListener("scroll", () => {
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
    });
  };

  // Меняем активный таб при скролле
  const changeActiveTabScrolled = () => {
    if (navChange.scrolledBlock !== navChange.clickedBlock) {
      setNavChange({ ...navChange, scrolledBlock: navChange.scrolledBlock });
    }
  };

  // Меняем активный таб при клике
  const changeActiveTabClicked = (e) => {
    setNavChange({ ...navChange, clickedBlock: e });
  };

  useEffect(() => {
    const currentScrolableRef = scrollableNodeRef.current;
    getCurrentOffsetIngredientBlock(currentScrolableRef);
    scrollToIngredient(currentScrolableRef);
    onScrollIngredients();
  }, [navChange.clickedBlock, navChange.currentEvent]);

  useEffect(() => {
    changeActiveTabScrolled();
  }, [navChange.scrolledBlock]);

  return (
    <>
      <div className={`${styles.burgerIngredients} mt-5`}>
        <div style={{ display: "flex" }} className="mb-10" ref={tabBloks}>
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
              {ingredientCards.map(
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
        <DetailIngredients
          ingredientCard={modalProps}
          closeModal={closeModal}
        />
      </MyModal>
    </>
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

BurgerIngredients.propTypes = {
  ingredientCards: PropTypes.arrayOf(ingredientCardPropTypes).isRequired,
};

export default BurgerIngredients;
