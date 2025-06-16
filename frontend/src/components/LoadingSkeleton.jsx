import React from "react";
import "./LoadingSkeleton.css"; // uses the same CSS

const LoadingSkeleton = ({ width = "100%", height = "1em", style = {} }) => {
  return (
    <div
      className="skeleton"
      style={{
        width,
        height,
        borderRadius: "4px",
        ...style,
      }}
    ></div>
  );
};

export default LoadingSkeleton;
