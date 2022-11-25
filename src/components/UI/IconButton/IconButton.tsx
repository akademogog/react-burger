import React, { FC } from "react";
import iconButtonStyles from "./IconButton.module.scss";

type TIconButton = {
  children: JSX.Element;
  text: string;
  active?: boolean;
}

const IconButton: FC<TIconButton> = ({ children, text, active = false, ...props }) => {
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
