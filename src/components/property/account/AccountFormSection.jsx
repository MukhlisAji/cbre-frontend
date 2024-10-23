import { debounce } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { MdClear } from 'react-icons/md';
import { CONFIG } from '../../../config';
import { InputField, AutocompleteField, SingleSelectField, MultipleSelectField } from '../FormFields';
import { generateTransactionId } from '../../lib/api/Authorization';



// const InputField = ({
//     label,
//     type = 'text',
//     value,
//     onChange,
//     required = false,
//     disabled = false
// }) => {
//     const handleClear = () => {
//         onChange({ target: { value: '' } });
//     };

//     return (
//         <div className="relative">
//             <label className="block text-sm font-medium text-gray-700">
//                 {label}{required && <span className="text-red-500">*</span>}
//             </label>
//             <div className="relative">
//                 <input
//                     type={type}
//                     value={value}
//                     onChange={onChange}
//                     required={required}
//                     disabled={disabled}
//                     className={`mt-1 block w-full p-1.5 pr-8 border border-gray-300 rounded-md shadow-sm focus:outline-none
//                     focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`}
//                 />
//                 {value && !disabled && (
//                     <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
//                         <MdClear
//                             onClick={handleClear}
//                             className='text-gray-400 hover:text-gray-600 cursor-pointer'
//                         />
//                     </span>
//                 )}
//             </div>
//         </div>
//     );
// };

// const SelectField = ({
//     label,
//     value = [],
//     onChange,
//     options = [],
//     valueField = 'id',
//     labelField = 'label',
//     required = false,
//     disabled = false,
//     initialSearchTerm = '',
//     multiple = false,
// }) => {
//     const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
//     const [showDropdown, setShowDropdown] = useState(false);
//     const [selectedValues, setSelectedValues] = useState(value);
//     const dropdownRef = useRef(null);

//     // Handle outside click to close dropdown
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setShowDropdown(false);
//             }
//         };
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     // Synchronize value with internal state
//     useEffect(() => {
//         if (Array.isArray(value) && value.length > 0) {
//             setSelectedValues(value);
//         } else if (!multiple && value) {
//             const selectedOption = options.find(option => option[valueField] === value);
//             setSearchTerm(selectedOption ? selectedOption[labelField] : '');
//             setSelectedValues([value]);
//         }
//     }, [value, options, multiple, valueField, labelField]);

//     const handleInputChange = (e) => {
//         setSearchTerm(e.target.value);
//         setShowDropdown(true);
//     };

//     const handleOptionClick = (option) => {
//         if (multiple) {
//             const newSelectedValues = selectedValues.includes(option[valueField])
//                 ? selectedValues.filter(val => val !== option[valueField])
//                 : [...selectedValues, option[valueField]];

//             setSelectedValues(newSelectedValues);
//             onChange({ target: { value: newSelectedValues } });
//             setSearchTerm(''); // Reset the search term to an empty string
//             setShowDropdown(true); // Keep the dropdown open for further selections
//         } else {
//             onChange({ target: { value: option[valueField] } });
//             setSearchTerm(option[labelField]);
//             setShowDropdown(false);
//         }
//     };

//     const handleInputFocus = () => {
//         setShowDropdown(true);
//     };

//     const removeOption = (optionToRemove) => {
//         const newSelectedValues = selectedValues.filter(val => val !== optionToRemove);
//         setSelectedValues(newSelectedValues);
//         onChange({ target: { value: newSelectedValues } });
//     };

//     const clearSelection = (e) => {
//         e.stopPropagation(); // Prevent the dropdown from opening
//         setSearchTerm('');
//         setShowDropdown(true);
//         setSelectedValues([]);
//         onChange({ target: { value: null } });
//     };

//     const filteredOptions = options.filter(option => {
//         const optionLabel = option[labelField];
//         return typeof optionLabel === 'string' &&
//             typeof searchTerm === 'string' &&
//             optionLabel.toLowerCase().includes(searchTerm.toLowerCase());
//     });

//     return (
//         <div className="relative" ref={dropdownRef}>
//             <label className="block text-sm font-medium text-gray-700">
//                 {label}{required && <span className="text-red-500">*</span>}
//             </label>

