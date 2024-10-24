import { Box, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, styled, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MultipleSelect from '../../shared/element/MultipleSelect';
import { DatePicker } from '@mui/x-date-pickers';
import PropertyResource from '../PropertyResource';
import { AddAlert } from '@mui/icons-material';
import axios from 'axios';
import { generateTransactionId } from '../../lib/api/Authorization';
import { CONFIG } from '../../../config';
import { InputField, SingleSelectField } from '../FormFields';
import InputAdornment from '@mui/material/InputAdornment';

const PropertySearchForm = () => {
    const { districts, fetchDistricts, useFetchOptions, useFetchResource } = PropertyResource();

    // Define states for each category of options
    const [propertyUsageOptions, setPropertyUsageOptions] = useState([]);
    const [possessionStatusOptions, setPossessionStatusOptions] = useState([]);
    const [zoningOptions, setZoningOptions] = useState([]);
    const [spaceStatusOptions, setSpaceStatusOptions] = useState([]);
    const [micromarketOptions, setMicromarketOptions] = useState([]);
    const [regionOptions, setRegionOptions] = useState([]);
    const [gradeOptions, setGradeOptions] = useState([]);
    const [buildingOwnerOptions, setBuildingOwnerOptions] = useState([]);
    const [buildingStatusOptions, setBuildingStatusOptions] = useState([]);
    const [propertyTypeOptions, setPropertyTypeOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRegions, setSelectedRegions] = useState([]); // To store selected regions
    const [filteredMicromarkets, setFilteredMicromarkets] = useState(micromarketOptions); // To store filtered micromarkets
    const [selectedRegion, setSelectedRegion] = useState(null); // Initialize state for selected region
    const { mrtStations, setMrtStations, fetchMRTStations } = PropertyResource();

    // Helper function to fetch from localStorage or API
    const getOrFetchData = async (key, fetchFunction, setState) => {
        const cachedData = localStorage.getItem(key);
        if (cachedData) {
            setState(JSON.parse(cachedData)); // Use cached data if available
        } else {
            const fetchedData = await fetchFunction(); // Fetch new data
            localStorage.setItem(key, JSON.stringify(fetchedData)); // Cache the new data in localStorage
            setState(fetchedData);
        }
    };

    useEffect(() => {
        fetchMRTStations(); // Fetch the MRT stations on mount
    }, []);

    useEffect(() => {
        const fetchAllOptions = async () => {
            setIsLoading(true); // Start loading

            try {
                // Fetch or get cached data
                await getOrFetchData('propertyUsageOptions', () => useFetchOptions('propertyUsage'), setPropertyUsageOptions);
                await getOrFetchData('possessionStatusOptions', () => useFetchOptions('possessionStatus'), setPossessionStatusOptions);
                await getOrFetchData('zoningOptions', () => useFetchOptions('zoning'), setZoningOptions);
                await getOrFetchData('spaceStatusOptions', () => useFetchOptions('spaceStatus'), setSpaceStatusOptions);

                const micromarketFetch = async () => {
                    const fetchedMicromarket = await useFetchResource('getmicromarkets');

                    // Flatten the data from jsonString and map each micromarket
                    return fetchedMicromarket.jsonString?.flatMap((regionData) =>
                        regionData.microMarkets.map((market) => ({
                            id: market.microMarketId,           // Use the microMarketId for the id
                            label: market.microMarket,          // Use the microMarket name for the label
                            value: market.microMarketId,          // Option value can also be the microMarket name
                            region: regionData.region,          // Include the region from the parent object
                        }))
                    );
                };
                await getOrFetchData('micromarketOptions', micromarketFetch, setMicromarketOptions);

                await getOrFetchData('propertyTypeOptions', () => useFetchOptions('sector'), setPropertyTypeOptions);
                await getOrFetchData('gradeOptions', () => useFetchOptions('grade'), setGradeOptions);
                await getOrFetchData('buildingOwnerOptions', () => useFetchOptions('buildingOwner'), setBuildingOwnerOptions);
                await getOrFetchData('buildingStatusOptions', () => useFetchOptions('buildingStatus'), setBuildingStatusOptions);

                fetchDistricts(); // Fetch districts if applicable

            } catch (error) {
                console.error('Error fetching options:', error);
            } finally {
                setIsLoading(false); // Stop loading
            }
        };

        // Call the function to fetch all options
        fetchAllOptions();
    }, []);

    const flattenStations = () => {
        return Object.values(mrtStations).flatMap(line => line.stations);
    };

    const getUniqueRegions = (options) => {
        const uniqueRegions = [];
        return options
            .filter((option) => {
                // If the region is not already in the uniqueRegions array, add it
                if (!uniqueRegions.includes(option.region)) {
                    uniqueRegions.push(option.region);
                    return true; // Keep this option in the filtered array
                }
                return false; // Skip if region is already added
            })
            .map((option) => ({
                id: option.region,   // Both id and label are set to the region value
                label: option.region
            }));
    };

    useEffect(() => {
        console.log("ptferre ", getUniqueRegions(micromarketOptions));
    })

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

    const [formState, setFormState] = useState({
        buildingName: '',
        street: '',
        streetName: '',
        possessionType: [], // Initialize as an empty array
        spaceStatus: [], // Initialize as an empty array
        micromarket: [],
        sizeFrom: '',
        sizeTo: '',
        rentFrom: '',
        rentTo: '',
        availableFrom: null, // DatePickers usually start with null or empty string
        availableTo: null,
        lastUpdatedFrom: null,
        lastUpdatedTo: null,
        sectorIds: [],
        districts: [],
        zoningIds: [],
        propertyUsageIds: [],
        grade: '',
        buildingStatusIds: '',
        ownerIds: [],
        mrts: [],
        proximity: '',
        floorLoadingFrom: '',
        floorLoadingTo: '',
        floorSystem: '',
        airconSystem: '',
        greenMark: '',
        carParkAllocRatio: '',
        carSpaces: '',
        seasonalParkingFee: '',
        nonReservedParkingFee: '',
        titleIds: [],
    });


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleInput = (name) => (event) => {
        const value = event.target.value; // Keep the existing destructuring
        // Check if name is defined, otherwise handle it as an error or use a default
        setFormState((prevState) => ({
            ...prevState,
            [name]: value, // Update the state with the correct name
        }));
    };

    const isRetailSelected = formState.sectorIds.includes(3);


    const handleMultipleSelectChange = (selectedOptions, field, valueField = 'id') => {
        console.log('Selected options:', selectedOptions); // Debugging

        setFormState((prevState) => ({
            ...prevState,
            [field]: selectedOptions.map(option => option[valueField]), // Dynamically use valueField
        }));
    };



    const handleSubmit = async () => {
        setIsLoading(true);
        const payload = {
            pageNo: 1,
            pageSize: 10,
            basicSearch: {
                buildingName: formState.buildingName,
                street: formState.street,
                streetName: formState.streetName,
                property: {
                    sectorIds: formState.sectorIds,
                    space: {
                        possessionType: formState.possessionType,
                        spaceStatus: formState.spaceStatus,
                        sizeFrom: formState.sizeFrom,
                        sizeTo: formState.sizeTo,
                        rentFrom: formState.rentFrom,
                        rentTo: formState.rentTo,
                        availableFrom: formState.availableFrom,
                        availableTo: formState.availableTo,
                        lastUpdatedFrom: formState.lastUpdatedFrom,
                        lastUpdatedTo: formState.lastUpdatedTo,
                    }
                },
                districts: formState.districts,
                microMarketIds: formState.micromarket,
                zoningIds: formState.zoningIds,
                propertyUsageIds: formState.propertyUsageIds,
            },
            advancedSearch: {
                topDate: {
                    from: formState.topFrom || null,
                    to: formState.topTo || null
                },
                grade: formState.grade || "A",
                propertyStatusId: formState.buildingStatusIds ? formState.buildingStatusIds[0] : null,
                titleIds: formState.titleIds || [],
                publicTransportation: {
                    mrt: formState.mrts || [],
                    proximity: formState.proximity || 2000
                },
                propertyDescription: {
                    floorLoading: {
                        from: formState.floorLoadingFrom || null,
                        to: formState.floorLoadingTo || null
                    },
                    floorCeilingHeight: {
                        from: formState.floorCeilingHeightFrom || null,
                        to: formState.floorCeilingHeightTo || null
                    },
                    floorSystem: formState.floorSystem || null,
                    airconSystem: formState.airconSystem || null,
                    greenMark: formState.greenMark || null,
                    cpAllocRatio: formState.carParkAllocRatio || null,
                    carSpaces: formState.carSpaces || null,
                    seasonalParkingFee: formState.seasonalParkingFee || null,
                    nonReservedParkingFee: formState.nonReservedParkingFee || null
                }
            }

        };

        console.log('Constructed Payload:', JSON.stringify(payload, null, 2));
        // You can now send this payload to your API using a POST request

        try {
            const response = await axios.post(`${CONFIG.PROPERTY_SERVICE}/search`, payload, {
                headers: {
                    'transactionId': generateTransactionId(),
                    'Content-Type': 'application/json',
                },
            });

            // console.log('dataToSend ', payload);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error: ${response.statusText} - ${errorData.statusMessage}`);
            }

            const responseData = await response.json();

            if (responseData.statusCode === '00') {
                // setIsEdit(false);
                // setIsSaving(false); // Reset saving flag after successful save
                // addAlert('Contact information saved successfully!', 'success');
                navigate('/property/properties', { state: { resultSet: response.data.resultSet } });
            } else {
                throw new Error(`Error: ${response.status} - ${response.data.statusMessage}`);

                // setIsSaving(false); // Reset saving flag if there's an error
                // addAlert(`Error saving contact information: ${responseData.statusMessage}`, 'error');
            }
        } catch (error) {
            console.error('Error saving contact information:', error);
            // setIsSaving(false); // Reset saving flag if there's an error
            // addAlert(`An error occurred. Please try again later`, 'error');
        } finally {
            setIsLoading(false); // Hide loading overlay
        }
    };

    const handleRegionChange = (selectedOption) => {
        const selectedValue = selectedOption?.target?.value; // Extract the selected region value safely
        setSelectedRegion(selectedValue); // Update the selected region

        if (selectedValue) {
            // Filter micromarkets by the selected region
            const filtered = micromarketOptions
                .filter(option => option.region === selectedValue) // Filter by region
                .map(microMarket => ({
                    value: microMarket.id, // Extract the id
                    label: microMarket.label // Extract the label
                }));

            setFilteredMicromarkets(filtered); // Update the filtered micromarkets state
        } else {
            // If no region is selected, show all micromarkets
            const allMicromarkets = micromarketOptions.map(microMarket => ({
                value: microMarket.id, // Extract the id
                label: microMarket.label // Extract the label
            }));

            setFilteredMicromarkets(allMicromarkets); // Update the filtered micromarkets state
        }
    };




    const handleCheckboxChange = (event, field, useName = false) => {
        const { value, checked } = event.target;

        // Use either the name (string) or parse the value as an ID (integer)
        const fieldValue = useName ? value : parseInt(value, 10);

        setFormState(prevState => {
            const fieldArray = prevState[field] || [];

            if (checked) {
                // If checked, add the value (name or ID) to the array
                return {
                    ...prevState,
                    [field]: [...fieldArray, fieldValue],
                };
            } else {
                // If unchecked, remove the value (name or ID) from the array
                return {
                    ...prevState,
                    [field]: fieldArray.filter(item => item !== fieldValue),
                };
            }
        });
    };


    const handleDateChange = (date, field) => {
        if (!date) return;

        setFormState(prevState => ({
            ...prevState,
            [field]: date.toISOString().split('T')[0], // Convert Date to 'YYYY-MM-DD' format
        }));
    };

    const handleInputChangeArray = (event, field, index) => {
        const { value } = event.target;
        setFormState(prevState => {
            const updatedArray = [...prevState[field]];
            updatedArray[index] = value;
            return {
                ...prevState,
                [field]: updatedArray,
            };
        });
    };

    const handleSelectChange = (event, field) => {
        const { value } = event.target;
        setFormState(prevState => ({
            ...prevState,
            [field]: value,
        }));
    };

    // const handleInputChange = (event) => {
    //     const { name, value } = event.target;
    //     setFormState((prevState) => ({
    //         ...prevState,
    //         [name]: value,
    //     }));
    // };

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
                <h2 className="text-xl mx-auto font-semibold text-neutral-600 text-center">Property Search</h2>
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
                        <div className="p-8 grid grid-cols-6 gap-10 overflow-y-auto">
                            <div className="col-span-2">
                                {/* Building, Street, Postal Code */}
                                <div className="grid grid-cols-4 gap-4">
                                    <div className="col-span-4">
                                        <InputField
                                            name="buildingName"
                                            label="Building Name"
                                            type="text"
                                            value={formState.buildingName}
                                            onChange={handleInput("buildingName")}
                                        />

                                    </div>

                                    <div className="col-span-2">
                                        <InputField
                                            label="Street"
                                            type="text"
                                            value={formState.street}
                                            onChange={handleInput('street')}
                                            placeholder="Street"

                                        />

                                    </div>

                                    <div className="col-span-2">
                                        <InputField
                                            label="Street Name"
                                            type="text"
                                            value={formState.streetName}
                                            onChange={handleInput('streetName')}
                                            placeholder="Street Name"

                                        />
                                    </div>
                                </div>

                                {/* Region and Micromarket */}
                                <div className="mb-4 space-y-4">
                                    <div className="space-y-2">
                                        <span className='text-sm mt-8 font-semibold text-gray-600'>Property Type</span>
                                        <MultipleSelect
                                            label="Select Property Type"
                                            options={propertyTypeOptions}
                                            isMulti={true}
                                            labelKey="sector"  // Should match the label field in the options array
                                            valueKey="sectorId"  // Should match the value field in the options array
                                            onChange={(selectedOptions) => handleMultipleSelectChange(selectedOptions, 'sectorIds', 'sectorId')}
                                        />

                                    </div>

                                    <div className="space-y-2">
                                        <span className='text-sm mt-8 font-semibold text-gray-600'>Region</span>
                                        <SingleSelectField
                                            label="Select Region"
                                            options={getUniqueRegions(micromarketOptions)}
                                            onChange={handleRegionChange}
                                            value={selectedRegion}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <span className='text-sm mt-8 font-semibold text-gray-600'>Micromarket</span>
                                        <MultipleSelect
                                            label="Select Micromarket"
                                            options={filteredMicromarkets}
                                            isMulti={true}
                                            labelKey="label"
                                            valueKey="value"
                                            onChange={(selectedOptions) => handleMultipleSelectChange(selectedOptions, 'micromarket', 'value')}
                                        />
                                    </div>
                                </div>

                                {/* Size Section */}
                                <div className="space-y-2">
                                    <span className='text-sm font-semibold text-gray-600'>Size</span>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: '8px' }}>
                                        <TextField
                                            label="From"
                                            type="text"
                                            size="small"
                                            sx={cusInput}
                                            name="sizeFrom"
                                            value={formState.sizeFrom}
                                            onChange={handleInputChange}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">sqft</InputAdornment>,
                                            }}
                                        />
                                        <TextField
                                            label="To"
                                            type="text"
                                            size="small"
                                            sx={cusInput}
                                            name="sizeTo"
                                            value={formState.sizeTo}
                                            onChange={handleInputChange}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">sqft</InputAdornment>,
                                            }}
                                        />
                                    </Box>

                                </div>

                                {/* Possession Status */}
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div className="space-y-2">
                                        <label className='text-sm font-semibold text-gray-600'>Possession Status</label>
                                        <div className="flex text-sm text-gray-600 flex-col space-y-2">
                                            {possessionStatusOptions.map(option => (
                                                <label key={option.possessionStatus}>
                                                    <input
                                                        type="checkbox"
                                                        value={option.possessionStatus} // Use the name as the value
                                                        checked={formState.possessionType.includes(option.possessionStatus)} // Check against the name
                                                        onChange={(e) => handleCheckboxChange(e, 'possessionType', true)} // Update the correct field in formState
                                                    /> {option.possessionStatus} {/* Display the name */}
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className='text-sm font-semibold text-gray-600'>Space Status</label>
                                        <div className="flex text-sm text-gray-600 flex-col space-y-2">
                                            {spaceStatusOptions.map(option => (
                                                <label key={option.spaceStatus}>
                                                    <input
                                                        type="checkbox"
                                                        value={option.spaceStatus} // Use the name as the value
                                                        checked={formState.spaceStatus.includes(option.spaceStatus)} // Check against the name
                                                        onChange={(e) => handleCheckboxChange(e, 'spaceStatus', true)} // Update the correct field in formState
                                                    /> {option.spaceStatus} {/* Display the name */}
                                                </label>
                                            ))}
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
                                            {Array.isArray(zoningOptions) && zoningOptions.map(option => (
                                                <label key={option.zoningId}>
                                                    <input
                                                        type="checkbox"
                                                        value={option.zoningId}
                                                        checked={formState.zoningIds.includes(option.zoningId)}
                                                        onChange={(e) => handleCheckboxChange(e, 'zoningIds')}
                                                    /> {option.zoning}
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Property Usage */}
                                    <div className="space-y-2">
                                        <label className='text-sm font-semibold text-gray-600'>Property Usage</label>
                                        <div className="grid text-sm text-gray-600 grid-cols-4 gap-2">
                                            {Array.isArray(propertyUsageOptions) && propertyUsageOptions.map(option => (
                                                <label key={option.propertyUsageId}>
                                                    <input
                                                        type="checkbox"
                                                        value={option.propertyUsageId}
                                                        checked={formState.propertyUsageIds.includes(option.propertyUsageId)}
                                                        onChange={(e) => handleCheckboxChange(e, 'propertyUsageIds')}
                                                    /> {option.propertyUsage}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {/* Rent */}
                                <div className="space-y-1">
                                    <span className='text-sm font-semibold text-gray-600'>Rent</span>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: '8px' }}>
                                        <TextField
                                            label="From"
                                            type="text"
                                            size="small"
                                            sx={cusInput}
                                            name="rentFrom"
                                            value={formState.rentFrom}
                                            onChange={handleInputChange}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">S$/Sq Ft/Month</InputAdornment>,
                                            }}
                                        />
                                        <TextField
                                            label="To"
                                            type="text"
                                            size="small"
                                            sx={cusInput}
                                            name="rentTo"
                                            value={formState.rentTo}
                                            onChange={handleInputChange}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">S$/Sq Ft/Month</InputAdornment>,
                                            }}
                                        />
                                    </Box>
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
                                                slotProps={{ textField: { size: 'small', shrink: true } }}
                                                value={formState.availableFrom ? new Date(formState.availableFrom) : null}
                                                onChange={(date) => handleDateChange(date, 'availableFrom')}
                                                sx={cusInput}
                                            />

                                            <DatePicker
                                                label="To"
                                                slotProps={{ textField: { size: 'small', shrink: true } }}
                                                value={formState.availableTo ? new Date(formState.availableTo) : null}
                                                onChange={(date) => handleDateChange(date, 'availableTo')}
                                                sx={cusInput}
                                            />
                                        </Box>
                                    </div>
                                    <div className="space-y-2">
                                        <span className='text-sm font-semibold text-gray-600'>Last Update</span>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
                                            <DatePicker
                                                label="From"
                                                slotProps={{ textField: { size: 'small', shrink: true } }}
                                                value={formState.lastUpdatedFrom ? new Date(formState.lastUpdatedFrom) : null}
                                                onChange={(date) => handleDateChange(date, 'lastUpdatedFrom')}
                                                sx={cusInput}
                                            />

                                            <DatePicker
                                                label="To"
                                                slotProps={{ textField: { size: 'small', shrink: true } }}
                                                value={formState.lastUpdatedTo ? new Date(formState.lastUpdatedTo) : null}
                                                onChange={(date) => handleDateChange(date, 'lastUpdatedTo')}
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
                        <div className="p-8 grid grid-cols-6  gap-x-8 gap-y-4 overflow-y-auto">
                            {/* Other Section */}
                            <div className="col-span-6">
                                <h2 className="text-md font-semibold mb-4">Other</h2>
                                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
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
                                            <InputLabel id="grade-label">Grade</InputLabel>
                                            <Select
                                                labelId="grade-label"
                                                id="grade-select"
                                                label="Grade"
                                                value={formState.grade}
                                                onChange={(event) => handleSelectChange(event, 'grade')}
                                            >
                                                {gradeOptions.map((option) => (
                                                    <MenuItem key={option.gradeId} value={option.grade}>
                                                        {option.grade}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>

                                    {/* Property Status */}
                                    <div className="flex flex-col gap-2">
                                        <label className="block text-sm font-medium">Property Status</label>
                                        <FormControl fullWidth size="small" sx={cusInput}>
                                            <InputLabel>Property Status</InputLabel>
                                            <Select
                                                label="Property Status"
                                                value={formState.buildingStatusIds}
                                                onChange={(event) => handleSelectChange(event, 'buildingStatusIds')}
                                            >
                                                {buildingStatusOptions.map((option) => (
                                                    <MenuItem key={option.buildingStatusId} value={option.buildingStatusId}>
                                                        {option.buildingStatus}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>

                                    {/* Ownership Structure */}
                                    <div className="flex flex-col gap-2">
                                        <label className="block text-sm font-medium">Ownership Structure</label>
                                        <div className="flex text-sm text-gray-600 flex-col space-y-2">
                                            {buildingOwnerOptions.map(option => (
                                                <label key={option.buildingOwnerId}>
                                                    <input
                                                        type="checkbox"
                                                        value={option.buildingOwnerId}
                                                        checked={formState.ownerIds?.includes(option.buildingOwnerId)}
                                                        onChange={(e) => handleCheckboxChange(e, 'ownerIds')}
                                                    /> {option.buildingOwner}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Public Transportation Section */}
                            <div className="col-span-6 mt-4">
                                <h2 className="text-md font-semibold mb-4">Public Transportation</h2>
                                <div className="grid grid-cols-2 gap-8">
                                    {/* MRT Fields */}
                                    <div className="flex flex-col gap-2">
                                        <label className="block text-sm font-medium">MRT</label>
                                        <Box sx={{ display: 'flex', gap: '8px', width: '100%' }}>
                                            <Box sx={{ flex: '2' }}>
                                                <MultipleSelect
                                                    label="Select MRT"
                                                    options={flattenStations()}
                                                    isMulti={true}
                                                    labelKey="label"
                                                    valueKey="value"
                                                    onChange={(selectedOptions) => handleMultipleSelectChange(selectedOptions, 'mrts', 'value')}
                                                />
                                            </Box>
                                            <Box sx={{ flex: '1' }}>
                                                <TextField
                                                    label="Distance"
                                                    type="number"
                                                    size="small"
                                                    sx={{
                                                        ...cusInput,
                                                        '& input[type=number]': {
                                                            MozAppearance: 'textfield',
                                                        },
                                                        '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                                                            WebkitAppearance: 'none',
                                                            margin: 0,
                                                        },
                                                    }}
                                                    value={formState.proximity || ''}
                                                    onChange={(e) => handleInputChange(e)}
                                                    name="proximity"
                                                />
                                            </Box>
                                        </Box>
                                    </div>
                                </div>
                            </div>

                            {/* Property Description Section */}
                            <div className="col-span-6 mt-4">
                                <h2 className="text-md font-semibold mb-4">Property Description</h2>
                                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
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
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">KN/Sqm</InputAdornment>, // Added InputAdornment
                                                }}
                                            />
                                            <TextField
                                                label="To"
                                                type="text"
                                                size="small"
                                                sx={cusInput}
                                                value={formState.floorLoadingTo}
                                                onChange={handleInputChange}
                                                name="floorLoadingTo"
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">KN/Sqm</InputAdornment>, // Added InputAdornment
                                                }}
                                            />
                                        </Box>
                                    </div>

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
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">m</InputAdornment>, // Example unit for height
                                                }}
                                            />
                                            <TextField
                                                label="To"
                                                type="text"
                                                size="small"
                                                sx={cusInput}
                                                value={formState.floorHeightTo}
                                                onChange={handleInputChange}
                                                name="floorHeightTo"
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">m</InputAdornment>, // Example unit for height
                                                }}
                                            />
                                        </Box>
                                    </div>

                                    {/* Floor System */}
                                    <div className="flex flex-col gap-2">
                                        <label className="block text-sm font-medium">Floor System</label>
                                        <FormControl fullWidth size="small" sx={cusInput}>
                                            <InputLabel>Floor System</InputLabel>
                                            <Select
                                                label="Floor System"
                                                value={formState.floorSystem}
                                                onChange={handleInputChange}
                                                name="floorSystem"
                                            >
                                                <MenuItem value="Concrete">Concrete</MenuItem>
                                                <MenuItem value="Raised">Raised</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>

                                    {/* Car Park Allocation Ratio */}
                                    <div className="flex flex-col gap-2">
                                        <label className="block text-sm font-medium">Car Park Allocation Ratio</label>
                                        <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                            <TextField
                                                size="small"
                                                sx={cusInput}
                                                value={formState.allocationRatio}
                                                onChange={handleInputChange}
                                                name="allocationRatio"
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">1:</InputAdornment>, // Added InputAdornment at the start
                                                    endAdornment: <InputAdornment position="end">Sq Ft leased</InputAdornment>, // InputAdornment at the end
                                                }}
                                            />
                                        </Box>

                                    </div>

                                    {/* Seasonal Parking Fee */}
                                    <div className="flex flex-col gap-2">
                                        <label className="block text-sm font-medium">Seasonal Parking Fee (Subject to GST)</label>
                                        <div className="flex flex-col space-y-4">
                                            <Box sx={{ display: 'flex', gap: '8px' }}>
                                                <TextField
                                                    label="Seasonal"
                                                    size="small"
                                                    sx={cusInput}
                                                    value={formState.seasonalParkingFee}
                                                    onChange={handleInputChange}
                                                    name="seasonalParkingFee"
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end">S$/lot/mth</InputAdornment>, // Added InputAdornment
                                                    }}
                                                />
                                            </Box>
                                            <Box sx={{ display: 'flex', gap: '8px' }}>
                                                <TextField
                                                    label="Non-Reserved"
                                                    size="small"
                                                    sx={cusInput}
                                                    value={formState.nonReservedParkingFee}
                                                    onChange={handleInputChange}
                                                    name="nonReservedParkingFee"
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end">S$/lot/mth</InputAdornment>, // Added InputAdornment
                                                    }}
                                                />
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
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">and over</InputAdornment>, // Added InputAdornment
                                                }}
                                            />
                                        </Box>
                                    </div>
                                </div>
                            </div>


                            {/* Space Details Section */}
                            <div className="col-span-6 mt-4">
                                <h2 className="text-md font-semibold mb-4">Space Details</h2>
                                <div className="grid grid-cols-2  gap-x-8 gap-y-4">
                                    {/* Ground Floor */}
                                    <div className="flex flex-col gap-2">
                                        <label className="block text-sm font-medium">Ground Floor</label>
                                        <FormControl>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={formState.groundFloor} // Ensure this maps to your state
                                                    // onChange={(e) => handleCheckboxChange(e, 'groundFloor')} // Handle checkbox change
                                                    />
                                                }
                                                label="Ground Floor"
                                            />
                                        </FormControl>
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
                                        </Box>
                                    </div>

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

                                    {/* Space Usage */}
                                    <div className="flex flex-col gap-2">
                                        <label className="block text-sm font-medium">Space Usage</label>
                                        {/* <div className="flex flex-col space-y-2">
                        {spaceUsageOptions.map(option => (
                            <label key={option.id}>
                                <input
                                    type="checkbox"
                                    value={option.id}
                                    checked={formState.spaceUsageIds?.includes(option.id)} // Check if it's selected
                                    // onChange={(e) => handleCheckboxChange(e, 'spaceUsageIds')} // Handle checkbox change
                                /> {option.label}
                            </label>
                        ))}
                    </div> */}
                                    </div>

                                    {/* Air Condition */}
                                    <div className="flex flex-col gap-2">
                                        <label className="block text-sm font-medium">Air Condition</label>
                                        <FormControl>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={formState.airCondition} // Ensure this maps to your state
                                                    // onChange={(e) => handleCheckboxChange(e, 'airCondition')} // Handle checkbox change
                                                    />
                                                }
                                                label="Yes"
                                            />
                                        </FormControl>
                                    </div>

                                    {/* Space View */}
                                    <div className="flex flex-col gap-2">
                                        <label className="block text-sm font-medium">Space View</label>
                                        <FormControl fullWidth size="small" sx={cusInput}>
                                            <InputLabel>Space View</InputLabel>
                                            <Select
                                                label="Space View"
                                                value={formState.spaceView}
                                                onChange={handleInputChange}
                                                name="spaceView"
                                            >
                                                {/* {spaceViewOptions.map(option => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.label}
                                </MenuItem>
                            ))} */}
                                            </Select>
                                        </FormControl>
                                    </div>

                                    {/* Space Condition */}
                                    <div className="flex flex-col gap-2">
                                        <label className="block text-sm font-medium">Space Condition</label>
                                        <FormControl fullWidth size="small" sx={cusInput}>
                                            <InputLabel>Space Condition</InputLabel>
                                            <Select
                                                label="Space Condition"
                                                value={formState.spaceCondition}
                                                onChange={handleInputChange}
                                                name="spaceCondition"
                                            >
                                                {/* {spaceConditionOptions.map(option => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.label}
                                </MenuItem>
                            ))} */}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>

                            {/* Conditional rendering for Retail space details */}
                            {isRetailSelected && (
                                <div className="col-span-6 mt-4">
                                    <h2 className="text-md font-semibold">Retail Space Details</h2>

                                    <Box className="mt-4">

                                        {/* Water Provision Checkbox */}
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={formState.waterProvision}
                                                    onChange={(e) => setFormState({ ...formState, waterProvision: e.target.checked })}
                                                />
                                            }
                                            label="Water Provision"
                                        />

                                        {/* Grease Trap Checkbox */}
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={formState.greaseTrap}
                                                    onChange={(e) => setFormState({ ...formState, greaseTrap: e.target.checked })}
                                                />
                                            }
                                            label="Grease Trap"
                                        />

                                        {/* Floor Trap Checkbox */}
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={formState.floorTrap}
                                                    onChange={(e) => setFormState({ ...formState, floorTrap: e.target.checked })}
                                                />
                                            }
                                            label="Floor Trap"
                                        />
                                    </Box>
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </div>
            <footer className="sticky bottom-0 bg-neutral-100 py-3 px-10 flex items-center gap-2 justify-start border border-neutral-200 shadow-md z-10 rounded-b-lg">
                {/* <button
                    // onClick={handleSaveNew}
                    type="submit"
                    className="px-8 py-3 rounded-lg bg-white text-blue-600 border border-neutral-500 text-xs hover:text-neutral-700 hover:bg-neutral-100"
                >
                    Cancel
                </button> */}
                <button
                    disabled={isLoading}
                    onClick={handleSubmit}
                    className="px-6 py-2 text-white rounded-lg bg-c-teal text-xs text-white hover:text-white hover:bg-c-weldon-blue"
                >
                    Search
                </button>
            </footer>
            {isLoading && (
                <div className="absolute inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-c-teal"></div>
                </div>
            )}
        </div>
    );
};

export default PropertySearchForm;
