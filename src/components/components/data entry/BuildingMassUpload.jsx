import React from 'react';
import { BsBuildingFillAdd, BsBuildingFillExclamation } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';

export default function BuildingMassUpload() {
  const navigate = useNavigate()
  const location = useLocation();


  const handleCardClick = (path, action) => {
    const currentPath = location.pathname;
    const newPath = `${currentPath}${path}?action=${action}`;
    navigate(newPath);
  };

  return (
    <div className="flex flex-wrap justify-center bg-white">
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-md bg-neutral-100 border border-neutral-200 shadow-lg rounded-lg overflow-hidden mx-4 my-8 cursor-pointer transform transition-transform hover:scale-105"
        onClick={() => handleCardClick('/template', 'new')}>
        <div className="p-6">
          <div className="flex items-center justify-center">
            <BsBuildingFillAdd fontSize={60} className='text-yellow-400' />
          </div>
          <div className="text-center mt-4">
            <p className="text-xl font-semibold text-gray-800">New Building</p>
            <p className="text-sm text-gray-500">Description for adding new buildings</p>
          </div>
        </div>
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-md bg-neutral-100 border border-neutral-200 shadow-lg rounded-lg overflow-hidden mx-4 my-8 cursor-pointer transform transition-transform hover:scale-105"
        onClick={() => handleCardClick('/template', 'update')}>
        <div className="p-6">
          <div className="flex items-center justify-center">
            <BsBuildingFillExclamation fontSize={60} className='text-yellow-400' />
          </div>
          <div className="text-center mt-4">
            <p className="text-xl font-semibold text-gray-800">Update Building</p>
            <p className="text-sm text-gray-500">Description for updating buildings</p>
          </div>
        </div>
      </div>
    </div>
  );
}
