import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./MyModal.module.scss";

const MyModal = ({ children, visible, setVisible, hideDefaultClose }) => {
  const rootClasses = [styles.myModal];

  if (visible) {
    rootClasses.push(styles.active);
  }

  return (
    <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
      <div
        className={styles.myModalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {!hideDefaultClose && (
          <div
            className={`${styles.closeButton}`}
            onClick={() => setVisible(false)}
          >
            <CloseIcon type="primary" />
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

export default MyModal;
