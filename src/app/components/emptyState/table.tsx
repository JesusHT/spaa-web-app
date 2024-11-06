import React from 'react';

type EmptyStateProps = {
  message: string;
  icon?: string;
  onAction?: () => void;
  actionLabel?: string;
};

const EmptyState: React.FC<EmptyStateProps> = ({ message, icon = "fa-search-minus", onAction, actionLabel }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-5  min-h-[75vh] text-black bg-gradient-to-b from-white to-stone-200 p-10 rounded-lg shadow-md">
      <i className={`fa ${icon} text-7xl mb-4 animate-bounce text-black`}></i>
      <p className="text-lg text-black mb-4">{message}</p>
      {onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 ease-in-out"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
