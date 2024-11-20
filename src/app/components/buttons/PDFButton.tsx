'use client';

type PDFButtonProps = {
    onClick: () => void; 
  };
  
  const PDFButton: React.FC<PDFButtonProps> = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        <i className="fa-regular fa-file-pdf"></i> Generar PDF
      </button>
    );
  };
  
  export default PDFButton;