import React, { useState, useEffect } from 'react';
import { BiSearch, BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import CustomDropdown from '../../shared/CustomDropdown';

export default function TwoDSearch() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('buildings');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNLA, setSelectedNLA] = useState('Select');
  const [selectedRent, setSelectedRent] = useState('Select');
  const [selectedDate, setSelectedDate] = useState('Select');
  const [selectedUsage, setSelectedUsage] = useState('Select');
  const [sectionHeight, setSectionHeight] = useState(0);


  const nlaOptions = ['Select NLA', 'NLA 1', 'NLA 2'];
  const rentOptions = ['Select Asking Rent', 'Rent 1', 'Rent 2'];
  const dateOptions = ['Select Available Dates', 'Date 1', 'Date 2'];
  const usageOptions = ['Select Property Usage', 'Usage 1', 'Usage 2'];

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleSearch = () => {
    // Implement your search logic here
    console.log('Searching for:', searchQuery);
  };

  const [activeButton, setActiveButton] = useState('all');

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  useEffect(() => {
    const handleResize = () => {
      const screenHeight = window.innerHeight;
      const newHeight = screenHeight - 250; 
      setSectionHeight(newHeight);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <div className="flex h-screen bg-gray-100 relative">
      {/* Sidebar */}
      <div className='flex relative'>
        <div
          className={`flex flex-col overflow-hidden bg-white shadow-md rounded-md transition-all duration-300 ease-in-out z-10 ${collapsed ? 'w-0.5' : 'w-80'}`}
        >
          <div className={`flex flex-col p-4 transition-opacity duration-300 ease-in-out ${collapsed ? 'opacity-0' : 'opacity-100'}`}>
            <div className="relative mb-4 w-full">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-1.5 shadow shadow-md border border-gray-300 rounded-md pr-10"
              />
              <BiSearch
                className="absolute right-3 top-2 text-gray-500 cursor-pointer"
                size={24}
                onClick={handleSearch}
              />
            </div>

            {/* Tabs */}
            <div className="flex mb-4 w-full  text-sm rounded gap-1 px-1 rounded-md bg-gray-200">
              <button
                onClick={() => setActiveTab('buildings')}
                className={`flex-grow p-2 text-sm rounded rounded-md my-1 ${activeTab === 'buildings' ? 'bg-white text-black border-gray-300 shadow shadow-md' : 'bg-gray-200 text-gray-700 border-gray-300'}`}
              >
                Buildings
              </button>
              <button
                onClick={() => setActiveTab('tenant')}
                className={`flex-grow p-2 text-sm rounded rounded-md my-1 ${activeTab === 'tenant' ? 'bg-white text-black border-gray-300 shadow shadow-md' : 'bg-gray-200 text-gray-700 border-gray-300'}`}
              >
                Tenant
              </button>
            </div>


            {/* Tab Content */}
            {activeTab === 'buildings' && (
              <div className="space-y-4 w-full text-sm">

                <div className="flex mb-4 w-full">
                  <button
                    onClick={() => handleButtonClick('all')}
                    className={`flex-grow text-sm p-1 w-1/2 rounded-l-md shadow shadow-md ${activeButton === 'all' ? 'bg-c-teal text-white' : 'bg-gray-200 text-neutral-700 hover:bg-gray-300'
                      } `}
                  >
                    All Buildings
                  </button>
                  <button
                    onClick={() => handleButtonClick('available')}
                    className={`flex-grow text-sm p-1 w-1/2 rounded-r-md shadow shadow-md ${activeButton === 'available' ? 'bg-c-teal text-white' : 'bg-gray-200 text-neutral-700 hover:bg-gray-300'
                      } `}
                  >
                    Available Buildings
                  </button>
                </div>

                <div style={{ height: `${sectionHeight}px` }} className="overflow-y-auto pr-3">
                  <CustomDropdown
                    label="Space Status"
                    options={nlaOptions}
                    selectedOption={selectedNLA}
                    onSelect={setSelectedNLA}
                  />
                  <CustomDropdown
                    label="Asset Class"
                    options={rentOptions}
                    selectedOption={selectedRent}
                    onSelect={setSelectedRent}
                  />
                  <CustomDropdown
                    label="Region/Micromarket"
                    options={dateOptions}
                    selectedOption={selectedDate}
                    onSelect={setSelectedDate}
                  />
                  <CustomDropdown
                    label="Zioning"
                    options={usageOptions}
                    selectedOption={selectedUsage}
                    onSelect={setSelectedUsage}
                  />
                  <CustomDropdown
                    label="Size"
                    options={nlaOptions}
                    selectedOption={selectedNLA}
                    onSelect={setSelectedNLA}
                  />
                  <CustomDropdown
                    label="NLA"
                    options={nlaOptions}
                    selectedOption={selectedNLA}
                    onSelect={setSelectedNLA}
                  />
                  <CustomDropdown
                    label="Asking Rent"
                    options={rentOptions}
                    selectedOption={selectedRent}
                    onSelect={setSelectedRent}
                  />
                  <CustomDropdown
                    label="Available Dates"
                    options={dateOptions}
                    selectedOption={selectedDate}
                    onSelect={setSelectedDate}
                  />
                  <CustomDropdown
                    label="Property Usage"
                    options={usageOptions}
                    selectedOption={selectedUsage}
                    onSelect={setSelectedUsage}
                  />
                </div>
              </div>
            )}

            {activeTab === 'tenant' && (
              <div className="space-y-4 w-full">
                {/* Add content for Tenant Account tab here */}
                <div className="relative">
                  <label className="block mb-1">Account Status</label>
                  <input className="w-full p-1.5 border border-gray-300 rounded-md hover:border-c-teal focus:border-c-teal focus:outline-none focus:ring-0"/>
                </div>
              </div>
            )}

            {/* <div className="mt-4 flex justify-end w-full">
              <button className="p-2 bg-gray-200 rounded-md hover:bg-gray-300">
                <BiHomeAlt className="w-6 h-6" />
              </button>
            </div> */}
          </div>
        </div>
        {/* Toggle Button */}
        <div className={`absolute -right-10 top-1/2 -mt-16 transform -translate-y-1/2 z-0`}>
          <button
            onClick={toggleCollapse}
            className="bg-white rounded-lg p-3 hover:bg-gray-300 transition-all duration-300 ease-in-out"
          >
            {collapsed ? <BiChevronRight size={24} /> : <BiChevronLeft size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
}
