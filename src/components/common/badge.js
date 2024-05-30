import React from "react";

const Badge = ({ text, className }) => {
  return (
    <span className={`py-2 px-3 rounded-full font-medium ${className}`}>
      {text}
    </span>
  );
};

export default Badge;
