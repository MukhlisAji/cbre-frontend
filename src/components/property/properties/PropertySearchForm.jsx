import React, { useEffect, useState } from 'react';

const PropertySearchForm = () => {
    const [sectionVisibility, setSectionVisibility] = useState({
        basicSearchVisible: true,
        advancedSearchVisible: false,
    });

    const toggleVisibility = (section) => {
        setSectionVisibility((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const [sectionHeight, setSectionHeight] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const screenHeight = window.innerHeight;
            const newHeight = screenHeight - 150;
            setSectionHeight(newHeight);
        };

        handleResize();

        // Add event listener to handle window resize
        window.addEventListener('resize', handleResize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <div style={{ height: `${sectionHeight}px` }} className="mx-auto overflow-y-auto">
            <header className="sticky top-0 shadow-sm py-3 bg-neutral-100 z-10 flex items-center justify-center rounded-t-lg border border-neutral-200">
                <h2 className="text-xl mx-auto font-semibold text-neutral-600 text-center">New Property: Singapore Property</h2>
            </header>
            <div className="border border-neutral-200 pt-8 rounded-sm bg-white shadow-lg p-2">

                {/* Basic Search */}
                <div className="space-y-4">
                    {/* <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Basic Search</h3>
                        <button
                            onClick={() => toggleVisibility('basicSearchVisible')}
                            className="text-blue-500"
                        >
                            {sectionVisibility.basicSearchVisible ? 'Hide Basic Search' : 'Show Basic Search'}
                        </button>
                    </div> */}

                    <div
                        className="flex justify-between items-center cursor-pointer bg-neutral-100 px-8 py-1 rounded-sm"
                        onClick={() => toggleVisibility('basicSearchVisible')}
                    >
                        <h2 className="text-lg font-semibold text-neutral-600">
                            <span className='text-sm'>{sectionVisibility.basicSearchVisible ? '▼' : '►'}</span> Basic Search
                        </h2>
                        <span>{sectionVisibility.basicSearchVisible ? '-' : '+'}</span>
                    </div>

                    {sectionVisibility.basicSearchVisible && (
                        <div className="p-8">
                            <div className="grid grid-cols-2 gap-8"> {/* Creates a 2-column grid with gap */}
                                {/* First Column */}
                                <div className="space-y-4">
                                    {/* <div className="flex items-center">
                                        <label className="w-48 font-medium">Building Name</label>
                                        <input
                                            type="text"
                                            className="flex-grow border border-gray-300 rounded px-2 py-1"
                                            placeholder="Building Name, Address, Postal Code"
                                        />
                                    </div> */}

                                    {/* Property Type */}
                                    <div className="flex items-center">
                                        <label className="w-48 font-medium">Property Type</label>
                                        <div className="space-x-4">
                                            <label className="inline-flex items-center">
                                                <input type="checkbox" className="mr-2" /> Industrial
                                            </label>
                                            <label className="inline-flex items-center">
                                                <input type="checkbox" className="mr-2" /> Office
                                            </label>
                                            <label className="inline-flex items-center">
                                                <input type="checkbox" className="mr-2" /> Retail
                                            </label>
                                        </div>
                                    </div>

                                    {/* Property Usage */}
                                    <div className="flex items-center">
                                        <label className="w-48 font-medium">Property Usage</label>
                                        <div className="space-y-2">
                                            <label className="block">
                                                <input type="checkbox" className="mr-2" /> Apartment Building
                                            </label>
                                            <label className="block">
                                                <input type="checkbox" className="mr-2" /> Business Office
                                            </label>
                                            <label className="block">
                                                <input type="checkbox" className="mr-2" /> Business Park
                                            </label>
                                            <label className="block">
                                                <input type="checkbox" className="mr-2" /> Commercial and Retail
                                            </label>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <label className="w-48 font-medium">Size (Vacant Area)</label>
                                        <div className="flex space-x-4">
                                            <input
                                                type="text"
                                                className="border border-gray-300 rounded px-2 py-1 w-24"
                                                placeholder="From"
                                            />
                                            <input
                                                type="text"
                                                className="border border-gray-300 rounded px-2 py-1 w-24"
                                                placeholder="To"
                                            />
                                            <select className="border border-gray-300 rounded px-2 py-1">
                                                <option value="sqft">SqFt</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Second Column */}
                                <div className="space-y-4">
                                    {/* Region Filters */}
                                    <div className="space-y-2">
                                        <div className="flex items-center">
                                            <label className="w-48 font-medium">Region</label>
                                            <select className="flex-grow border border-gray-300 rounded px-2 py-1">
                                                <option value="">Select Region</option>
                                            </select>
                                        </div>

                                        <div className="flex items-center">
                                            <label className="w-48 font-medium">Region (Office)</label>
                                            <select className="flex-grow border border-gray-300 rounded px-2 py-1">
                                                <option value="">Select Region</option>
                                            </select>
                                        </div>

                                        <div className="flex items-center">
                                            <label className="w-48 font-medium">Micro Market (Main)</label>
                                            <select className="flex-grow border border-gray-300 rounded px-2 py-1">
                                                <option value="">Select Micro Market</option>
                                            </select>
                                        </div>

                                        <div className="flex items-center">
                                            <label className="w-48 font-medium">Zoning</label>
                                            <select className="flex-grow border border-gray-300 rounded px-2 py-1">
                                                <option value="">Select Zoning</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                {/* Advanced Search */}
                <div className="mt-6 space-y-4">
                    <div
                        className="flex justify-between items-center cursor-pointer bg-neutral-100 px-8 py-1 rounded-sm"
                        onClick={() => toggleVisibility('advancedSearchVisible')}
                    >
                        <h2 className="text-lg font-semibold text-neutral-600">
                            <span className='text-sm'>{sectionVisibility.advancedSearchVisible ? '▼' : '►'}</span> Advanced Search
                        </h2>
                        <span>{sectionVisibility.advancedSearchVisible ? '-' : '+'}</span>
                    </div>

                    {sectionVisibility.advancedSearchVisible && (
                        <div className="p-8">
                            <div className="grid grid-cols-2 gap-8"> {/* Creates a 2-column grid with gap */}
                                {/* First Column */}
                                <div className="space-y-4">
                                    {/* TOP (From-To) */}
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center">
                                            <label className="w-48 font-medium">TOP</label>
                                            <div className="flex space-x-4">
                                                <input
                                                    type="text"
                                                    className="border border-gray-300 rounded px-2 py-1"
                                                    placeholder="From (mm/yyyy)"
                                                />
                                                <input
                                                    type="text"
                                                    className="border border-gray-300 rounded px-2 py-1"
                                                    placeholder="To (mm/yyyy)"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Grade */}
                                    <div className="flex items-center">
                                        <label className="w-48 font-medium">Grade</label>
                                        <select className="border border-gray-300 rounded px-2 py-1">
                                            <option value="">Select Grade</option>
                                        </select>
                                    </div>

                                    {/* Property Status */}
                                    <div className="flex items-center">
                                        <label className="w-48 font-medium">Property Status</label>
                                        <select className="border border-gray-300 rounded px-2 py-1">
                                            <option value="">Select Status</option>
                                        </select>
                                    </div>

                                    {/* Ownership Structure/Title */}
                                    <div className="flex items-center">
                                        <label className="w-48 font-medium">Ownership Structure/Title</label>
                                        <div className="space-y-2">
                                            <label className="block">
                                                <input type="checkbox" className="mr-2" /> Freehold
                                            </label>
                                            <label className="block">
                                                <input type="checkbox" className="mr-2" /> Leasehold
                                            </label>
                                            <label className="block">
                                                <input type="checkbox" className="mr-2" /> Single
                                            </label>
                                            <label className="block">
                                                <input type="checkbox" className="mr-2" /> Strata
                                            </label>
                                        </div>
                                    </div>

                                    {/* MRT Fields */}
                                    <div className="flex items-center">
                                        <label className="w-48 font-medium">MRT1</label>
                                        <div className='space-x-4'>
                                            <input
                                                type="text"
                                                className="flex-grow border border-gray-300 rounded px-2 py- h-8"
                                            />
                                            <select className="w-20 h-8 border border-gray-300 rounded px-2">
                                                <option>Walk</option>
                                            </select>
                                            <input
                                                type="number"
                                                className="w-20 h-8 border border-gray-300 rounded px-2"
                                                placeholder="Mins"
                                            />
                                        </div>

                                    </div>
                                    <div className="flex items-center">
                                        <label className="w-48 font-medium">MRT2</label>
                                        <div className='space-x-4'>
                                            <input
                                                type="text"
                                                className="flex-grow border border-gray-300 rounded px-2 py- h-8"
                                            />
                                            <select className="w-20 h-8 border border-gray-300 rounded px-2">
                                                <option>Walk</option>
                                            </select>
                                            <input
                                                type="number"
                                                className="w-20 h-8 border border-gray-300 rounded px-2"
                                                placeholder="Mins"
                                            />
                                        </div>

                                    </div>
                                    <div className="flex items-center">
                                        <label className="w-48 font-medium">MRT3</label>
                                        <div className='space-x-4'>
                                            <input
                                                type="text"
                                                className="flex-grow border border-gray-300 rounded px-2 py- h-8"
                                            />
                                            <select className="w-20 h-8 border border-gray-300 rounded px-2">
                                                <option>Walk</option>
                                            </select>
                                            <input
                                                type="number"
                                                className="w-20 h-8 border border-gray-300 rounded px-2"
                                                placeholder="Mins"
                                            />
                                        </div>

                                    </div>


                                </div>

                                {/* Second Column */}
                                <div className="space-y-4">
                                    {/* Floor To Ceiling Height */}
                                    <div className="flex items-center space-x-4">
                                        <label className="w-48 font-medium">Floor To Ceiling Height</label>
                                        <div className="flex space-x-4">
                                            <input
                                                type="text"
                                                className="border border-gray-300 rounded px-2 py-1"
                                                placeholder="From"
                                            />
                                            <input
                                                type="text"
                                                className="border border-gray-300 rounded px-2 py-1"
                                                placeholder="To"
                                            />
                                        </div>
                                    </div>

                                    {/* Floor Loading */}
                                    <div className="flex items-center space-x-4">
                                        <label className="w-48 font-medium">Floor Loading</label>
                                        <div className="flex space-x-4">
                                            <input
                                                type="text"
                                                className="border border-gray-300 rounded px-2 py-1 w-24"
                                                placeholder="From"
                                            />
                                            <input
                                                type="text"
                                                className="border border-gray-300 rounded px-2 py-1 w-24"
                                                placeholder="To"
                                            />
                                            <span>KN/Sqm</span>
                                        </div>
                                    </div>

                                    {/* Floor System */}
                                    <div className="flex items-center space-x-4">
                                        <label className="w-48 font-medium">Floor System</label>
                                        <select className="border border-gray-300 rounded px-2 py-1">
                                            <option>-Select-</option>
                                        </select>
                                    </div>

                                    {/* Allocation Ratio */}
                                    <div className="flex items-center space-x-4">
                                        <label className="w-48 font-medium">Allocation Ratio</label>
                                        <div className="flex items-center space-x-2">
                                            <span>1:</span>
                                            <input type="text" className="border border-gray-300 rounded px-2 py-1 w-24" />
                                            <span>Sq Ft leased</span>
                                        </div>
                                    </div>

                                    {/* Parking Fee (Seasonal) */}
                                    <div className="flex items-center space-x-4">
                                        <label className="w-48 font-medium">Parking Fee (Subject to GST)</label>
                                        <div className='flex flex-col space-y-4'>
                                            <div className=''>
                                                <label className="w-48 font-medium">Seasonal</label>
                                                <div className="flex space-x-2">
                                                    <input type="text" className="border border-gray-300 rounded px-2 py-1 w-24" />
                                                    <span>S$/lot/mth</span>
                                                </div>
                                            </div>
                                            <div className=''>
                                                <label className="w-48 font-medium">Non-Reserved</label>
                                                <div className="flex space-x-2">
                                                    <input type="text" className="border border-gray-300 rounded px-2 py-1 w-24" />
                                                    <span>S$/lot/mth</span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    {/* Car Spaces */}
                                    <div className="flex items-center space-x-4">
                                        <label className="w-48 font-medium">Car Spaces</label>
                                        <div className="flex space-x-2">
                                            <input type="text" className="border border-gray-300 rounded px-2 py-1 w-24" />
                                            <span>and over</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
            <footer className="sticky bottom-0 bg-neutral-100 py-3 flex items-center gap-2 justify-center border border-neutral-200 shadow-md z-10 rounded-b-lg">
                <button
                    // onClick={handleSaveNew}
                    type="submit"
                    className="px-8 py-3 rounded-lg bg-white text-blue-600 border border-neutral-500 text-xs hover:text-neutral-700 hover:bg-neutral-100"
                >
                    Cancel
                </button>
                <button
                    // onClick={handleSave}
                    className="px-8 py-3 text-white rounded-lg bg-c-teal text-xs text-white hover:text-white hover:bg-c-weldon-blue"
                >
                    Search
                </button>
            </footer>
        </div>
    );
};

export default PropertySearchForm;
