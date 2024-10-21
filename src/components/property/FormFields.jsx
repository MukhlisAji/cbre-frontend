import { debounce } from 'lodash';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { MdClear } from 'react-icons/md';
import { CONFIG } from '../../config';

export const InputField = forwardRef(({
    label,
    type = 'text',
    value,
    onChange,
    required = false,
    disabled = false
}, ref) => {
    const handleClear = () => {
        onChange({ target: { value: '' } });
    };

    useEffect(() => {
        if (ref?.current) {
            console.log(`InputField ref for ${label}:`, ref.current);
        }
    }, [ref, label]);

    return (
        <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
                {label}{required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                <input
                    type={type}
                    value={value}
                    ref={ref}  // Forward the ref to the input
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    className={`mt-1 block w-full p-1.5 pr-8 border border-gray-300 rounded-md shadow-sm focus:outline-none
                    focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`}
                />
                {value && !disabled && (
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <MdClear
                            onClick={handleClear}
                            className='text-gray-400 hover:text-gray-600 cursor-pointer'
                        />
                    </span>
                )}
            </div>
        </div>
    );
});


export const SelectField = ({
    label,
    value = [],
    onChange,
    options = [],
    valueField = 'id',
    labelField = 'label',
    required = false,
    disabled = false,
    initialSearchTerm = '',
    multiple = false,
}) => {
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedValues, setSelectedValues] = useState(value);
    const dropdownRef = useRef(null);

    // Handle outside click to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Synchronize value with internal state
    // useEffect(() => {
    //     if (Array.isArray(value) && value.length > 0) {
    //         setSelectedValues(value);
    //     } else if (!multiple && value) {
    //         const selectedOption = options.find(option => option[valueField] === value);
    //         setSearchTerm(selectedOption ? selectedOption[labelField] : '');
    //         setSelectedValues([value]);
    //     }
    // }, [value, options, multiple, valueField, labelField]);

    useEffect(() => {
        if (Array.isArray(value) && value.length > 0) {
            // Avoid unnecessary state updates by comparing with previous state
            if (JSON.stringify(selectedValues) !== JSON.stringify(value)) {
                setSelectedValues(value);
            }
        } else if (!multiple && value) {
            const selectedOption = options.find(option => option[valueField] === value);
            const newSearchTerm = selectedOption ? selectedOption[labelField] : '';
    
            // Update search term only if it differs from the current one
            if (searchTerm !== newSearchTerm) {
                setSearchTerm(newSearchTerm);
            }
    
            // Update selected values only if needed
            if (!selectedValues || selectedValues[0] !== value) {
                setSelectedValues([value]);
            }
        }
    }, [
        value, 
        options, 
        multiple, 
        valueField, 
        labelField, 
        searchTerm, // ✅ Should not trigger re-renders unnecessarily
        selectedValues // ✅ Avoid re-renders from unnecessary state updates
    ]);
    
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        setShowDropdown(true);
    };

    const handleOptionClick = (option) => {
        if (multiple) {
            const newSelectedValues = selectedValues.includes(option[valueField])
                ? selectedValues.filter(val => val !== option[valueField])
                : [...selectedValues, option[valueField]];

            setSelectedValues(newSelectedValues);
            onChange({ target: { value: newSelectedValues } });
            setSearchTerm(''); // Reset the search term to an empty string
            setShowDropdown(true); // Keep the dropdown open for further selections
        } else {
            onChange({ target: { value: option[valueField] } });
            setSearchTerm(option[labelField]);
            setShowDropdown(false);
        }
    };

    const handleInputFocus = () => {
        setShowDropdown(true);
    };

    const removeOption = (optionToRemove) => {
        const newSelectedValues = selectedValues.filter(val => val !== optionToRemove);
        setSelectedValues(newSelectedValues);
        onChange({ target: { value: newSelectedValues } });
    };

    const clearSelection = (e) => {
        e.stopPropagation(); // Prevent the dropdown from opening
        setSearchTerm('');
        setShowDropdown(true);
        setSelectedValues([]);
        onChange({ target: { value: null } });
    };

    const filteredOptions = options.filter(option => {
        const optionLabel = option[labelField];
        return typeof optionLabel === 'string' &&
            typeof searchTerm === 'string' &&
            optionLabel.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="relative" ref={dropdownRef}>
            <label className="block text-sm font-medium text-gray-700">
                {label}{required && <span className="text-red-500">*</span>}
            </label>

            {multiple && (
                <div className="flex flex-wrap gap-2 mb-2">
                    {selectedValues.map(selectedId => {
                        const selectedOption = options.find(option => option[valueField] === selectedId);
                        return selectedOption ? (
                            <div key={selectedId} className="bg-gray-200 px-2 h-8 py-1 rounded-full flex items-center">
                                <span>{selectedOption[labelField]}</span>
                                <span
                                    onClick={() => removeOption(selectedId)}
                                    className="ml-2 text-md text-gray-600 hover:text-gray-800 cursor-pointer"
                                >
                                    <MdClear />
                                </span>
                            </div>
                        ) : null;
                    })}
                </div>
            )}

            <div className="relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    required={required && selectedValues.length === 0}
                    disabled={disabled}
                    className={`mt-1 block w-full p-1.5 pr-8 border border-gray-300 rounded-md shadow-sm focus:outline-none
                    focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`}
                    placeholder={multiple ? "Search..." : "--Select--"}
                />
                {!multiple && searchTerm && (

                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                        <MdClear onClick={clearSelection} className='text-md cursor-pointer' />
                    </span>


                )}
            </div>
            {/* {
                showDropdown && filteredOptions.length > 0 && (
                    <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {filteredOptions.map((option) => (
                            <li
                                key={option[valueField]}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                onClick={() => handleOptionClick(option)}
                            >
                                {option[labelField]}
                            </li>
                        ))}
                    </ul>
                )
            } */}
            {
                showDropdown && (
                    <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <li
                                    key={option[valueField]}
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                    onClick={() => handleOptionClick(option)}
                                >
                                    {option[labelField]}
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-2 text-gray-500">
                                No options available
                            </li>
                        )}
                    </ul>
                )
            }

        </div >
    );
};

