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
import PropertyResource from "../../PropertyResource";

export default function ModalSearch({ isVisible, onClose, category, form, onFormChange, setQuery, onClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Main'); // Default category
  const [selectedSubcategory, setSelectedSubcategory] = useState('CBD'); // Default subcategory
  const [propertyTypeOptions, setPropertyTypeOptions] = useState([]);
  const [accountType, setAccountType] = useState('');
  const [micromarketOptions, setMicromarketOptions] = useState([]);


  const { districts, setDistricts, fetchDistricts, propertyResources, fetchPropertyResources, useFetchResource, useFetchOptions } = PropertyResource();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch districts and property resources
        fetchDistricts();
        fetchPropertyResources();

        const fetchedPropertyType = await useFetchOptions('sector');
        setPropertyTypeOptions(fetchedPropertyType);

        // Fetch micromarkets
        const fetchedMicromarket = await useFetchResource('getmicromarkets');

        // If 'fetchedMicromarket' has a 'microMarkets' array
        if (fetchedMicromarket && fetchedMicromarket.microMarkets) {
          const micromarketOptionsData = fetchedMicromarket.microMarkets.map((micromarket, index) => ({
            id: `M${index + 1}`,
            name: micromarket,
            checked: false,
          }));

          setMicromarketOptions(micromarketOptionsData);
          console.error('micromarketOptionsData data.', micromarketOptionsData);

        } else {
          console.error('No micromarkets found in fetched data.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // const handleMicromarketSearch = (e) => {
  //   const searchTerm = e.target.value;
  //   setSearchTerm(searchTerm);
  //   const filtered = micromarketOptions.filter((micromarket) =>
  //     micromarket.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   setFilteredMicromarkets(filtered);
  // };

  const toggleMicromarket = (micromarketId) => {
    setMicromarketOptions((prevMicromarkets) => {
      const updatedMicromarkets = prevMicromarkets.map((micromarket) => {
        if (micromarket.id === micromarketId) {
          const newChecked = !micromarket.checked;

          // Update the formDistrict in the parent component
          const updatedFormMicromarket = newChecked
            ? [...form.regionId, micromarket.id] // Add selected micromarket ID
            : form.regionId.filter((id) => id !== micromarket.id);

          // Call onFormChange with the updated formDistrict structure
          onFormChange({
            ...form,
            regionId: updatedFormMicromarket,
          });

          return { ...micromarket, checked: newChecked };
        }
        return micromarket;
      });

      return updatedMicromarkets;
    });
  };

  const toggleAllMicromarkets = () => {
    const allChecked = micromarketOptions.every((m) => m.checked);
    const newCheckedState = !allChecked;

    setMicromarketOptions((prevMicromarkets) => {
      const updatedMicromarkets = prevMicromarkets.map((micromarket) => ({
        ...micromarket,
        checked: newCheckedState,
      }));

      // Update the regionId in formMicromarket in the parent component
      const updatedFormMicromarketRegionId = newCheckedState
        ? updatedMicromarkets.map((micromarket) => micromarket.id)
        : [];

      // Update formMicromarket state
      onFormChange({
        ...form,
        regionId: updatedFormMicromarketRegionId,
      });

      return updatedMicromarkets;
    });
  };

  const filteredMicromarkets = micromarketOptions.filter((micromarket) =>
    micromarket.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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


  const handleActionClick = () => {

    onClick(); // Call the onClick function to navigate
    onClose(); // Close the modal
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    // Update the parent form via the onFormChange callback
    onFormChange({
      ...form,
      [id]: value
    });
  };

  const handleClearAll = () => {
    if (category === "Address") {
      onFormChange({
        buildingName: '',
        streetNumber: '',
        streetName: '',
        postalCode: '',
        pageNo: 1,
        pageSize: 10
      });
    } else if (category === "District") {
      onFormChange({
        districts: [],
        pageNo: 1,
        pageSize: 10
      });
    } else if (category === "MRT") {
      onFormChange({
        mrts: [],
        pageNo: 1,
        pageSize: 10
      });
    } else if (category === "Account/Contacts") {
      onFormChange({
        keyword: '',
        type: '',
        pageNo: 1,
        pageSize: 10
      });
    }

  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };


  const toggleDistrict = (districtName) => {
    setDistricts((prevDistricts) => {
      const updatedDistricts = prevDistricts.map((district) => {
        if (district.name === districtName) {
          const newChecked = !district.checked;

          // Update the formDistrict in the parent component
          const updatedFormDistricts = newChecked
            ? [...form.districts, district.name]
            : form.districts.filter((name) => name !== district.name);

          // Call onFormChange with the updated formDistrict structure
          onFormChange({
            ...form,
            districts: updatedFormDistricts
          });

          return { ...district, checked: newChecked };
        }
        return district;
      });

      return updatedDistricts;
    });
  };

  const toggleAllDistricts = () => {
    const allChecked = districts.every((d) => d.checked);
    const newCheckedState = !allChecked;

    setDistricts((prevDistricts) => {
      const updatedDistricts = prevDistricts.map((district) => ({
        ...district,
        checked: newCheckedState,
      }));

      // Update the form.districts in the parent component
      const updatedFormDistricts = newCheckedState
        ? updatedDistricts.map((district) => district.name)
        : [];

      // Call onFormChange with the updated formDistrict structure
      onFormChange({
        ...form,
        districts: updatedFormDistricts
      });

      return updatedDistricts;
    });
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

  // const disableConditions = () => {
  //   if (form.buildingName) {
  //     // When Building Name is filled, disable all other fields
  //     return {
  //       buildingName: false,
  //       streetName: true,
  //       streetNumber: true,
  //       postalCode: true,
  //     };
  //   }
  //   if (form.postalCode) {
  //     // When Postal Code is filled, disable all other fields
  //     return {
  //       buildingName: true,
  //       streetName: true,
  //       streetNumber: true,
  //       postalCode: false,
  //     };
  //   }
  //   if (form.streetNumber) {
  //     // When Street No is filled, disable only Building Name and Postal Code, but leave Street Name enabled
  //     return {
  //       buildingName: true,
  //       streetName: false,
  //       streetNumber: false,
  //       postalCode: true,
  //     };
  //   }
  //   if (form.streetName) {
  //     // When Street Name is filled, disable only Building Name and Postal Code, but leave Street No enabled
  //     return {
  //       buildingName: true,
  //       streetName: false,
  //       streetNumber: false,
  //       postalCode: true,
  //     };
  //   }
  //   return {
  //     buildingName: false,
  //     streetName: false,
  //     streetNumber: false,
  //     postalCode: false,
  //   };
  // };
  // const disable = disableConditions();

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
                onChange={(e) => onFormChange({ ...form, buildingName: e.target.value })}
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
                onChange={(e) => onFormChange({ ...form, streetName: e.target.value })}
              />
            </Box>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <TextField
              type="number"
              id="streetNumber"
              value={form.streetNumber}
              onChange={(e) => onFormChange({ ...form, streetNumber: e.target.value })}
              required
              label="Street No"
              size="small"
              margin="dense"
              sx={cusInput}
            />
            <TextField
              type="number"
              id="postalCode"
              value={form.postalCode}
              onChange={(e) => onFormChange({ ...form, postalCode: e.target.value })}
              required
              label="Postal Code"
              size="small"
              margin="dense"
              sx={cusInput}
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
                value={
                  form.type
                    ? propertyResources.propertyContactKind.find(
                      (option) => option.accountContactType === form.type
                    ) || null
                    : null
                } options={propertyResources && propertyResources.propertyContactKind ? propertyResources.propertyContactKind : []}
                getOptionLabel={(option) => option.accountContactType}
                onChange={(event, newValue) => {
                  if (newValue) {
                    onFormChange({ ...form, type: newValue.accountContactType }); // Set the selected value to form
                  } else {
                    onFormChange({ ...form, type: '' }); // Reset the form value if no selection is made
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Contact Type"
                    margin="dense"
                    sx={cusInput} // Custom styles, you can modify as needed
                  />
                )}
              />

            </div>


            <span>Account/Contact Search</span>
            <div className="my-2">
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
                  id="Account"
                  label=""
                  size="small"
                  value={form.keyword}
                  margin="dense"
                  sx={cusInput}
                  onChange={(e) => onFormChange({ ...form, keyword: e.target.value })}
                />
              </Box>


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
        <div className="w-full px-4">
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
          <div className="mb-4 border-b-2 pb-2">
            <label className="flex items-center space-x-3 ml-1">
              <input
                type="checkbox"
                className="form-checkbox"
                onChange={toggleAllDistricts}
                checked={districts.every((d) => d.checked)}
              />
              <span>All Districts</span>
            </label>
          </div>

          {/* District list */}
          <ul className="grid grid-cols-2 gap-4">
            {filteredDistricts.map((district) => {
              const isChecked = form.districts.includes(district.name); // Check if district is in formDistrict

              return (
                <li
                  key={district.id}
                  className="flex items-center p-1 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-offset-2"
                    id={`district-${district.id}`}
                    checked={isChecked} // Set checked based on whether district is in formDistrict
                    onChange={() => toggleDistrict(district.name)} // Use district.name for toggle
                  />
                  <label
                    htmlFor={`district-${district.id}`}
                    className="w-full ml-3 text-gray-800 text-md whitespace-nowrap"
                  >
                    {district.name}
                  </label>
                </li>
              );
            })}
          </ul>

        </div>
      );
      break;
    case 'Micromarket':
      content = (
        <div className="w-full p-4">

          {/* Category Tabs */}
          <div className="mb-4 flex space-x-2">
            {propertyTypeOptions.map((categoryTab) => (
              <button
                key={categoryTab.sectorId} // Use sectorId as key for better uniqueness
                onClick={() => {
                  setSelectedCategory(categoryTab.sectorId); // Store sectorId in selectedCategory
                  onFormChange({
                    ...form,
                    sectorId: categoryTab.sectorId, // Update form with the selected sectorId
                  });
                }}
                className={`px- py-1 text-sm rounded-md border ${selectedCategory === categoryTab.sectorId
                  ? 'bg-gray-300 text-black'
                  : 'bg-white text-gray-500 hover:bg-gray-200'
                  }`}
              >
                {categoryTab.sector} {/* Display sector name */}
              </button>
            ))}
          </div>



          {/* Subcategory Tabs */}
          {/* <div className="mb-4 flex space-x-2">
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
          </div> */}

          {/* Search Box */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search Micromarket"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* All Micromarkets Select */}
          <div className="mb-4 border-b-2 pb-2">
            <label className="flex items-center space-x-3 ml-1">
              <input
                type="checkbox"
                className="form-checkbox"
                onChange={toggleAllMicromarkets}
                checked={micromarketOptions.every((m) => m.checked)}
              />
              <span>All Micromarkets</span>
            </label>
          </div>

          {/* Micromarket List */}
          <ul className="grid grid-cols-2 gap-4">
            {filteredMicromarkets.map((micromarket) => {
              const isChecked = form.regionId.includes(micromarket.id);

              return (
                <li
                  key={micromarket.id}
                  className="flex items-center p-1 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-offset-2"
                    id={`micromarket-${micromarket.id}`}
                    checked={isChecked}
                    onChange={() => toggleMicromarket(micromarket.id)} // Toggle individual micromarket
                  />
                  <label
                    htmlFor={`micromarket-${micromarket.id}`}
                    className="w-full ml-3 text-gray-800 text-md whitespace-nowrap"
                  >
                    {micromarket.name}
                  </label>
                </li>
              );
            })}
          </ul>

        </div>
      );
      break;
    case 'MRT':
      content = (
        <MRTStations form={form} onFormChange={onFormChange} />
      )
      break;
    default:
      content = <p>No content available.</p>;
  }

  const handleApplyClick = () => {
    const queryString = `${form}`;
    // const queryString = `${form.buildingName},${form.streetNumber},${form.streetName},${form.postalCode}`;
    setQuery(queryString); // Update the query with address details
    onClose(); // Close the modal
  };

  // const handleSearchClick = () => {
  //   // Default search logic
  //   // navigate('result');
  //   onClick();
  //   onClose();
  // };
  const handleBackdropClick = (e) => {
    // Close modal when clicking on the backdrop
    if (onClose) onClose();
  };

  const handleModalContentClick = (e) => {
    // Prevent the modal from closing when clicking inside the modal
    e.stopPropagation();
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${onClose ? 'animate-fade-in' : 'animate-fade-out'}`} onClick={handleBackdropClick}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className={`relative flex flex-col w-full ${category === 'Micromarket' || category === 'District' || category === "MRT" ? 'max-w-5xl h-4/5' : 'max-w-md'
        } bg-white shadow-lg rounded-lg`} onClick={handleModalContentClick}
      >
        {/* Header */}
        <div className="flex bg-c-teal justify-between items-center p-4 border-b rounded-t-lg">
          <span className="text-lg text-white font-semibold">Search by {category}</span>
          <span onClick={onClose} className="cursor-pointer text-white text-lg hover:text-white/80">
            &times;
          </span>
        </div>

        {/* Modal Content */}
        <main className="flex-1 h-full overflow-y-auto">
          <div className="p-2 relative">
            {content}
          </div>
        </main>

        <footer className="px-4 sticky bottom-0 bg-neutral-100 py-3 flex items-center gap-2 justify-between border-t border-neutral-500 shadow-md z-10 rounded-b-lg">
          <button
            onClick={handleClearAll}
            className="text-red-600 text-sm underline"
          >
            Clear All
          </button>
          {/* {category === 'District' ? : } */}
          <button
            onClick={handleActionClick}
            className="py-y text-sm bg-c-teal text-white rounded-md hover:bg-c-teal/80"
          >
            {category === 'District' ? 'Apply' : 'Search'}
          </button>

        </footer>

      </div>
    </div>



  );
};
