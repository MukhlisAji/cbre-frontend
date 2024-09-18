import { debounce } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { MdClear } from 'react-icons/md';
import { CONFIG } from '../../../config';
import { InputField, AutocompleteField, SelectField } from '../FormFields';


// Main ContactFormSection Component
export default function ContactFormSection({
    formData,
    setFormData,
    toggleVisibility,
    sectionVisibility,
    copyBillingToShipping,
}) {
    const [resourceData, setResourceData] = useState(null);


    useEffect(() => {
        const fetchResourceData = async () => {
            const cachedData = localStorage.getItem('resourceDataContact');
            if (cachedData) {
                setResourceData(JSON.parse(cachedData));
            } else {
                try {
                    const response = await fetch(`${CONFIG.CONTACT_SERVICE}/resources?category=Contact`, {
                        method: 'GET',
                        headers: {
                            'transactionId': '46467657665',
                            'Cookie': 'CookieConsentPolicy=0:1; LSKey-c$CookieConsentPolicy=0:1'
                        }
                    });
                    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                    const data = await response.json();
                    setResourceData(data.resultSet);
                    localStorage.setItem('resourceDataContact', JSON.stringify(data.resultSet));
                } catch (error) {
                    console.error('Error fetching resource data:', error);
                }
            }
        };
        fetchResourceData();
    }, []);


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


    const searchContactName = async (searchTerm) => {
        const response = await fetch(`${CONFIG.CONTACT_SERVICE}/find-contact?name=${searchTerm}`, {
            method: 'GET',
            headers: {
                'Cookie': 'CookieConsentPolicy=0:1; LSKey-c$CookieConsentPolicy=0:1',
            },
        });
        const data = await response.json();
        return data.resultSet.map((contact) => ({
            id: contact.id,
            label: `${contact.firstName} ${contact.middleName} ${contact.lastName}`,
            salesforceId: `${contact.salesforceId}`,
        }));
    };


    const searchEmployee = async (searchTerm) => {
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
            salesforceId: `${employee.salesforceId}`,
        }));
    };


    const sections = [
        {
            title: 'Contact Information',
            visibilityKey: 'contactInformationVisible',
            fields: [
                { label: 'Salutation', value: formData.contactInformation.salutation, initialSearchTerm: formData.contactInformation.salutation, onChange: handleInputChange('contactInformation', 'salutation'), options: resourceData?.salutation.map(reason => ({ id: reason, label: reason })) || [], valueField: 'id', labelField: 'label' },
                { label: 'First Name', type: 'text', value: formData.contactInformation.firstName, onChange: handleInputChange('contactInformation', 'firstName') },
                { label: 'Middle Name', type: 'text', value: formData.contactInformation.middleName, onChange: handleInputChange('contactInformation', 'middleName') },
                { label: 'Last Name*', type: 'text', value: formData.contactInformation.lastName, onChange: handleInputChange('contactInformation', 'lastName'), required: true },
                { label: 'Title', type: 'text', value: formData.contactInformation.title, onChange: handleInputChange('contactInformation', 'title') },
                { label: 'Department', type: 'text', value: formData.contactInformation.department, onChange: handleInputChange('contactInformation', 'department') },
                { label: 'Email', type: 'text', value: formData.contactInformation.email, onChange: handleInputChange('contactInformation', 'email') },
                { label: 'Business Phone', type: 'text', value: formData.contactInformation.businessPhone, onChange: handleInputChange('contactInformation', 'businessPhone') },
                { label: 'Mobile Phone', type: 'text', value: formData.contactInformation.mobilePhone, onChange: handleInputChange('contactInformation', 'mobilePhone') },
                { label: 'Main Phone', type: 'text', value: formData.contactInformation.mainPhone, onChange: handleInputChange('contactInformation', 'mainPhone') },
                { label: 'Fax', type: 'text', value: formData.contactInformation.fax, onChange: handleInputChange('contactInformation', 'fax') },
                { label: 'LinkedIn', type: 'text', value: formData.contactInformation.linkedin, onChange: handleInputChange('contactInformation', 'linkedin') },
                {
                    label: 'Account Name',
                    value: formData.contactInformation.accountName.accountId,
                    onChange: (event) => {
                        const value = event.target ? event.target.value : event;
                        const accountId = value.id || null;
                        const salesforceAccountId = (value.salesforceId && value.salesforceId !== 'null') ? value.salesforceId : null;
                        console.log("value ", value);


                        setFormData(prevData => ({
                            ...prevData,
                            contactInformation: {
                                ...prevData.contactInformation,
                                accountName: {
                                    ...prevData.contactInformation.accountName,
                                    accountId: accountId,
                                    salesforceAccountId: salesforceAccountId,
                                },
                            },
                        }));
                    },
                    searchApi: searchAccountName,
                    required: true,
                },
                {
                    label: 'Relationship Type*',
                    value: formData.contactInformation.accountName.relationshipTypeId,
                    onChange: (event) => {
                        const value = event.target ? event.target.value : event;
                        const selectedId = parseInt(value, 10);
                        const selectedType = resourceData?.relationshipType.find(item => item.id === selectedId);


                        setFormData(prevData => ({
                            ...prevData,
                            contactInformation: {
                                ...prevData.contactInformation,
                                accountName: {
                                    ...prevData.contactInformation.accountName,
                                    relationshipTypeId: selectedId,
                                    relationshipType: selectedType ? selectedType.name : '',
                                },
                            },
                        }));
                    },
                    options: resourceData?.relationshipType.map(reason => ({ id: reason.id, label: reason.name })) || [],
                    valueField: 'id',
                    labelField: 'label',
                },
                {
                    label: 'Contact Profile',
                    value: formData.contactInformation.contactProfile.map(profile => profile.contactProfileId),
                    onChange: (event) => {
                        const selectedIds = event.target.value;
                        setFormData(prevData => ({
                            ...prevData,
                            contactInformation: {
                                ...prevData.contactInformation,
                                contactProfile: selectedIds.map(id => ({
                                    contactProfileId: id,
                                    contactProfileName: resourceData?.contactProfile.find(profile => profile.id === id)?.name || '',
                                })),
                            },
                        }));
                    },
                    options: resourceData?.contactProfile.map(profile => ({ id: profile.id, label: profile.name })) || [],
                    valueField: 'id',
                    labelField: 'label',
                    multiple: true,
                },

                { label: 'Influence Level', value: formData.contactInformation.influenceLevel, onChange: handleInputChange('contactInformation', 'influenceLevel'), options: resourceData?.influenceLevel.map(reason => ({ id: reason, label: reason })) || [], valueField: 'id', labelField: 'label' },
            ],
        },
        {
            title: 'Address Information',
            visibilityKey: 'addressInformationVisible',
            fields: [
                { label: 'Mailing Country*', value: formData.addressInformation.mailingCountry, onChange: handleCountryChange('addressInformation', 'mailingCountry', 'mailingState', 'mailingCountryCode'), options: resourceData?.country || [], valueField: 'countryName', labelField: 'countryName', required: true },
                { label: 'Mailing State/Province*', value: formData.addressInformation.mailingState, onChange: handleInputChange('addressInformation', 'mailingState'), options: resourceData?.country.find(c => c.countryCode === formData.addressInformation.mailingCountryCode)?.state || [], valueField: 'stateName', labelField: 'stateName', required: true, disabled: !formData.addressInformation.mailingCountryCode },
                { label: 'Mailing City*', type: 'text', value: formData.addressInformation.mailingCity, onChange: handleInputChange('addressInformation', 'mailingCity'), required: true },
                { label: 'Mailing Street*', type: 'text', value: formData.addressInformation.mailingStreet, onChange: handleInputChange('addressInformation', 'mailingStreet'), required: true },
                { label: 'Mailing Zip/Postal Code', value: formData.addressInformation.mailingPostCode, onChange: handleInputChange('addressInformation', 'mailingPostCode') },
            ],
        },
        {
            title: 'Communication Preferences',
            visibilityKey: 'communicationPreferencesVisible',
            fields: [
                { label: 'Preferred Communication Method', value: formData.communicationPreference.communicationMethod, onChange: handleInputChange('communicationPreference', 'communicationMethod'), options: resourceData?.communicationMethod.map(reason => ({ id: reason, label: reason })) || [], valueField: 'id', labelField: 'label' },
                { label: 'Email Options', value: formData.communicationPreference.emailOptions, onChange: handleInputChange('communicationPreference', 'emailOptions'), options: resourceData?.emailOption.map(reason => ({ id: reason, label: reason })) || [], valueField: 'id', labelField: 'label' },
                { label: 'Mail Options', value: formData.communicationPreference.mailOptions, onChange: handleInputChange('communicationPreference', 'mailOptions'), options: resourceData?.mailOption.map(reason => ({ id: reason, label: reason })) || [], valueField: 'id', labelField: 'label' },
                { label: 'Call Options', value: formData.communicationPreference.callOptions, onChange: handleInputChange('communicationPreference', 'callOptions'), options: resourceData?.callOption.map(reason => ({ id: reason, label: reason })) || [], valueField: 'id', labelField: 'label' },
                { label: 'SMS Options', value: formData.communicationPreference.smsOptions, onChange: handleInputChange('communicationPreference', 'smsOptions'), options: resourceData?.smsOption.map(reason => ({ id: reason, label: reason })) || [], valueField: 'id', labelField: 'label' },
                { label: 'Exclude Reason', value: formData.communicationPreference.excludeReason, onChange: handleInputChange('communicationPreference', 'excludeReason'), options: resourceData?.excludeReason.map(reason => ({ id: reason, label: reason })) || [], valueField: 'id', labelField: 'label' },
                { label: 'Exclude On', type: 'date', value: formData.communicationPreference.excludeOn, onChange: handleInputChange('communicationPreference', 'excludeOn') },
                {
                    label: 'Exclude By',
                    value: formData.communicationPreference.excludeBy.excludeById,
                    onChange: (event) => {
                        const value = event.target ? event.target.value : event;
                        const excludeById = value.id || null;
                        const salesforceAccountId = value.salesforceId || '';
                        setFormData(prevData => ({
                            ...prevData,
                            communicationPreference: {
                                ...prevData.communicationPreference,
                                excludeBy: {
                                    ...prevData.contactInformation.excludeBy,
                                    excludeById: excludeById,
                                    excludeBySalesforceId: salesforceAccountId,
                                },
                            },
                        }));
                    },
                    searchApi: searchEmployee,
                    required: true,
                },
            ],
        },
        {
            title: 'Additional Information',
            visibilityKey: 'additionalInformationVisible',
            fields: [
                { label: 'Nick Name', type: 'text', value: formData.additionalInformation.nickName, onChange: handleInputChange('additionalInformation', 'nickName') },
                { label: 'Assistant Name', type: 'text', value: formData.additionalInformation.assistantName, onChange: handleInputChange('additionalInformation', 'assistantName') },
                { label: 'Assistant Phone', type: 'text', value: formData.additionalInformation.assistantPhone, onChange: handleInputChange('additionalInformation', 'assistantPhone') },
                { label: 'Assistant Email', type: 'text', value: formData.additionalInformation.assistantEmail, onChange: handleInputChange('additionalInformation', 'assistantEmail') },
                {
                    label: 'Reports To',
                    value: formData.additionalInformation.reportsTo.reportsToId,
                    onChange: (event) => {
                        const value = event.target ? event.target.value : event;
                        const accountId = value.id || null;
                        const salesforceAccountId = value.salesforceId || '';


                        setFormData(prevData => ({
                            ...prevData,
                            additionalInformation: {
                                ...prevData.additionalInformation,
                                reportsTo: {
                                    ...prevData.additionalInformation.reportsTo,
                                    reportsToId: accountId,
                                    reportsToSalesforceId: salesforceAccountId,
                                },
                            },
                        }));
                    },
                    searchApi: searchContactName,
                    required: true,
                },
                {
                    label: 'CBRE Employee',
                    type: 'checkbox',
                    value: formData.additionalInformation.cbreEmployee,
                    onChange: (e) => {
                        setFormData(prevData => ({
                            ...prevData,
                            additionalInformation: {
                                ...prevData.additionalInformation,
                                cbreEmployee: e.target.checked,
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
                    label: 'Contact Owner',
                    value: formData.systemInformation.contactOwner,
                    onChange: (selectedIds) => {
                        setFormData(prevData => ({
                            ...prevData,
                            systemInformation: {
                                ...prevData.systemInformation,
                                contactOwner: selectedIds
                            },
                        }));
                    },
                    searchApi: searchEmployee,
                    required: true,
                    multiple: true, // Enable multiple selections
                },
                { label: 'Status', value: formData.systemInformation.status, onChange: handleInputChange('systemInformation', 'status'), options: [{ id: 'Active', label: 'Active' }, { id: 'Inactive', label: 'Inactive' }], valueField: 'id', labelField: 'label' },
                { label: 'Inactivation Date', type: 'date', value: formData.systemInformation.inactivationDate, onChange: handleInputChange('systemInformation', 'inactivationDate') },
                { label: 'Reason for Inactivating', value: formData.systemInformation.reasonForInactivating, onChange: handleInputChange('systemInformation', 'reasonForInactivating'), options: resourceData?.inactiveReason.map(reason => ({ id: reason, label: reason })) || [], valueField: 'id', labelField: 'label' },
                {
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
            ],
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
                                    ) : field.options ? (
                                        <SelectField key={idx} {...field} />
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





