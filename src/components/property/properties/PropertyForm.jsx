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

export default function PropertyForm({ onClose }) {
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

    const initialForm = {
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
    }

    const [formData, setFormData] = useState(initialForm);

    const resetData = () => setFormData(initialForm);

    useEffect(() => {
        toggleBodyOverflow(true);
        return () => toggleBodyOverflow(false);
    }, []);

    const handleAccountAction = async (event, { isNew = false, navigateTo = null }) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            let result = await handleSubmit();
            if (result.statusCode === "401") {
                console.log("Session expired. Regenerating token...");
                await generateAndSetToken();
                result = await handleSubmit(); // Retry submission after token refresh
            }

            if (result.statusCode === "00" && result.resultSet?.propertyId) {
                const propertyId = result.resultSet.propertyId;
                showNotification("Property created successfully!", 'success');
                if (isNew) resetData();
                else navigate(`details/${propertyId}`);
            } else {
                showNotification("Failed to create property. Please try again.", 'error');
            }
        } catch (error) {
            console.error("Error creating property:", error);
            showNotification("An error occurred. Please try again.", 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = (event) => handleAccountAction(event, { navigateTo: null });
    const handleSaveNew = (event) => handleAccountAction(event, { isNew: true });

    const handleSubmit = async () => {
        const transactionId = generateTransactionId();

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

            if (!response.ok) throw new Error('Network response was not ok');

            return await response.json();
        } catch (error) {
            console.error("Submission error:", error);
            throw error;
        }
    };

    const showNotification = (message, type = 'success') => {
        setNotification(message);
        setNotificationType(type);
        setTimeout(() => setNotification(null), 5000);
    };

    const toggleBodyOverflow = (isModalOpen) => {
        document.body.classList.toggle('overflow-hidden', isModalOpen);
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${onClose ? 'animate-fade-in' : 'animate-fade-out'}`}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative flex flex-col w-1/2 h-5/6 bg-white shadow-lg rounded-lg">
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
                        // initialData={initialData}
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
                        Save
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
