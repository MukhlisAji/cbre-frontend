import { Box, FormControlLabel, Slider, Switch } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BiChevronLeft, BiChevronRight, BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../../AppContext';
import { api } from '../../../lib/api/api';
import { useTest } from '../../../lib/api/spaceStatus';
import CustomDropdown from '../../../shared/CustomDropdown';
import SearchResult from './SearchResult';
import {
  SearchUtils,
  fetchDateOptions,
  fetchNlaOptions,
  fetchPropertyUsageOptions,
  fetchRegionOptions,
  fetchRentOptions,
  fetchStatusOptions,
  fetchUsageOptions,
  fetchZoningOptions
} from './SearchUtils'; // Import the hook

export default function TwoDSearch() {
  const { isCollapsed2dSearchOpen, setIsCollapsed2dSearchOpen } = useAppContext();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('buildings');
  const [searchQuery, setSearchQuery] = useState('');
  const [sectionHeight, setSectionHeight] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [value, setValue] = useState(50);
  const [activeButton, setActiveButton] = useState('all');
  const [isTransactionEnabled, setIsTransactionEnabled] = useState(false);

  const { options: nlaOptions, selectedOption: selectedNLA, setSelectedOption: setSelectedNLA } = SearchUtils(fetchNlaOptions);
  const { options: rentOptions, selectedOption: selectedRent, setSelectedOption: setSelectedRent } = SearchUtils(fetchRentOptions);
  const { options: dateOptions, selectedOption: selectedDate, setSelectedOption: setSelectedDate } = SearchUtils(fetchDateOptions);
  const { options: usageOptions, selectedOption: selectedUsage, setSelectedOption: setSelectedUsage } = SearchUtils(fetchUsageOptions);
  const { options: statusOptions, selectedOption: selectedStatus, setSelectedOption: setSelectedStatus } = SearchUtils(fetchStatusOptions);
  const { options: regionOptions, selectedOption: selectedRegion, setSelectedOption: setSelectedRegion } = SearchUtils(fetchRegionOptions);
  const { options: zoningOptions, selectedOption: selectedZoning, setSelectedOption: setSelectedZoning } = SearchUtils(fetchZoningOptions);
  const { options: propUsageOptions, selectedOption: selectedPropUsage, setSelectedOption: setSelectedPropUsage } = SearchUtils(fetchPropertyUsageOptions);

  const handleToggleChange = (event) => {
    setIsTransactionEnabled(event.target.checked);
  };

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const marks = [
    { value: 0, label: '0' },
    { value: 100, label: '100' },
  ];

  const toggleCollapse = () => {
    setIsCollapsed2dSearchOpen(!isCollapsed2dSearchOpen);
  };

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    setShowResults(true);
  };

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
  const { data } = useTest(
    {
      sub_type: "",
      region: "",
      micromarket: "",
      zoning: selectedZoning,
      property_usage: "",
      building_nla: null,
      space_status: selectedStatus,
      vacant_space: null,
      asking_rent: null,
      available_date: "",
    }
  )

  const { data: status } = api.spaceStatus()
  const { data: zoning } = api.zoning()
  const { data: propertyUsage } = api.propertyUsage()
  const { data: micromarket } = api.micromarket()

  return (
    <div className="flex bg-neutral-150 h-full relative">
      <div className='flex relative'>
        <div className={`flex flex-col overflow-hidden bg-neutral-100 shadow-md rounded-md transition-all duration-300 ease-in-out z-10 ${isCollapsed2dSearchOpen ? 'w-0.5' : 'w-72'}`}>
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
                  <BiSearch className="absolute right-3 top-2 text-neutral-500 cursor-pointer" size={24} onClick={handleSearch} />
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
                      <button onClick={() => handleButtonClick('all')} className={`flex-grow p-1 w-1/2 rounded-l-md shadow-md text-sm ${activeButton === 'all' ? 'bg-c-teal text-white' : 'bg-neutral-200 text-neutral-500 hover:bg-neutral-300'}`}>All Buildings</button>
                      <button onClick={() => handleButtonClick('available')} className={`flex-grow p-1 w-1/2 rounded-r-md shadow-md text-sm ${activeButton === 'available' ? 'bg-c-teal text-white' : 'bg-neutral-200 text-neutral-500 hover:bg-neutral-300'}`}>Available Buildings</button>
                    </div>
                    <div style={{ height: `${sectionHeight}px` }} className="overflow-y-auto pr-3">
                      <CustomDropdown label="Space Status" options={status ? status.map(item => item?.
                        SPACESTATUS_EN) : []} selectedOption={selectedStatus} onSelect={setSelectedStatus} />
                      <CustomDropdown label="Asset Class" options={rentOptions} selectedOption={selectedStatus} onSelect={setSelectedRent} />
                      <CustomDropdown label="Region/Micromarket" options={micromarket ? micromarket.map(item => item?.
                        LOCATIONTAG_EN) : []} selectedOption={selectedRegion} onSelect={setSelectedRegion} />
                      <CustomDropdown label="Zioning" options={zoning ? zoning.map(item => item?.
                        BUILDINGTYPE_EN) : []} selectedOption={selectedZoning} onSelect={setSelectedZoning} />
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
                        options={propertyUsage ? propertyUsage.map(item => item?.
                          USAGESECTORTYPE_EN) : []}
                        selectedOption={selectedPropUsage}
                        onSelect={setSelectedPropUsage}
                      />
                      <div className='flex items-center space-x-2 py-2 mt-2'>
                        <label className="block text-xs font-semibold leading-6 text-neutral-500">Transaction</label>
                        <FormControlLabel
                          control={<Switch size="small" checked={isTransactionEnabled} onChange={handleToggleChange} />}
                        />
                      </div>

                      <button className='text-sm bg-c-teal rounded-md text-white'>
                        SEARCH
                      </button>
                      {isTransactionEnabled && (
                        <>
                          <div className="flex flex-col items-center w-full mt-2">
                            <label className="mr-auto text-xs font-semibold leading-6 text-neutral-500">
                              Transaction Amount
                            </label>
                            <Box className="w-full pl-6 pr-4">
                              <Slider
                                value={value}
                                onChange={handleSliderChange}
                                aria-label="Default"
                                valueLabelDisplay="auto"
                                min={0}
                                max={100}
                                marks={[{ value: 0, label: '0' }, { value: 100, label: '100' }]} // Adjust marks as needed
                              />
                            </Box>
                          </div>

                          <div className="flex flex-col items-center w-full mt-2">
                            <label className="mr-auto text-xs font-semibold leading-6 text-neutral-500">
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
                                marks={[{ value: 0, label: '0' }, { value: 100, label: '100' }]} // Adjust marks as needed
                              />
                            </Box>
                          </div>
                        </>
                      )}
                    </div>

                  </div>
                )}

                {activeTab === 'account' && (
                  <div className="space-y-4 w-full text-sm">
                    <div className="flex mb-4 w-full">
                      <button onClick={() => handleButtonClick('all')} className={`flex-grow p-1 w-1/2 rounded-l-md shadow-md text-sm ${activeButton === 'all' ? 'bg-c-teal text-white' : 'bg-neutral-200 text-neutral-500 hover:bg-neutral-300'}`}>All Buildings</button>
                      <button onClick={() => handleButtonClick('available')} className={`flex-grow p-1 w-1/2 rounded-r-md shadow-md text-sm ${activeButton === 'available' ? 'bg-c-teal text-white' : 'bg-neutral-200 text-neutral-500 hover:bg-neutral-300'}`}>Available Buildings</button>
                    </div>
                    <div style={{ height: `${sectionHeight}px` }} className="overflow-y-auto pr-3">
                      <CustomDropdown label="Space Status" options={
                        status ? status.map(item => item?.
                          SPACESTATUS_EN) : []} selectedOption={selectedNLA} onSelect={setSelectedNLA} />
                      <CustomDropdown label="Asset Class" options={rentOptions} selectedOption={selectedRent} onSelect={setSelectedRent} />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <SearchResult onBack={handleBackToSearch} />
            )}
          </div>

        </div>


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
