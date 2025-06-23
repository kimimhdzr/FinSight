import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 10, gap = 8, color = "#007bff" }) => {
  return (
    <div
      className="dot-spinner"
      style={{ gap: `${gap}px` }}
    >
      <div
        className="dot"
        style={{ width: size, height: size, background: color }}
      ></div>
      <div
        className="dot"
        style={{ width: size, height: size, background: color }}
      ></div>
      <div
        className="dot"
        style={{ width: size, height: size, background: color }}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
