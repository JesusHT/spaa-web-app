import React from 'react';

type SearchFormProps = {
  error: string;
};

const MessageError: React.FC<SearchFormProps> = ({error}) => {
  return (
    <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-400 rounded">
        {error}
    </div>
  );
};

export default MessageError;