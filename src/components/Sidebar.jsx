import React, { useState, useEffect } from 'react';

const Sidebar = ({ onFilterChange, filters }) => {
  const [type, setType] = useState({
    'Send-Receive': filters.type.includes('Send-Receive'),
    'GetReward': filters.type.includes('GetReward'),
    'GetCommission': filters.type.includes('GetCommission'),
    'Delegate': filters.type.includes('Delegate'),
  });
  const [amountMin, setAmountMin] = useState(filters.amountMin);
  const [amountMax, setAmountMax] = useState(filters.amountMax);
  const [token, setToken] = useState(filters.token);
  const [date, setDate] = useState(filters.date);

  // Cập nhật trạng thái khi checkbox thay đổi
  const handleTypeChange = (event) => {
    setType({
      ...type,
      [event.target.name]: event.target.checked,
    });
  };

  // Gửi dữ liệu filter khi Apply
  const handleApplyFilters = () => {
    onFilterChange({
      type: Object.keys(type).filter((key) => type[key]),
      amountMin,
      amountMax,
      token,
      date,
    });
  };

  // Đồng bộ hóa giá trị filter từ props vào state
  useEffect(() => {
    setType({
      'Send;Receive': filters.type.includes('Send;Receive'),
      'GetReward': filters.type.includes('GetReward'),
      'GetCommission': filters.type.includes('GetCommission'),
      'Delegate': filters.type.includes('Delegate'),
    });
    setAmountMin(filters.amountMin);
    setAmountMax(filters.amountMax);
    setToken(filters.token);
    setDate(filters.date);
  }, [filters]);

  return (
    <div className="w-[300px] bg-gray-100 h-full p-4 flex flex-col justify-between">
      <div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Type</h2>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="Send-Receive"
                checked={type['Send;Receive']}
                onChange={handleTypeChange}
                className="mr-2"
              />
              Send - Receive
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="GetReward"
                checked={type['GetReward']}
                onChange={handleTypeChange}
                className="mr-2"
              />
              Get Reward
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="GetCommission"
                checked={type['GetCommission']}
                onChange={handleTypeChange}
                className="mr-2"
              />
              Get Commission
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="Delegate"
                checked={type['Delegate']}
                onChange={handleTypeChange}
                className="mr-2"
              />
              Delegate
            </label>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Amount</h2>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-sm">0</span>
              <span className="text-gray-600 text-sm">{amountMax}</span>
            </div>
            <input
              type="range"
              min="0"
              max={amountMax}
              className="w-full"
              value={amountMin}
              onChange={(e) => setAmountMin(e.target.value)}
            />
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={amountMin}
                onChange={(e) => setAmountMin(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <input
                type="number"
                placeholder="Max"
                value={amountMax}
                onChange={(e) => setAmountMax(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Token</h2>
          <select
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="ATOM">ATOM</option>
            <option value="NTRN">NTRN</option>
            <option value="stOSMO">stOSMO</option>
            <option value="stLUNA">stLUNA</option>
            <option value="STRD">STRD</option>
            <option value="stSTARS">stSTARS</option>
            <option value="stJUNO">stJUNO</option>
            <option value="stSOMM">stSOMM</option>
            <option value="stINJ">stINJ</option>
            <option value="stATOM">stATOM</option>
            <option value="stEVMOS">stEVMOS</option>
            <option value="stUMEE">stUMEE</option>
            <option value="stCMDX">stCMDX</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Time</h2>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-md p-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={handleApplyFilters}
        >
          Apply
        </button>
        <button
          className="bg-white text-gray-800 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
          onClick={() => {
            setType({
              'Send-Receive': true,
              'GetReward': true,
              'GetCommission': true,
              'Delegate': true,
            });
            setAmountMin(0);
            setAmountMax(50000);
            setToken('1');
            setDate('');
            onFilterChange({
              type: ['Send-Receive', 'GetReward', 'GetCommission', 'Delegate'],
              amountMin: 0,
              amountMax: 50000,
              token: '1',
              date: '',
            });
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
