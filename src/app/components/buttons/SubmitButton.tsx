'use client';

type SubmitButtonProps = {
    name: string,
};
  
  const SubmitButton: React.FC<SubmitButtonProps> = ({name }) => {
    return (
      <button
        type="submit"
        className="w-full bg-green-600 text-white p-2 rounded"
        >
        Guardar {name}
      </button>
    );
  };
  
  export default SubmitButton;