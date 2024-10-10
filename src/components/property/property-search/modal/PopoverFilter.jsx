import { Box, FormControl, InputLabel, MenuItem, Select, Slider, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import DatePickerField from '../../../shared/element/DatePickerField';

function yearText(value) {
  return `${value}`; // Return the year as a label
}

const PopoverFilter = ({ isVisible, category, onClose }) => {
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const [activeButton, setActiveButton] = useState('All');
  const [value, setValue] = React.useState([2010, 2024]); // Default year range

  const popoverRef = useRef(null); // Create a reference for the popover

  const handleChange = (event, newValue) => {
    setValue(newValue); // Update the selected year range
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside of the popover but also not part of the dropdown or select component
      const popoverContainsTarget = popoverRef.current && popoverRef.current.contains(event.target);
      const isPartOfSelect = event.target.closest('.MuiSelect-root, .MuiSelect-menu, .MuiPaper-root');

      // Only close the popover if it's not part of the select dropdown
      if (!popoverContainsTarget && !isPartOfSelect) {
        onClose(); // Call the onClose function if clicked outside
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, onClose]);


  if (!isVisible) return null;

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const darkGreen = '#5a8184';
  const red = "#AD2A2A";
  const cusInput = {
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: darkGreen,
      },
      '&.Mui-focused fieldset': {
        borderColor: darkGreen,
      },
    },
    // '& .MuiInputLabel-root': { color: red, },
    '& .MuiInputLabel-root.Mui-focused': {
      color: darkGreen,
    },
  };

  // Render form fields or options based on the category
  const getPopoverContent = (category) => {
    switch (category) {
      case 'rent':
        return (
          <div className="p-4 w-96 space-y-5">
            <div>
              <span className='text-sm font-semibold text-gray-600'>Rent/Transacted</span>
              <Box
                component="form"
                sx={{
                  display: 'flex', // Set Box to flex layout
                  flexDirection: 'row',
                  gap: '16px',
                  alignItems: 'center',
                  '& .MuiTextField-root': { width: '100%' },
                }}
                noValidate
                autoComplete="off"
                size="small"
              >
                <TextField
                  type="number"
                  required
                  id="minumum"
                  label="Minimum"
                  size="small"
                  // value={form.buildingName}
                  margin="dense"
                  sx={cusInput}
                // onChange={(e) => onFormChange({ ...form, buildingName: e.target.value })}
                />
                <span>-</span>
                <TextField
                  type="number"
                  required
                  id="maximum"
                  label="Maximum"
                  size="small"
                  // value={form.streetName}
                  margin="dense"
                  sx={cusInput}
                // onChange={(e) => onFormChange({ ...form, streetName: e.target.value })}
                />
              </Box>
            </div>
            <div>
              <span className='text-sm font-semibold text-gray-600'>Year Period</span>
              <Box sx={{ width: "100%", px: 2 }}>
                <Slider
                  min={1900} // Minimum year
                  max={2024} // Maximum year
                  step={1} // Step by one year
                  value={value} // The current range value
                  onChange={handleChange} // Handle changes
                  valueLabelDisplay="auto" // Display the year above the slider
                  getAriaLabel={() => 'Year range'} // Aria label
                  getAriaValueText={yearText} // Display year text
                />
              </Box>
            </div>
          </div>
        );
      case 'propertyType':
        return (
          <div className='flex flex-col p-4 space-y-4'>
            <span className='text-sm font-semibold text-gray-600'>Property Type</span>
            <div className="relative inline-flex gap-2 rounded-full">
              {/* Button Items */}
              <span
                onClick={() => handleButtonClick('All')}
                className={`relative z-10 py-1 px-4 rounded-full cursor-pointer text-sm font-semibold transition-colors duration-100 ease-in-out
                ${activeButton === 'All' ? 'bg-c-teal text-white' : 'text-gray-600 bg-black/10 hover:bg-black/20'}`}
              >
                All
              </span>
              <span
                onClick={() => handleButtonClick('Office')}
                className={`relative z-10 py-1 px-4 rounded-full cursor-pointer text-sm font-semibold transition-colors duration-100 ease-in-out
                ${activeButton === 'Office' ? 'bg-c-teal text-white' : 'text-gray-600 bg-black/10 hover:bg-black/20'}`}
              >
                Office
              </span>
              <span
                onClick={() => handleButtonClick('Industrial')}
                className={`relative z-10 py-1 px-4 rounded-full cursor-pointer text-sm font-semibold transition-colors duration-100 ease-in-out
                ${activeButton === 'Industrial' ? 'bg-c-teal text-white' : 'text-gray-600 bg-black/10 hover:bg-black/20'}`}
              >
                Industrial
              </span>
              <span
                onClick={() => handleButtonClick('Retail')}
                className={`relative z-10 py-1 px-4 rounded-full cursor-pointer text-sm font-semibold transition-colors duration-100 ease-in-out
                ${activeButton === 'Retail' ? 'bg-c-teal text-white' : 'text-gray-600 bg-black/10 hover:bg-black/20'}`}
              >
                Retail
              </span>
            </div>
          </div>
        )
      case 'size':
        return (
          <div className="p-4 w-96 space-y-5">
            <div className='space-y-2'>
              <span className='text-sm font-semibold text-gray-600'>Size</span>
              <Box sx={{ width: "100%" }}>
                <FormControl fullWidth>
                  <InputLabel sx={cusInput} size="small" id="sizeType">Size Type</InputLabel>
                  <Select
                    size="small"
                    labelId="sizeType"
                    id="sizeType"
                    // value={age}
                    label="Sizez Type"
                    // onChange={handleChange}
                    // sx={cusInput}

                  >
                    <MenuItem value={10}>Option</MenuItem>
                    <MenuItem value={20}>Option</MenuItem>
                    <MenuItem value={30}>Option</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
            <div>
              {/* <span className='text-sm font-semibold text-gray-600'>Size</span> */}
              <Box
                component="form"
                sx={{
                  display: 'flex', // Set Box to flex layout
                  flexDirection: 'row',
                  gap: '16px',
                  alignItems: 'center',
                  '& .MuiTextField-root': { width: '100%' },
                }}
                noValidate
                autoComplete="off"
                size="small"
              >
                <TextField
                  type="text"
                  required
                  id="from"
                  label="From"
                  size="small"
                  // value={form.buildingName}
                  margin="dense"
                  sx={cusInput}
                // onChange={(e) => onFormChange({ ...form, buildingName: e.target.value })}
                />
                <span>-</span>
                <TextField
                  type="text"
                  required
                  id="to"
                  label="To"
                  size="small"
                  // value={form.streetName}
                  margin="dense"
                  sx={cusInput}
                // onChange={(e) => onFormChange({ ...form, streetName: e.target.value })}
                />
              </Box>
            </div>
          </div>
        )
      case 'availability':
        return (
          <div className="p-4 w-96 space-y-5">
            <div>
              <span className='text-sm font-semibold text-gray-600'>Availability</span>
              <Box
                component="form"
                sx={{
                  display: 'flex', // Set Box to flex layout
                  flexDirection: 'row',
                  gap: '16px',
                  alignItems: 'center',
                  '& .MuiTextField-root': { width: '100%' },
                }}
                noValidate
                autoComplete="off"
                size="small"
              >
                <DatePickerField />

                <span>-</span>
                <DatePickerField />

                {/* <TextField
                  type="text"
                  required
                  id="to"
                  label="To"
                  size="small"
                  // value={form.streetName}
                  margin="dense"
                  sx={cusInput}
                // onChange={(e) => onFormChange({ ...form, streetName: e.target.value })}
                /> */}
              </Box>
            </div>
          </div>
        )
      default:
        return <span className="block px-4 py-2 text-sm text-gray-500">No items available</span>;
    }
  };

  return (
    <div ref={popoverRef} className="absolute z-10 mt-2 right-0 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <main className="flex-1 overflow-y-auto">
        <div className="relative">
          {getPopoverContent(category)}
        </div>
      </main>

      <footer className="px-4 sticky bottom-0 bg-white py-3 flex items-center gap-2 justify-between border-t border-gray-200 shadow-md z-10 rounded-b-lg">
        <button
          // onClick={onClose}
          className="py-1 text-xs align-left text-c-red underline whitespace-nowrap"
        >
          Clear All

        </button>
        <button
          // onClick={handleSave}
          // disabled={!isFormValid}
          className="py-1 text-xs bg-c-teal text-white rounded-md hover:bg-c-teal/80"
        >
          Apply
        </button>
      </footer>
    </div>
  );
};

export default PopoverFilter;