//             {multiple && (
//                 <div className="flex flex-wrap gap-2 mb-2">
//                     {selectedValues.map(selectedId => {
//                         const selectedOption = options.find(option => option[valueField] === selectedId);
//                         return selectedOption ? (
//                             <div key={selectedId} className="bg-gray-200 px-2 h-8 py-1 rounded-full flex items-center">
//                                 <span>{selectedOption[labelField]}</span>
//                                 <span
//                                     onClick={() => removeOption(selectedId)}
//                                     className="ml-2 text-md text-gray-600 hover:text-gray-800 cursor-pointer"
//                                 >
//                                     <MdClear />
//                                 </span>
//                             </div>
//                         ) : null;
//                     })}
//                 </div>
//             )}

//             <div className="relative">
//                 <input
//                     type="text"
//                     value={searchTerm}
//                     onChange={handleInputChange}
//                     onFocus={handleInputFocus}
//                     required={required && selectedValues.length === 0}
//                     disabled={disabled}
//                     className={`mt-1 block w-full p-1.5 pr-8 border border-gray-300 rounded-md shadow-sm focus:outline-none
//                     focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`}
//                     placeholder={multiple ? "Search..." : "--Select--"}
//                 />
//                 {!multiple && searchTerm && (

//                     <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
//                         <MdClear onClick={clearSelection} className='text-md cursor-pointer' />
//                     </span>


//                 )}
//             </div>
//             {
//                 showDropdown && filteredOptions.length > 0 && (
//                     <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
//                         {filteredOptions.map((option) => (
//                             <li
//                                 key={option[valueField]}
//                                 className="px-4 py-2 cursor-pointer hover:bg-gray-200"
//                                 onClick={() => handleOptionClick(option)}
//                             >
//                                 {option[labelField]}
//                             </li>
//                         ))}
//                     </ul>
//                 )
//             }
//         </div >
//     );
// };
// const AutocompleteField = ({
//     label,
//     value,
//     onChange,
//     searchApi,
//     required = false,
//     disabled = false,
//     multiple = false,
// }) => {
//     const [filteredOptions, setFilteredOptions] = useState([]);
//     const [showDropdown, setShowDropdown] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedOptions, setSelectedOptions] = useState([]);
//     const dropdownRef = useRef(null);

//     const fetchAccountDetails = async (accountId) => {
//         try {
//             const response = await fetch(`${CONFIG.ACCOUNT_SERVICE}/${accountId}`, {
//                 method: 'GET',
//                 headers: {
//                     'transactionId': '4646765766', // You might want to generate this dynamically
//                     'Cookie': 'CookieConsentPolicy=0:1; LSKey-c$CookieConsentPolicy=0:1',
//                 },
//             });
//             const data = await response.json();
//             return data.resultSet.accountName;
//         } catch (error) {
//             console.error("Error fetching account details:", error);
//             return null;
//         }
//     };

//     // Fetch account details when value (ID) changes
//     useEffect(() => {
//         const fetchAccountName = async () => {
//             if (value && !multiple) {
//                 const accountName = await fetchAccountDetails(value);
//                 if (accountName) {
//                     setSearchTerm(accountName);
//                     setSelectedOptions([{ id: value, label: accountName }]);
//                 }
//             } else if (multiple && Array.isArray(value)) {
//                 // Ensure value is a flat array of IDs
//                 const ids = value.flat();
//                 const accountPromises = ids.map(id => fetchAccountDetails(id));
//                 const accountNames = await Promise.all(accountPromises);
//                 const newSelectedOptions = accountNames.map((name, index) => ({
//                     id: ids[index],
//                     label: name
//                 })).filter(option => option.label !== null);
//                 setSelectedOptions(newSelectedOptions);
//             } else {
//                 setSearchTerm('');
//                 setSelectedOptions([]);
//             }
//         };

//         fetchAccountName();
//     }, [value, multiple]);


//     const handleInputChange = (e) => {
//         const newValue = e.target.value;
//         setSearchTerm(newValue);


//         const debouncedSearch = debounce(async () => {
//             if (newValue.length >= 2) {
//                 try {
//                     const searchResults = await searchApi(newValue);
//                     setFilteredOptions(searchResults);
//                     setShowDropdown(true);
//                 } catch (error) {
//                     console.error("Error fetching search results:", error);
//                 }
//             } else {
//                 setShowDropdown(false);
//             }
//         }, 2000);


//         debouncedSearch();


//         return () => {
//             debouncedSearch.cancel();
//         };
//     };


