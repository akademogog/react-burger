import React, { useEffect, useRef, useState } from "react";
import styles from "./FeedPage.module.scss";
import OrderBlock from "../../components/OrderBlock/OrderBlock";
import SimpleBar from "simplebar-react";
import { fetchFeeds } from "../../store/asyncActions/feeds";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const FeedPage = () => {
  const dispatch = useAppDispatch();
  const payload = useAppSelector(store => store.feedReduser.payload);
  const [offsetTopScrollBlock, setOffsetTopScrollBlock] = useState<number>(0);
  const scrollableNodeRef = useRef<HTMLDivElement | any>(null);
  const [feed, setFeed] = useState<any>({
    done: [],
    created: [],
    pending: [],
  });

  const getCurrentOffsetIngredientBlock = () => {
    const currentScrolableRef = scrollableNodeRef.current;
    currentScrolableRef && setOffsetTopScrollBlock(currentScrolableRef.getBoundingClientRect().top);
  };

  useEffect(() => {
    getCurrentOffsetIngredientBlock();
    dispatch(fetchFeeds());

    return (() => {
      dispatch(fetchFeeds('', true));
    })
  }, []);

  useEffect(() => {
    if (payload && payload.orders) {
      setFeed({ ...feed, done: payload.orders.filter((el) => {
        if (el.status === "done") {
          return true;
        }
        return false;
      }), created: payload.orders.filter((el) => {
        if (el.status === "created") {
          return true;
        }
        return false;
      }), pending: payload.orders.filter((el) => {
        if (el.status === "pending") {
          return true;
        }
        return false;
      }), });
    }
  }, [payload])

  return (    
    <div className={`${styles.container}`}>
      <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
      <div className={`${styles.block}`}>
        <SimpleBar
          style={{
            width: '100%',
            maxHeight: `calc(100vh - ${offsetTopScrollBlock}px - 1px)`,
          }}
          autoHide={false}
          scrollableNodeProps={{ ref: scrollableNodeRef }}
        >
          <div className={`${styles.orderContainer}`}>
            { payload && payload.orders.map((el) => <OrderBlock key={el._id} order={el} feed={true} />)}
          </div>
        </SimpleBar>
        <div className={`${styles.feedInfo}`}>
          <div className={`${styles.feedStatus}`}>
            { feed.done.length ?
              <div className={`${styles.feedStatusSuccess} mb-15`}>
                <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
                <div style={{
                  columnCount: Math.floor(feed.done.length / 10),
                }}>
                  { feed.done && feed.done.map((el, index) => <p key={index} className="text text_type_digits-default">{el.number}</p>)}
                </div>
              </div> : ''
            }
            { feed.created.length ?
              <div className={`${styles.feedStatusInWork}`}>
                <h3 className="text text_type_main-medium mb-6">В работе:</h3>
                <div style={{
                  columnCount: Math.floor(feed.done.length / 10),
                }}>
                  { feed.created && feed.created.map((el, index) => <p key={index} className="text text_type_digits-default">{el.number}</p>)}
                </div>
              </div> : ''
            }
            { feed.pending.length ? 
              <div className={`${styles.feedStatusSuccess} mb-15`}>
                <h3 className="text text_type_main-medium mb-6">Ожидает:</h3>
                <div style={{
                  columnCount: Math.floor(feed.done.length / 10),
                }}>
                  { feed.pending && feed.pending.map((el, index) => <p key={index} className="text text_type_digits-default">{el.number}</p>)}
                </div>
              </div> : ''
            }
          </div>
          <div className={`${styles.feedAllTime} mb-15`}>
            <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
            <h2 className={`${styles.feedTitle} text text_type_digits-large`}>{payload && payload.total}</h2>
          </div>
          <div className={`${styles.feedAllToday}`}>
            <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
            <h2 className={`${styles.feedTitle} text text_type_digits-large`}>{payload && payload.totalToday}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
