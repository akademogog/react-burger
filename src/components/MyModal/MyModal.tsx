import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC, useEffect } from "react";
import styles from "./MyModal.module.scss";
import ReactDOM from "react-dom";
import ModalOverlay from "./ModalOverlay";

type TMyModal = {
  children?: JSX.Element|JSX.Element[];
  modalClose?: Function;
  modalGoBack?: Function;
  hideDefaultClose?: boolean;
}

const MyModal: FC<TMyModal> = ({ children, hideDefaultClose, modalClose, modalGoBack }) => {
  const modalRoot = document.getElementById("react-modals") as HTMLElement;

  const onClose = () => {
    if (modalGoBack) {
      modalGoBack();
    }

    if (modalClose) {
      modalClose(false);
    }
  }

  useEffect(() => {
    function closeByEscape(evt: KeyboardEvent) {
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
        onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
      >
        {!hideDefaultClose && (
          <div
            className={`${styles.closeButton}`}
            onClick={onClose}
            data-testid="closeModal"
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

export default MyModal;
