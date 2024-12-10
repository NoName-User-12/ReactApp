import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import { api } from "./services/apiService";

const App = () => {
  const [filters, setFilters] = useState({
    type: ['Send-Receive', 'GetReward', 'GetCommission', 'Delegate'],
    amountMin: 0,
    amountMax: 50000,
    token: 'ATOM',
    date: '',
    account: ''
  });

  const [maxMinValue, setMaxMinValue] = useState({min:0,max:1});

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  const fetchFilterData = async () => {
    try {
      const response = await api.getMinMaxAmout();
      setFilters((prevFilters) => ({
        ...prevFilters,
        amountMin: response.min,
        amountMax: response.max
      }));

      setMaxMinValue({...response});
    } catch (error) {
      console.error("Error fetching filter data:", error);
    }
  };

  useEffect(() => {
    fetchFilterData();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Header onSearch={handleFilterChange}/>
      <div className="flex flex-1">
        <Sidebar onFilterChange={handleFilterChange} filters={filters} maxMinValue={maxMinValue}/>
        <MainContent filters={filters}/>
      </div>
    </div>
  );
};

export default App;
