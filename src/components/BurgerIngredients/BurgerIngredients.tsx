import React, { useState, useRef, useEffect, useMemo } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import IngredientCard from "../IngredientCard/IngredientCard";
import IngredientBlock from "../IngredientBlock/IngredientBlock";
import styles from "./BurgerIngredients.module.scss";
import { DEL_CURRENT_INGREDIENT } from "../../store/actions/burgerIngredientsActions";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const BurgerIngredients = () => {
  const ingredients = useAppSelector((store) => store.burgerIngredientsReduser.ingredients);
  const dispatch = useAppDispatch();

  const constructorIngredients = useAppSelector(
    (store) => store.constructorReduser.constructorIngredients
  );
  const constructorBun = useAppSelector(
    (store) => store.constructorReduser.constructorBun
  );

  const returnType = ingredients.map((ingredientCard) => ingredientCard.type);
  const uniqTypes: string[] = [...new Set(returnType)];

  type TnavChange = {
    clickedBlock: string,
    scrolledBlock: string,
    currentEvent: string,
  }

  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [offsetTopScrollBlock, setOffsetTopScrollBlock] = useState<number>(0);
  const [navChange, setNavChange] = useState<TnavChange>({
    clickedBlock: uniqTypes[0],
    scrolledBlock: uniqTypes[0],
    currentEvent: "",
  });

  useEffect(() => {
    if (!visibleModal) {
      dispatch({ type: DEL_CURRENT_INGREDIENT });
    }
  }, [visibleModal])
  
  useEffect(() => {
    countersSelected();
  }, [constructorIngredients, constructorBun])

  const scrollableNodeRef = useRef<HTMLDivElement | any>(null);
  const ingredientBlockRef = useRef<HTMLDivElement[]>([]);

  useMemo(() => {
    ingredientBlockRef.current = [];
  }, [ingredients]);

  const addToBlockRefs = (el: HTMLDivElement) => {
    if (el && !ingredientBlockRef.current.includes(el)) {
      ingredientBlockRef.current.push(el);
    }
  };

  // ?????????????????????????? ???????????? ?????????? ????????????????????????
  const getCurrentOffsetIngredientBlock = () => {
    const currentScrolableRef = scrollableNodeRef.current;
    currentScrolableRef && setOffsetTopScrollBlock(currentScrolableRef.getBoundingClientRect().top);
  };

  const eventListenerFunction = () => {
    if (scrollableNodeRef) {
      const currentHeightIngredient = scrollableNodeRef.current.children[0].offsetHeight;
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
    }
  };

  // ?????????????????? ?????????? ?????? ????????????
  const onScrollIngredients = () => {
    setNavChange({ ...navChange, currentEvent: "scrolled" });
    scrollableNodeRef.current.addEventListener("scroll", eventListenerFunction);
  };

  // ???????????? ???????????????? ?????? ?????? ??????????????
  const changeActiveTabScrolled = () => {
    if (navChange.scrolledBlock !== navChange.clickedBlock) {
      setNavChange({ ...navChange, scrolledBlock: navChange.scrolledBlock });
    }
  };

  // ???????????? ???????????????? ?????? ?????? ??????????
  const changeActiveTabClicked = (e: string) => {
    scrollableNodeRef.current.removeEventListener(
      "scroll",
      eventListenerFunction
    );
    setNavChange({ ...navChange, clickedBlock: e, currentEvent: "clicked" });
  };

  // ?????????? ?? ???????????? ?????????????????????? ?????? ?????????????? ???? ????????
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


  const countersSelected = () => {
    let ingredientCounters = constructorIngredients.map(ingredient => {
      const ingredientId = ingredient._id;
      return ingredientId;
    })

    if (constructorBun) {
      const ingredientId = constructorBun._id;
      ingredientCounters.push(ingredientId)
    }

    return ingredientCounters;
  }

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
              {ingredients.map(
                (ingredientCard) => {
                  let total = 0;
                  let selected = countersSelected();

                  for (let i = 0; i < selected.length; i++) {
                    const element = selected[i];

                    if ( ingredientCard._id === element ) {
                      total++;

                      if ( ingredientCard.type === '??????????') {
                        total++;
                      }
                    }
                  }
                  
                  if (ingredientCard.type === uniqType) {
                    return (
                      <IngredientCard
                        key={ingredientCard._id}
                        ingredientCard={ingredientCard}
                        total={total}
                      />
                    )
                  }
                }
              )}
            </IngredientBlock>
          ))}
        </SimpleBar>
      </div>
    </>
  );
};

export default BurgerIngredients;
