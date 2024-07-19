import React, { useState } from 'react';
import { MdSearch } from 'react-icons/md';

export default function PropertySearch() {
    // State variables to manage the visibility of each section
    const [basicCriteriaVisible, setBasicCriteriaVisible] = useState(true);
    const [mapVisible, setMapVisible] = useState(true);
    const [advanceCriteriaVisible, setAdvanceCriteriaVisible] = useState(true);
    const [propertySearchResultVisible, setPropertySearchResultVisible] = useState(true);

    // Function to toggle the visibility of each section
    const toggleVisibility = (section) => {
        switch (section) {
            case 'basicCriteria':
                setBasicCriteriaVisible(!basicCriteriaVisible);
                break;
            case 'map':
                setMapVisible(!mapVisible);
                break;
            case 'advanceCriteria':
                setAdvanceCriteriaVisible(!advanceCriteriaVisible);
                break;
            case 'propertySearchResult':
                setPropertySearchResultVisible(!propertySearchResultVisible);
                break;
            default:
                break;
        }
    };

    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };

    return (
        <div className="flex-1 relative bg-white px-4 py-4 text-c-dark-grayish">
            <div className='text-md text-cdark-grayish font-bold  border-b border-neutral-200'>PROPERTY SEARCH</div>

            <div className="flex justify-between items-center mb-10 ">
                <div className='flex  items-center py-2'>
                    <button className='bg-c-teal text-xs text-white py-1 px-3 rounded-sm hover:bg-c-dark-grayish flex items-center mr-2'>
                        <MdSearch className="mr-1" fontSize={15} />
                        Search
                    </button>

                    <select
                        className="text-xs bg-neutral-100 rounded rounded-sm py-1 bg-neutral-100 text-c-teal"
                        onChange={handleSelectChange}
                        value={selectedOption}
                    >
                        <option value="" disabled hidden>
                            Search Result
                        </option>
                        <option style={{ backgroundColor: 'white' }}></option>
                        {/* Other options */}
                    </select>

                </div>
                <div className='flex  items-center py-2'>
                    <span className='text-neutral-600 text-xs mx-3 items-center sm:block whitespace-nowrap'>Search Criteria </span>
                    <button className='bg-c-teal text-xs text-white py-1 px-3 rounded-sm hover:bg-c-dark-grayish flex items-center mr-2'>
                        <MdSearch className="mr-1" fontSize={15} />
                        Reset
                    </button>
                    <button className='bg-c-teal text-xs text-white py-1 px-3 rounded-sm hover:bg-c-dark-grayish flex items-center mr-2'>
                        <MdSearch className="mr-1" fontSize={15} />
                        Save
                    </button>
                    <button className='bg-neutral-300 text-xs text-white py-1 px-3 rounded-sm hover:bg-c-dark-grayish flex items-center mr-2'>
                        <MdSearch className="mr-1" fontSize={15} />
                        Load
                    </button>
                </div>
            </div>

            {/* Basic Criteria Section */}
            <div className="mb-4">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleVisibility('basicCriteria')}>
                    <h2 className="text-sm font-semibold">
                        <span>{basicCriteriaVisible ? '▼' : '►'}</span> BASIC CRITERIA
                    </h2>
                    <span>{basicCriteriaVisible ? '-' : '+'}</span>
                </div>
                {basicCriteriaVisible && (
                    <div className="bg-gray-100 p-2">
                        {/* Content of Basic Criteria Section */}
                        Basic Criteria Content
                    </div>
                )}
            </div>

            {/* Map Section */}
            <div className="mb-4">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleVisibility('map')}>
                    <h2 className="text-sm font-semibold">
                        <span>{mapVisible ? '▼' : '►'}</span> MAP
                    </h2>
                    <span>{mapVisible ? '-' : '+'}</span>
                </div>
                {mapVisible && (
                    <div className="bg-gray-100 p-2">
                        {/* Content of Map Section */}
                        Map Content
                    </div>
                )}
            </div>

            {/* Advance Criteria Section */}
            <div className="mb-4">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleVisibility('advanceCriteria')}>
                    <h2 className="text-sm font-semibold">
                        <span>{advanceCriteriaVisible ? '▼' : '►'}</span> ADVANCE CRITERIA
                    </h2>
                    <span>{advanceCriteriaVisible ? '-' : '+'}</span>
                </div>
                {advanceCriteriaVisible && (
                    <div className="bg-gray-100 p-2">
                        {/* Content of Advance Criteria Section */}
                        Advance Criteria Content
                    </div>
                )}
            </div>

            {/* Property Search Result Section */}
            <div className="mb-4">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleVisibility('propertySearchResult')}>
                    <h2 className="text-sm font-semibold">
                        <span>{propertySearchResultVisible ? '▼' : '►'}</span> PROPERTY SEARCH RESULT
                    </h2>
                    <span>{propertySearchResultVisible ? '-' : '+'}</span>
                </div>
                {propertySearchResultVisible && (
                    <div className="bg-gray-100 p-2">
                        {/* Content of Property Search Result Section */}
                        Property Search Result Content
                    </div>
                )}
            </div>
        </div>
    );
}
