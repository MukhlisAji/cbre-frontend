import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../AppContext';
import { BsQuestionCircle } from 'react-icons/bs';
import { generateTransactionId, useUtils } from '../../lib/api/Authorization';
import { CONFIG } from '../../../config';
import PropertyFormSection from './PropertyFormSection';

const generateSystemValues = () => {
    const currentUser = "System User"; // Replace with actual user info if available
    const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

    return {
        createdBy: currentUser,
        createdDate: currentDate,
    };
};

export default function PropertyForm({ onClose, isEditing, contactId }) {
    const { token } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState(null);
    const [notificationType, setNotificationType] = useState('success');
    const [confirmationDialogVisible, setConfirmationDialogVisible] = useState(false);
    const { generateAndSetToken } = useUtils();
    const navigate = useNavigate();


    const [sectionVisibility, setSectionVisibility] = useState({
        basicInformationVisible: true,
        standardsVisible: true,
        additionalInformationVisible: true,
        areaInformationVisible: true,
        informationVisible: true,
        floorInformationVisible: true,
        propertyRemarksVisible: true,
        propertyManagementVisible: true,
        elevatorsVisible: true,
        parkingVisible: true,
        specificationsVisible: true,
        ancillaryFacilitiesVisible: true,
        airConditionVisible: true,
        officeInformationVisible: true,
        industrialInformationVisible: true,
        retailInformationVisible: true,
    });

    const toggleVisibility = (section) => {
        setSectionVisibility((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const [initialData, setInitialData] = useState(null);
    const [formData, setFormData] = useState({
        basicInformation: {
            buildingName: '',
            streetAddress: '',
            country: '',  // Prepopulated
            postalCode: '',
            streetNumber: '',  // Prepopulated
            streetName: '',  // Prepopulated
            district: '',  // Dropdown, Numeric (4,0), Calculated
            propertyType: [],  // Multi-Select Checkbox
            grade: '',  // Dropdown
            propertyUsage: [],  // Multi-Select Checkbox
            landOwnership: [],  // Multi-Select Checkbox
            ownershipStructure: [],  // Multi-Select Checkbox
            region: '',  // Dropdown
            regionOffice: '',  // Calculated / Greyed Out
            microMarketMain: '',  // Dropdown
            microMarketOffice: '',  // Calculated / Greyed Out
            microMarketIndustrial: '',  // Dropdown
            microMarketRetail: '',  // Dropdown
            zoning: '',  // Dropdown Select
            propertyStatus: ''  // Dropdown
        },
        standards: {
            greenMark: '',
            award: '',
            yearOfAward: '',
            leedCertification: '',
            yearOfExpiry: '',
            wells: '',
            projectType: '',  // Yes/No
            wiredscore: ''
        },
        additionalInformation: {
            topDate: '',
            expectedTopDate: false,  // Checkbox/Boolean
            cscDate: '',
            termsDetails: ''
        },
        area: {
            landArea: '',
            landAreaUnits: '',
            grossFloorArea: '',
            grossFloorAreaUnits: '',
            netLettableArea: '',  // Calculated/Greyed Out
            areaBreakdown: '',
            totalUnits: '',
            unitOfComparison: '',
            permissiblePlotRatio: '',
            grossPlotRatio: '',
            netLettableAreaOffice: '',
            netLettableAreaIndustrial: '',
            netLettableAreaRetail: '',
            potentialBuildUpArea: ''  // Calculated/Greyed Out
        },
        information: {
            headline: '',  // Free Text
            propertyWebsite: '',  // Free Text
            locationDescription: '',  // Free Text
            buildingDescription: '',  // Free Text
        },
        floor: {
            landArea: '',  // Free Text
            floorNumber: '',  // Numeric
            aboveGroundFloorNumber: '',  // Calculated/Numeric
            totalFloors: '',  // Calculated/Numeric
        },
        amenities: {
            withinComplex: '',  // Free Text
            withinProximity: '',  // Free Text
        },
        propertyRemarks: {
            public: '',  // Free Text
            private: '',  // Free Text
        },
        propertyManagement: {
            pmInHouse: false,  // Checkbox/Boolean
            estimatedServiceCharges: '',
            actualServiceCharges: '',
            serviceChargeCost: '',
            cbreManaged: false,  // Checkbox/Boolean
            managementStartDate: '',
            managementExpiryDate: '',
            managementContractLength: '',  // Calculated/Greyed Out
            pmManagingAgent: ''
        },
        parking: {
            carParkLots: '',
            evChargingLots: '',
            otherLots: [],  // Multi-Select
            allocationRatio: '',
            allocationRatioUnits: '',
            parkingDetails: '',
            parkingFeeSeasonal: '',
            parkingFeeNonReserved: '',
            parkingFeeWeekdays: '',
            parkingFeeWeekdaysAfterHours: '',
            parkingFeeWeekendsPH: ''
        },
        elevators: {
            passengerLiftCount: '',
            carParkLiftGF: '',
            liftZonesCount: '',
            serviceLift: '',
            cargoLift: '',
            cargoLiftMaxLoad: '',
            vipLift: '',
            serviceLiftDimension: '',
            cargoLiftDimension: '',
            liftDetails: ''
        },
        airCondition: {
            acSystem: '',
            water24HrsForAC: false,  // Yes/No Radio
            standardACCharges: '',
            additionalACCharges: '',
            acAdhocCharges: '',
            acPublicRemarks: '',
            acPrivateRemarks: ''
        },
        officeInformation: {
            officeFloorsCount: '',
            typicalMinimum: '',
            typicalMaximum: '',
            ultraHighFrom: '',
            ultraHighTo: '',
            highFrom: '',
            highTo: '',
            midFrom: '',
            midTo: '',
            lowFrom: '',
            lowTo: ''
        },
        industrialInformation: {
            industrialType: [],  // Multi-Select Checkbox
            loadingBayType: '',  // Dropdown
            totalLoadingBays: '',
            loadingBayDetails: '',
            cranes: false,  // Checkbox
            cranesCount: '',
            craneDetails: '',
            accessibleFor: ''  // Dropdown
        },
        retailInformation: {
            retailFloorsCount: '',
            mallOperatingHours: {
                weekdays: '',
                weekdaysStartTime: '',
                weekdaysEndTime: '',
                saturday: '',
                saturdayStartTime: '',
                saturdayEndTime: '',
                sundayPH: '',
                sundayPHStartTime: '',
                sundayPHEndTime: ''
            },
            anpCharges: '',
            floorDetails: '',
            privateRemark: ''
        },
        specifications: {
            floorToCeilingHeightFrom: '',
            floorToCeilingHeightTo: '',
            floorLoadingFrom: '',
            floorLoadingTo: '',
            slabToSlabCeilingHeight: '',
            ceilingFloorLoadingDetails: '',
            floorSystem: '',
            raisedFloor: '',
            powerSystem: '',
            powerFrom: '',
            powerTo: '',
            phase: '',
            sprinklers: false,  // Checkbox/Boolean
            emergencyGenerator: false,  // Checkbox/Boolean
            powerSystemDetails: '',
            landlordProvisionRemark: ''
        },
        ancillaryFacilities: {
            itTelecomSystem: '',
            securitySystem: '',
            fireSafetySystem: '',
            commonFacilitiesTypicalFloor: '',
            publicRemarks: '',
            privateRemarks: ''
        }
    });


    const url = `${CONFIG.CONTACT_SERVICE}/${contactId}`;

    useEffect(() => {
        if (isEditing) {
            console.log("url is ", url);
            const fetchAccountData = async () => {
                try {
                    const transactionId = generateTransactionId();
                    const response = await fetch(url, {
                        method: 'GET',
                        headers: {
                            'transactionId': transactionId,
                            'Content-Type': 'application/json',
                        }
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    const data = await response.json();
                    setInitialData(data.resultSet);
                    console.log('Fetched contact data:', data);
                } catch (error) {
                    console.error('Error fetching contact data:', error);
                }
            };
            fetchAccountData();
        }
    }, [isEditing, url]);
    useEffect(() => {
        if (initialData) {
            setFormData({
                basicInformation: {
                    buildingName: initialData.buildingName || '',
                    streetAddress: initialData.streetAddress || '',
                    country: initialData.country || '',
                    postalCode: initialData.postalCode || '',
                    streetNumber: initialData.streetNumber || '',
                    streetName: initialData.streetName || '',
                    district: initialData.district || '',
                    propertyType: initialData.propertyType || [],
                    grade: initialData.grade || '',
                    propertyUsage: initialData.propertyUsage || [],
                    landOwnership: initialData.landOwnership || [],
                    ownershipStructure: initialData.ownershipStructure || [],
                    region: initialData.region || '',
                    regionOffice: initialData.regionOffice || '',
                    microMarketMain: initialData.microMarketMain || '',
                    microMarketOffice: initialData.microMarketOffice || '',
                    microMarketIndustrial: initialData.microMarketIndustrial || '',
                    microMarketRetail: initialData.microMarketRetail || '',
                    zoning: initialData.zoning || '',
                    propertyStatus: initialData.propertyStatus || ''
                },
                standards: {
                    greenMark: initialData.greenMark || '',
                    award: initialData.award || '',
                    yearOfAward: initialData.yearOfAward || '',
                    leedCertification: initialData.leedCertification || '',
                    yearOfExpiry: initialData.yearOfExpiry || '',
                    wells: initialData.wells || '',
                    projectType: initialData.projectType || '',
                    wiredscore: initialData.wiredscore || ''
                },
                additionalInformation: {
                    topDate: initialData.topDate || '',
                    expectedTopDate: initialData.expectedTopDate || false,
                    cscDate: initialData.cscDate || '',
                    termsDetails: initialData.termsDetails || ''
                },
                area: {
                    landArea: initialData.landArea || '',
                    landAreaUnits: initialData.landAreaUnits || '',
                    grossFloorArea: initialData.grossFloorArea || '',
                    grossFloorAreaUnits: initialData.grossFloorAreaUnits || '',
                    netLettableArea: initialData.netLettableArea || '',
                    areaBreakdown: initialData.areaBreakdown || '',
                    totalUnits: initialData.totalUnits || '',
                    unitOfComparison: initialData.unitOfComparison || '',
                    permissiblePlotRatio: initialData.permissiblePlotRatio || '',
                    grossPlotRatio: initialData.grossPlotRatio || '',
                    netLettableAreaOffice: initialData.netLettableAreaOffice || '',
                    netLettableAreaIndustrial: initialData.netLettableAreaIndustrial || '',
                    netLettableAreaRetail: initialData.netLettableAreaRetail || '',
                    potentialBuildUpArea: initialData.potentialBuildUpArea || ''
                },
                information: {
                    headline: initialData.information.headline || '',
                    propertyWebsite: initialData.information.propertyWebsite || '',
                    locationDescription: initialData.information.locationDescription || '',
                    buildingDescription: initialData.information.buildingDescription || '',
                },
                floor: {
                    landArea: initialData.floor.landArea || '',
                    floorNumber: initialData.floor.floorNumber || '',
                    aboveGroundFloorNumber: initialData.floor.aboveGroundFloorNumber || '',
                    totalFloors: initialData.floor.totalFloors || '',
                },
                amenities: {
                    withinComplex: initialData.amenities.withinComplex || '',
                    withinProximity: initialData.amenities.withinProximity || '',
                },
                propertyRemarks: {
                    public: initialData.propertyRemarks.public || '',
                    private: initialData.propertyRemarks.private || '',
                },
                propertyManagement: {
                    pmInHouse: initialData.pmInHouse || false,
                    estimatedServiceCharges: initialData.estimatedServiceCharges || '',
                    actualServiceCharges: initialData.actualServiceCharges || '',
                    serviceChargeCost: initialData.serviceChargeCost || '',
                    cbreManaged: initialData.cbreManaged || false,
                    managementStartDate: initialData.managementStartDate || '',
                    managementExpiryDate: initialData.managementExpiryDate || '',
                    managementContractLength: initialData.managementContractLength || '',
                    pmManagingAgent: initialData.pmManagingAgent || ''
                },
                parking: {
                    carParkLots: initialData.carParkLots || '',
                    evChargingLots: initialData.evChargingLots || '',
                    otherLots: initialData.otherLots || [],
                    allocationRatio: initialData.allocationRatio || '',
                    allocationRatioUnits: initialData.allocationRatioUnits || '',
                    parkingDetails: initialData.parkingDetails || '',
                    parkingFeeSeasonal: initialData.parkingFeeSeasonal || '',
                    parkingFeeNonReserved: initialData.parkingFeeNonReserved || '',
                    parkingFeeWeekdays: initialData.parkingFeeWeekdays || '',
                    parkingFeeWeekdaysAfterHours: initialData.parkingFeeWeekdaysAfterHours || '',
                    parkingFeeWeekendsPH: initialData.parkingFeeWeekendsPH || ''
                },
                elevators: {
                    passengerLiftCount: initialData.passengerLiftCount || '',
                    carParkLiftGF: initialData.carParkLiftGF || '',
                    liftZonesCount: initialData.liftZonesCount || '',
                    serviceLift: initialData.serviceLift || '',
                    cargoLift: initialData.cargoLift || '',
                    cargoLiftMaxLoad: initialData.cargoLiftMaxLoad || '',
                    vipLift: initialData.vipLift || '',
                    serviceLiftDimension: initialData.serviceLiftDimension || '',
                    cargoLiftDimension: initialData.cargoLiftDimension || '',
                    liftDetails: initialData.liftDetails || ''
                },
                airCondition: {
                    acSystem: initialData.acSystem || '',
                    water24HrsForAC: initialData.water24HrsForAC || false,
                    standardACCharges: initialData.standardACCharges || '',
                    additionalACCharges: initialData.additionalACCharges || '',
                    acAdhocCharges: initialData.acAdhocCharges || '',
                    acPublicRemarks: initialData.acPublicRemarks || '',
                    acPrivateRemarks: initialData.acPrivateRemarks || ''
                },
                officeInformation: {
                    officeFloorsCount: initialData.officeFloorsCount || '',
                    typicalMinimum: initialData.typicalMinimum || '',
                    typicalMaximum: initialData.typicalMaximum || '',
                    ultraHighFrom: initialData.ultraHighFrom || '',
                    ultraHighTo: initialData.ultraHighTo || '',
                    highFrom: initialData.highFrom || '',
                    highTo: initialData.highTo || '',
                    midFrom: initialData.midFrom || '',
                    midTo: initialData.midTo || '',
                    lowFrom: initialData.lowFrom || '',
                    lowTo: initialData.lowTo || ''
                },
                industrialInformation: {
                    industrialType: initialData.industrialType || [],
                    loadingBayType: initialData.loadingBayType || '',
                    totalLoadingBays: initialData.totalLoadingBays || '',
                    loadingBayDetails: initialData.loadingBayDetails || '',
                    cranes: initialData.cranes || false,
                    cranesCount: initialData.cranesCount || '',
                    craneDetails: initialData.craneDetails || '',
                    accessibleFor: initialData.accessibleFor || ''
                },
                retailInformation: {
                    retailFloorsCount: initialData.retailFloorsCount || '',
                    mallOperatingHours: {
                        weekdays: initialData.mallOperatingHours?.weekdays || '',
                        weekdaysStartTime: initialData.mallOperatingHours?.weekdaysStartTime || '',
                        weekdaysEndTime: initialData.mallOperatingHours?.weekdaysEndTime || '',
                        saturday: initialData.mallOperatingHours?.saturday || '',
                        saturdayStartTime: initialData.mallOperatingHours?.saturdayStartTime || '',
                        saturdayEndTime: initialData.mallOperatingHours?.saturdayEndTime || '',
                        sundayPH: initialData.mallOperatingHours?.sundayPH || '',
                        sundayPHStartTime: initialData.mallOperatingHours?.sundayPHStartTime || '',
                        sundayPHEndTime: initialData.mallOperatingHours?.sundayPHEndTime || ''
                    },
                    anpCharges: initialData.anpCharges || '',
                    floorDetails: initialData.floorDetails || '',
                    privateRemark: initialData.privateRemark || ''
                },
                specifications: {
                    floorToCeilingHeightFrom: initialData.floorToCeilingHeightFrom || '',
                    floorToCeilingHeightTo: initialData.floorToCeilingHeightTo || '',
                    floorLoadingFrom: initialData.floorLoadingFrom || '',
                    floorLoadingTo: initialData.floorLoadingTo || '',
                    slabToSlabCeilingHeight: initialData.slabToSlabCeilingHeight || '',
                    ceilingFloorLoadingDetails: initialData.ceilingFloorLoadingDetails || '',
                    floorSystem: initialData.floorSystem || '',
                    raisedFloor: initialData.raisedFloor || '',
                    powerSystem: initialData.powerSystem || '',
                    powerFrom: initialData.powerFrom || '',
                    powerTo: initialData.powerTo || '',
                    phase: initialData.phase || '',
                    sprinklers: initialData.sprinklers || false,
                    emergencyGenerator: initialData.emergencyGenerator || false,
                    powerSystemDetails: initialData.powerSystemDetails || '',
                    landlordProvisionRemark: initialData.landlordProvisionRemark || ''
                },
                ancillaryFacilities: {
                    itTelecomSystem: initialData.itTelecomSystem || '',
                    securitySystem: initialData.securitySystem || '',
                    fireSafetySystem: initialData.fireSafetySystem || '',
                    commonFacilitiesTypicalFloor: initialData.commonFacilitiesTypicalFloor || '',
                    publicRemarks: initialData.publicRemarks || '',
                    privateRemarks: initialData.privateRemarks || ''
                }
            });
        }
    }, [initialData]);




    useEffect(() => {
        toggleBodyOverflow(true);
        return () => {
            toggleBodyOverflow(false);
        };
    }, []);

    // useEffect(() => {
    //     if (formData) {
    //         console.log("this is the data : ", formData);
    //     }
    // })

    const handleAccountAction = async (event, { isNew = false, navigateTo = null, showDialog = false }) => {
        event.preventDefault();
        setIsLoading(true);
        console.log("formData : ", formData);
        console.log('Processing data');
        // console.log('Set to invalid session');


        try {
            let result;
            if (isEditing) {
                result = await handleEdit(event);
            } else {
                result = await handleSubmit(event);
            }

            if (result.statusCode === "401" || result.statusDescription.message === "Session expired or invalid") {
                console.log("Session invalid, regenerating token...");
                await generateAndSetToken();

                // Retry the operation with the new token
                if (isEditing) {
                    result = await handleEdit(event);
                } else {
                    result = await handleSubmit(event);
                }
            }

            if (result.statusCode === "00") {
                if (isEditing) {
                    showNotification("Contact updated successfully!", 'success');
                    if (navigateTo) {
                        navigate(navigateTo);
                    }
                } else {
                    if (result.resultSet && result.resultSet.contactId) {
                        const contactId = result.resultSet.contactId;
                        showNotification("Contact created successfully!", 'success');
                        if (isNew) {
                            resetData();
                        } else if (navigateTo) {
                            navigate(navigateTo, { state: { openModal: true } });
                        } else {
                            navigate(`details/${contactId}`);
                        }
                    } else {
                        console.error('Unexpected response format for new account:', result);
                        showNotification("Account created, but no ID returned. Please check the account list.", 'warning');
                    }
                }
            } else {
                console.error('Unexpected response format:', result);
                showNotification(`Failed to ${isEditing ? 'update' : 'create'} account. Please try again.`, 'error');
            }
        } catch (error) {
            console.error('Error during submission:', error);
            showNotification(`Failed to ${isEditing ? 'update' : 'create'} account. Please try again.`, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = (event) => handleAccountAction(event, { navigateTo: isEditing ? `details/${contactId}` : null });
    const handleSaveNew = (event) => handleAccountAction(event, { isNew: true });
    // const handleConfirmSave = (event) => handleAccountAction(event, { navigateTo: '/property/contacts' });
    const handleCancelSave = () => {
        setConfirmationDialogVisible(false);
        setIsLoading(false);
    };

    const handleSubmit = async (event) => {
        const transactionId = generateTransactionId();
        event.preventDefault();

        try {
            const response = await fetch(`${CONFIG.CONTACT_SERVICE}/`, {
                method: 'POST',
                headers: {
                    'SFDC-token': token,
                    'transactionId': transactionId,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Success:', result);
            return result;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    };

    const handleEdit = async (event) => {
        const transactionId = generateTransactionId();
        event.preventDefault();

        try {
            const response = await fetch(`${CONFIG.CONTACT_SERVICE}/`, {
                method: 'PUT',
                headers: {
                    'SFDC-token': token,
                    'transactionId': transactionId,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Success:', result);
            return result;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    };

    const showNotification = (message, type = 'success') => {
        setNotification(message);
        setNotificationType(type);
        setTimeout(() => {
            setNotification(null);
            setNotificationType('success');
        }, 5000);
    };

    const resetData = () => {
        setFormData({
            basicInformation: {
                buildingName: '',
                streetAddress: '',
                country: '',  // Prepopulated
                postalCode: '',
                streetNumber: '',  // Prepopulated
                streetName: '',  // Prepopulated
                district: '',  // Dropdown, Numeric (4,0), Calculated
                propertyType: [],  // Multi-Select Checkbox
                grade: '',  // Dropdown
                propertyUsage: [],  // Multi-Select Checkbox
                landOwnership: [],  // Multi-Select Checkbox
                ownershipStructure: [],  // Multi-Select Checkbox
                region: '',  // Dropdown
                regionOffice: '',  // Calculated / Greyed Out
                microMarketMain: '',  // Dropdown
                microMarketOffice: '',  // Calculated / Greyed Out
                microMarketIndustrial: '',  // Dropdown
                microMarketRetail: '',  // Dropdown
                zoning: '',  // Dropdown Select
                propertyStatus: ''  // Dropdown
            },
            standards: {
                greenMark: '',
                award: '',
                yearOfAward: '',
                leedCertification: '',
                yearOfExpiry: '',
                wells: '',
                projectType: '',  // Yes/No
                wiredscore: ''
            },
            additionalInformation: {
                topDate: '',
                expectedTopDate: false,  // Checkbox/Boolean
                cscDate: '',
                termsDetails: ''
            },
            area: {
                landArea: '',
                landAreaUnits: '',
                grossFloorArea: '',
                grossFloorAreaUnits: '',
                netLettableArea: '',  // Calculated/Greyed Out
                areaBreakdown: '',
                totalUnits: '',
                unitOfComparison: '',
                permissiblePlotRatio: '',
                grossPlotRatio: '',
                netLettableAreaOffice: '',
                netLettableAreaIndustrial: '',
                netLettableAreaRetail: '',
                potentialBuildUpArea: ''  // Calculated/Greyed Out
            },
            information: {
                headline: '',  // Free Text
                propertyWebsite: '',  // Free Text
                locationDescription: '',  // Free Text
                buildingDescription: '',  // Free Text
            },
            floor: {
                landArea: '',  // Free Text
                floorNumber: '',  // Numeric
                aboveGroundFloorNumber: '',  // Calculated/Numeric
                totalFloors: '',  // Calculated/Numeric
            },
            amenities: {
                withinComplex: '',  // Free Text
                withinProximity: '',  // Free Text
            },
            propertyRemarks: {
                public: '',  // Free Text
                private: '',  // Free Text
            },
            propertyManagement: {
                pmInHouse: false,  // Checkbox/Boolean
                estimatedServiceCharges: '',
                actualServiceCharges: '',
                serviceChargeCost: '',
                cbreManaged: false,  // Checkbox/Boolean
                managementStartDate: '',
                managementExpiryDate: '',
                managementContractLength: '',  // Calculated/Greyed Out
                pmManagingAgent: ''
            },
            parking: {
                carParkLots: '',
                evChargingLots: '',
                otherLots: [],  // Multi-Select
                allocationRatio: '',
                allocationRatioUnits: '',
                parkingDetails: '',
                parkingFeeSeasonal: '',
                parkingFeeNonReserved: '',
                parkingFeeWeekdays: '',
                parkingFeeWeekdaysAfterHours: '',
                parkingFeeWeekendsPH: ''
            },
            elevators: {
                passengerLiftCount: '',
                carParkLiftGF: '',
                liftZonesCount: '',
                serviceLift: '',
                cargoLift: '',
                cargoLiftMaxLoad: '',
                vipLift: '',
                serviceLiftDimension: '',
                cargoLiftDimension: '',
                liftDetails: ''
            },
            airCondition: {
                acSystem: '',
                water24HrsForAC: false,  // Yes/No Radio
                standardACCharges: '',
                additionalACCharges: '',
                acAdhocCharges: '',
                acPublicRemarks: '',
                acPrivateRemarks: ''
            },
            officeInformation: {
                officeFloorsCount: '',
                typicalMinimum: '',
                typicalMaximum: '',
                ultraHighFrom: '',
                ultraHighTo: '',
                highFrom: '',
                highTo: '',
                midFrom: '',
                midTo: '',
                lowFrom: '',
                lowTo: ''
            },
            industrialInformation: {
                industrialType: [],  // Multi-Select Checkbox
                loadingBayType: '',  // Dropdown
                totalLoadingBays: '',
                loadingBayDetails: '',
                cranes: false,  // Checkbox
                cranesCount: '',
                craneDetails: '',
                accessibleFor: ''  // Dropdown
            },
            retailInformation: {
                retailFloorsCount: '',
                mallOperatingHours: {
                    weekdays: '',
                    weekdaysStartTime: '',
                    weekdaysEndTime: '',
                    saturday: '',
                    saturdayStartTime: '',
                    saturdayEndTime: '',
                    sundayPH: '',
                    sundayPHStartTime: '',
                    sundayPHEndTime: ''
                },
                anpCharges: '',
                floorDetails: '',
                privateRemark: ''
            },
            specifications: {
                floorToCeilingHeightFrom: '',
                floorToCeilingHeightTo: '',
                floorLoadingFrom: '',
                floorLoadingTo: '',
                slabToSlabCeilingHeight: '',
                ceilingFloorLoadingDetails: '',
                floorSystem: '',
                raisedFloor: '',
                powerSystem: '',
                powerFrom: '',
                powerTo: '',
                phase: '',
                sprinklers: false,  // Checkbox/Boolean
                emergencyGenerator: false,  // Checkbox/Boolean
                powerSystemDetails: '',
                landlordProvisionRemark: ''
            },
            ancillaryFacilities: {
                itTelecomSystem: '',
                securitySystem: '',
                fireSafetySystem: '',
                commonFacilitiesTypicalFloor: '',
                publicRemarks: '',
                privateRemarks: ''
            }
        });
    };

    const toggleBodyOverflow = (isModalOpen) => {
        if (isModalOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    };

    if (!initialData && isEditing) {
        return <p>Loading...</p>;
    }

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${onClose ? 'animate-fade-in' : 'animate-fade-out'}`}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative flex flex-col w-1/2 h-3/4 bg-white shadow-lg rounded-lg">
                {isLoading && (
                    <div className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center z-50">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-c-teal"></div>
                    </div>
                )}
                {notification && (
                    <div className={`absolute top-5 right-5 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in-out
                        ${notificationType === 'success' ? 'bg-green-500' : 'bg-red-500'}
                    `}>
                        {notification}
                    </div>
                )}
                <header className="sticky top-0 shadow-sm py-3 bg-neutral-100 z-10 flex items-center justify-center rounded-t-lg border-b border-neutral-700">
                    <button
                        onClick={onClose}
                        className="absolute -top-4 -right-4 text-gray-600 hover:text-gray-800"
                    >
                        &times;
                    </button>
                    <h2 className="text-lg font-bold text-c-dark-grayish text-align-center">NEW PROPERTY</h2>
                </header>

                <main className="flex-1 overflow-y-auto">
                    <div className="bg-white relative p-4">
                        <PropertyFormSection
                            formData={formData}
                            setFormData={setFormData}
                            toggleVisibility={toggleVisibility}
                            sectionVisibility={sectionVisibility}
                            initialData={initialData}
                        />
                    </div>
                </main>

                <footer className="sticky bottom-0 bg-neutral-100 py-3 flex items-center gap-2 justify-center border-t border-neutral-500 shadow-md z-10 rounded-b-lg">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg bg-white text-blue-600 border border-neutral-500 text-xs hover:text-neutral-700 hover:bg-neutral-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSaveNew}
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-white text-blue-600 border border-neutral-500 text-xs hover:text-neutral-700 hover:bg-neutral-100"
                    >
                        Save & New
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 text-white rounded-lg bg-c-teal text-xs text-white hover:text-white hover:bg-c-weldon-blue"
                    >
                        {isEditing ? 'Update' : 'Save'}
                    </button>
                </footer>

                {confirmationDialogVisible && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="relative bg-white p-6 rounded-lg shadow-lg w-80 max-w-md">
                            <div className="flex flex-col items-center">
                                <BsQuestionCircle className="text-yellow-500 text-4xl mb-4" />
                                <h3 className="text-lg font-bold text-center">Confirm Save</h3>
                                <p className="mt-2 text-center">Do you want to proceed to create new contact with this set of data?</p>
                                <div className="flex gap-4 mt-4">
                                    <button
                                        onClick={handleCancelSave}
                                        className="px-4 py-1.5 rounded-lg bg-white text-blue-600 border border-neutral-500 text-xs hover:text-neutral-700 hover:bg-neutral-100"
                                    >
                                        No
                                    </button>
                                    <button
                                        onClick={handleConfirmSave}
                                        className="px-4 py-1.5 text-white rounded-lg bg-c-teal text-xs text-white hover:text-white hover:bg-c-weldon-blue"
                                    >
                                        Yes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}



