import React, { useRef, useState, useEffect } from 'react';
import { ImageSlider } from './ImageSlider';
import { LuSettings2 } from "react-icons/lu";
import { IoSearch } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';
import ModalSearch from './modal/ModalSearch';
import ModalFilter from './modal/ModalFilter';
import ResultSection from './ResultSection';
import { generateTransactionId } from '../../lib/api/Authorization';
import { CONFIG } from '../../../config';
import './SearchArea.css';


const PropertyResult = () => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [query, setQuery] = useState('');
    const [resultData, setResultData] = useState('');
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
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const formData = location.state?.formAddress;
    const [isAnimating, setIsAnimating] = useState(false); // For managing animation state
    const [showPlaceholder, setShowPlaceholder] = useState(true);
    const placeholders = [
        "by Address",
        "by Account/Contact",
        "by District",
        "by Region/Micromarket",
        "by MRT"
    ];
    const [hasSearched, setHasSearched] = useState(false);
    const inputRef = useRef(null);

    const categories = [
        { key: 'Address', label: 'Search by Address' },
        { key: 'Account/Contacts', label: 'Search by Account/Contacts' },
        { key: 'District', label: 'Search by District' },
        { key: 'Region/Micromarket', label: 'Search by Region/Micromarket' },
        { key: 'MRT', label: 'Search by MRT' },

    ];
    const results = ['test search'];

    const [formAddress, setFormAddress] = useState({
        buildingName: '',
        streetNumber: '',
        streetName: '',
        postalCode: ''
    });

    useEffect(() => {
        const interval = setInterval(changePlaceholder, 3000);
        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [index]);

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
      
    const changePlaceholder = () => {
        setIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    };

    const handleFocus = () => {
        setIsFocused(true);
        setPlaceholderText('');
        setIsExpanded(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setPlaceholderText(inputValue ? '' : 'Search');
    };

    const handleSearchChange = (e) => {
        setQuery(e.target.value);
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

    // const showPlaceholder = !isFocused && !inputValue;
    const currentPlaceholder = placeholders[index];
    const previousPlaceholder = placeholders[(index - 1 + placeholders.length) % placeholders.length];

    const [activeButton, setActiveButton] = useState('Buy'); // Default active button
    const [sliderStyle, setSliderStyle] = useState({ width: 0, left: 0 }); // To control the slider's width and position
    const buttonRefs = {
        Buy: useRef(null),
        Rent: useRef(null),
        FindAgent: useRef(null),
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

    const handleSearch = async (data) => {
        console.log('Search initiated with formData:', data); // Debugging log
        const transactionId = generateTransactionId();

        try {
            const response = await fetch(`${CONFIG.PROPERTY_SERVICE}/searchbyaddress`, {
                method: 'POST',
                headers: {
                    'transactionId': transactionId,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Search results:', result); // Debugging log
            return result;
        } catch (error) {
            console.error('Error during search:', error);
            throw error;
        }
    };

    useEffect(() => {
        const executeSearch = async () => {
            if (formData && !hasSearched) {
                console.log('Executing search...'); // Debugging log
                setIsLoading(true);
                setHasSearched(true);

                try {
                    const result = await handleSearch(formData);

                    if (result.statusCode === "00") {
                        setResultData(result.resultSet);
                    }

                } catch (error) {
                    console.error('Error during submission:', error);
                    alert(`Failed to search. Please try again.`);
                } finally {
                    setIsLoading(false);
                }
            } else {
                console.log('Search skipped: either formData is null or search has already been performed.');
            }
        };

        executeSearch();
    }, [formData, hasSearched]);

    const handleFormChange = (updatedForm) => {
        setFormAddress(updatedForm);
    };

    return (
        <div className='h-screen'>

            <div className="flex flex-col relative left-1/2 transform -translate-x-1/2 py-2 z-50 flex justify-center items-center shadow-lg shadow-b">

                <div className="bg-gray-300 bg-opacity-80 p-2 backdrop-blur-xs rounded-xl shadow-lg">

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
                                        className="form-input w-full py-2 px-2 rounded-l-lg focus:outline-none"
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

                            <div className='flex gap-2 pl-2'>
                                <span
                                    onClick={() => handleFiltersClick('filter')}
                                    className='flex items-center text-gray-600 gap-2 py-2 px-3 bg-white text-sm font-semibold rounded-lg shadow-lg'>
                                    <LuSettings2 className='text-md' />
                                    Filter
                                </span>
                                <span
                                    onClick={() => handleFiltersClick('propertyType')}
                                    className='flex items-center text-gray-600 gap-2 py-2 px-3 bg-white text-sm font-semibold rounded-lg shadow-lg'>
                                    <span className='whitespace-nowrap overflow-hidden text-ellipsis'>Property Type</span>
                                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </span>
                                <span
                                    onClick={() => handleFiltersClick('price')}
                                    className='flex items-center text-gray-600 gap-2 py-2 px-3 bg-white text-sm font-semibold rounded-lg shadow-lg'>
                                    <span>Price</span>
                                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </span>
                                <span
                                    onClick={() => handleFiltersClick('size')}
                                    className='flex items-center text-gray-600 gap-2 py-2 px-3 bg-white text-sm font-semibold rounded-lg shadow-lg'>
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
                </div>
            </div>

            <ModalSearch isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} category={category} form={formAddress} onFormChange={handleFormChange} setQuery={setQuery} onClick={handleSearchClick} />
            <ModalFilter isVisible={isModalFilterVisible} onClose={() => setIsModalFilterVisible(false)} filter={filter} />

            <div className='flex justify-center'>
                {isLoading && (
                    <div className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center z-50">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-c-teal"></div>
                    </div>
                )}
                <ResultSection resultData={resultData} />
            </div>
        </div>
    );
};

export default PropertyResult;
