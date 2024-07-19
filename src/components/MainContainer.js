import React from 'react';

const MainContainer = () => {
  return (
    <div className="ml-64 p-4"> {/* Adjust margin-left to account for sidebar width */}
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="bg-white rounded-lg shadow p-4">
        {/* Content goes here */}
      </div>
    </div>
  );
};

export default MainContainer;
