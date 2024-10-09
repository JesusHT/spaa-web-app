'use client';

type UpdateButtonProps = {
    onClick: () => void; 
  };
  
  const UpdateButton: React.FC<UpdateButtonProps> = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:focus:ring-yellow-900"
      >
        <i className="fa-solid fa-pen-to-square"></i> Editar
      </button>
    );
  };
  
  export default UpdateButton;