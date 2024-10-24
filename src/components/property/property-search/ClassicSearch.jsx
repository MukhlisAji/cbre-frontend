import React, { useEffect, useState } from "react";
import MultipleSelect from "../../shared/element/MultipleSelect";
import { Box, FormControl, InputLabel, MenuItem, Select, styled, TextField } from "@mui/material";
import DatePickerField from "../../shared/element/DatePickerField";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AdvanceSearch from "./AdvanceSearch";

export default function ClassicSearch({ filter, handleAdvanceSearchFilter, setAdvanceSearch }) {
    const [rentType, setRentType] = useState('');
    const [rentFrom, setRentFrom] = useState('');
    const [rentTo, setRentTo] = useState('');
    const [advanceSearch, setInternalAdvanceSearch] = useState(false);

    const handleAdvanceSearch = () => {
        if (handleAdvanceSearchFilter) {
            handleAdvanceSearchFilter();
        } else {
            setInternalAdvanceSearch(!advanceSearch);
            handleModalTitle();
        }
    };

    const handleModalTitle = () => {
        if (setAdvanceSearch) {
            setAdvanceSearch(!advanceSearch);
        }
    }

    const handleRentTypeChange = (event) => {
        setRentType(event.target.value);
    };
    const [formState, setFormState] = useState({
        region: '',
        micromarket: ' ',
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

    const [sectionHeight, setSectionHeight] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const screenHeight = window.innerHeight;
            const newHeight = screenHeight - 250; // Subtract 200px for any other fixed content
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

    const resize = { resizerHighlight: "#3b82f6", resizerWidth: 3 };

    return (
        <div className="bg-gray-100 rounded-md max-w-full mx-auto">
            {!advanceSearch ?
                (
                    <>
                        {!filter && <h2 className="px-6 py-2 text-lg font-bold mb-4">Basic Search Criteria</h2>}

                        <div style={{ height: `${sectionHeight}px` }} className=" p-6 grid grid-cols-6 gap-10 overflow-y-auto">
                            <div className="col-span-2">
                                {/* Building, Street, Postal Code */}
                                {!filter &&
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
                                }

                                {/* Region and Micromarket */}
                                <div className="mb-4 space-y-4">
                                    <div className="space-y-2">
                                        <span className='text-sm mt-8 font-semibold text-gray-600'>Region</span>
                                        <MultipleSelect
                                            value={formState.region}
                                            onChange={handleInputChange} />
                                    </div>

                                    <div className="space-y-2">
                                        <span className='text-sm mt-8 font-semibold text-gray-600'>Micromarket</span>
                                        <MultipleSelect
                                            value={formState.micromarket}
                                            onChange={handleInputChange} />

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

                        {/* Possession Status, Space Status, Zoning, and Property Usage */}




                        {/* Action Buttons */}
                        {!filter ? (
                            <div className="px-6 mt-4 flex space-x-2 justify-start">
                                <button onClick={handleAdvanceSearch} className="bg-white text-gray-600 py-2 px-4 text-sm rounded-md hover:bg-white/80 border border-gray-700">Advanced Criteria</button>
                                <button className="bg-c-teal text-white py-2 px-4 text-sm rounded-md hover:bg-c-teal/80">Search</button>
                            </div>
                        ) : (
                            <footer className="px-4 sticky bottom-0 bg-neutral-100 py-3 flex items-center gap-2 justify-end border-t border-neutral-500 shadow-md z-10 rounded-b-lg">
                                <button
                                    onClick={handleAdvanceSearch}
                                    className="py-2 text-sm bg-c-teal text-white rounded-md hover:bg-c-teal/80"
                                >
                                    Advance Criteria

                                </button>
                                <button
                                    // onClick={handleSave}
                                    // disabled={!isFormValid}
                                    className="py-2 text-sm bg-c-teal text-white rounded-md hover:bg-c-teal/80"
                                >
                                    Search
                                </button>
                            </footer>
                        )}
                    </>
                ) : (
                    <div className="flex flex-col">
                        <AdvanceSearch filter={filter} handleAdvanceSearch={handleAdvanceSearch} />

                    </div>
                )}
        </div>
    );
};
