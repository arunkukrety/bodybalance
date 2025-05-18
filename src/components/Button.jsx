
const Button = ({ children, onClick, size, className }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded ${size === 'lg' ? 'text-lg' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button; // Default export