import React, { useState, useEffect } from 'react';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

const Sidebar = ({ onFilterChange, filters, maxMinValue }) => {
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
  const [minMaxInfo, setMinMaxInfo] = useState({
    min: 0,
    max: 1
  });

  const Range = Slider.Range;
  const Handle = Slider.Handle;

  const handleTypeChange = (event) => {
    setType({
      ...type,
      [event.target.name]: event.target.checked,
    });
  };

  const handleApplyFilters = () => {
    onFilterChange({
      type: Object.keys(type).filter((key) => type[key]),
      amountMin,
      amountMax,
      token,
      date,
    });
  };
  useEffect(() => { setMinMaxInfo({ ...maxMinValue }) }, [maxMinValue]);

  useEffect(() => {
    const { type, amountMin, amountMax, token, date } = filters;
    setType(
      ['Send-Receive', 'GetReward', 'GetCommission', 'Delegate'].reduce(
        (acc, key) => ({ ...acc, [key]: type.includes(key) }),
        {}
      )
    );
    setAmountMin(amountMin);
    setAmountMax(amountMax);
    setToken(token);
    setDate(date);
  }, [filters]);


  const showToolTip = (props) => {
    const { value, dragging, ...restProps } = props;
    return (
      <Tooltip
        prefixCls="rc-slider-tooltip"
        overlay={value}
        visible={dragging}
        placement="top"
      >
        <Handle value={value} {...restProps} />
      </Tooltip>
    );
  };

  return (
    <div className="w-[300px] bg-gray-100 h-full p-4 flex flex-col justify-between border-r">
      <div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Type</h2>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="Send-Receive"
                checked={type['Send-Receive']}
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
              <span>{minMaxInfo.min}</span>
              <span>{minMaxInfo.max}</span>
            </div>
            <Slider
              range
              min={minMaxInfo.min}
              max={minMaxInfo.max}
              value={[amountMin, amountMax]}
              onChange={(value) => {
                setAmountMin(value[0]);
                setAmountMax(value[1]);
              }}
            />
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Min"
                value={amountMin}
                onChange={(e) => setAmountMin(+e.target.value)}
                className="w-full border border-gray-300 rounded-md p-1"
              />
              <input
                type="text"
                placeholder="Max"
                value={amountMax}
                onChange={(e) => setAmountMax(+e.target.value)}
                className="w-full border border-gray-300 rounded-md p-1"
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Token</h2>
          <select
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-1"
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
          <div className='relative'>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat="yyyy-MM-dd"
              className="w-full border border-gray-300 rounded-md p-1"
              placeholderText="yyyy-MM-dd"
            />
            <span className="absolute text-black-500" style={{top: '5px', right: '5px'}}>
              <i className="fas fa-calendar-alt"></i>
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
          onClick={handleApplyFilters}
        >
          Apply
        </button>
        <button
          className="bg-white text-gray-800 px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100"
          onClick={() => {
            setType({
              'Send-Receive': true,
              'GetReward': true,
              'GetCommission': true,
              'Delegate': true,
            });
            setAmountMin(minMaxInfo.min);
            setAmountMax(minMaxInfo.max);
            setToken('ATOM');
            setDate('');
            onFilterChange({
              type: ['Send-Receive', 'GetReward', 'GetCommission', 'Delegate'],
              amountMin: minMaxInfo.min,
              amountMax: minMaxInfo.max,
              token: 'ATOM',
              date: ''
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
