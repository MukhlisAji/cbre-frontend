import { debounce } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { MdClear } from 'react-icons/md';
import { CONFIG } from '../../../config';
import { InputField, AutocompleteField, SelectField } from '../FormFields';

// Main ContactFormSection Component
export default function PropertyFormSection({
    formData,
    setFormData,
    toggleVisibility,
    sectionVisibility,
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
            title: 'Basic Information',
            visibilityKey: 'basicInformationVisible',
            fields: [
                { 
                    label: 'Building Name*', 
                    type: 'text', 
                    value: formData.basicInformation.buildingName, 
                    onChange: handleInputChange('basicInformation', 'buildingName'), 
                    required: true 
                },
                { 
                    label: 'Country', 
                    type: 'text', 
                    value: formData.basicInformation.country, 
                    disabled: true, // Prepopulated
                },
                { 
                    label: 'Postal Code*', 
                    value: formData.basicInformation.postalCode, 
                    onChange: handleInputChange('basicInformation', 'postalCode'), 
                    required: true 
                },
                { 
                    label: 'Street Number*', 
                    type: 'text', 
                    value: formData.basicInformation.streetNumber, 
                    disabled: true, // Prepopulated
                },
                { 
                    label: 'Street Name*', 
                    type: 'text', 
                    value: formData.basicInformation.streetName, 
                    disabled: true, // Prepopulated
                },
                { 
                    label: 'District*', 
                    type: 'number', 
                    value: formData.basicInformation.district, 
                    onChange: handleInputChange('basicInformation', 'district'), 
                    required: true,
                    maxLength: 2, // First 2 digits of postal code
                },
                { 
                    label: 'Property Type*', 
                    value: formData.basicInformation.propertyType, 
                    onChange: handleInputChange('basicInformation', 'propertyType'), 
                    options: resourceData?.propertyTypes || [], 
                    valueField: 'propertyTypeName', 
                    labelField: 'propertyTypeName', 
                    required: true,
                    type: 'checkbox', // Multi-Select Checkbox
                },
                { 
                    label: 'Grade', 
                    value: formData.basicInformation.grade, 
                    onChange: handleInputChange('basicInformation', 'grade'), 
                    options: resourceData?.grades || [], 
                    valueField: 'gradeName', 
                    labelField: 'gradeName',
                    type: 'dropdown',
                },
                { 
                    label: 'Property Usage*', 
                    value: formData.basicInformation.propertyUsage, 
                    onChange: handleInputChange('basicInformation', 'propertyUsage'), 
                    options: resourceData?.usageTypes || [], 
                    valueField: 'usageName', 
                    labelField: 'usageName', 
                    required: true,
                    type: 'checkbox', // Multi-Select Checkbox
                },
                { 
                    label: 'Land Ownership', 
                    value: formData.basicInformation.landOwnership, 
                    onChange: handleInputChange('basicInformation', 'landOwnership'), 
                    options: resourceData?.landOwnershipTypes || [], 
                    valueField: 'ownershipType', 
                    labelField: 'ownershipType',
                    type: 'checkbox', // Multi-Select Checkbox
                },
                { 
                    label: 'Ownership Structure/Title*', 
                    value: formData.basicInformation.ownershipStructure, 
                    onChange: handleInputChange('basicInformation', 'ownershipStructure'), 
                    options: resourceData?.ownershipStructureTypes || [], 
                    valueField: 'structureType', 
                    labelField: 'structureType', 
                    required: true,
                    type: 'checkbox', // Multi-Select Checkbox
                },
                { 
                    label: 'Region*', 
                    value: formData.basicInformation.region, 
                    onChange: handleInputChange('basicInformation', 'region'), 
                    options: resourceData?.regions || [], 
                    valueField: 'regionName', 
                    labelField: 'regionName', 
                    required: true,
                    type: 'dropdown', 
                },
                { 
                    label: 'Region (Office)', 
                    type: 'text', 
                    value: formData.basicInformation.regionOffice, 
                    disabled: true, // Calculated / Greyed Out
                },
                { 
                    label: 'Micro Market (Main)*', 
                    value: formData.basicInformation.microMarketMain, 
                    onChange: handleInputChange('basicInformation', 'microMarketMain'), 
                    options: resourceData?.microMarketsMain || [], 
                    valueField: 'marketName', 
                    labelField: 'marketName', 
                    required: true,
                    type: 'dropdown', 
                },
                { 
                    label: 'Micro Market (Office)', 
                    type: 'text', 
                    value: formData.basicInformation.microMarketOffice, 
                    disabled: true, // Calculated / Greyed Out
                },
                { 
                    label: 'Micro Market (Industrial)*', 
                    value: formData.basicInformation.microMarketIndustrial, 
                    onChange: handleInputChange('basicInformation', 'microMarketIndustrial'), 
                    options: resourceData?.microMarketsIndustrial || [], 
                    valueField: 'marketName', 
                    labelField: 'marketName', 
                    required: true,
                    type: 'dropdown', 
                },
                { 
                    label: 'Micro Market (Retail)*', 
                    value: formData.basicInformation.microMarketRetail, 
                    onChange: handleInputChange('basicInformation', 'microMarketRetail'), 
                    options: resourceData?.microMarketsRetail || [], 
                    valueField: 'marketName', 
                    labelField: 'marketName', 
                    required: true,
                    type: 'dropdown', 
                },
                { 
                    label: 'Zoning*', 
                    value: formData.basicInformation.zoning, 
                    onChange: handleInputChange('basicInformation', 'zoning'), 
                    options: resourceData?.zoningOptions || [], 
                    valueField: 'zoningName', 
                    labelField: 'zoningName', 
                    required: true,
                    type: 'dropdown', 
                },
                { 
                    label: 'Property Status', 
                    value: formData.basicInformation.propertyStatus, 
                    onChange: handleInputChange('basicInformation', 'propertyStatus'), 
                    options: resourceData?.propertyStatusOptions || [], 
                    valueField: 'statusName', 
                    labelField: 'statusName', 
                    type: 'dropdown', 
                }
            ],
        },
        {
            title: 'Standards',
            visibilityKey: 'standardsVisible',
            fields: [
                {
                    label: 'Green Mark',
                    value: formData.standards.greenMark,
                    onChange: handleInputChange('standards', 'greenMark'),
                    options: resourceData?.greenMarkOptions || [],
                    valueField: 'greenMarkName',
                    labelField: 'greenMarkName',
                    type: 'dropdown',
                },
                {
                    label: 'Award',
                    value: formData.standards.greenMarkAward,
                    onChange: handleInputChange('standards', 'greenMarkAward'),
                    options: resourceData?.awardOptions || [],
                    valueField: 'awardName',
                    labelField: 'awardName',
                    type: 'dropdown',
                },
                {
                    label: 'Year of Award',
                    type: 'number',
                    value: formData.standards.greenMarkYear,
                    onChange: handleInputChange('standards', 'greenMarkYear'),
                    maxLength: 4,  // Numeric (4,0)
                },
                {
                    label: 'LEED Certification',
                    value: formData.standards.leedCertification,
                    onChange: handleInputChange('standards', 'leedCertification'),
                    options: resourceData?.leedCertificationOptions || [],
                    valueField: 'leedCertificationName',
                    labelField: 'leedCertificationName',
                    type: 'dropdown',
                },
                {
                    label: 'Award',
                    value: formData.standards.leedAward,
                    onChange: handleInputChange('standards', 'leedAward'),
                    options: resourceData?.awardOptions || [],
                    valueField: 'awardName',
                    labelField: 'awardName',
                    type: 'dropdown',
                },
                {
                    label: 'Year of Award',
                    type: 'number',
                    value: formData.standards.leedYear,
                    onChange: handleInputChange('standards', 'leedYear'),
                    maxLength: 4,  // Numeric (4,0)
                },
                {
                    label: 'Year of Expiry',
                    type: 'text',  // Free text
                    value: formData.standards.leedYearExpiry,
                    onChange: handleInputChange('standards', 'leedYearExpiry'),
                },
                {
                    label: 'WELLS',
                    value: formData.standards.wells,
                    onChange: handleInputChange('standards', 'wells'),
                    options: resourceData?.wellsOptions || [],
                    valueField: 'wellsName',
                    labelField: 'wellsName',
                    type: 'dropdown',
                },
                {
                    label: 'Project Type',
                    value: formData.standards.wellsProjectType,
                    onChange: handleInputChange('standards', 'wellsProjectType'),
                    options: [
                        { label: 'Yes', value: 'yes' },
                        { label: 'No', value: 'no' }
                    ],
                    type: 'dropdown', // Yes/No dropdown
                },
                {
                    label: 'Award',
                    value: formData.standards.wellsAward,
                    onChange: handleInputChange('standards', 'wellsAward'),
                    options: resourceData?.awardOptions || [],
                    valueField: 'awardName',
                    labelField: 'awardName',
                    type: 'dropdown',
                },
                {
                    label: 'Year of Award',
                    type: 'number',
                    value: formData.standards.wellsYear,
                    onChange: handleInputChange('standards', 'wellsYear'),
                    maxLength: 4,  // Numeric (4,0)
                },
                {
                    label: 'Wiredscore',
                    value: formData.standards.wiredscore,
                    onChange: handleInputChange('standards', 'wiredscore'),
                    options: resourceData?.wiredscoreOptions || [],
                    valueField: 'wiredscoreName',
                    labelField: 'wiredscoreName',
                    type: 'dropdown',
                },
                {
                    label: 'Project Type',
                    value: formData.standards.wiredscoreProjectType,
                    onChange: handleInputChange('standards', 'wiredscoreProjectType'),
                    options: [
                        { label: 'Yes', value: 'yes' },
                        { label: 'No', value: 'no' }
                    ],
                    type: 'dropdown', // Yes/No dropdown
                },
                {
                    label: 'Award',
                    value: formData.standards.wiredscoreAward,
                    onChange: handleInputChange('standards', 'wiredscoreAward'),
                    options: resourceData?.awardOptions || [],
                    valueField: 'awardName',
                    labelField: 'awardName',
                    type: 'dropdown',
                },
                {
                    label: 'Year of Award',
                    type: 'number',
                    value: formData.standards.wiredscoreYear,
                    onChange: handleInputChange('standards', 'wiredscoreYear'),
                    maxLength: 4,  // Numeric (4,0)
                },
            ],
        },
        {
            title: 'Additional Information',
            visibilityKey: 'additionalInformationVisible',
            fields: [
                {
                    label: 'TOP Date',
                    value: formData.additionalInformation.topDate,
                    onChange: handleInputChange('additionalInformation', 'topDate'),
                    type: 'date', // Date field
                },
                {
                    label: 'Expected TOP Date',
                    value: formData.additionalInformation.expectedTopDate,
                    onChange: handleInputChange('additionalInformation', 'expectedTopDate'),
                    type: 'checkbox', // Checkbox/Boolean
                },
                {
                    label: 'CSC Date',
                    value: formData.additionalInformation.cscDate,
                    onChange: handleInputChange('additionalInformation', 'cscDate'),
                    type: 'date', // Date field
                },
                {
                    label: 'Terms Details',
                    value: formData.additionalInformation.termsDetails,
                    onChange: handleInputChange('additionalInformation', 'termsDetails'),
                    type: 'text', // Free text
                }
            ],
        },
        {
            title: 'Area',
            visibilityKey: 'areaInformationVisible',
            fields: [
                {
                    label: 'Land Area',
                    value: formData.area.landArea,
                    onChange: handleInputChange('area', 'landArea'),
                    type: 'number', // Numeric (18,2)
                    precision: { maxDigits: 18, decimalPlaces: 2 },
                },
                {
                    label: 'Gross Floor Area',
                    value: formData.area.grossFloorArea,
                    onChange: handleInputChange('area', 'grossFloorArea'),
                    type: 'number', // Numeric (18,2)
                    precision: { maxDigits: 18, decimalPlaces: 2 },
                },
                {
                    label: 'Net Lettable Area',
                    value: formData.area.netLettableArea,
                    type: 'number', // Calculated / Greyed Out (18,2)
                    disabled: true, // Greyed out
                },
                {
                    label: 'Area Breakdown',
                    value: formData.area.areaBreakdown,
                    onChange: handleInputChange('area', 'areaBreakdown'),
                    type: 'text', // Free Text
                },
                {
                    label: 'Total # of Units',
                    value: formData.area.totalUnits,
                    onChange: handleInputChange('area', 'totalUnits'),
                    type: 'number', // Numeric
                },
                {
                    label: 'Unit of Comparison',
                    value: formData.area.unitOfComparison,
                    onChange: handleInputChange('area', 'unitOfComparison'),
                    type: 'dropdown', // Dropdown
                    options: resourceData?.comparisonUnits || [], // Options for the dropdown
                    valueField: 'unitValue', // Example fields
                    labelField: 'unitLabel', // Example fields
                },
                {
                    label: 'Permissible Plot Ratio',
                    value: formData.area.permissiblePlotRatio,
                    onChange: handleInputChange('area', 'permissiblePlotRatio'),
                    type: 'number', // Numeric (18,2)
                    precision: { maxDigits: 18, decimalPlaces: 2 },
                },
                {
                    label: 'Gross Plot Ratio',
                    value: formData.area.grossPlotRatio,
                    onChange: handleInputChange('area', 'grossPlotRatio'),
                    type: 'number', // Numeric (18,2)
                    precision: { maxDigits: 18, decimalPlaces: 2 },
                },
                {
                    label: 'Net Lettable Area (Office)',
                    value: formData.area.netLettableAreaOffice,
                    onChange: handleInputChange('area', 'netLettableAreaOffice'),
                    type: 'number', // Numeric (18,2)
                    precision: { maxDigits: 18, decimalPlaces: 2 },
                },
                {
                    label: 'Net Lettable Area (Industrial)',
                    value: formData.area.netLettableAreaIndustrial,
                    onChange: handleInputChange('area', 'netLettableAreaIndustrial'),
                    type: 'number', // Numeric (18,2)
                    precision: { maxDigits: 18, decimalPlaces: 2 },
                },
                {
                    label: 'Net Lettable Area (Retail)',
                    value: formData.area.netLettableAreaRetail,
                    onChange: handleInputChange('area', 'netLettableAreaRetail'),
                    type: 'number', // Numeric (18,2)
                    precision: { maxDigits: 18, decimalPlaces: 2 },
                },
                {
                    label: 'Potential Build-Up Area',
                    value: formData.area.potentialBuildUpArea,
                    type: 'number', // Calculated / Greyed Out (18,2)
                    disabled: true, // Greyed out
                },
            ],
        },
        {
            title: 'Information',
            visibilityKey: 'informationVisible',
            fields: [
                {
                    label: 'Headline',
                    value: formData.information.headline,
                    onChange: handleInputChange('information', 'headline'),
                    type: 'text', // Free Text
                },
                {
                    label: 'Property Website',
                    value: formData.information.propertyWebsite,
                    onChange: handleInputChange('information', 'propertyWebsite'),
                    type: 'text', // Free Text
                },
                {
                    label: 'Location Description',
                    value: formData.information.locationDescription,
                    onChange: handleInputChange('information', 'locationDescription'),
                    type: 'text', // Free Text
                },
                {
                    label: 'Building Description',
                    value: formData.information.buildingDescription,
                    onChange: handleInputChange('information', 'buildingDescription'),
                    type: 'text', // Free Text
                },
            ],
        },
        {
            title: 'Floor',
            visibilityKey: 'floorInformationVisible',
            fields: [
                {
                    label: 'Land Area',
                    value: formData.floor.landArea,
                    onChange: handleInputChange('floor', 'landArea'),
                    type: 'numeric',  // Numeric
                },
                {
                    label: 'Floor Number',
                    value: formData.floor.floorNumber,
                    onChange: handleInputChange('floor', 'floorNumber'),
                    type: 'numeric',  // Numeric
                },
                {
                    label: 'Above Ground',
                    value: formData.floor.aboveGround,
                    onChange: handleInputChange('floor', 'aboveGround'),
                    type: 'numeric',  // Calculated/Numeric
                    disabled: true,   // Calculated field, greyed out
                },
                {
                    label: 'Total Floors',
                    value: formData.floor.totalFloors,
                    onChange: handleInputChange('floor', 'totalFloors'),
                    type: 'numeric',  // Calculated/Numeric
                    disabled: true,   // Calculated field, greyed out
                },
            ],
        },
        {
            title: 'Property Remarks',
            visibilityKey: 'propertyRemarksVisible',
            fields: [
                {
                    label: 'Public',
                    value: formData.propertyRemarks.public,
                    onChange: handleInputChange('propertyRemarks', 'public'),
                    type: 'text',  // Free Text
                },
                {
                    label: 'Private',
                    value: formData.propertyRemarks.private,
                    onChange: handleInputChange('propertyRemarks', 'private'),
                    type: 'text',  // Free Text
                },
            ],
        },
        {
            title: 'Property Management',
            visibilityKey: 'propertyManagementVisible',
            fields: [
                {
                    label: 'PM in-house',
                    value: formData.propertyManagement.pmInHouse,
                    onChange: handleInputChange('propertyManagement', 'pmInHouse'),
                    type: 'checkbox',  // Checkbox/Boolean
                },
                {
                    label: 'Actual Service Charges',
                    value: formData.propertyManagement.actualServiceCharges,
                    onChange: handleInputChange('propertyManagement', 'actualServiceCharges'),
                    type: 'number',  // Numeric(18,2)
                },
                {
                    label: 'CBRE Managed',
                    value: formData.propertyManagement.cbreManaged,
                    onChange: handleInputChange('propertyManagement', 'cbreManaged'),
                    type: 'checkbox',  // Checkbox/Boolean
                },
                {
                    label: 'Management Expiry Date',
                    value: formData.propertyManagement.managementExpiryDate,
                    onChange: handleInputChange('propertyManagement', 'managementExpiryDate'),
                    type: 'date',  // Date
                },
                {
                    label: 'PM Managing Agent',
                    value: formData.propertyManagement.pmManagingAgent,
                    onChange: handleInputChange('propertyManagement', 'pmManagingAgent'),
                    type: 'text',  // Free Text
                },
            ],
        },
        {
            title: 'Elevators',
            visibilityKey: 'elevatorsVisible',
            fields: [
                {
                    label: '# of Passenger Lift',
                    value: formData.elevators.passengerLifts,
                    onChange: handleInputChange('elevators', 'passengerLifts'),
                    type: 'number',  // Numeric
                },
                {
                    label: 'Car Park Lift to G/F',
                    value: formData.elevators.carParkLiftToGF,
                    onChange: handleInputChange('elevators', 'carParkLiftToGF'),
                    type: 'number',  // Numeric
                },
                {
                    label: 'Lift Zones #',
                    value: formData.elevators.liftZones,
                    onChange: handleInputChange('elevators', 'liftZones'),
                    type: 'number',  // Numeric
                },
                {
                    label: 'Service Lift',
                    value: formData.elevators.serviceLifts,
                    onChange: handleInputChange('elevators', 'serviceLifts'),
                    type: 'number',  // Numeric
                },
                {
                    label: 'Cargo Lift',
                    value: formData.elevators.cargoLifts,
                    onChange: handleInputChange('elevators', 'cargoLifts'),
                    type: 'number',  // Numeric
                },
                {
                    label: 'Cargo Lift Maximum Load',
                    value: formData.elevators.cargoLiftMaxLoad,
                    onChange: handleInputChange('elevators', 'cargoLiftMaxLoad'),
                    type: 'number',  // Numeric
                },
                {
                    label: 'VIP Lift',
                    value: formData.elevators.vipLifts,
                    onChange: handleInputChange('elevators', 'vipLifts'),
                    type: 'number',  // Numeric
                },
                {
                    label: 'Service Lift Dimension',
                    value: formData.elevators.serviceLiftDimension,
                    onChange: handleInputChange('elevators', 'serviceLiftDimension'),
                    type: 'text',  // Text
                },
                {
                    label: 'Cargo Lift Dimension',
                    value: formData.elevators.cargoLiftDimension,
                    onChange: handleInputChange('elevators', 'cargoLiftDimension'),
                    type: 'text',  // Text
                },
                {
                    label: 'Lift Details',
                    value: formData.elevators.liftDetails,
                    onChange: handleInputChange('elevators', 'liftDetails'),
                    type: 'text',  // Text
                },
            ],
        },
        {
            title: 'Parking',
            visibilityKey: 'parkingVisible',
            fields: [
                {
                    label: 'Car Park Lots (Inc EV)',
                    value: formData.parking.carParkLotsIncEV,
                    onChange: handleInputChange('parking', 'carParkLotsIncEV'),
                    type: 'number',  // Numeric
                },
                {
                    label: 'EV Charging Lots',
                    value: formData.parking.evChargingLots,
                    onChange: handleInputChange('parking', 'evChargingLots'),
                    type: 'number',  // Numeric
                },
                {
                    label: 'Other Lots',
                    value: formData.parking.otherLots,
                    onChange: handleInputChange('parking', 'otherLots'),
                    options: resourceData?.parkingOptions || [],  // Multi-Select
                    valueField: 'lotType',
                    labelField: 'lotType',
                    multiple: true,
                },
                {
                    label: 'Count',
                    value: formData.parking.count,
                    onChange: handleInputChange('parking', 'count'),
                    type: 'number',  // Numeric
                },
                {
                    label: 'Allocation Ratio',
                    value: formData.parking.allocationRatio,
                    onChange: handleInputChange('parking', 'allocationRatio'),
                    type: 'number',  // Numeric
                },
                {
                    label: 'Parking Details',
                    value: formData.parking.parkingDetails,
                    onChange: handleInputChange('parking', 'parkingDetails'),
                    type: 'text',  // Text
                },
                {
                    label: 'Parking Fee (Subject to GST) - Seasonal',
                    value: formData.parking.parkingFeeSeasonal,
                    onChange: handleInputChange('parking', 'parkingFeeSeasonal'),
                    type: 'number',  // Numeric(18,2)
                    precision: 2,
                },
                {
                    label: 'Parking Fee (Subject to GST) – Non-Reserved',
                    value: formData.parking.parkingFeeNonReserved,
                    onChange: handleInputChange('parking', 'parkingFeeNonReserved'),
                    type: 'number',  // Numeric(18,2)
                    precision: 2,
                },
                {
                    label: 'Parking Fee Weekdays',
                    value: formData.parking.parkingFeeWeekdays,
                    onChange: handleInputChange('parking', 'parkingFeeWeekdays'),
                    type: 'number',  // Numeric(18,2)
                    precision: 2,
                },
                {
                    label: 'Parking Fee Weekdays (After Hours)',
                    value: formData.parking.parkingFeeWeekdaysAfterHours,
                    onChange: handleInputChange('parking', 'parkingFeeWeekdaysAfterHours'),
                    type: 'number',  // Numeric(18,2)
                    precision: 2,
                },
                {
                    label: 'Parking Fee Weekends & PH',
                    value: formData.parking.parkingFeeWeekendsPH,
                    onChange: handleInputChange('parking', 'parkingFeeWeekendsPH'),
                    type: 'number',  // Numeric(18,2)
                    precision: 2,
                },
            ],
        },
        {
            title: 'Specifications',
            visibilityKey: 'specificationsVisible',
            fields: [
                {
                    label: 'Floor To Ceiling Height From',
                    value: formData.specifications.floorToCeilingHeightFrom,
                    onChange: handleInputChange('specifications', 'floorToCeilingHeightFrom'),
                    type: 'number',  // Numeric(18,2)
                    precision: 2,
                },
                {
                    label: 'Floor To Ceiling Height To',
                    value: formData.specifications.floorToCeilingHeightTo,
                    onChange: handleInputChange('specifications', 'floorToCeilingHeightTo'),
                    type: 'number',  // Numeric(18,2)
                    precision: 2,
                },
                {
                    label: 'Floor Loading From',
                    value: formData.specifications.floorLoadingFrom,
                    onChange: handleInputChange('specifications', 'floorLoadingFrom'),
                    type: 'number',  // Numeric(18,2)
                    precision: 2,
                },
                {
                    label: 'Floor Loading To',
                    value: formData.specifications.floorLoadingTo,
                    onChange: handleInputChange('specifications', 'floorLoadingTo'),
                    type: 'number',  // Numeric(18,2)
                    precision: 2,
                },
                {
                    label: 'Slab to Slab Ceiling Height',
                    value: formData.specifications.slabToSlabCeilingHeight,
                    onChange: handleInputChange('specifications', 'slabToSlabCeilingHeight'),
                    type: 'text',  // Text
                },
                {
                    label: 'Ceiling Grad/Floor Loading Details',
                    value: formData.specifications.ceilingGradFloorLoadingDetails,
                    onChange: handleInputChange('specifications', 'ceilingGradFloorLoadingDetails'),
                    type: 'text',  // Text
                },
                {
                    label: 'Floor System',
                    value: formData.specifications.floorSystem,
                    onChange: handleInputChange('specifications', 'floorSystem'),
                    options: resourceData?.floorSystemOptions || [],  // Dropdown Select
                    valueField: 'systemName',
                    labelField: 'systemName',
                },
                {
                    label: 'Raised Floor',
                    value: formData.specifications.raisedFloor,
                    onChange: handleInputChange('specifications', 'raisedFloor'),
                    type: 'number',  // Numeric
                },
                {
                    label: 'Power System',
                    value: formData.specifications.powerSystem,
                    onChange: handleInputChange('specifications', 'powerSystem'),
                    type: 'number',  // Numeric(18,2)
                    precision: 2,
                },
                {
                    label: 'Power From',
                    value: formData.specifications.powerFrom,
                    onChange: handleInputChange('specifications', 'powerFrom'),
                    type: 'number',  // Numeric(18,2)
                    precision: 2,
                },
                {
                    label: 'Power To',
                    value: formData.specifications.powerTo,
                    onChange: handleInputChange('specifications', 'powerTo'),
                    type: 'number',  // Numeric(18,2)
                    precision: 2,
                },
                {
                    label: 'Phase',
                    value: formData.specifications.phase,
                    onChange: handleInputChange('specifications', 'phase'),
                    options: resourceData?.phaseOptions || [],  // Dropdown Select
                    valueField: 'phaseName',
                    labelField: 'phaseName',
                },
                {
                    label: 'Sprinklers',
                    value: formData.specifications.sprinklers,
                    onChange: handleInputChange('specifications', 'sprinklers'),
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
                    type: 'checkbox',  // Checkbox/Boolean
                },
                {
                    label: 'Emergency Generator',
                    value: formData.specifications.emergencyGenerator,
                    onChange: handleInputChange('specifications', 'emergencyGenerator'),
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
                    type: 'checkbox',  // Checkbox/Boolean
                },
                {
                    label: 'Power System Details',
                    value: formData.specifications.powerSystemDetails,
                    onChange: handleInputChange('specifications', 'powerSystemDetails'),
                    type: 'text',  // Text
                },
                {
                    label: 'Landlord Provision Remark',
                    value: formData.specifications.landlordProvisionRemark,
                    onChange: handleInputChange('specifications', 'landlordProvisionRemark'),
                    type: 'text',  // Text
                },
                {
                    label: 'Ceiling Grid/Floor Loading Details',
                    value: formData.specifications.ceilingGridFloorLoadingDetails,
                    onChange: handleInputChange('specifications', 'ceilingGridFloorLoadingDetails'),
                    type: 'text',  // Text
                },
            ],
        },
        {
            title: 'Ancillary Facilities',
            visibilityKey: 'ancillaryFacilitiesVisible',
            fields: [
                {
                    label: 'IT & Telecommunication System',
                    value: formData.ancillaryFacilities.itTelecommunicationSystem,
                    onChange: handleInputChange('ancillaryFacilities', 'itTelecommunicationSystem'),
                    type: 'text',  // Free Text
                },
                {
                    label: 'Security System',
                    value: formData.ancillaryFacilities.securitySystem,
                    onChange: handleInputChange('ancillaryFacilities', 'securitySystem'),
                    type: 'text',  // Free Text
                },
                {
                    label: 'Fire Safety System',
                    value: formData.ancillaryFacilities.fireSafetySystem,
                    onChange: handleInputChange('ancillaryFacilities', 'fireSafetySystem'),
                    type: 'text',  // Free Text
                },
                {
                    label: 'Common Facilities on Typical Floor',
                    value: formData.ancillaryFacilities.commonFacilitiesTypicalFloor,
                    onChange: handleInputChange('ancillaryFacilities', 'commonFacilitiesTypicalFloor'),
                    type: 'text',  // Free Text
                },
                {
                    label: 'Facility Public Remarks',
                    value: formData.ancillaryFacilities.facilityPublicRemarks,
                    onChange: handleInputChange('ancillaryFacilities', 'facilityPublicRemarks'),
                    type: 'text',  // Free Text
                },
                {
                    label: 'Facility Private Remarks',
                    value: formData.ancillaryFacilities.facilityPrivateRemarks,
                    onChange: handleInputChange('ancillaryFacilities', 'facilityPrivateRemarks'),
                    type: 'text',  // Free Text
                },
            ],
        },
        {
            title: 'Air Condition',
            visibilityKey: 'airConditionVisible',
            fields: [
                {
                    label: 'A/C System',
                    value: formData.airCondition.acSystem,
                    onChange: handleInputChange('airCondition', 'acSystem'),
                    type: 'dropdown',  // Dropdown Select
                    // options: acSystemOptions,  // Populate this with your dropdown options
                },
                {
                    label: 'Water 24Hrs for A/C',
                    value: formData.airCondition.water24hrsForAc,
                    onChange: handleInputChange('airCondition', 'water24hrsForAc'),
                    type: 'radio',  // Y/N Radio
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    label: 'Standard A/C Charges',
                    value: formData.airCondition.standardAcCharges,
                    onChange: handleInputChange('airCondition', 'standardAcCharges'),
                    type: 'numeric',  // Numeric(18,2)
                },
                {
                    label: 'Standard A/C Charges Unit',
                    value: formData.airCondition.standardAcChargesUnit,
                    onChange: handleInputChange('airCondition', 'standardAcChargesUnit'),
                    type: 'dropdown',  // Dropdown Select
                    // options: acChargesUnitOptions,  // Populate this with your dropdown options
                },
                {
                    label: 'Additional A/C Charges Units',
                    value: formData.airCondition.additionalAcChargesUnits,
                    onChange: handleInputChange('airCondition', 'additionalAcChargesUnits'),
                    type: 'numeric',  // Numeric(18,2)
                },
                {
                    label: 'A/C Ad-hoc Charges',
                    value: formData.airCondition.acAdhocCharges,
                    onChange: handleInputChange('airCondition', 'acAdhocCharges'),
                    type: 'dropdown',  // Dropdown Select
                    // options: acAdhocChargesOptions,  // Populate this with your dropdown options
                },
                {
                    label: 'Weekdays Charges',
                    value: formData.airCondition.weekdaysCharges,
                    onChange: handleInputChange('airCondition', 'weekdaysCharges'),
                    type: 'numeric',  // Numeric(18,2)
                },
                {
                    label: 'Saturday Charges',
                    value: formData.airCondition.saturdayCharges,
                    onChange: handleInputChange('airCondition', 'saturdayCharges'),
                    type: 'numeric',  // Numeric(18,2)
                },
                {
                    label: 'Sunday & PH Charges',
                    value: formData.airCondition.sundayPhCharges,
                    onChange: handleInputChange('airCondition', 'sundayPhCharges'),
                    type: 'numeric',  // Numeric(18,2)
                },
                {
                    label: 'Public Remarks',
                    value: formData.airCondition.publicRemarks,
                    onChange: handleInputChange('airCondition', 'publicRemarks'),
                    type: 'text',  // Text
                },
                {
                    label: 'Private Remarks',
                    value: formData.airCondition.privateRemarks,
                    onChange: handleInputChange('airCondition', 'privateRemarks'),
                    type: 'text',  // Text
                },
            ],
        },
        {
            title: 'Office Information',
            visibilityKey: 'officeInformationVisible',
            fields: [
                {
                    label: 'No. of Office Floors',
                    value: formData.officeInformation.noOfOfficeFloors,
                    onChange: handleInputChange('officeInformation', 'noOfOfficeFloors'),
                    type: 'calculated',  // Calculated/Numeric
                },
                {
                    label: 'Typical Minimum',
                    value: formData.officeInformation.typicalMinimum,
                    onChange: handleInputChange('officeInformation', 'typicalMinimum'),
                    type: 'numeric',  // Numeric
                },
                {
                    label: 'Typical Minimum Units',
                    value: formData.officeInformation.typicalMinimumUnits,
                    onChange: handleInputChange('officeInformation', 'typicalMinimumUnits'),
                    type: 'dropdown',  // Dropdown Select
                    // options: typicalMinimumUnitsOptions,  // Populate this with your dropdown options
                },
                {
                    label: 'Maximum',
                    value: formData.officeInformation.maximum,
                    onChange: handleInputChange('officeInformation', 'maximum'),
                    type: 'numeric',  // Numeric
                },
                {
                    label: 'Maximum Units',
                    value: formData.officeInformation.maximumUnits,
                    onChange: handleInputChange('officeInformation', 'maximumUnits'),
                    type: 'dropdown',  // Dropdown Select
                    // options: maximumUnitsOptions,  // Populate this with your dropdown options
                },
                {
                    label: 'Ultra High (Top Floor) From',
                    value: formData.officeInformation.ultraHighTopFloorFrom,
                    onChange: handleInputChange('officeInformation', 'ultraHighTopFloorFrom'),
                    type: 'numeric',  // Numeric
                },
                {
                    label: 'Ultra High (Top Floor) To',
                    value: formData.officeInformation.ultraHighTopFloorTo,
                    onChange: handleInputChange('officeInformation', 'ultraHighTopFloorTo'),
                    type: 'numeric',  // Numeric
                },
                {
                    label: 'High (Top Floor) From',
                    value: formData.officeInformation.highTopFloorFrom,
                    onChange: handleInputChange('officeInformation', 'highTopFloorFrom'),
                    type: 'numeric',  // Numeric
                },
                {
                    label: 'High (Top Floor) To',
                    value: formData.officeInformation.highTopFloorTo,
                    onChange: handleInputChange('officeInformation', 'highTopFloorTo'),
                    type: 'numeric',  // Numeric
                },
                {
                    label: 'Mid (Top Floor) From',
                    value: formData.officeInformation.midTopFloorFrom,
                    onChange: handleInputChange('officeInformation', 'midTopFloorFrom'),
                    type: 'numeric',  // Numeric
                },
                {
                    label: 'Mid (Top Floor) To',
                    value: formData.officeInformation.midTopFloorTo,
                    onChange: handleInputChange('officeInformation', 'midTopFloorTo'),
                    type: 'numeric',  // Numeric
                },
                {
                    label: 'Low (Top Floor) From',
                    value: formData.officeInformation.lowTopFloorFrom,
                    onChange: handleInputChange('officeInformation', 'lowTopFloorFrom'),
                    type: 'numeric',  // Numeric
                },
                {
                    label: 'Low (Top Floor) To',
                    value: formData.officeInformation.lowTopFloorTo,
                    onChange: handleInputChange('officeInformation', 'lowTopFloorTo'),
                    type: 'numeric',  // Numeric
                },
            ],
        },
        {
            title: 'Industrial Information',
            visibilityKey: 'industrialInformationVisible',
            fields: [
                {
                    label: 'Industrial Type',
                    value: formData.industrialInformation.industrialType,
                    onChange: handleInputChange('industrialInformation', 'industrialType'),
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
                    type: 'checkbox',  // Multi-select Checkbox
                    // options: industrialTypeOptions,  // Populate this with your checkbox options
                },
                {
                    label: 'Type of Loading Bay',
                    value: formData.industrialInformation.typeOfLoadingBay,
                    onChange: handleInputChange('industrialInformation', 'typeOfLoadingBay'),
                    type: 'dropdown',  // Dropdown Select
                    // options: loadingBayOptions,  // Populate this with your dropdown options
                },
                {
                    label: 'Total Loading Bays',
                    value: formData.industrialInformation.totalLoadingBays,
                    onChange: handleInputChange('industrialInformation', 'totalLoadingBays'),
                    type: 'numeric',  // Numeric
                },
                {
                    label: 'Loading Bay Details',
                    value: formData.industrialInformation.loadingBayDetails,
                    onChange: handleInputChange('industrialInformation', 'loadingBayDetails'),
                    type: 'text',  // Text
                },
                {
                    label: 'Other General Details',
                    value: formData.industrialInformation.otherGeneralDetails,
                    onChange: handleInputChange('industrialInformation', 'otherGeneralDetails'),
                    type: 'text',  // Text
                },
                {
                    label: 'Cranes (Y/N)',
                    value: formData.industrialInformation.cranes,
                    onChange: handleInputChange('industrialInformation', 'cranes'),
                    type: 'checkbox',  // Checkbox
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    label: 'No. of Cranes',
                    value: formData.industrialInformation.noOfCranes,
                    onChange: handleInputChange('industrialInformation', 'noOfCranes'),
                    type: 'numeric',  // Numeric
                },
                {
                    label: 'Crane Details',
                    value: formData.industrialInformation.craneDetails,
                    onChange: handleInputChange('industrialInformation', 'craneDetails'),
                    type: 'text',  // Text
                },
                {
                    label: 'Accessible For',
                    value: formData.industrialInformation.accessibleFor,
                    onChange: handleInputChange('industrialInformation', 'accessibleFor'),
                    type: 'dropdown',  // Dropdown Select
                    // options: accessibleForOptions,  // Populate this with your dropdown options
                },
            ],
        },
        {
            title: 'Retail Information',
            visibilityKey: 'retailInformationVisible',
            fields: [
                {
                    label: 'No. of Retail Floor',
                    value: formData.retailInformation.noOfRetailFloor,
                    onChange: handleInputChange('retailInformation', 'noOfRetailFloor'),
                    type: 'calculated',  // Calculated/Numeric
                },
                {
                    label: 'Mall Operating Hours',
                    fields: [
                        {
                            label: 'Weekdays',
                            value: formData.retailInformation.weekdays,
                            onChange: handleInputChange('retailInformation', 'weekdays'),
                            type: 'dropdown',  // Dropdown Select
                            // options: weekdaysOptions,  // Populate this with your dropdown options
                        },
                        {
                            label: 'Weekdays Start Time',
                            value: formData.retailInformation.weekdaysStartTime,
                            onChange: handleInputChange('retailInformation', 'weekdaysStartTime'),
                            type: 'time',  // Time
                        },
                        {
                            label: 'Weekdays End Time',
                            value: formData.retailInformation.weekdaysEndTime,
                            onChange: handleInputChange('retailInformation', 'weekdaysEndTime'),
                            type: 'time',  // Time
                        },
                        {
                            label: 'Saturday',
                            value: formData.retailInformation.saturday,
                            onChange: handleInputChange('retailInformation', 'saturday'),
                            type: 'dropdown',  // Dropdown Select
                            // options: saturdayOptions,  // Populate this with your dropdown options
                        },
                        {
                            label: 'Saturday Start Time',
                            value: formData.retailInformation.saturdayStartTime,
                            onChange: handleInputChange('retailInformation', 'saturdayStartTime'),
                            type: 'time',  // Time
                        },
                        {
                            label: 'Saturday End Time',
                            value: formData.retailInformation.saturdayEndTime,
                            onChange: handleInputChange('retailInformation', 'saturdayEndTime'),
                            type: 'time',  // Time
                        },
                        {
                            label: 'Sunday & PH',
                            value: formData.retailInformation.sundayPh,
                            onChange: handleInputChange('retailInformation', 'sundayPh'),
                            type: 'dropdown',  // Dropdown Select
                            // options: sundayPhOptions,  // Populate this with your dropdown options
                        },
                        {
                            label: 'Sunday & PH Start Time',
                            value: formData.retailInformation.sundayPhStartTime,
                            onChange: handleInputChange('retailInformation', 'sundayPhStartTime'),
                            type: 'time',  // Time
                        },
                        {
                            label: 'Sunday & PH End Time',
                            value: formData.retailInformation.sundayPhEndTime,
                            onChange: handleInputChange('retailInformation', 'sundayPhEndTime'),
                            type: 'time',  // Time
                        },
                    ],
                },
                {
                    label: 'A&P Charges',
                    value: formData.retailInformation.apCharges,
                    onChange: handleInputChange('retailInformation', 'apCharges'),
                    type: 'numeric',  // Numeric
                },
                {
                    label: 'Floor Details',
                    value: formData.retailInformation.floorDetails,
                    onChange: handleInputChange('retailInformation', 'floorDetails'),
                    type: 'text',  // Text
                },
                {
                    label: 'Private Remark',
                    value: formData.retailInformation.privateRemark,
                    onChange: handleInputChange('retailInformation', 'privateRemark'),
                    type: 'text',  // Text
                },
            ],
        }
        
        
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