//     const handleOptionClick = (option) => {
//         let newSelectedOptions;
//         if (multiple) {
//             newSelectedOptions = selectedOptions.some(item => item.id === option.id)
//                 ? selectedOptions.filter(item => item.id !== option.id)
//                 : [...selectedOptions, option];
//             setSearchTerm('');
//         } else {
//             newSelectedOptions = [option];
//             setSearchTerm(option.label);
//         }

//         setSelectedOptions(newSelectedOptions);
//         setShowDropdown(false);

//         if (multiple) {
//             // Change this line
//             onChange(newSelectedOptions.map(opt => opt.id));
//         } else {
//             onChange(option.id); // Change this to only pass the ID
//         }
//     };


//     const handleClickOutside = (event) => {
//         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//             setShowDropdown(false);
//         }
//     };


//     useEffect(() => {
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);


//     const removeOption = (optionToRemove) => {
//         const newSelectedOptions = selectedOptions.filter(option => option.id !== optionToRemove.id);
//         setSelectedOptions(newSelectedOptions);
//         if (multiple) {
//             // Change this line
//             onChange(newSelectedOptions.map(opt => opt.id));
//         } else {
//             onChange(null);
//             setSearchTerm('');
//         }
//     };

//     const clearSelection = (e) => {
//         e.stopPropagation(); // Prevent the dropdown from opening
//         setSearchTerm('');
//         setShowDropdown(true);
//         setSelectedValues([]);
//         onChange({ target: { value: null } });
//     };

//     return (
//         <div className="relative" ref={dropdownRef}>
//             <label className="block text-sm font-medium text-gray-700">
//                 {label}{required && <span className="text-red-500">*</span>}
//             </label>
//             {multiple && (
//                 <div className="flex flex-wrap gap-2 mb-2">
//                     {selectedOptions.map(option => (
//                         <div key={option.id} className="bg-gray-200 px-2 h-8 py-1 rounded-full flex items-center">
//                             <span>{option.label}</span>
//                             <span onClick={() => removeOption(option)} className="ml-2 cursor-pointer text-md text-gray-600 hover:text-gray-800">
//                                 <MdClear />
//                             </span>
//                         </div>
//                     ))}
//                 </div>
//             )}
//             <div className="relative">

//                 <input
//                     type="text"
//                     value={searchTerm}
//                     onChange={handleInputChange}
//                     required={required && selectedOptions.length === 0}
//                     disabled={disabled}
//                     className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
//                     placeholder={multiple ? (selectedOptions.length > 0 ? "Add more..." : "--Select--") : "--Select--"}
//                 />
//                 {!multiple && searchTerm && (

//                     <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
//                         <MdClear onClick={clearSelection} className='text-md cursor-pointer' />
//                     </span>


//                 )}
//             </div>
//             {showDropdown && filteredOptions.length > 0 && (
//                 <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
//                     {filteredOptions.map((option) => (
//                         <li
//                             key={option.id}
//                             className="px-2 py-2 cursor-pointer hover:bg-gray-200"
//                             onClick={() => handleOptionClick(option)}
//                         >
//                             {option.label}
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

