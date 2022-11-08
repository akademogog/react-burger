import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect } from "react";
import styles from "./MyModal.module.scss";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import ModalOverlay from "./ModalOverlay";

const MyModal = ({ children, hideDefaultClose, modalClose, modalGoBack }) => {
  const modalRoot = document.getElementById("react-modals");

  const onClose = () => {
    if (modalGoBack) {
      modalGoBack();
    }

    if (modalClose) {
      modalClose(false);
    }
  }

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", closeByEscape);
    return () => {
      document.removeEventListener("keydown", closeByEscape);
    };
  }, []);

  if (!children) return null;

  return ReactDOM.createPortal(
    <div className={`${styles.myModal} ${styles.active}`}>
      <ModalOverlay onClose={onClose}/>
      <div
        className={styles.myModalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {!hideDefaultClose && (
          <div
            className={`${styles.closeButton}`}
            onClick={onClose}
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
  modalClose: PropTypes.func,
  modalGoBack: PropTypes.func,
  hideDefaultClose: PropTypes.bool,
};

export default MyModal;
