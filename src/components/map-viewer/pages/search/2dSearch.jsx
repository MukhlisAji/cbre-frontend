import React, { useState, useEffect } from 'react';
import { BiSearch, BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import CustomDropdown from '../../../shared/CustomDropdown';
import { useAppContext } from '../../../../AppContext';
import { useNavigate } from 'react-router-dom';
import SearchResult from './SearchResult';
import { Description, Field, Input, Label } from '@headlessui/react';
import clsx from 'clsx';
import { Box, FormControlLabel, Slider, Switch } from '@mui/material';


export default function TwoDSearch() {
  const { isCollapsed2dSearchOpen, setIsCollapsed2dSearchOpen } = useAppContext();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('buildings');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNLA, setSelectedNLA] = useState('Select');
  const [selectedRent, setSelectedRent] = useState('Select');
  const [selectedDate, setSelectedDate] = useState('Select');
  const [selectedUsage, setSelectedUsage] = useState('Select');
  const [sectionHeight, setSectionHeight] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [value, setValue] = useState(50);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 100,
      label: '100',
    }
  ];

  const nlaOptions = ['Select NLA', 'NLA 1', 'NLA 2'];
  const rentOptions = ['Select Asking Rent', 'Rent 1', 'Rent 2'];
  const dateOptions = ['Select Available Dates', 'Date 1', 'Date 2'];
  const usageOptions = ['Select Property Usage', 'Usage 1', 'Usage 2'];

  const toggleCollapse = () => {
    setIsCollapsed2dSearchOpen(!isCollapsed2dSearchOpen);
  };

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    setShowResults(true);
    // navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
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

  const handleBackToSearch = () => {
    setShowResults(false);
  };

  return (
    <div className="flex h-full relative">
      {/* Sidebar */}
      <div className='flex relative'>
        <div
          className={`flex flex-col overflow-hidden bg-white shadow-md rounded-md transition-all duration-300 ease-in-out z-10 ${isCollapsed2dSearchOpen ? 'w-0.5' : 'w-72'}`}
        >
          <div className={`flex flex-col p-4 transition-opacity duration-300 ease-in-out ${isCollapsed2dSearchOpen ? 'opacity-0' : 'opacity-100'}`}>
            {!showResults ? (
              <>
                <div className="relative mb-4 w-full h-full">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-1.5 shadow-md border border-neutral-300 rounded-md pr-10"
                  />
                  <BiSearch
                    className="absolute right-3 top-2 text-neutral-500 cursor-pointer"
                    size={24}
                    onClick={handleSearch}
                  />
                </div>
                {/* Tabs */}
                <div className="flex mb-4 w-full text-sm gap-1 px-1 rounded-md bg-neutral-200">
                  <button
                    onClick={() => setActiveTab('buildings')}
                    className={`flex-grow p-2 rounded-md my-1 text-sm text-neutral-500 ${activeTab === 'buildings' ? 'bg-white text-black border-neutral-300 shadow-md' : 'bg-neutral-200 text-neutral-700 border-neutral-300'}`}
                  >
                    Buildings
                  </button>
                  <button
                    onClick={() => setActiveTab('account')}
                    className={`flex-grow p-2 rounded-md my-1 text-sm text-neutral-500 ${activeTab === 'account' ? 'bg-white text-black border-neutral-300 shadow-md' : 'bg-neutral-200 text-neutral-700 border-neutral-300'}`}
                  >
                    Account
                  </button>
                </div>
                {/* Tab Content */}
                {activeTab === 'buildings' && (
                  <div className="space-y-4 w-full text-sm">
                    <div className="flex mb-4 w-full">
                      <button
                        onClick={() => handleButtonClick('all')}
                        className={`flex-grow p-1 w-1/2 rounded-l-md shadow-md text-sm ${activeButton === 'all' ? 'bg-c-teal text-white' : 'bg-neutral-200 text-neutral-500 hover:bg-neutral-300'}`}
                      >
                        All Buildings
                      </button>
                      <button
                        onClick={() => handleButtonClick('available')}
                        className={`flex-grow p-1 w-1/2 rounded-r-md shadow-md text-sm ${activeButton === 'available' ? 'bg-c-teal text-white' : 'bg-neutral-200 text-neutral-500 hover:bg-neutral-300'}`}
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
                      <div className='flex space-x-2 py-2 mt-2'>
                        <FormControlLabel control={<Switch defaultChecked size="small" />} />
                        <label className=" text-xs font-semibold leading-6 text-neutral-500">
                          Transaction Amount
                        </label>
                      </div>

                      <div className="flex flex-col items-center w-full mt-2">
                        <label className=" text-xs font-semibold leading-6 text-neutral-500">
                          Transaction Amount
                        </label>
                        <Box className="w-full pl-6 pr-4">
                          <Slider
                            // value={value}
                            // onChange={handleSliderChange}
                            aria-label="Default"
                            valueLabelDisplay="auto"
                            min={0}
                            max={100}
                            marks={marks}
                          />
                          {/* <div className="flex justify-between text-sm text-neutral-500">
                            <span>0</span>
                            <span>100</span>
                          </div> */}
                        </Box>
                      </div>
                      <div className="flex flex-col items-center w-full mt-2">
                        <label className=" text-xs font-semibold leading-6 text-neutral-500">
                          Transaction Period
                        </label>
                        <Box className="w-full pl-6 pr-4">
                          <Slider
                            value={value}
                            onChange={handleSliderChange}
                            aria-label="Default"
                            valueLabelDisplay="auto"
                            min={0}
                            max={100}
                            marks={marks}
                          />
                          {/* <div className="flex justify-between text-sm text-neutral-500">
                            <span>0</span>
                            <span>100</span>
                          </div> */}
                        </Box>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'account' && (
                  <div className="space-y-4 w-full text-sm">
                    <div className="flex mb-4 w-full">
                      <button
                        onClick={() => handleButtonClick('all')}
                        className={`flex-grow p-1 w-1/2 rounded-l-md shadow-md text-sm ${activeButton === 'all' ? 'bg-c-teal text-white' : 'bg-neutral-200 text-neutral-500 hover:bg-neutral-300'}`}
                      >
                        All Buildings
                      </button>
                      <button
                        onClick={() => handleButtonClick('available')}
                        className={`flex-grow p-1 w-1/2 rounded-r-md shadow-md text-sm ${activeButton === 'available' ? 'bg-c-teal text-white' : 'bg-neutral-200 text-neutral-500 hover:bg-neutral-300'}`}
                      >
                        Available Buildings
                      </button>
                    </div>
                    <div style={{ height: `${sectionHeight}px` }} className="overflow-y-auto pr-3">
                      <div>
                        <label className="block mt-2 text-xs font-semibold leading-6 text-neutral-500">Account Name</label>
                        <input
                          className="relative pl-4 w-full cursor-pointer rounded-md bg-white py-1.5 text-semibold pr-10 text-left text-xs text-neutral-600 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                        />
                      </div>
                      <div>
                        <label className="block mt-2 text-xs font-semibold leading-6 text-neutral-500">Parent Account</label>
                        <input
                          className="relative pl-4 w-full cursor-pointer rounded-md bg-white py-1.5 text-semibold pr-10 text-left text-xs text-neutral-600 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                        />
                      </div>

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
                    </div>
                  </div>
                )}
              </>
            ) : (
              <SearchResult onBack={handleBackToSearch} />
            )}
          </div>
        </div>
        {/* Toggle Button */}
        <div className={`absolute -right-10 top-1/2 -mt-16 transform -translate-y-1/2 z-0`}>
          <button
            onClick={toggleCollapse}
            className="bg-white rounded-lg p-3 hover:bg-neutral-300 transition-all duration-300 ease-in-out"
          >
            {isCollapsed2dSearchOpen ? <BiChevronRight size={24} /> : <BiChevronLeft size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
}
