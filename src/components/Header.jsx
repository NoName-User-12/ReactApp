import React, { useState } from 'react';

const Header = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); 
  };

  const handleSearchClick = () => {
    onSearch({ account: searchQuery });
  };

  return (
    <header className="flex items-center justify-between px-6 py-2 bg-gray-100 border-gray-300 border-b">
      <div className="text-2xl font-bold text-gray-700 logo">LOGO</div>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded-l px-3 py-1 outline-none focus:ring focus:ring-blue-300 w-96"
        />
        <button 
          onClick={handleSearchClick}
          className="bg-blue-500 text-white px-3 py-1 rounded-r hover:bg-blue-600"
        >
          Search
        </button>
      </div>
    </header>
  );
};

export default Header;
