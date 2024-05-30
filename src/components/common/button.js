import React from "react";

const Button = ({ onClick, className, children, icon: Icon, text }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:transition-all hover:duration-300 ${className}`}
    >
      {text && text}
      {Icon && <Icon />}
      {children}
    </button>
  );
};

export default Button;