// Spinner Component
const Spinner = () => (
    <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-6 h-6 border-4 border-t-transparent border-gray-500 rounded-full animate-spin"></div>
    </div>
);

export const AutocompleteField = ({
    label,
    value,
    onChange,
    searchApi,
    required = false,
    disabled = false,
    multiple = false,
}) => {
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [loading, setLoading] = useState(false); // New state for loading
    const dropdownRef = useRef(null);

    const fetchAccountDetails = async (accountId) => {
        try {
            const response = await fetch(`${CONFIG.ACCOUNT_SERVICE}/${accountId}`, {
                method: 'GET',
                headers: {
                    'transactionId': '4646765766', // You might want to generate this dynamically
                    'Cookie': 'CookieConsentPolicy=0:1; LSKey-c$CookieConsentPolicy=0:1',
                },
            });
            const data = await response.json();
            return data.resultSet.accountName;
        } catch (error) {
            console.error("Error fetching account details:", error);
            return null;
        }
    };

    useEffect(() => {
        const fetchAccountName = async () => {
            if (value && !multiple) {
                const accountName = await fetchAccountDetails(value);
                if (accountName) {
                    setSearchTerm(accountName);
                    setSelectedOptions([{ id: value, label: accountName }]);
                }
            } else if (multiple && Array.isArray(value)) {
                const ids = value.flat();
                const accountPromises = ids.map(id => fetchAccountDetails(id));
                const accountNames = await Promise.all(accountPromises);
                const newSelectedOptions = accountNames.map((name, index) => ({
                    id: ids[index],
                    label: name
                })).filter(option => option.label !== null);
                setSelectedOptions(newSelectedOptions);
            } else {
                setSearchTerm('');
                setSelectedOptions([]);
            }
        };

        fetchAccountName();
    }, [value, multiple]);

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setSearchTerm(newValue);

        const debouncedSearch = debounce(async () => {
            if (newValue.length >= 2) {
                setLoading(true); // Show spinner
                try {
                    const searchResults = await searchApi(newValue);
                    setFilteredOptions(searchResults);
                    setShowDropdown(true);
                } catch (error) {
                    console.error("Error fetching search results:", error);
                } finally {
                    setLoading(false); // Hide spinner
                }
            } else {
                setShowDropdown(false);
            }
        }, 200); // Reduced debounce time to 300ms for a snappier experience

        debouncedSearch();

        return () => {
            debouncedSearch.cancel();
        };
    };

    const handleOptionClick = (option) => {
        let newSelectedOptions;
        if (multiple) {
            newSelectedOptions = selectedOptions.some(item => item.id === option.id)
                ? selectedOptions.filter(item => item.id !== option.id)
                : [...selectedOptions, option];
            setSearchTerm('');
        } else {
            newSelectedOptions = [option];
            setSearchTerm(option.label);
        }

        setSelectedOptions(newSelectedOptions);
        setShowDropdown(false);

        if (multiple) {
            onChange(newSelectedOptions.map(opt => opt.id));
        } else {
            onChange(option);
        }
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const removeOption = (optionToRemove) => {
        const newSelectedOptions = selectedOptions.filter(option => option.id !== optionToRemove.id);
        setSelectedOptions(newSelectedOptions);
        if (multiple) {
            onChange(newSelectedOptions.map(opt => opt.id));
        } else {
            onChange(null);
            setSearchTerm('');
        }
    };

    const clearSelection = (e) => {
        e.stopPropagation();
        setSearchTerm('');
        setShowDropdown(true);
        setSelectedOptions([]);
        onChange({ target: { value: null } });
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <label className="block text-sm font-medium text-gray-700">
                {label}{required && <span className="text-red-500">*</span>}
            </label>
            {multiple && (
                <div className="flex flex-wrap gap-2 mb-2">
                    {selectedOptions.map(option => (
                        <div key={option.id} className="bg-gray-200 px-2 h-8 py-1 rounded-full flex items-center">
                            <span>{option.label}</span>
                            <span onClick={() => removeOption(option)} className="ml-2 cursor-pointer text-md text-gray-600 hover:text-gray-800">
                                <MdClear />
                            </span>
                        </div>
                    ))}
                </div>
            )}
            <div className="relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    required={required && selectedOptions.length === 0}
                    disabled={disabled}
                    className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                    placeholder={multiple ? (selectedOptions.length > 0 ? "Add more..." : "--Select--") : "--Select--"}
                />
                {!multiple && searchTerm && (
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                        <MdClear onClick={clearSelection} className='text-md cursor-pointer' />
                    </span>
                )}
            </div>
            {showDropdown && (
                <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
                    {loading ? (
                        <Spinner /> // Show spinner while loading
                    ) : filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => (
                            <li
                                key={option.id}
                                className="px-2 py-2 cursor-pointer hover:bg-gray-200"
                                onClick={() => handleOptionClick(option)}
                            >
                                {option.label}
                            </li>
                        ))
                    ) : (
                        <li className="px-2 py-2 text-gray-500">No options available</li> // No options available message
                    )}
                </ul>
            )}
        </div>
    );
};
