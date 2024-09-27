import React, { useEffect, useState } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Stack,
  Autocomplete,
} from "@mui/material";
import { Search, Clear } from "@mui/icons-material";
import { CONTACTDATADUMMY, DISTRICTDATA } from "../../../lib/const/DummyData";
import MRTStations from "./MRTStations";

export default function ModalSearch({ isVisible, onClose, category, form, onFormChange, setQuery, onClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Main'); // Default category
  const [selectedSubcategory, setSelectedSubcategory] = useState('CBD'); // Default subcategory
  const [districts, setDistricts] = useState(DISTRICTDATA);

  if (!isVisible) return null;

  const darkGreen = '#5a8184';
  const cusInput = {
    '& .MuiOutlinedInput-root': {
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

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


  const handleInputChange = (e) => {
    const { id, value } = e.target;
    // Update the parent form via the onFormChange callback
    onFormChange({
      ...form,
      [id]: value
    });
  };

  const handleClearAll = () => {
    onFormChange({
      buildingName: '',
      streetNumber: '',
      streetName: '',
      postalCode: ''
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleDistrict = (id) => {
    setDistricts((prevDistricts) =>
      prevDistricts.map((district) =>
        district.id === id
          ? { ...district, checked: !district.checked }
          : district
      )
    );
  };

  const filteredDistricts = districts.filter((district) =>
    district.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const disableEverythingExcept = (field) => {
    return {
      buildingName: field !== 'buildingName',
      streetName: field !== 'streetName',
      streetNumber: field !== 'streetNumber',
      postalCode: field !== 'postalCode',
    };
  };

  // Determine what to disable based on the current form values
  const disableConditions = () => {
    if (form.buildingName) {
      // When Building Name is filled, disable all other fields
      return {
        buildingName: false,
        streetName: true,
        streetNumber: true,
        postalCode: true,
      };
    }
    if (form.postalCode) {
      // When Postal Code is filled, disable all other fields
      return {
        buildingName: true,
        streetName: true,
        streetNumber: true,
        postalCode: false,
      };
    }
    if (form.streetNumber) {
      // When Street No is filled, disable only Building Name and Postal Code, but leave Street Name enabled
      return {
        buildingName: true,
        streetName: false,
        streetNumber: false,
        postalCode: true,
      };
    }
    if (form.streetName) {
      // When Street Name is filled, disable only Building Name and Postal Code, but leave Street No enabled
      return {
        buildingName: true,
        streetName: false,
        streetNumber: false,
        postalCode: true,
      };
    }
    return {
      buildingName: false,
      streetName: false,
      streetNumber: false,
      postalCode: false,
    };
  };
  const disable = disableConditions();

  let content;
  switch (category) {
    case 'Address':
      content = (
        <div className="max-w-md mx-auto p-2">
          <div className="mb-4">
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { width: '100%' },
              }}
              noValidate
              autoComplete="off"
              size="small"
            >
              <TextField
                type="text"
                required
                id="buildingName"
                label="Building Name"
                size="small"
                value={form.buildingName}
                margin="dense"
                sx={cusInput}
                onChange={handleInputChange}
                disabled={disable.buildingName}
              />
              <TextField
                type="text"
                required
                id="streetName"
                label="Street Name"
                size="small"
                value={form.streetName}
                margin="dense"
                sx={cusInput}
                onChange={handleInputChange}
                disabled={disable.streetName}
              />
            </Box>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <TextField
              type="number"
              id="streetNumber"
              value={form.streetNumber}
              onChange={handleInputChange}
              required
              label="Street No"
              size="small"
              margin="dense"
              sx={cusInput}
              disabled={disable.streetNumber}
            />
            <TextField
              type="number"
              id="postalCode"
              value={form.postalCode}
              onChange={handleInputChange}
              required
              label="Postal Code"
              size="small"
              margin="dense"
              sx={cusInput}
              disabled={disable.postalCode}
            />
          </div>
        </div>
      );
      break;
    case 'Account/Contacts':
      content = (
        <div className='mb-2 w-full'>
          <div className="px-4 w-full">
            <div className="mb-4">
              <span>Account/Contact Type</span>
              <Autocomplete
                id="size-small-standard"
                size="small"
                options={CONTACTDATADUMMY}
                getOptionLabel={(option) => option.name}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setEmail(newValue.email);
                    setContactName(newValue.name);
                  } else {
                    setEmail('');
                    setContactName('');
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Related Type"
                    margin="dense"
                    // variant="standard"
                    sx={cusInput}
                  />
                )}
              />
            </div>

            <Stack spacing={2} width={'100%'}>


              <Autocomplete
                id="size-small-standard"
                size="small"
                options={CONTACTDATADUMMY}
                getOptionLabel={(option) => option.name}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setEmail(newValue.email);
                    setContactName(newValue.name);
                  } else {
                    setEmail('');
                    setContactName('');
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Account/Contact Search"
                    margin="dense"
                    sx={cusInput}
                  />
                )}
              />
            </Stack>
            <div className="flex gap-2 items-center">
              <Checkbox {...label} size="small"
              />
              <span className="text-sm">Keyword Search</span>
            </div>
            <div className="flex gap-2 items-center">
              <Checkbox {...label} size="small"
              />
              <span className="text-sm">Include related account</span>
            </div>

          </div>

          {/* <div className="px-4 w-full">
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { width: '100%' },
              }}
              noValidate
              autoComplete="off"
              size="small"
            >
              <TextField
                required
                id="outlined-required"
                label="Account"
                size="small"
                margin="dense"
                sx={cusInput}
              />
              <TextField
                required
                id="outlined-required"
                label="Contact"
                size="small"
                margin="dense"
                sx={cusInput}
              />
            </Box>
          </div> */}
        </div>
      );
      break;
    case 'District':
      content = (
        <div className="w-full p-4">
          {/* Search Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search District"
              value={searchTerm}
              onChange={handleSearch}
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* All Districts Select */}
          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox"
                onChange={() =>
                  setDistricts((prevDistricts) =>
                    prevDistricts.map((district) => ({
                      ...district,
                      checked: !districts.every((d) => d.checked),
                    }))
                  )
                }
                checked={districts.every((d) => d.checked)}
              />
              <span>All Districts</span>
            </label>
          </div>

          {/* District List */}
          <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
            {filteredDistricts.map((district) => (
              <li key={district.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  id={`district-${district.id}`}
                  checked={district.checked}
                  onChange={() => toggleDistrict(district.id)}
                />
                <label htmlFor={`district-${district.id}`}>
                  {district.id} {district.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      );
      break;
    case 'Region/Micromarket':
      content = (
        <div className="w-full p-4">

          {/* Category Tabs */}
          <div className="mb-4 flex space-x-2">
            {['Main', 'Office', 'Industrial', 'Retail'].map((categoryTab) => (
              <button
                key={categoryTab}
                onClick={() => setSelectedCategory(categoryTab)}
                className={`px- py-1 text-sm rounded-md border ${selectedCategory === categoryTab
                  ? 'bg-gray-300 text-black'
                  : 'bg-white text-gray-500 hover:bg-gray-200'
                  }`}
              >
                {categoryTab}
              </button>
            ))}
          </div>

          {/* Subcategory Tabs */}
          <div className="mb-4 flex space-x-2">
            {['CBD', 'Central', 'East', 'North', 'North-East', 'West'].map((subcategory) => (
              <button
                key={subcategory}
                onClick={() => setSelectedSubcategory(subcategory)}
                className={`px- py-1 text-sm rounded-md border ${selectedSubcategory === subcategory
                  ? 'bg-gray-300 text-black'
                  : 'bg-white text-gray-500 hover:bg-gray-200'
                  }`}
              >
                {subcategory}
              </button>
            ))}
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Search District"
              value={searchTerm}
              onChange={handleSearch}
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* All Districts Select */}
          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox"
                onChange={() =>
                  setDistricts((prevDistricts) =>
                    prevDistricts.map((district) => ({
                      ...district,
                      checked: !districts.every((d) => d.checked),
                    }))
                  )
                }
                checked={districts.every((d) => d.checked)}
              />
              <span>All Districts</span>
            </label>
          </div>

          {/* District List */}
          <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
            {filteredDistricts.map((district) => (
              <li key={district.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  id={`district-${district.id}`}
                  checked={district.checked}
                  onChange={() => toggleDistrict(district.id)}
                />
                <label htmlFor={`district-${district.id}`}>
                  {district.id} {district.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      );
      break;
    case 'MRT':
      content = (
        <MRTStations />
      )
      break;
    default:
      content = <p>No content available.</p>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        className={`bg-white rounded-lg shadow-lg w-full ${category === 'Region/Micromarket' || category === 'District' ? 'max-w-4xl' : 'max-w-md'
          }`}
      >        {/* Header */}
        <div className="flex bg-c-teal justify-between items-center p-4 border-b rounded-t-lg">
          <span className="text-lg text-white font-semibold">Search by {category}</span>
          <span onClick={onClose} className="cursor-pointer text-white text-lg hover:text-white/80">
            &times;
          </span>
        </div>

        {/* Modal Content */}
        <div className="p-4 ">
          {content}
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-between space-x-4">
          <button
            onClick={handleClearAll}
            className="text-red-600 text-sm underline"
          >
            Clear All
          </button>
          <button
            onClick={() => {
              const queryString = `${form.buildingName},${form.streetNumber},${form.streetName},${form.postalCode}`;
              setQuery(queryString); // Update the query in the parent component
              onClose(); // Close the modal
              onClick();
            }}
            className="py-1 text-sm bg-c-teal text-white rounded-md hover:bg-c-teal/80"
          >
            Search
          </button>


        </div>
      </div>
    </div>

  );
};
