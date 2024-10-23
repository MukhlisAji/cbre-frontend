import { debounce } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { MdClear } from 'react-icons/md';
import { CONFIG } from '../../../config';
import { InputField, AutocompleteField, SingleSelectField, MultipleSelectField } from '../FormFields';
import { generateTransactionId } from '../../lib/api/Authorization';

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
    const [isSingapore, setIsSingapore] = useState([]);
    const [selectedParentAccount, setSelectedParentAccount] = useState('');

    useEffect(() => {
        const fetchResourceData = async () => {
            const cachedData = localStorage.getItem('resourceData');
            console.log('cachedData ', cachedData);
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

        // If the field is 'systemInformation' and the subField is 'status', check if the new value is 'Inactive'
        if (field === 'systemInformation' && subField === 'status' && newValue === 'Inactive') {
            const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format
            setFormData((prevData) => ({
                ...prevData,
                [field]: {
                    ...prevData[field],
                    [subField]: newValue, // Set status to 'Inactive'
                    inactivationDate: currentDate, // Auto-fill inactivationDate with current date
                },
            }));
        } if (field === 'systemInformation' && subField === 'status' && newValue === 'Inactive') {
            const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format
            setFormData((prevData) => ({
                ...prevData,
                [field]: {
                    ...prevData[field],
                    [subField]: newValue, // Set status to 'Inactive'
                    inactivationDate: currentDate, // Auto-fill inactivationDate with current date
                },
            }));
        } else {
            // Normal handling for other fields
            setFormData((prevData) => ({
                ...prevData,
                [field]: subField
                    ? { ...prevData[field], [subField]: newValue }
                    : newValue,
            }));
        }
    };

    const handleCountryChange = (field, countryField, stateField, countryCodeField) => (e) => {
        const selectedCountry = resourceData.country.find(c => c.countryName === e.target.value);
        const countryCode = selectedCountry ? selectedCountry.countryCode : '';
    
        // Check if the selected country is Singapore
        const isSingapore = selectedCountry && selectedCountry.countryName === 'Singapore';
        const singaporeState = isSingapore ? 'Singapore' : ''; // Set Singapore state
        const singaporeCity = isSingapore ? 'Singapore' : ''; // Set Singapore city
    
        setFormData((prevData) => ({
            ...prevData,
            [field]: {
                ...prevData[field],
                [countryField]: e.target.value,
                [countryCodeField]: countryCode,
                [stateField]: singaporeState, // Populate state if Singapore
                billingCity: field === 'addressInformation' && countryField === 'billingCountry' ? singaporeCity : prevData[field].billingCity, // Populate city if billing country is Singapore
                shippingCity: field === 'addressInformation' && countryField === 'shippingCountry' ? singaporeCity : prevData[field].shippingCity, // Populate city if shipping country is Singapore
            },
        }));
    };
    


    const isBillingSingapore = formData.addressInformation.billingCountry === 'Singapore';
    const isShippingSingapore = formData.addressInformation.shippingCountry === 'Singapore';

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
                    // required: true,
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
                    required: true,
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
                    // required: true,
                    disabled: !formData.addressInformation.shippingCountryCode
                },
                { label: 'Billing City', type: 'text', value: formData.addressInformation.billingCity, onChange: handleInputChange('addressInformation', 'billingCity'), required: true },
                { label: 'Shipping City', type: 'text', value: formData.addressInformation.shippingCity, onChange: handleInputChange('addressInformation', 'shippingCity') },
                { label: 'Billing Street', type: 'text', value: formData.addressInformation.billingStreet, onChange: handleInputChange('addressInformation', 'billingStreet'), required: true },
                { label: 'Shipping Street', type: 'text', value: formData.addressInformation.shippingStreet, onChange: handleInputChange('addressInformation', 'shippingStreet') },
                isBillingSingapore ? (
                    {
                        label: 'Billing Zip/Postal Code',
                        value: formData.addressInformation.billingPostCode,
                        onChange: handleInputChange('addressInformation', 'billingPostCode'),
                        options: resourceData?.country.find(c => c.countryName === formData.addressInformation.billingCountry)
                            ?.state.find(s => s.stateName === formData.addressInformation.billingState)
                            ?.division.flatMap(d => d.suburb.map(sub => ({
                                label: sub.postCode,
                                value: sub.postCode,
                            }))) || [],
                        valueField: 'value',
                        labelField: 'label',
                        disabled: !formData.addressInformation.billingState
                    }
                ) : (
                    { label: 'Billing Zip/Postal Code', type: 'text', value: formData.addressInformation.billingPostCode, onChange: handleInputChange('addressInformation', 'billingPostCode'), required: false }
                ),
                isShippingSingapore ? (
                    {
                        label: 'Shipping Zip/Postal Code',
                        value: formData.addressInformation.shippingPostCode,
                        onChange: handleInputChange('addressInformation', 'shippingPostCode'),
                        options: resourceData?.country.find(c => c.countryName === formData.addressInformation.shippingCountry)
                            ?.state.find(s => s.stateName === formData.addressInformation.shippingState)
                            ?.division.flatMap(d => d.suburb.map(sub => ({
                                label: sub.postCode,
                                value: sub.postCode,
                            }))) || [],
                        valueField: 'value',
                        labelField: 'label',
                        disabled: !formData.addressInformation.shippingState
                    }
                ) : (
                    { label: 'Shipping Zip/Postal Code', type: 'text', value: formData.addressInformation.shippingPostCode, onChange: handleInputChange('addressInformation', 'shippingPostCode'), required: false }
                ),
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
                    // required: true,
                    multiple: true,
                },

                // isEditing && { label: 'Modified By', type: 'text', value: formData.systemInformation.createdBy, onChange: handleInputChange('systemInformation', 'modifiedBy'), disabled: true },
                // isEditing && { label: 'Modified Date', type: 'text', value: formData.systemInformation.createdDate, onChange: handleInputChange('systemInformation', 'modifiedDate'), disabled: true },
                // isEditing && { label: 'Created By', type: 'text', value: formData.systemInformation.createdBy, onChange: handleInputChange('systemInformation', 'createdBy'), disabled: true },
                // isEditing && { label: 'Created Date', type: 'text', value: formData.systemInformation.createdDate, onChange: handleInputChange('systemInformation', 'createdDate'), disabled: true },
                { label: 'Status', value: formData.systemInformation.status, initialSearchTerm: formData.systemInformation.status, onChange: handleInputChange('systemInformation', 'status'), options: [{ id: 'Active', label: 'Active' }, { id: 'Inactive', label: 'Inactive' }], valueField: 'id', labelField: 'label' },
                { label: 'Inactivation Date', type: 'date', value: formData.systemInformation.inactivationDate, onChange: handleInputChange('systemInformation', 'inactivationDate') },
                { label: 'Reason for Inactivating', value: formData.systemInformation.reasonForInactivating, initialSearchTerm: formData.systemInformation.reasonForInactivating, onChange: handleInputChange('systemInformation', 'reasonForInactivating'), options: resourceData?.inactiveReason.map(reason => ({ id: reason, label: reason })) || [], valueField: 'id', labelField: 'label', disabled: formData.systemInformation.status === 'Active' },
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
                    >
                        <div className="w-full flex items-center justify-between">
                            <h2 onClick={() => toggleVisibility(section.visibilityKey)}
                                className="text-lg font-semibold text-neutral-700 mb-2 mr-4">
                                <span>{sectionVisibility[section.visibilityKey] ? '▼' : '►'}</span> {section.title}
                            </h2>

                            {/* Check if section is for address information */}
                            {section.visibilityKey === 'addressInformationVisible' && (
                                <span
                                    onClick={() => copyBillingToShipping()} // Define this function
                                    className="text-blue-500 px-4 underline hover:text-blue-700 focus:outline-none text-sm"
                                >
                                    Copy Billing Address to Shipping Address
                                </span>
                            )}
                        </div>

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