export default function AccountFormSection({
    formData,
    setFormData,
    toggleVisibility,
    sectionVisibility,
    copyBillingToShipping,
    isEditing,
    formLabel,
    setFormLabel,
}) {
    const [resourceData, setResourceData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [accountOwnerOptions, setAccountOwnerOptions] = useState([]);
    const [selectedParentAccount, setSelectedParentAccount] = useState('');

    useEffect(() => {
        const fetchResourceData = async () => {
            const cachedData = localStorage.getItem('resourceData');
            if (cachedData) {
                setResourceData(JSON.parse(cachedData));
            } else {
                try {
                    const response = await fetch(`${CONFIG.ACCOUNT_SERVICE}/resources`, {
                        method: 'GET',
                        headers: {
                            'transactionId': generateTransactionId(),
                            'Cookie': 'CookieConsentPolicy=0:1; LSKey-c$CookieConsentPolicy=0:1'
                        }
                    });
                    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                    const data = await response.json();
                    setResourceData(data.resultSet);
                    localStorage.setItem('resourceData', JSON.stringify(data.resultSet));
                } catch (error) {
                    console.error('Error fetching resource data:', error);
                }
            }
        };
        fetchResourceData();
    }, []);

    useEffect(() => {
        console.log("formLabel ", formLabel);

    }, [formLabel]);

    const handleInputChange = (field, subField = null) => (e) => {
        const newValue = e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            [field]: subField
                ? { ...prevData[field], [subField]: newValue }
                : newValue,
        }));
    };

    const handleCountryChange = (field, countryField, stateField, countryCodeField) => (e) => {
        const selectedCountry = resourceData.country.find(c => c.countryName === e.target.value);
        const countryCode = selectedCountry ? selectedCountry.countryCode : '';

        setFormData((prevData) => ({
            ...prevData,
            [field]: {
                ...prevData[field],
                [countryField]: e.target.value,
                [countryCodeField]: countryCode,
                [stateField]: '', // Reset the state when a new country is selected
            },
        }));
    };

    // const fetchAccountOwnerOptions = debounce(async (name) => {
    //     try {
    //         const response = await fetch(`http://localhost:8084/cbre/utilities/find-employee?name=${name}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Cookie': 'CookieConsentPolicy=0:1; LSKey-c$CookieConsentPolicy=0:1',
    //             },
    //         });
    //         if (response.ok) {
    //             const data = await response.json();
    //             setAccountOwnerOptions(data.resultSet.map(emp => ({ id: emp.id, label: `${emp.givenName} ${emp.surname}` })));
    //         } else {
    //             console.error('Failed to fetch account owner options');
    //         }
    //     } catch (error) {
    //         console.error('Error fetching account owner options:', error);
    //     }
    // }, 500); // 500ms delay

    // const handleSearchChange = (e) => {
    //     setSearchTerm(e.target.value);
    //     fetchAccountOwnerOptions(e.target.value);
    // };

    const searchAccountOwners = async (searchTerm) => {
        const response = await fetch(`${CONFIG.UTILITIES_SERVICE}/find-employee?name=${searchTerm}`, {
            method: 'GET',
            headers: {
                'Cookie': 'CookieConsentPolicy=0:1; LSKey-c$CookieConsentPolicy=0:1',
            },
        });
        const data = await response.json();
        return data.resultSet.map((employee) => ({
            id: employee.id,
            label: `${employee.givenName} ${employee.surname}`,
        }));
    };

    const searchAccountName = async (searchTerm) => {
        const response = await fetch(`${CONFIG.ACCOUNT_SERVICE}/find-account?name=${searchTerm}`, {
            method: 'GET',
            headers: {
                'Cookie': 'CookieConsentPolicy=0:1; LSKey-c$CookieConsentPolicy=0:1',
            },
        });
        const data = await response.json();
        return data.resultSet.map((account) => ({
            id: account.id,
            label: `${account.accountName}`,
            salesforceId: account.salesforceId,
        }));
    };

    const sections = [
        {
            title: 'Account Information',
            visibilityKey: 'accountInformationVisible',
            fields: [
                { label: 'Account Name', type: 'text', value: formData.accountDetails.accountName, onChange: handleInputChange('accountDetails', 'accountName'), required: true },
                // { label: 'Parent Account', type: 'text', value: formData.accountDetails.parentAccount, onChange: handleInputChange('accountDetails', 'parentAccount') },
                {
                    label: 'Parent Name',
                    value: formLabel.parentAccountName
                        ? { id: formLabel.parentAccountId, label: formLabel.parentAccountName }
                        : null,
                    onChange: (selectedAccount) => {
                        // Check if the selectedAccount is an array and use the first item if so
                        const account = Array.isArray(selectedAccount) ? selectedAccount[0] : selectedAccount;

                        console.log("Selected Account: ", account); // Ensure the correct account object is logged

                        if (account && account.id) {
                            // Save the selected account info to display the label
                            setSelectedParentAccount(account);

                            // Update the primary form data with the selected parent account ID
                            setFormData((prevData) => ({
                                ...prevData,
                                accountDetails: {
                                    ...prevData.accountDetails,
                                    parentAccount: account.id, // Only update parentAccount field
                                },
                            }));

                            // Update the formLabel to store the new selected account's name
                            setFormLabel((prevLabels) => ({
                                ...prevLabels,
                                parentAccountName: account.label, // Update label with new name
                                parentAccountId: account.id
                            }));
                        } else {
                            console.error("No valid account selected:", account);
                        }
                    },
                    searchApi: searchAccountName,
                    required: true,
                },
                { label: 'Local Account Name', type: 'text', value: formData.accountDetails.localAccountName, onChange: handleInputChange('accountDetails', 'localAccountName') },
                {
                    label: 'Client Type',
                    value: formData.accountDetails.clientType.map((client) => ({
                        id: client.clientTypeId, // ID from formData
                        label: client.clientTypeName, // Name from formData
                    })),
                    onChange: (newSelectedValues) => {
                        // Update formData with new clientType information based on selected values
                        setFormData((prevData) => ({
                            ...prevData,
                            accountDetails: {
                                ...prevData.accountDetails,
                                clientType: newSelectedValues.map((selected) => ({
                                    clientTypeId: selected.id, // Keep the ID
                                    clientTypeName: selected.label, // Keep the name
                                })),
                            },
                        }));
                        console.log('Updated client types:', newSelectedValues);
                    },
                    options: resourceData?.clientType.map(client => ({
                        id: client.id,
                        label: client.clientTypeName,
                    })) || [],
                    valueField: 'id',
                    labelField: 'label',
                    multiple: true,
                },
                { label: 'Phone', type: 'text', value: formData.accountDetails.phone, onChange: handleInputChange('accountDetails', 'phone') },
                { label: 'Fax', type: 'text', value: formData.accountDetails.fax, onChange: handleInputChange('accountDetails', 'fax') },
                { label: 'Website', type: 'text', value: formData.accountDetails.website, onChange: handleInputChange('accountDetails', 'website') },
            ],
        },
        {
            title: 'Address Information',
            visibilityKey: 'addressInformationVisible',
            fields: [
                {
                    label: 'Billing Country',
                    value: formData.addressInformation.billingCountry,
                    initialSearchTerm: formData.addressInformation.billingCountry,
                    onChange: handleCountryChange('addressInformation', 'billingCountry', 'billingState', 'billingCountryCode'),
                    options: resourceData?.country || [],
                    valueField: 'countryName',
                    labelField: 'countryName',
                    required: true
                },
                {
                    label: 'Shipping Country',
                    value: formData.addressInformation.shippingCountry,
                    initialSearchTerm: formData.addressInformation.shippingCountry,
                    onChange: handleCountryChange('addressInformation', 'shippingCountry', 'shippingState', 'shippingCountryCode'),
                    options: resourceData?.country || [],
                    valueField: 'countryName',
                    labelField: 'countryName'
                },
                {
                    label: 'Billing State/Province',
                    value: formData.addressInformation.billingState,
                    initialSearchTerm: formData.addressInformation.billingState,
                    onChange: handleInputChange('addressInformation', 'billingState'),
                    options: resourceData?.country.find(c => c.countryCode === formData.addressInformation.billingCountryCode)?.state || [],
                    valueField: 'stateName',
                    labelField: 'stateName',
                    disabled: !formData.addressInformation.billingCountryCode
                },
                {
                    label: 'Shipping State/Province',
                    value: formData.addressInformation.shippingState,
                    initialSearchTerm: formData.addressInformation.shippingState,
                    onChange: handleInputChange('addressInformation', 'shippingState'),
                    options: resourceData?.country.find(c => c.countryCode === formData.addressInformation.shippingCountryCode)?.state || [],
                    valueField: 'stateName',
                    labelField: 'stateName',
                    required: true,
                    disabled: !formData.addressInformation.shippingCountryCode
                },
                { label: 'Billing City', type: 'text', value: formData.addressInformation.billingCity, onChange: handleInputChange('addressInformation', 'billingCity'), required: true },
                { label: 'Shipping City', type: 'text', value: formData.addressInformation.shippingCity, onChange: handleInputChange('addressInformation', 'shippingCity') },
                { label: 'Billing Street', type: 'text', value: formData.addressInformation.billingStreet, onChange: handleInputChange('addressInformation', 'billingStreet'), required: true },
                { label: 'Shipping Street', type: 'text', value: formData.addressInformation.shippingStreet, onChange: handleInputChange('addressInformation', 'shippingStreet') },
                { label: 'Billing Zip/Postal Code', value: formData.addressInformation.billingPostCode, onChange: handleInputChange('addressInformation', 'billingPostCode') },
                { label: 'Shipping Zip/Postal Code', value: formData.addressInformation.shippingPostCode, onChange: handleInputChange('addressInformation', 'shippingPostCode') },
            ],
        },
        {
            title: 'Segmentation',
            visibilityKey: 'segmentInformationVisible',
            fields: [
                {
                    label: 'Industrial Type', value: formData.segmentation.industrialType, initialSearchTerm: formData.segmentation.industrialType, onChange: (e) => {
                        setFormData({
                            ...formData,
                            segmentation: {
                                ...formData.segmentation,
                                industrialType: e.target.value,
                                subIndustrial: '',
                            },
                        });
                    }, options: resourceData?.industrialType || [], valueField: 'industryTypeName', labelField: 'industryTypeName'
                },
                {
                    label: 'Sub Industry', value: formData.segmentation.subIndustrial, initialSearchTerm: formData.segmentation.subIndustrial, onChange: (e) => {
                        const selectedIndustryType = resourceData.industrialType.find(c => c.industryTypeName === formData.segmentation.industrialType);
                        const selectedSubIndustry = selectedIndustryType?.subIndustry.find(s => s.subIndustryName === e.target.value);

                        setFormData({
                            ...formData,
                            segmentation: {
                                ...formData.segmentation,
                                subIndustrial: e.target.value,
                                subIndustrialId: selectedSubIndustry ? selectedSubIndustry.id : '',
                            },
                        });
                    }, options: resourceData?.industrialType.find(c => c.industryTypeName === formData.segmentation.industrialType)?.subIndustry || [], valueField: 'subIndustryName', labelField: 'subIndustryName', disabled: !formData.segmentation.industrialType
                },
                {
                    label: 'Headquarter Country',
                    value: formData.segmentation.headquarterCountry, // Display selected country name
                    initialSearchTerm: formData.segmentation.headquarterCountry, // For initial data display
                    onChange: (event) => {
                        const selectedCountryName = event.target.value; // Get the selected country name
                
                        // Find the selected country object from your options
                        const selectedCountry = resourceData.country.find(country => country.countryName === selectedCountryName);
                
                        const countryName = selectedCountry?.countryName || '';
                        const countryCode = selectedCountry?.countryCode || '';
                
                        // Update form data with the selected country name and code
                        setFormData((prevData) => ({
                            ...prevData,
                            segmentation: {
                                ...prevData.segmentation,
                                headquarterCountry: countryName, // Set the country name
                                headquarterCountryCode: countryCode, // Set the country code
                            },
                        }));
                    },
                    options: resourceData?.country || [], // List of countries
                    valueField: 'countryName', // Field to display in the dropdown
                    labelField: 'countryName', // Field to display in the dropdown
                },                
                { label: 'Commercial Number', type: 'text', value: formData.segmentation.commercialNumber, onChange: handleInputChange('segmentation', 'commercialNumber') },
            ],
        },
        {
            title: 'Additional Information',
            visibilityKey: 'additionalInformationVisible',
            fields: [
                { label: 'Tax Type', value: formData.additionalInformation.taxType, initialSearchTerm: formData.additionalInformation.taxType, onChange: handleInputChange('additionalInformation', 'taxType'), options: resourceData?.taxType.map(type => ({ id: type, label: type })) || [], valueField: 'id', labelField: 'label' },
                { label: 'Tax ID', type: 'text', value: formData.additionalInformation.taxId, onChange: handleInputChange('additionalInformation', 'taxId') },
                {
                    label: 'Description', type: 'textarea', value: formData.additionalInformation.description, onChange: handleInputChange('additionalInformation', 'description'),
                    customRender: ({ label, value, onChange }) => (
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">
                                {label}
                            </label>
                            <textarea
                                value={value}
                                onChange={onChange}
                                className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                                rows="4"
                            />
                        </div>
                    )
                },
            ],
        },
        {
            title: 'System Information',
            visibilityKey: 'systemInformationVisible',
            fields: [
                {
                    label: 'Account Owner',
                    value: formData.systemInformation.accountOwner.map((ownerId) => {
                        // Get the label from formLabel
                        const ownerInfo = formLabel.accountOwner.find((item) => item.id === ownerId);

                        if (ownerInfo) {
                            // Return if label exists
                            return {
                                id: ownerInfo.id,
                                label: ownerInfo.name, // Using 'name' as the label from formLabel
                            };
                        } else {
                            // Fallback if the label is not found
                            return {
                                id: ownerId,
                                label: `Unknown (${ownerId})`, // Provide a fallback label
                            };
                        }
                    }),
                    onChange: (newSelectedValues) => {
                        // Extract the IDs from the selected values
                        const newIds = newSelectedValues.map((selected) => selected.id);

                        // Update formData with new IDs
                        setFormData((prevData) => ({
                            ...prevData,
                            systemInformation: {
                                ...prevData.systemInformation,
                                accountOwner: newIds, // Update accountOwner IDs only
                            },
                        }));

                        // Update formLabel to ensure it has all selected values
                        setFormLabel((prevLabels) => ({
                            ...prevLabels,
                            accountOwner: [
                                ...prevLabels.accountOwner,
                                ...newSelectedValues.filter(
                                    (selected) => !prevLabels.accountOwner.some((existing) => existing.id === selected.id)
                                ).map(selected => ({ id: selected.id, name: selected.label })),
                            ],
                        }));

                        console.log('Updated account owner IDs and labels:', newSelectedValues);
                    },
                    searchApi: searchAccountOwners, // Ensure this API returns { id, label } consistently
                    required: true,
                    multiple: true,
                },

                // isEditing && { label: 'Modified By', type: 'text', value: formData.systemInformation.createdBy, onChange: handleInputChange('systemInformation', 'modifiedBy'), disabled: true },
                // isEditing && { label: 'Modified Date', type: 'text', value: formData.systemInformation.createdDate, onChange: handleInputChange('systemInformation', 'modifiedDate'), disabled: true },
                // isEditing && { label: 'Created By', type: 'text', value: formData.systemInformation.createdBy, onChange: handleInputChange('systemInformation', 'createdBy'), disabled: true },
                // isEditing && { label: 'Created Date', type: 'text', value: formData.systemInformation.createdDate, onChange: handleInputChange('systemInformation', 'createdDate'), disabled: true },
                { label: 'Status', value: formData.systemInformation.status, initialSearchTerm: formData.systemInformation.status, onChange: handleInputChange('systemInformation', 'status'), options: [{ id: 'Active', label: 'Active' }, { id: 'Inactive', label: 'Inactive' }], valueField: 'id', labelField: 'label' },
                { label: 'Inactivation Date', type: 'date', value: formData.systemInformation.inactivationDate, onChange: handleInputChange('systemInformation', 'inactivationDate') },
                { label: 'Reason for Inactivating', value: formData.systemInformation.reasonForInactivating, initialSearchTerm: formData.systemInformation.reasonForInactivating, onChange: handleInputChange('systemInformation', 'reasonForInactivating'), options: resourceData?.inactiveReason.map(reason => ({ id: reason, label: reason })) || [], valueField: 'id', labelField: 'label' },
                !isEditing && {
                    label: 'Save to SFDC',
                    type: 'checkbox',
                    value: formData.systemInformation.saveToSFDC,
                    onChange: (e) => {
                        setFormData(prevData => ({
                            ...prevData,
                            systemInformation: {
                                ...prevData.systemInformation,
                                saveToSFDC: e.target.checked,
                            }
                        }));
                    },
                    customRender: ({ label, value, onChange }) => (
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={value}
                                onChange={onChange}
                                className="mr-2"
                            />
                            <label className="block text-sm font-medium text-gray-700">
                                {label}
                            </label>
                        </div>
                    ),
                },
                // { label: 'User ID', type: 'text', value: formData.systemInformation.userId, onChange: handleInputChange('systemInformation', 'userId') },
            ].filter(Boolean),  // Filter out false values
        },
    ];

    return (
        <>
            {sections.map((section) => (
                <div key={section.title} className="my-4">
                    <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleVisibility(section.visibilityKey)}
                    >
                        <h2 className="text-lg font-semibold text-neutral-700 mb-2">
                            <span>{sectionVisibility[section.visibilityKey] ? '▼' : '►'}</span> {section.title}
                        </h2>
                        <span>{sectionVisibility[section.visibilityKey] ? '-' : '+'}</span>
                    </div>
                    {sectionVisibility[section.visibilityKey] && (
                        <div className="bg-white p-2">
                            <div className="ml-3 mb-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                {section.fields.map((field, idx) => (
                                    field.customRender ? (
                                        <React.Fragment key={idx}>
                                            {field.customRender(field)}
                                        </React.Fragment>
                                    ) : field.searchApi ? (
                                        <AutocompleteField key={idx} {...field} />
                                    ) : field.options && field.multiple ? (
                                        <MultipleSelectField key={idx} {...field} />
                                    ) : field.options ? (
                                        <SingleSelectField key={idx} {...field} />
                                    ) : (
                                        <InputField key={idx} {...field} />
                                    )
                                ))}

                            </div>
                        </div>
                    )}
                </div>
            ))}
        </>
    );



}



