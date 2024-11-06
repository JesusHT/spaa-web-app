'use client';

type LeftArrowButtonProps = {
    onClick: () => void; 
  };
  
  const LeftArrowButton: React.FC<LeftArrowButtonProps> = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="text-white bg-yellow-500 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-yellow-600 dark:hover:bg-yellow-500 dark:focus:ring-yellow-800"
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      
    );
  };
  
  export default LeftArrowButton;