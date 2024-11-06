import React from 'react';

type SearchFormProps = {
  placeholderText: string;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

const SearchForm: React.FC<SearchFormProps> = ({ placeholderText, searchTerm, setSearchTerm }) => {
  return (
    <form className="max-w-md">
      <label htmlFor="search-input" className="mb-2 text-sm font-medium text-gray-900 sr-only">
        Search
      </label>
      <div className="relative">
        <input
          type="text"
          id="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholderText}
          className="block w-full p-4 pr-10 text-sm text-black placeholder-gray-500 border border-gray-300 rounded-lg bg-white shadow-md focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
