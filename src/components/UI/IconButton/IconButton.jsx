import React from "react";
import iconButtonStyles from "./IconButton.module.scss";
import PropTypes from "prop-types";

const IconButton = ({ children, text, active = false, ...props }) => {
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

IconButton.propTypes = {
  children: PropTypes .element,
  text: PropTypes.string,
  active: PropTypes.bool,
  props: PropTypes.array
};

export default IconButton;
