import React from "react";
import styles from "./IngridientBlock.module.scss";

const IngridientBlock = React.forwardRef(
  ({ children, uniqType, ...props }, ref) => {
    return (
      <div className="mb-10" ref={ref}>
        <h3 className="mb-6 text text_type_main-medium">{uniqType}</h3>
        <div className={`${styles.cardContainer}`}>{children}</div>
      </div>
    );
  }
);

export default IngridientBlock;
