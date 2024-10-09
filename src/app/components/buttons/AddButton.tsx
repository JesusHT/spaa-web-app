'use client';

type AddButtonProps = {
    onClick: () => void; 
  };
  
  const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 "
      >
        Agregar
      </button>
    );
  };
  
  export default AddButton;