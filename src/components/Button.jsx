import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyComponent = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/home');
  };

  return (
    <button onClick={onClick} className="px-4 py-2 bg-green-700 text-white rounded hover:cursor-pointer ">
      Go to Dashboard
    </button>
  );
};

export default MyComponent;
