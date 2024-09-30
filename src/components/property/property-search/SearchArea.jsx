import React, { useRef, useState, useEffect } from 'react';
// import { ImageSlider } from './ImageSlider';
import { LuSettings2 } from "react-icons/lu";
import { IoSearch } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';
import ModalSearch from './modal/ModalSearch';
import ModalFilter from './modal/ModalFilter';
import { generateTransactionId } from '../../lib/api/Authorization';
import './SearchArea.css';


const SearchArea = () => {

  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const [hoveredItem, setHoveredItem] = useState(null);
  const [category, setCategory] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalFilterVisible, setIsModalFilterVisible] = useState(false);
  const [filter, setFilter] = useState('');
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [placeholderText, setPlaceholderText] = useState('Search');
  const [isAnimating, setIsAnimating] = useState(false); // For managing animation state
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const placeholders = [
    "by Address",
    "by Account/Contact",
    "by District",
    "by Micromarket",
    "by MRT"
  ];
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);

  const categories = [
    { key: 'Address', label: 'Search by Address' },
    { key: 'Account/Contacts', label: 'Search by Account/Contacts' },
    { key: 'District', label: 'Search by District' },
    { key: 'Micromarket', label: 'Search by Micromarket' },
    { key: 'MRT', label: 'Search by MRT' },

  ];
  const results = ['test search'];

  const [formAddress, setFormAddress] = useState({
    buildingName: '',
    streetNumber: '',
    streetName: '',
    postalCode: ''
  });

  // useEffect(() => {
  //   const interval = setInterval(changePlaceholder, 3000);
  //   return () => clearInterval(interval); // Cleanup interval on unmount
  // }, [index]);

  // const changePlaceholder = () => {
  //   setIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
  // };

  useEffect(() => {
    const interval = setInterval(() => {
      triggerPlaceholderChange();
    }, 3000);

    return () => clearInterval(interval);
  }, [index]);

  // Trigger placeholder change with animation
  const triggerPlaceholderChange = () => {
    setIsAnimating(true); // Start animation
    setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
      setIsAnimating(false); // End animation after the transition
    }, 500); // Match the duration of the CSS animation
  };

  const handleFocus = () => {
    setIsFocused(true);
    setPlaceholderText('');
    setShowPlaceholder(false);
    setIsExpanded(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setPlaceholderText(inputValue ? '' : 'Search');
    setShowPlaceholder(query ? false : true);
  };

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {

    navigate('result', { state: { formAddress } });
    setIsExpanded(false);
  };

  const handleSearchClick = () => {
    handleSearch();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCategoryClick = (category) => {
    setCategory(category.key);
    setIsModalVisible(true);
    setIsExpanded(false);
  };

  const handleFiltersClick = (filter) => {
    setFilter(filter);
    setIsModalFilterVisible(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  // const showPlaceholder = !query;
  const currentPlaceholder = placeholders[index];
  const previousPlaceholder = placeholders[(index - 1 + placeholders.length) % placeholders.length];

  const [activeButton, setActiveButton] = useState('All'); // Default active button
  const [sliderStyle, setSliderStyle] = useState({ width: 0, left: 0 }); // To control the slider's width and position
  const buttonRefs = {
    All: useRef(null),
    Lease: useRef(null),
    Sale: useRef(null),
  };

  useEffect(() => {
    updateSliderPosition(); // Update the slider position on initial load
  }, [activeButton]); // Update whenever the active button changes

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const updateSliderPosition = () => {
    const activeButtonRef = buttonRefs[activeButton.replace(' ', '')].current;
    if (activeButtonRef) {
      const { width, left } = activeButtonRef.getBoundingClientRect();
      setSliderStyle({ width, left: left - activeButtonRef.parentNode.getBoundingClientRect().left });
    }
  };



  const handleFormChange = (updatedForm) => {
    setFormAddress(updatedForm);
  };

  return (
    <div className='h-screen p-4'>
      {/* carousel */}
      {/* <div className="relative flex justify-center items-center h-80 w-4/5 mx-auto"> */}
      <img
        className="relative flex justify-center items-center h-80 w-full max-w-[1200px] mx-auto rounded-xl"
        src="/src/assets/home.avif"
        alt="Scenery"
      />
      {/* </div> */}

      {/* search area */}
      <div className="relative flex flex-col left-1/2 transform -translate-x-1/2 -mt-20 pt-2 z-50 flex justify-center items-center px-24">

        <div className="bg-black bg-opacity-60 p-5 backdrop-blur-xs rounded-xl shadow-lg">

          <div className="flex flex-col ">
            <div className="w-full flex justify-between items-center">
              <div className='relative flex'>
                <div ref={containerRef}
                  className="relative w-80 flex items-center bg-white rounded-lg shadow-lg">
                  <div
                    className={`absolute ml-16 inset-0 flex items-center pointer-events-none transition-all duration-500 ease-in-out ${isAnimating ? 'slide-out' : 'slide-in'
                      }`}
                  >
                    {showPlaceholder && (
                      <span className="text-gray-400">
                        {currentPlaceholder}
                      </span>
                    )}
                  </div>

                  <input
                    type="text"
                    className="form-input w-full py-2 px-2 rounded-l-lg focus:outline-none text-gray-600"
                    placeholder={placeholderText}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={query}
                    onChange={handleSearchChange}
                    ref={inputRef}
                  />

                  {isExpanded && (
                    <div className="absolute top-12 w-full h-auto bg-white border rounded-md shadow-lg z-50 flex">
                      <div className="relative w-full">
                        {categories.length > 0 && (
                          <div className="mb-2 text-c-dark-grayish">
                            {categories.map((category, index) => (
                              <h4
                                key={index}
                                className="text-sm p-3 hover:bg-gray-200 cursor-pointer"
                                onClick={() => handleCategoryClick(category)}
                                onMouseEnter={() => setHoveredItem(category)}
                                onMouseLeave={() => setHoveredItem(null)}
                              >
                                {category.label}
                              </h4>
                            ))}
                          </div>
                        )}
                        {results.length > 0 && (
                          <div>
                            <h4 className="text-xs px-3 py-1 text-gray-500 bg-gray-100 mb-2">Recent Searches</h4>
                            <ul>
                              {results.map((result, index) => (
                                <li
                                  key={index}
                                  className="p-3 text-sm text-c-teal hover:bg-gray-200 cursor-pointer"
                                  onMouseEnter={() => setHoveredItem(result)}
                                  onMouseLeave={() => setHoveredItem(null)}
                                >
                                  {result}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <span onClick={handleSearchClick}
                  className="bg-c-teal hover:bg-c-teal/90 cursor-pointer text-white text-md font-semibold py-2 px-3 rounded-r-lg">
                  <IoSearch className='text-lg' />
                </span>
              </div>

              <div className='flex gap-2 ml-2'>
                <span
                  onClick={() => handleFiltersClick('filter')}
                  className='flex items-center text-gray-600 gap-2 py-2 px-3 bg-white text-xs font-semibold rounded-lg shadow-lg'>
                  <LuSettings2 className='text-md' />
                  Filter
                </span>
                <span
                  onClick={() => handleFiltersClick('propertyType')}
                  className='flex items-center text-gray-600 gap-2 py-2 px-3 bg-white text-xs font-semibold rounded-lg shadow-lg'>
                  <span className='whitespace-nowrap overflow-hidden text-ellipsis'>Property Type</span>
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </span>
                <span
                  onClick={() => handleFiltersClick('price')}
                  className='flex items-center text-gray-600 gap-2 py-2 px-3 bg-white text-xs font-semibold rounded-lg shadow-lg'>
                  <span>Rent/Transacted</span>
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </span>
                <span
                  onClick={() => handleFiltersClick('size')}
                  className='flex items-center text-gray-600 gap-2 py-2 px-3 bg-white text-xs font-semibold rounded-lg shadow-lg'>
                  <span>Size</span>
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </span>
                <span
                  onClick={() => handleFiltersClick('availibility')}
                  className='flex items-center text-gray-600 gap-2 py-2 px-3 bg-white text-sm font-semibold rounded-lg shadow-lg'>
                  <span className=''>Availability</span>
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div className='flex justify-between items-center'>
            <div className="relative inline-flex gap-2 rounded-full mt-6">
              {/* Active Background Slider */}
              {/* <div
                className="absolute top-0 left-0 h-full bg-c-teal rounded-full transition-all duration-300 ease-in-out"
                style={{
                  width: `${sliderStyle.width}px`,
                  left: `${sliderStyle.left}px`,
                }}
              ></div> */}

              {/* Button Items */}
              <span
                ref={buttonRefs.All}
                onClick={() => handleButtonClick('All')}
                className={`relative z-10 py-1 px-4 rounded-full cursor-pointer text-sm font-semibold transition-colors duration-100 ease-in-out
                ${activeButton === 'All' ? 'bg-c-teal text-white' : ' text-gray-300 bg-black/10 hover:bg-black/20'}`}
              >
                All
              </span>
              <span
                ref={buttonRefs.Lease}
                onClick={() => handleButtonClick('Lease')}
                className={`relative z-10 py-1 px-4 rounded-full cursor-pointer text-sm font-semibold transition-colors duration-100 ease-in-out
                ${activeButton === 'Lease' ? 'bg-c-teal text-white' : 'text-gray-300 bg-black/10 hover:bg-black/20'}`}
              >
                For Lease
              </span>
              <span
                ref={buttonRefs.Sale}
                onClick={() => handleButtonClick('Sale')}
                className={`relative z-10 py-1 px-4 rounded-full cursor-pointer text-sm font-semibold transition-colors duration-100 ease-in-out
                ${activeButton === 'Sale' ? 'bg-c-teal text-white' : ' text-gray-300 bg-black/10 hover:bg-black/20'}`}
              >
                For Sale
              </span>
            </div>
            <div className="pt-6 px-1 text-right flex items-center">
              <span className='text-gray-300 text-xs hover:texr.gray-300/80 cursor-pointer'>Classic View</span>
            </div>
          </div>

        </div>

      </div>

      <ModalSearch isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} category={category} form={formAddress} onFormChange={handleFormChange} setQuery={setQuery} onClick={handleSearchClick} />
      <ModalFilter isVisible={isModalFilterVisible} onClose={() => setIsModalFilterVisible(false)} filter={filter} />

    </div>
  );
};

export default SearchArea;
