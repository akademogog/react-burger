import React, { useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import IngridientCard from "../UI/IngridientCard/IngridientCard.jsx";
import IngridientBlock from "../IngridientBlock/IngridientBlock.jsx";
import styles from "./BurgerIngridients.module.scss";
import MyModal from "../UI/MyModal/MyModal";
import DetailIngridients from "../ModalsContent/DetailIngridients/DetailIngridients.jsx";

const BurgerIngridients = ({ ingridientCards }) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalProps, setModalProps] = useState({});
  const returnType = ingridientCards.map(
    (ingridientCard) => ingridientCard.type
  );
  const uniqTypes = [...new Set(returnType)];
  const arrayRefs = [];

  for (let i = 0; i < uniqTypes.length; i++) {
    arrayRefs.push(React.createRef());
  }
  const [current, setCurrent] = useState(uniqTypes[0]);
  const [offsetTopScrollBlock, setOffsetTopScrollBlock] = useState(0);
  const scrollableNodeRef = useRef();
  const ingridientBlockRef = useRef(arrayRefs);

  const openModal = (ingridientCard) => {
    setModalProps(ingridientCard);
    setVisibleModal(true);
  };

  const closeModal = () => {
    setVisibleModal(false);
  }

  const scrollToIngridient = () => {
    const currentScrolableRef = scrollableNodeRef.current;
    const currentTypeIndex = uniqTypes.indexOf(current);
    const currentIngridientBlock =
      ingridientBlockRef.current[currentTypeIndex].current;
    const offsetTopCurrentIngridientBlock = currentIngridientBlock.offsetTop;
    currentScrolableRef.scrollTo({
      top: offsetTopCurrentIngridientBlock,
      behavior: "smooth",
    });
  };

  const getCurrentOffsetIngridientBlock = () => {
    const currentScrolableRef = scrollableNodeRef.current;
    setOffsetTopScrollBlock(currentScrolableRef.getBoundingClientRect().top);
  };

  useEffect(() => {
    getCurrentOffsetIngridientBlock();
    scrollToIngridient();
  }, [current]);

  return (
    <>
      <div className={`${styles.burgerIngredients} mt-5`}>
        <div style={{ display: "flex" }} className="mb-10">
          {uniqTypes.map((uniqType) => (
            <Tab
              value={uniqType}
              active={current === uniqType}
              onClick={setCurrent}
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
            <IngridientBlock
              key={uniqType}
              uniqType={uniqType}
              ref={ingridientBlockRef.current[index]}
            >
              {ingridientCards.map(
                (ingridientCard) =>
                  ingridientCard.type === uniqType && (
                    <IngridientCard
                      key={ingridientCard._id}
                      ingridientCard={ingridientCard}
                      openModal={openModal}
                    />
                  )
              )}
            </IngridientBlock>
          ))}
        </SimpleBar>
      </div>
      <MyModal visible={visibleModal} setVisible={setVisibleModal} hideDefaultClose={true}>
        <DetailIngridients ingridientCard={modalProps} closeModal={closeModal} />
      </MyModal>
    </>
  );
};

BurgerIngridients.propTypes = {
  ingridientCards: PropTypes.object.isRequired
}

export default BurgerIngridients;
