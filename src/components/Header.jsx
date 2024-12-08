import React from 'react';

const Header = () => {
  return (
    <header className="shadow flex items-center justify-between px-6 py-4 bg-gray-100 border-bottom-gray-300">
      <div className="text-2xl font-bold text-gray-700 logo">LOGO</div>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-300 rounded-l px-3 py-2 outline-none focus:ring focus:ring-blue-300"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600">
          Search
        </button>
      </div>
    </header>
  );
};

export default Header;
