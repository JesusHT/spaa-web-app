'use client';

type LeftArrowButtonProps = {
    onClick: () => void; 
  };
  
  const LeftArrowButton: React.FC<LeftArrowButtonProps> = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      
    );
  };
  
  export default LeftArrowButton;