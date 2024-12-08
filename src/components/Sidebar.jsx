import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-[300px] bg-gray-100 h-full p-4 flex flex-col justify-between">
      <div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Type</h2>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Send - Receive
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Get Reward
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Get Commission
            </label>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Amount</h2>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-sm">0</span>
              <span className="text-gray-600 text-sm">50,000</span>
            </div>
            <input type="range" min="0" max="50000" className="w-full" />
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min"
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <input
                type="number"
                placeholder="Max"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Token</h2>
          <select className="w-full border border-gray-300 rounded-md p-2">
            <option value="">Select</option>
            <option value="1">Token 01</option>
            <option value="2">Token 02</option>
            <option value="3">Token 03</option>
            <option value="4">Token 04</option>
            <option value="5">Token 05</option>
            <option value="6">Token 06</option>
            <option value="7">Token 07</option>
            <option value="8">Token 08</option>
            <option value="9">Token 09</option>
            <option value="10">Token 10</option>
            <option value="11">Token 11</option>
            <option value="12">Token 12</option>
            <option value="13">Token 13</option>
            <option value="14">Token 14</option>
          </select>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Time</h2>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Apply
        </button>
        <button className="bg-white text-gray-800 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
          Reset
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
