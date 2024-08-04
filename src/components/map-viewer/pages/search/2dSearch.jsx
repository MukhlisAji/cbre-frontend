import React, { useState, useEffect } from 'react';
import { BiSearch, BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import CustomDropdown from '../../../shared/CustomDropdown';
import { useAppContext } from '../../../../AppContext';
import { useNavigate } from 'react-router-dom';
import SearchResult from './SearchResult';

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
