import { Box, FormControl, InputLabel, MenuItem, Select, styled, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MultipleSelect from '../../shared/element/MultipleSelect';
import { DatePicker } from '@mui/x-date-pickers';

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
            const newHeight = screenHeight - 120;
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

    const [rentType, setRentType] = useState('');
    const [rentFrom, setRentFrom] = useState('');
    const [rentTo, setRentTo] = useState('');
    const [advanceSearch, setInternalAdvanceSearch] = useState(false);

    const handleRentTypeChange = (event) => {
        setRentType(event.target.value);
    };
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

    const darkGreen = '#5a8184';
    const red = "#AD2A2A";
    const cusInput = {
        width: '100%',
        '& .MuiOutlinedInput-root': {
            backgroundColor: 'white', // Set background color to white
            '&:hover fieldset': {
                borderColor: darkGreen,
            },
            '&.Mui-focused fieldset': {
                borderColor: darkGreen,
            },
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: darkGreen,
        },
    };

    const SmallSelect = styled(Select)(({ theme }) => ({
        '& .MuiSelect-select': {
            fontSize: '0.9rem',
        },
    }));

    return (
        <div style={{ height: `${sectionHeight}px` }} className="mx-auto overflow-y-auto">
            <header className="sticky top-0 shadow-sm py-3 bg-neutral-100 z-10 flex items-center justify-center rounded-t-lg border border-neutral-200">
                <h2 className="text-xl mx-auto font-semibold text-neutral-600 text-center">New Property: Singapore Property</h2>
            </header>
            <div className="border border-neutral-200 pt-8 rounded-sm bg-white shadow-lg p-2">

                {/* Basic Search style={{ height: `${sectionHeight}px` }}  */}
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
                        <div className=" p-8 grid grid-cols-6 gap-10 overflow-y-auto">
                            <div className="col-span-2">
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
                                <div className="mb-4 space-y-4">
                                    <div className="space-y-2">
                                        <span className='text-sm mt-8 font-semibold text-gray-600'>Region</span>
                                        <MultipleSelect label="" />
                                    </div>

                                    <div className="space-y-2">
                                        <span className='text-sm mt-8 font-semibold text-gray-600'>Micromarket</span>
                                        <MultipleSelect label="" />

                                    </div>
                                </div>

                                {/* Size Section */}
                                <div className="space-y-2">

                                    <span className='text-sm font-semibold text-gray-600'>Size</span>
                                    <div className="mt- grid grid-cols- gap-4">
                                        <div className="col-span-">
                                            {/* <span className='text-sm font-semibold text-gray-600'>Size</span> */}
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: '8px' }}>
                                                <FormControl sx={cusInput} widthfull>
                                                    <InputLabel sx={cusInput} size="small" id="sizeType">Size Type</InputLabel>
                                                    {/* <SmallSelect */}
                                                    <Select
                                                        size="small"
                                                        labelId="sizeType"
                                                        id="sizeType"
                                                        value={rentType}
                                                        label="Size Type"
                                                        onChange={handleRentTypeChange}
                                                    // sx={cusInput}

                                                    >
                                                        <MenuItem value={10} sx={{ fontSize: '0.9rem' }}>Option</MenuItem>
                                                        <MenuItem value={20} sx={{ fontSize: '0.9rem' }}>Option</MenuItem>
                                                        <MenuItem value={30} sx={{ fontSize: '0.9rem' }}>Option</MenuItem>
                                                    </Select>
                                                    {/* </SmallSelect> */}
                                                </FormControl>
                                                <TextField
                                                    label="From"
                                                    type="number"
                                                    size="small"
                                                    sx={cusInput} />

                                                <TextField
                                                    label="To"
                                                    type="number"
                                                    size="small"
                                                    sx={cusInput} />
                                            </Box>
                                        </div>
                                    </div>
                                </div>
                                {/* Possession Status */}
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div className="space-y-2">
                                        <label className='text-sm font-semibold text-gray-600'>Possession Status</label>
                                        <div className="flex text-sm text-gray-600 flex-col space-y-2">
                                            <label><input type="checkbox" /> Field Name</label>
                                            <label><input type="checkbox" /> Field Name</label>
                                            <label><input type="checkbox" /> Field Name</label>
                                            <label><input type="checkbox" /> Field Name</label>
                                            <label><input type="checkbox" /> Field Name</label>
                                        </div>
                                    </div>
                                    {/* Space Status */}
                                    <div className="space-y-2">
                                        <label className='text-sm font-semibold text-gray-600'>Space Status</label>
                                        <div className="flex text-sm text-gray-600 flex-col space-y-2">
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

                            <div className="col-span-4">
                                <div className="mt-4 grid gap-4 mb-4">

                                    {/* Zoning */}
                                    <div className="space-y-2">
                                        <label className='text-sm font-semibold text-gray-600'>Zoning</label>
                                        <div className="grid text-sm text-gray-600 grid-cols-4 gap-2">
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
                                    <div className="space-y-2">
                                        <label className='text-sm font-semibold text-gray-600'>Property Usage</label>
                                        <div className="grid text-sm text-gray-600 grid-cols-4 gap-2">
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
                                <div className="space-y-1">
                                    <span className='text-sm font-semibold text-gray-600'>Rent</span>

                                    <div className="mt-4 grid grid-cols-4 gap-2">
                                        <div className="col-span-3">
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: '8px' }}>
                                                <FormControl sx={cusInput} widthfull>
                                                    <InputLabel sx={cusInput} size="small" id="sizeType">Rent Type</InputLabel>
                                                    <Select
                                                        size="small"
                                                        labelId="sizeType"
                                                        id="sizeType"
                                                        // value={age}
                                                        label="Size Type"
                                                    // onChange={handleChange}
                                                    // sx={cusInput}

                                                    >
                                                        <MenuItem value={10}>Option</MenuItem>
                                                        <MenuItem value={20}>Option</MenuItem>
                                                        <MenuItem value={30}>Option</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <TextField
                                                    label="From"
                                                    type="number"
                                                    size="small"
                                                    sx={cusInput} />

                                                <TextField
                                                    label="To"
                                                    type="number"
                                                    size="small"
                                                    sx={cusInput} />
                                            </Box>
                                        </div>
                                        <div className="col-span-1 flex items-center space-x-1 text-sm text-gray-600">
                                            <label><input type="checkbox" /> View to Offer</label>
                                        </div>
                                    </div>
                                </div>


                                {/* Date Fields */}
                                <div className="mt-4 grid grid-cols-2 gap-2">
                                    <div className="space-y-2">
                                        <span className='text-sm font-semibold text-gray-600'>Availability</span>
                                        <Box
                                            component="form"
                                            sx={{
                                                display: 'flex', // Set Box to flex layout
                                                flexDirection: 'row',
                                                gap: '8px',
                                                alignItems: 'center',
                                                '& .MuiTextField-root': { width: '100%' },
                                            }}
                                            noValidate
                                            autoComplete="off"
                                            size="small"
                                        >
                                            <DatePicker
                                                label="From"
                                                slotProps={{ textField: { size: 'small' } }}
                                                sx={cusInput}
                                            />
                                            <DatePicker
                                                label="To"
                                                slotProps={{ textField: { size: 'small' } }}
                                                sx={cusInput}
                                            />
                                        </Box>
                                    </div>
                                    <div className="space-y-2">
                                        <span className='text-sm font-semibold text-gray-600'>Last Update</span>
                                        <Box
                                            component="form"
                                            sx={{
                                                display: 'flex', // Set Box to flex layout
                                                flexDirection: 'row',
                                                gap: '8px',
                                                alignItems: 'center',
                                                '& .MuiTextField-root': { width: '100%' },
                                            }}
                                            noValidate
                                            autoComplete="off"
                                            size="small"
                                        >
                                            <DatePicker
                                                label="From"
                                                slotProps={{ textField: { size: 'small', shrink: true } }}
                                                sx={cusInput}
                                            />
                                            <DatePicker
                                                label="To"
                                                slotProps={{ textField: { size: 'small', shrink: true } }}
                                                sx={cusInput}
                                            />
                                        </Box>
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
                            <h2 className="px-6 py-2 text-lg font-bold mb-4">Advance Search Criteria</h2>

                            <div style={{ height: `${sectionHeight}px` }} className="p-6 grid grid-cols-6 gap-10 overflow-y-auto">
                                {/* First Column */}
                                <div className="col-span-3 space-y-4">
                                    {/* TOP (From-To) */}
                                    <div className="flex flex-col gap-2">
                                        <label className="block text-sm font-medium">TOP</label>
                                        <Box sx={{ display: 'flex', gap: '8px' }}>
                                            <TextField
                                                label="From"
                                                type="text"
                                                size="small"
                                                sx={cusInput}
                                                value={formState.topFrom}
                                                onChange={handleInputChange}
                                                name="topFrom"
                                            />
                                            <TextField
                                                label="To"
                                                type="text"
                                                size="small"
                                                sx={cusInput}
                                                value={formState.topTo}
                                                onChange={handleInputChange}
                                                name="topTo"
                                            />
                                        </Box>
                                    </div>

                                    {/* Grade */}
                                    <div className="flex flex-col gap-2">
                                        <label className="block text-sm font-medium">Grade</label>
                                        <FormControl fullWidth size="small" sx={cusInput}>
                                            <InputLabel id="sizeType">Grade</InputLabel>
                                            <Select
                                                value={formState.grade}
                                                labelId="sizeType"
                                                id="sizeType"
                                                onChange={handleInputChange}
                                                name="grade"
                                                label="Grade"

                                            >
                                                <MenuItem value="A">A</MenuItem>
                                                <MenuItem value="B">B</MenuItem>
                                                <MenuItem value="C">C</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>

                                    {/* Property Status */}
                                    <div className="flex flex-col gap-2">
                                        <label className="block text-sm font-medium">Property Status</label>
                                        <FormControl fullWidth size="small" sx={cusInput}>
                                            <InputLabel>Property Status</InputLabel>
                                            <Select
                                                value={formState.propertyStatus}
                                                label="Property Status"
                                                onChange={handleInputChange}
                                                name="propertyStatus"
                                            >
                                                <MenuItem value="Available">Available</MenuItem>
                                                <MenuItem value="Unavailable">Unavailable</MenuItem>
                                                <MenuItem value="Under Maintenance">Under Maintenance</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>

                                    {/* Ownership Structure */}
                                    <div className="flex flex-col gap-2">
                                        <label className="block text-sm font-medium">Ownership Structure</label>
                                        <div className="flex flex-col space-y-1">
                                            <label><input type="checkbox" className="mr-2" /> Freehold</label>
                                            <label><input type="checkbox" className="mr-2" /> Leasehold</label>
                                            <label><input type="checkbox" className="mr-2" /> Single</label>
                                            <label><input type="checkbox" className="mr-2" /> Strata</label>
                                        </div>
                                    </div>

                                    {/* MRT Fields */}
                                    {['MRT1', 'MRT2', 'MRT3'].map((mrt, index) => (
                                        <div className="flex flex-col gap-2" key={index}>
                                            <label className="block text-sm font-medium">{mrt}</label>
                                            <Box sx={{ display: 'flex', gap: '8px' }}>
                                                <TextField
                                                    label="Station"
                                                    size="small"
                                                    sx={cusInput}
                                                    value={formState[mrt.toLowerCase()]}
                                                    onChange={handleInputChange}
                                                    name={mrt.toLowerCase()}
                                                />
                                                <TextField
                                                    label="Distance"
                                                    type="number"
                                                    size="small"
                                                    sx={cusInput}
                                                    value={formState[`${mrt.toLowerCase()}Distance`]}
                                                    onChange={handleInputChange}
                                                    name={`${mrt.toLowerCase()}Distance`}
                                                />
                                            </Box>
                                        </div>
                                    ))}
                                </div>

                                {/* Second Column */}
                                <div className="col-span-3 space-y-4">
                                    {/* Floor To Ceiling Height */}
                                    <div className="flex flex-col gap-2">
                                        <label className="block text-sm font-medium">Floor To Ceiling Height</label>
                                        <Box sx={{ display: 'flex', gap: '8px' }}>
                                            <TextField
                                                label="From"
                                                type="text"
                                                size="small"
                                                sx={cusInput}
                                                value={formState.floorHeightFrom}
                                                onChange={handleInputChange}
                                                name="floorHeightFrom"
                                            />
                                            <TextField
                                                label="To"
                                                type="text"
                                                size="small"
                                                sx={cusInput}
                                                value={formState.floorHeightTo}
                                                onChange={handleInputChange}
                                                name="floorHeightTo"
                                            />
                                        </Box>
                                    </div>

                                    {/* Floor Loading */}
                                    <div className="flex flex-col gap-2">
                                        <label className="block text-sm font-medium">Floor Loading</label>
                                        <Box sx={{ display: 'flex', gap: '8px' }}>
                                            <TextField
                                                label="From"
                                                type="text"
                                                size="small"
                                                sx={cusInput}
                                                value={formState.floorLoadingFrom}
                                                onChange={handleInputChange}
                                                name="floorLoadingFrom"
                                            />
                                            <TextField
                                                label="To"
                                                type="text"
                                                size="small"
                                                sx={cusInput}
                                                value={formState.floorLoadingTo}
                                                onChange={handleInputChange}
                                                name="floorLoadingTo"
                                            />
                                            <span className="self-center">KN/Sqm</span>
                                        </Box>
                                    </div>

                                    {/* Floor System */}
                                    <div className="flex flex-col gap-2">
                                        <label className="block text-sm font-medium">Floor System</label>
                                        <FormControl fullWidth size="small" sx={cusInput}>
                                            <InputLabel>Floor System</InputLabel>
                                            <Select
                                                value={formState.floorSystem}
                                                onChange={handleInputChange}
                                                name="floorSystem"
                                            >
                                                <MenuItem value="Concrete">Concrete</MenuItem>
                                                <MenuItem value="Raised">Raised</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>

                                    {/* Allocation Ratio */}
                                    <div className="flex flex-col gap-2">
                                        <label className="block text-sm font-medium">Allocation Ratio</label>
                                        <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                            <span>1:</span>
                                            <TextField
                                                size="small"
                                                sx={cusInput}
                                                value={formState.allocationRatio}
                                                onChange={handleInputChange}
                                                name="allocationRatio"
                                            />
                                            <span className="self-center whitespace-nowrap">Sq Ft leased</span>
                                        </Box>
                                    </div>

                                    {/* Parking Fee */}
                                    <div className="flex flex-col gap-2">
                                        <label className="block text-sm font-medium">Parking Fee (Subject to GST)</label>
                                        <div className="flex flex-col space-y-4">
                                            <Box sx={{ display: 'flex', gap: '8px' }}>
                                                <TextField
                                                    label="Seasonal"
                                                    size="small"
                                                    sx={cusInput}
                                                    value={formState.seasonalParkingFee}
                                                    onChange={handleInputChange}
                                                    name="seasonalParkingFee"
                                                />
                                                <span className="self-center">S$/lot/mth</span>
                                            </Box>
                                            <Box sx={{ display: 'flex', gap: '8px' }}>
                                                <TextField
                                                    label="Non-Reserved"
                                                    size="small"
                                                    sx={cusInput}
                                                    value={formState.nonReservedParkingFee}
                                                    onChange={handleInputChange}
                                                    name="nonReservedParkingFee"
                                                />
                                                <span className="self-center">S$/lot/mth</span>
                                            </Box>
                                        </div>
                                    </div>

                                    {/* Car Spaces */}
                                    <div className="flex flex-col gap-2">
                                        <label className="block text-sm font-medium">Car Spaces</label>
                                        <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                            <TextField
                                                size="small"
                                                sx={cusInput}
                                                value={formState.carSpaces}
                                                onChange={handleInputChange}
                                                name="carSpaces"
                                            />
                                            <span className="self-center whitespace-nowrap">and over</span>
                                        </Box>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
            <footer className="sticky bottom-0 bg-neutral-100 py-3 px-10 flex items-center gap-2 justify-start border border-neutral-200 shadow-md z-10 rounded-b-lg">
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
