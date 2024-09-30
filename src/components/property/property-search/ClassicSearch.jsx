import React, { useState } from "react";

export default function ClassicSearch() {
    const [formState, setFormState] = useState({
        buildingName: '',
        streetNumber: '',
        streetName: '',
        postalCode: '',
        region: [],
        micromarket: [],
        sizeType: '',
        sizeFrom: '',
        sizeTo: '',
        rentType: '',
        rentFrom: '',
        rentTo: '',
        availableFrom: '',
        availableTo: '',
        lastUpdatedFrom: '',
        lastUpdatedTo: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };

    return (
        <div className="bg-gray-100 p-6 rounded-md max-w-full mx-auto">
            <h2 className="text-lg font-bold mb-4">Basic Search Criteria</h2>

            <div className="grid grid-cols-2 gap-10">
                <div>
                    {/* Building, Street, Postal Code */}
                    <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-4">
                            <label className="block text-sm font-medium mb-1">Building Name</label>
                            <input
                                type="text"
                                name="buildingName"
                                value={formState.buildingName}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Building Name"
                            />
                        </div>

                        <div className="col-span-1">
                            <label className="block text-sm font-medium mb-1">Street #</label>
                            <input
                                type="text"
                                name="streetNumber"
                                value={formState.streetNumber}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Street #"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium mb-1">Street Name</label>
                            <input
                                type="text"
                                name="streetName"
                                value={formState.streetName}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Street Name"
                            />
                        </div>

                        <div className="col-span-1">
                            <label className="block text-sm font-medium mb-1">Postal Code</label>
                            <input
                                type="text"
                                name="postalCode"
                                value={formState.postalCode}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Postal Code"
                            />
                        </div>
                    </div>

                    {/* Region and Micromarket */}
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Region</label>
                            <select
                                multiple
                                name="region"
                                value={formState.region}
                                onChange={(e) => setFormState({ ...formState, region: [...e.target.selectedOptions].map(opt => opt.value) })}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="Region 1">Region 1</option>
                                <option value="Region 2">Region 2</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Micromarket</label>
                            <select
                                multiple
                                name="micromarket"
                                value={formState.micromarket}
                                onChange={(e) => setFormState({ ...formState, micromarket: [...e.target.selectedOptions].map(opt => opt.value) })}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="Micromarket 1">Micromarket 1</option>
                                <option value="Micromarket 2">Micromarket 2</option>
                            </select>
                        </div>
                    </div>

                    {/* Size Section */}
                    <div className="mt-4 grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Size Type</label>
                            <select
                                name="sizeType"
                                value={formState.sizeType}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="">Select Size Type</option>
                                <option value="Type 1">Type 1</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">From</label>
                            <input
                                type="text"
                                name="sizeFrom"
                                value={formState.sizeFrom}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="From"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">To</label>
                            <input
                                type="text"
                                name="sizeTo"
                                value={formState.sizeTo}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="To"
                            />
                        </div>
                    </div>
                    {/* Possession Status */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Possession Status</label>
                            <div className="flex flex-col space-y-2">
                                <label><input type="checkbox" /> Field Name</label>
                                <label><input type="checkbox" /> Field Name</label>
                                <label><input type="checkbox" /> Field Name</label>
                                <label><input type="checkbox" /> Field Name</label>
                                <label><input type="checkbox" /> Field Name</label>
                            </div>
                        </div>
                        {/* Space Status */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Space Status</label>
                            <div className="flex flex-col space-y-2">
                                <label><input type="checkbox" /> Field Name</label>
                                <label><input type="checkbox" /> Field Name</label>
                                <label><input type="checkbox" /> Field Name</label>
                                <label><input type="checkbox" /> Field Name</label>
                                <label><input type="checkbox" /> Field Name</label>
                                <label><input type="checkbox" /> Field Name</label>
                                <label><input type="checkbox" /> Field Name</label>
                            </div>
                        </div>
                    </div>



                </div>

                <div>
                    <div className="mt-4 grid gap-4">

                        {/* Zoning */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Zoning</label>
                            <div className="grid grid-cols-4 gap-2">
                                <label><input type="checkbox" /> Field Name</label>
                                <label><input type="checkbox" /> Field Name</label>
                                <label><input type="checkbox" /> Field Name</label>
                                <label><input type="checkbox" /> Field Name</label>
                                <label><input type="checkbox" /> Field Name</label>
                                <label><input type="checkbox" /> Field Name</label>
                                <label><input type="checkbox" /> Field Name</label>
                                <label><input type="checkbox" /> Field Name</label>
                                <label><input type="checkbox" /> Field Name</label>
                                <label><input type="checkbox" /> Field Name</label>
                                <label><input type="checkbox" /> Field Name</label>
                                <label><input type="checkbox" /> Field Name</label>
                                <label><input type="checkbox" /> Field Name</label>
                                <label><input type="checkbox" /> Field Name</label>
                                <label><input type="checkbox" /> Field Name</label>
                            </div>
                        </div>

                        {/* Property Usage */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Property Usage</label>
                            <div className="grid grid-cols-4 gap-2">
                                <label><input type="checkbox" /> Field Name</label>
                                <label><input type="checkbox" /> Field Name</label>
                                <label><input type="checkbox" /> Field Name</label>
                                <label><input type="checkbox" /> Field Name</label>
                                <label><input type="checkbox" /> Field Name</label>
                                <label><input type="checkbox" /> Field Name</label>
                                <label><input type="checkbox" /> Field Name</label>
                                <label><input type="checkbox" /> Field Name</label>
                                <label><input type="checkbox" /> Field Name</label>
                                <label><input type="checkbox" /> Field Name</label>
                                <label><input type="checkbox" /> Field Name</label>
                                <label><input type="checkbox" /> Field Name</label>
                                <label><input type="checkbox" /> Field Name</label>
                                <label><input type="checkbox" /> Field Name</label>
                                <label><input type="checkbox" /> Field Name</label>
                            </div>
                        </div>
                    </div>
                    {/* Rent and Other Inputs */}
                    <div className="mt-4 grid grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Rent Type</label>
                            <select
                                name="rentType"
                                value={formState.rentType}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="">Select Rent Type</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Rent From</label>
                            <input
                                type="text"
                                name="rentFrom"
                                value={formState.rentFrom}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="From"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Rent To</label>
                            <input
                                type="text"
                                name="rentTo"
                                value={formState.rentTo}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="To"
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <input type="checkbox" name="viewToOffer" />
                            <label>View to Offer</label>
                        </div>
                    </div>

                    {/* Date Fields */}
                    <div className="mt-4 grid grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Available From</label>
                            <input
                                type="date"
                                name="availableFrom"
                                value={formState.availableFrom}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Available To</label>
                            <input
                                type="date"
                                name="availableTo"
                                value={formState.availableTo}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Last Updated From</label>
                            <input
                                type="date"
                                name="lastUpdatedFrom"
                                value={formState.lastUpdatedFrom}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Last Updated To</label>
                            <input
                                type="date"
                                name="lastUpdatedTo"
                                value={formState.lastUpdatedTo}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Possession Status, Space Status, Zoning, and Property Usage */}




            {/* Action Buttons */}
            <div className="mt-4 flex space-x-2 justify-end">
                <button className="bg-c-teal text-white py-2 px-4 text-sm rounded-md hover:bg-c-teal/80">Advanced Criteria</button>
                <button className="bg-c-teal text-white py-2 px-4 text-sm rounded-md hover:bg-c-teal/80">Search</button>
            </div>
        </div>
    );
};
