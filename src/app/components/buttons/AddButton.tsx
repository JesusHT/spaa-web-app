'use client';

type AddButtonProps = {
    onClick: () => void; 
  };
  
  const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="px-4 py-2 bg-yellow-500 text-white text-xl rounded hover:bg-yellow-700 "
      >
        +
      </button>
    );
  };
  
  export default AddButton;