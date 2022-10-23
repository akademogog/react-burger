import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect } from "react";
import styles from "./MyModal.module.scss";
import ReactDOM from 'react-dom'
import PropTypes from "prop-types";

const MyModal = ({ children, setVisible, hideDefaultClose }) => {
  const rootClasses = [styles.myModal, styles.active];
  const modalRoot = document.getElementById("react-modals");

  useEffect(() => {
    document.onkeydown = (evt) => {
      evt = evt || window.event;
      if (evt.keyCode === 27) {
        setVisible(false);
      }
    };
  }, [setVisible]);

  return ReactDOM.createPortal(
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
    </div>,
    modalRoot
  );
};

MyModal.propTypes = {
  children: PropTypes.element,
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  hideDefaultClose: PropTypes.bool
};

export default MyModal;
