import React from 'react';

type ModalProps = {
  id_item: number;
  type: string;
  onConfirm: (id: number) => void;
  isOpen: boolean;
  onClose: () => void;
  worker_number?: number;
  folio?: number;
};

const Modal: React.FC<ModalProps> = ({ id_item, type, onConfirm, isOpen, onClose, worker_number, folio }) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(id_item);
  };

  return (
    <div
      id="popup-modal"
      tabIndex={-1}
      className={`fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 ${
        isOpen ? '' : 'hidden'
      }`}
    >
        <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-primary rounded-lg shadow">
                <div className="p-4 md:p-5 text-center bg-white rounded-xl shadow-md shadow-yellow-500">
                    <i className="fa-regular fa-circle-exclamation text-5xl mb-4 text-red-500"></i>

                    <h3 className="mb-5 text-lg font-normal text-black">
                        ¿Estás seguro de que deseas eliminar el {type} {worker_number ? `con el número de cuenta ${worker_number}` : `con el folio ${folio}`}?
                    </h3>
                    <button
                        onClick={handleConfirm}
                        type="button"
                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                        >
                        Sí, estoy seguro.
                    </button>
                    <button
                        onClick={onClose}
                        type="button"
                        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                        No, cancela.
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Modal;
