import React, { useState } from 'react';

const FilterContent = () => {
    const [activeTab, setActiveTab] = useState('Buy');
    const [location, setLocation] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [bedroom, setBedroom] = useState(false);

    const handleApplyFilter = () => {
        // Handle filter logic here
        console.log({
            location,
            propertyType,
            minPrice,
            maxPrice,
            bedroom,
        });
        onClose();
    };

    const handleClearAll = () => {
        setLocation('');
        setPropertyType('');
        setMinPrice('');
        setMaxPrice('');
        setBedroom(false);
    };

    return (
        <>
            <div className="flex justify-center space-x-4 border-b">
                <span
                    onClick={() => setActiveTab('Buy')}
                    className={`cursor-pointer py-2 px-4 ${activeTab === 'Buy' ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-600'}`}
                >
                    Buy
                </span>
                <span
                    onClick={() => setActiveTab('Rent')}
                    className={`cursor-pointer py-2 px-4 ${activeTab === 'Rent' ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-600'}`}
                >
                    Rent
                </span>
            </div>

            <div className="p-4 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                        type="text"
                        placeholder="Search district, MRT, project, street"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="mt-1 block w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Property Type</label>
                    <div className="mt-2 flex space-x-2">
                        {['All', 'Condo', 'Landed', 'HDB'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setPropertyType(type)}
                                className={`py-1 px-3 rounded-md border ${propertyType === type ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <div className="mt-2 flex space-x-4">
                        <input
                            type="number"
                            placeholder="Min"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className="block w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                        />
                        <input
                            type="number"
                            placeholder="Max"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="block w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                </div>

                <div>
                    <label className="flex items-center space-x-2 text-sm">
                        <input
                            type="checkbox"
                            checked={bedroom}
                            onChange={() => setBedroom(!bedroom)}
                            className="focus:ring focus:ring-blue-300"
                        />
                        <span>Entire Unit</span>
                    </label>
                </div>
                <button
                    onClick={handleClearAll}
                    className="text-red-500 text-sm underline"
                >
                    Clear All
                </button>
            </div>
        </>
    );
};

export default FilterContent;
