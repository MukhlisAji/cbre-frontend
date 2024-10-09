import React, { useEffect, useState } from "react";
import MultipleSelect from "../../shared/element/MultipleSelect";
import { Box, FormControl, InputLabel, MenuItem, Select, styled, TextField } from "@mui/material";
import DatePickerField from "../../shared/element/DatePickerField";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";


export default function AdvanceSearch({ filter, setAdvanceSearch }) {
    const [rentType, setRentType] = useState('');
    const [rentFrom, setRentFrom] = useState('');
    const [rentTo, setRentTo] = useState('');

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
        <>
            {!filter && <h2 className="text-lg font-bold mb-4">Advance Search Criteria</h2>}

            <div style={{ height: `${sectionHeight}px` }} className="grid grid-cols-6 gap-10 overflow-y-auto">
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
                            <span className="self-center">and over</span>
                        </Box>
                    </div>
                </div>
            </div>
            {!filter &&
                <div className="mt-4 flex space-x-2 justify-start">
                    <button onClick={() => { setAdvanceSearch(false) }} className="bg-white text-gray-600 py-2 px-4 text-sm rounded-md hover:bg-white/80 border border-gray-700">Basic Criteria</button>
                    <button className="bg-c-teal text-white py-2 px-4 text-sm rounded-md hover:bg-c-teal/80">Search</button>
                </div>
            }
        </>
    )
}