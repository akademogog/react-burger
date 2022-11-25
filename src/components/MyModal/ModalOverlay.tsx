import React from "react";
import styles from "./MyModal.module.scss";

const ModalOverlay = ({ onClose }: { onClose: React.MouseEventHandler<HTMLDivElement> | undefined}) => {
  return (
    <div className={`${styles.modalOverlay} ${styles.isActive}`} onClick={onClose}>
    </div>
  );
};

export default ModalOverlay;
