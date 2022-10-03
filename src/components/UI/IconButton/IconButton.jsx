import React from "react";
import iconButtonStyles from "./IconButton.module.scss";

const IconButton = ({ children, text, active = false, ...props }) => {
  console.log(iconButtonStyles);
  return (
    <button {...props} className={iconButtonStyles.iconButton}>
      {children}
      <span
        className={`text text_type_main-default ${
          active ? "text_color_active" : "text_color_inactive"
        }`}
      >
        {text}
      </span>
    </button>
  );
};

export default IconButton;
