import React, { useEffect, useState } from 'react';

export default function PropertyDatabase() {
    const [buildingName, setBuildingName] = useState('');
    // const [country, setCountry] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [streetNumber, setStreetNumber] = useState('');
    const [streetName, setStreetName] = useState('');
    const [propertyType, setPropertyType] = useState([]);
    const [propertySubType, setPropertySubType] = useState([]);

    const handlePropertyTypeChange = (e) => {
        const value = e.target.value;
        setPropertyType((prevType) => {
            if (prevType.includes(value)) {
                return prevType.filter((type) => type !== value);
            } else {
                return [...prevType, value];
            }
        });
    };

    const handlePropertySubTypeChange = (e) => {
        const value = e.target.value;
        setPropertySubType((prevSubType) => {
            if (prevSubType.includes(value)) {
                return prevSubType.filter((subType) => subType !== value);
            } else {
                return [...prevSubType, value];
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
    };

    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };


    const [sectionHeight, setSectionHeight] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const screenHeight = window.innerHeight;
            const newHeight = screenHeight - 200; // Subtract 200px for any other fixed content
            setSectionHeight(newHeight);
        };

        // Set initial height
        handleResize();

        // Add event listener to handle window resize
        window.addEventListener('resize', handleResize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='flex-1 relative bg-white px-4 py-4 text-c-dark-grayish'>
            <span className="px-3 py-3 text-lg font-semibold mb-4">NEW PROPERTY DETAILS</span>
            <p className="px-3 py-3 mb-4 text-xs text-red-700 border-b border-neutral-200">Mandatory Fields: Building Name, Postal Code, Street Number, Street Name, Region, Micro Market, Zoning, Property Usage, Ownership Structure/Title</p>

            <div style={{ height: `${sectionHeight}px` }} className='flex-1 overflow-y-auto flex flex-col px-3 py-3'>
                <form onSubmit={handleSubmit} className="relative">
                    <span className="text-md inline-block mb-5 font-semibold">Basic Information</span>
                    <div className="mb-4 flex items-center">
                        <label className="text-sm w-[200px] whitespace-nowrap font-semibold">Building Name<span className="text-red-500">*</span>:</label>
                        <input
                            type="text"
                            value={buildingName}
                            onChange={(e) => setBuildingName(e.target.value)}
                            className="border-b border-gray-400 bg-white px-3 py-2 text-sm focus:outline-none focus:border-c-teal"
                            placeholder="Enter building name..."
                        />
                    </div>
                    <div className="mb-4 flex items-center">
                        <label className="text-sm w-[200px] whitespace-nowrap font-semibold">Street Address<span className="text-red-500">*</span>:</label>
                        <div className="flex items-center">
                            <label className="text-sm px-3 whitespace-nowrap font-semibold">Country</label>
                            <input
                                type="text"
                                value="Singapore"
                                className="border-b border-none bg-white px-3 py-2 text-sm focus:outline-none focus:border-none"

                            />
                        </div>
                    </div>
                    <div className="mb-4 flex items-center">
                        <label className="text-sm w-[200px] whitespace-nowrap font-semibold"></label>
                        <div className="flex mb-2 items-center ">
                            <div className="flex mb-2">
                                <input type="text"
                                    value={streetNumber}
                                    onChange={(e) => setStreetNumber(e.target.value)}
                                    className="mr-5 w-2/3 border-b border-gray-400 bg-white px-3 py-2 text-sm focus:outline-none focus:border-c-teal"
                                    placeholder="Street Number" />
                                <input type="text"
                                    value={streetName}
                                    onChange={(e) => setStreetName(e.target.value)}
                                    className="mr-5 w-2/3 border-b border-gray-400 bg-white px-3 py-2 text-sm focus:outline-none focus:border-c-teal"
                                    placeholder="Street Name" />

                                <input type="text"
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    className="border-b w-1/4 border-gray-400 bg-white px-3 py-2 text-sm focus:outline-none focus:border-c-teal"
                                    placeholder="Postal Code" />
                            </div>
                        </div>
                    </div>
                    <div className="mb-4 flex items-center w-[1000px]">
                        <label className="text-sm w-[200px] whitespace-nowrap font-semibold">Property Type<span className="text-red-500">*</span>:</label>
                        <div className="flex items-center text-sm flex flex-grow justify-between">
                            <div className='flex items-center'>
                                <label className="mr-4 flex items-center"><input type="checkbox" value="Hotel" checked={propertyType.includes('Hotel')} onChange={handlePropertyTypeChange} className="mr-2" />Hotel</label>
                                <label className="mr-4 flex items-center"><input type="checkbox" value="Industrial" checked={propertyType.includes('Industrial')} onChange={handlePropertyTypeChange} className="mr-2" />Industrial</label>
                                <label className="mr-4 flex items-center"><input type="checkbox" value="Office" checked={propertyType.includes('Office')} onChange={handlePropertyTypeChange} className="mr-2" />Office</label>
                                <label className="mr-4 flex items-center"><input type="checkbox" value="Retail" checked={propertyType.includes('Retail')} onChange={handlePropertyTypeChange} className="mr-2" />Retail</label>
                            </div>

                            <div>
                                <div className="mb-4 flex items-center w-[250px] flex items-end">
                                    <label className="text-sm px-3 whitespace-nowrap font-semibold">Grade</label>
                                    <div className="relative border-b border-gray-400">
                                        <select className="border-none border-t-0 border-l-0 border-r-0 w-20 bg-white"
                                            onChange={handleSelectChange}
                                            value={selectedOption}>
                                            <option style={{ backgroundColor: 'white' }}>test</option>
                                            <option style={{ backgroundColor: 'white' }}>test</option>

                                        </select>
                                        <div className="absolute inset-0 pointer-events-none">
                                            <div className="bg-white absolute inset-0 opacity-0 hover:opacity-100"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4 flex w-[1000px]">
                        <label className="py-3 text-sm w-[200px] whitespace-nowrap font-semibold">Property Sub Type<span className="text-red-500">*</span>:</label>
                        <div className="flex px-3 py-3 text-sm w-1/5 justify-between border border-neutral-300">
                            {/* Render sub-type options based on selected property type */}
                            {propertyType.includes('Hotel') && (
                                <table>
                                    <tbody>
                                        <tr>
                                            <tr>
                                                <label><input type="checkbox" value="Budget Hotel" checked={propertySubType.includes('Budget Hotel')} onChange={handlePropertySubTypeChange} className="mr-2" />Budget Hotel</label>
                                            </tr>
                                            <tr>
                                                <label><input type="checkbox" value="Luxury Hotel" checked={propertySubType.includes('Luxury Hotel')} onChange={handlePropertySubTypeChange} className="mr-2" />Luxury Hotel</label>
                                            </tr>
                                            <tr>
                                                <label><input type="checkbox" value="Boutique Hotel" checked={propertySubType.includes('Boutique Hotel')} onChange={handlePropertySubTypeChange} className="mr-2" />Boutique Hotel</label>
                                            </tr>
                                            <tr>
                                                <label><input type="checkbox" value="Resort" checked={propertySubType.includes('Resort')} onChange={handlePropertySubTypeChange} className="mr-2" />Resort</label>
                                            </tr>
                                        </tr>
                                    </tbody>
                                </table>

                            )}
                            {/* Add similar logic for other property types */}
                        </div>
                    </div>
                    <div className="mb-4 flex items-center w-[1000px] justify-between">
                        <div className="flex items-center">
                            <label className="text-sm w-[200px] whitespace-nowrap font-semibold">Region<span className="text-red-500">*</span>:</label>
                            <div className="relative border-b border-gray-400">
                                <select className="border-none border-t-0 border-l-0 border-r-0 w-56 bg-white">
                                    <option></option>
                                </select>

                            </div>
                        </div>
                        <div className="flex items-center">
                            <label className="text-sm w-[200px] whitespace-nowrap font-semibold">Micro market<span className="text-red-500">*</span>:</label>
                            <div className="relative border-b border-gray-400">
                                <select className="border-none border-t-0 border-l-0 border-r-0 w-56 bg-white">
                                    <option></option>
                                </select>

                            </div>
                        </div>
                    </div>
                    <div className="mb-4 flex items-center w-[1000px] justify-between">
                        <div className="flex items-center">
                            <label className="text-sm w-[200px] whitespace-nowrap font-semibold">Zoning<span className="text-red-500">*</span>:</label>
                            <div className="relative border-b border-gray-400">
                                <select className="border-none border-t-0 border-l-0 border-r-0 w-56 bg-white">
                                    <option></option>
                                </select>

                            </div>
                        </div>
                        <div className="flex items-center">
                            <label className="text-sm w-[200px] whitespace-nowrap font-semibold">Permissible Plot Ratio:</label>
                            <div className="relative border-b border-gray-400">
                                <select className="border-none border-t-0 border-l-0 border-r-0 w-56 bg-white">
                                    <option></option>
                                </select>

                            </div>
                        </div>
                    </div>
                    <div className="mb-4 flex items-center w-[1000px] justify-between">
                        <div className="flex items-center">
                            <label className="text-sm w-[200px] whitespace-nowrap font-semibold">Utilized Plot Ratio:</label>
                            <div className="relative border-b border-gray-400">
                                <select className="border-none border-t-0 border-l-0 border-r-0 w-56 bg-white">
                                    <option></option>
                                </select>

                            </div>
                        </div>
                        <div className="flex items-center">
                            <label className="text-sm w-[200px] whitespace-nowrap font-semibold">Potential Build-Up Area:</label>
                            <div className="relative border-b border-gray-400">
                                <select className="border-none border-t-0 border-l-0 border-r-0 w-56 bg-white">
                                    <option></option>
                                </select>

                            </div>
                        </div>
                    </div>

                    <div className="mb-4 flex items-center">
                        <label className="text-sm w-[200px] whitespace-nowrap font-semibold">Stacking Plan Tag<span className="text-red-500">*</span>:</label>
                        <input
                            type="text"
                            value={buildingName}
                            onChange={(e) => setBuildingName(e.target.value)}
                            className=" px-3 py-2 w-3/5 border-b border-gray-400 bg-white text-sm focus:outline-none focus:border-c-teal"
                            placeholder="Enter building name..."
                        />
                    </div>
                    <div className=''>
                        <div className="mb-4 flex w-[1000px]">
                            <label className="py-3 text-sm w-[200px] whitespace-nowrap font-semibold">Property Sub Type<span className="text-red-500">*</span>:</label>
                            <div className="flex px-3 py-3 text-sm w-1/5 justify-between border border-neutral-300">
                                {/* Render sub-type options based on selected property type */}
                                {propertyType.includes('Hotel') && (
                                    <table>
                                        <tbody>
                                            <tr>
                                                <tr>
                                                    <label><input type="checkbox" value="Budget Hotel" checked={propertySubType.includes('Budget Hotel')} onChange={handlePropertySubTypeChange} className="mr-2" />Budget Hotel</label>
                                                </tr>
                                                <tr>
                                                    <label><input type="checkbox" value="Luxury Hotel" checked={propertySubType.includes('Luxury Hotel')} onChange={handlePropertySubTypeChange} className="mr-2" />Luxury Hotel</label>
                                                </tr>
                                                <tr>
                                                    <label><input type="checkbox" value="Boutique Hotel" checked={propertySubType.includes('Boutique Hotel')} onChange={handlePropertySubTypeChange} className="mr-2" />Boutique Hotel</label>
                                                </tr>
                                                <tr>
                                                    <label><input type="checkbox" value="Resort" checked={propertySubType.includes('Resort')} onChange={handlePropertySubTypeChange} className="mr-2" />Resort</label>
                                                </tr>
                                            </tr>
                                        </tbody>
                                    </table>

                                )}
                                {/* Add similar logic for other property types */}
                            </div>
                        </div>
                        <div className="mb-4 flex w-[1000px]">
                            <label className="py-3 text-sm w-[200px] whitespace-nowrap font-semibold">Property Sub Type<span className="text-red-500">*</span>:</label>
                            <div className="flex px-3 py-3 text-sm w-1/5 justify-between border border-neutral-300">
                                {/* Render sub-type options based on selected property type */}
                                {propertyType.includes('Hotel') && (
                                    <table>
                                        <tbody>
                                            <tr>
                                                <tr>
                                                    <label><input type="checkbox" value="Budget Hotel" checked={propertySubType.includes('Budget Hotel')} onChange={handlePropertySubTypeChange} className="mr-2" />Budget Hotel</label>
                                                </tr>
                                                <tr>
                                                    <label><input type="checkbox" value="Luxury Hotel" checked={propertySubType.includes('Luxury Hotel')} onChange={handlePropertySubTypeChange} className="mr-2" />Luxury Hotel</label>
                                                </tr>
                                                <tr>
                                                    <label><input type="checkbox" value="Boutique Hotel" checked={propertySubType.includes('Boutique Hotel')} onChange={handlePropertySubTypeChange} className="mr-2" />Boutique Hotel</label>
                                                </tr>
                                                <tr>
                                                    <label><input type="checkbox" value="Resort" checked={propertySubType.includes('Resort')} onChange={handlePropertySubTypeChange} className="mr-2" />Resort</label>
                                                </tr>
                                            </tr>
                                        </tbody>
                                    </table>

                                )}
                                {/* Add similar logic for other property types */}
                            </div>
                        </div>
                    </div>
                    <div className="mb-4 flex w-[1000px]">
                        <label className="py-3 text-sm w-[200px] whitespace-nowrap font-semibold">Property Sub Type<span className="text-red-500">*</span>:</label>
                        <div className="flex px-3 py-3 text-sm w-1/5 justify-between border border-neutral-300">
                            {/* Render sub-type options based on selected property type */}
                            {propertyType.includes('Hotel') && (
                                <table>
                                    <tbody>
                                        <tr>
                                            <tr>
                                                <label><input type="checkbox" value="Budget Hotel" checked={propertySubType.includes('Budget Hotel')} onChange={handlePropertySubTypeChange} className="mr-2" />Budget Hotel</label>
                                            </tr>
                                            <tr>
                                                <label><input type="checkbox" value="Luxury Hotel" checked={propertySubType.includes('Luxury Hotel')} onChange={handlePropertySubTypeChange} className="mr-2" />Luxury Hotel</label>
                                            </tr>
                                            <tr>
                                                <label><input type="checkbox" value="Boutique Hotel" checked={propertySubType.includes('Boutique Hotel')} onChange={handlePropertySubTypeChange} className="mr-2" />Boutique Hotel</label>
                                            </tr>
                                            <tr>
                                                <label><input type="checkbox" value="Resort" checked={propertySubType.includes('Resort')} onChange={handlePropertySubTypeChange} className="mr-2" />Resort</label>
                                            </tr>
                                        </tr>
                                    </tbody>
                                </table>

                            )}
                            {/* Add similar logic for other property types */}
                        </div>
                    </div>
                    <div className="mb-4 flex items-center w-[1000px] justify-between">
                        <div className="flex items-center">
                            <label className="text-sm w-[200px] whitespace-nowrap font-semibold">Region<span className="text-red-500">*</span>:</label>
                            <div className="relative border-b border-gray-400">
                                <select className="border-none border-t-0 border-l-0 border-r-0 w-56 bg-white">
                                    <option></option>
                                </select>

                            </div>
                        </div>
                        <div className="flex items-center">
                            <label className="text-sm w-[200px] whitespace-nowrap font-semibold">Micro market<span className="text-red-500">*</span>:</label>
                            <div className="relative border-b border-gray-400">
                                <select className="border-none border-t-0 border-l-0 border-r-0 w-56 bg-white">
                                    <option></option>
                                </select>

                            </div>
                        </div>
                    </div>
                    <button type="submit" className="bg-neutral-400 text-white py-1.5 px-4 rounded-sm hover:bg-c-teal">Save</button>
                </form>
            </div>
        </div>

    );
}
