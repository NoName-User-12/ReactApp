import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

const App = () => {
  const [filters, setFilters] = useState({
    type: ['Send;Receive', 'GetReward', 'GetCommission', 'Delegate'],
    amountMin: 0,
    amountMax: 50000,
    token: 'ATOM',
    date: '',
  });

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar onFilterChange={handleFilterChange} filters={filters}/>
        <MainContent filters={filters}/>
      </div>
    </div>
  );
};

export default App;
