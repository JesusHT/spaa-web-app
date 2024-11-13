'use client';

type SubmitButtonProps = {
  name: string;
  isActive?: boolean;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ name, isActive = true }) => {
  return (
    <button
      type="submit"
      className={`w-full text-white p-2 rounded ${isActive ? 'bg-green-600' : 'bg-green-600/75'}`}
      disabled={!isActive}
    >
      Guardar {name}
    </button>
  );
};

export default SubmitButton;
