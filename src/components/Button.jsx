import React from 'react';
const Button = ({ children, onClick, size, className }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded ${size === 'lg' ? 'text-md' : ''} ${className} bg-green-500`}
    >
      {children}
    </button>
  );
};

export default Button; // Default export