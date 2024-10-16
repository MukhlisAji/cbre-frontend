import React, { useState, useEffect } from 'react';
import { RiPencilFill } from 'react-icons/ri';
import { CONFIG } from '../../../../../config';
import { generateTransactionId } from '../../../../lib/api/Authorization';
import PropertyResource from '../../../PropertyResource';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import { Transition } from '@headlessui/react';


export default function DetailsInfo({ data, onClose, isDetail }) {
    const [initialKind, setInitialKind] = useState(data?.kind || '');
    const [kindLabel, setKindLabel] = useState('');
    const [kind, setKind] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const { propertyResources, fetchPropertyResources } = PropertyResource();
    const [isLoading, setIsLoading] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    const [alerts, setAlerts] = useState([]);

    const addAlert = (message, severity) => {
        const newAlert = { id: Date.now(), message, severity };
        setAlerts(prevAlerts => [...prevAlerts, newAlert]);
    };

    useEffect(() => {
        if (alerts.length > 0) {
            const timer = setTimeout(() => {
                setAlerts(prevAlerts => prevAlerts.slice(1));
            }, 5000); // Remove the oldest alert after 5 seconds

            return () => clearTimeout(timer);
        }
    }, [alerts]);


    useEffect(() => {
        // Fetch propertyResources
        fetchPropertyResources()
            .then(() => {
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching property resources:", error);
                setIsLoading(false);
            });

    }, []);

    useEffect(() => {
        if (propertyResources?.propertyContactKind && initialKind) {
            const selectedKind = propertyResources.propertyContactKind.find(
                (option) => option.accountContactType === initialKind
            );

            if (selectedKind) {
                setKindLabel(selectedKind.accountContactTypeId);
                setKind(selectedKind.accountContactTypeId);
                console.log('selectedKind ', selectedKind.accountContactType);
            } else {
                console.warn(`No matching kind found for ${initialKind}`);
            }
        }
    }, [propertyResources]); // Add dependencies here

    const handleKindChange = (event) => {
        const selectedValue = event.target.value;
        console.log("selected value : ", selectedValue);
        setKindLabel(selectedValue);
        setKind(selectedValue);
    };



    const handleBackdropClick = (e) => {
        if (onClose) onClose();
    };

    const handleModalContentClick = (e) => {
        e.stopPropagation();
    };

    const handleEditClick = () => {
        setIsEdit(!isEdit);
    };

    const handleSaveClick = async () => {
        if (!kind) { // Validate required field
            alert('Please select a Kind.');
            return;
        }

        setIsSaving(true); // Set saving flag to indicate loading

        const dataToSend = {
            accountContactInformation: [
                {
                    buildingId: 183933,
                    accountId: data?.accountId,
                    contactId: data?.contactId,
                    createdBy: 'James',
                    createdTimestamp: new Date().toISOString(),
                    modifiedBy: 'James',
                    modifiedTimestamp: new Date().toISOString(),
                    accountContactTypeId: kind,
                },
            ],
        };

        try {
            const response = await fetch(`${CONFIG.PROPERTY_SERVICE}/accounts-contacts`, {
                method: 'POST',
                headers: {
                    'transactionId': generateTransactionId(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            console.log('dataToSend ', dataToSend);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error: ${response.statusText} - ${errorData.statusMessage}`);
            }

            const responseData = await response.json();

            if (responseData.statusCode === '00') {
                setIsEdit(false);
                setIsSaving(false); // Reset saving flag after successful save
                addAlert('Contact information saved successfully!', 'success');

            } else {
                setIsSaving(false); // Reset saving flag if there's an error
                addAlert(`Error saving contact information: ${responseData.statusMessage}`, 'error');
            }
        } catch (error) {
            console.error('Error saving contact information:', error);
            setIsSaving(false); // Reset saving flag if there's an error
            addAlert(`An error occurred. Please try again later`, 'error');
        }
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${onClose ? 'animate-fade-in' : 'animate-fade-out'}`} onClick={handleBackdropClick}>
            <div className="fixed top-5 right-5 z-50 space-y-2">
                {alerts.map((alert) => (
                    <Alert
                        key={alert.id}
                        icon={alert.severity === 'success' ? <CheckIcon fontSize="inherit" /> : <ErrorIcon fontSize="inherit" />}
                        severity={alert.severity}
                        onClose={() => {
                            setAlerts(prevAlerts =>
                                prevAlerts.filter(a => a.id !== alert.id)
                            );
                        }}
                    >
                        {alert.message}
                    </Alert>
                ))}
            </div>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative flex flex-col w-full max-w-md bg-white shadow-lg rounded-lg" onClick={handleModalContentClick}>
                {/* Header */}
                <div className="flex bg-c-teal justify-between items-center p-4 border-b rounded-t-lg">
                    <span className="text-lg text-white font-semibold">Contact Details</span>
                    <span onClick={onClose} className="cursor-pointer text-white text-lg hover:text-white/80">
                        &times;
                    </span>
                </div>
                {/* Modal Content */}
                <main className="flex-1 overflow-y-auto p-4">
                    <div className="relative">
                        <div className="max-w-lg mx-auto bg-white">
                            {/* Kind Dropdown */}
                            <div className="p-2 flex items-center odd:bg-gray-100 even:bg-white">
                                <label htmlFor="kind-select" className="block text-sm font-medium text-gray-700 w-1/3">
                                    Kind:
                                </label>
                                <select
                                    value={kindLabel}
                                    onChange={handleKindChange}
                                    className="w-2/3 px-2 py-2 bg-white border border-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-0.5 focus:ring-c-teal focus:border-c-teal"
                                    disabled={(isDetail && !isEdit) || isLoading}
                                >
                                    {isLoading ? (
                                        <option value="">Loading...</option>
                                    ) : propertyResources && propertyResources.propertyContactKind ? (
                                        propertyResources.propertyContactKind.map((option) => (
                                            <option key={option.accountContactTypeId} value={option.accountContactTypeId}>
                                                {option.accountContactType}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="">No options available</option>
                                    )}
                                </select>
                                {isDetail && <RiPencilFill className="text-sm ml-2 cursor-pointer hover:text-c-teal" onClick={handleEditClick} />}
                            </div>

                            {/* Account Name */}
                            <div className="p-2 flex items-center odd:bg-gray-100 even:bg-white">
                                <label className="block text-sm font-medium text-gray-700 w-1/3">
                                    Account Name:
                                </label>
                                <div className="w-2/3 px-2 py-2">
                                    {data?.accountName || 'N/A'}
                                </div>
                            </div>


                            {/* Name */}
                            <div className="p-2 flex items-center odd:bg-gray-100 even:bg-white">
                                <label className="block text-sm font-medium text-gray-700 w-1/3">
                                    Name:
                                </label>
                                <div className="w-2/3 px-2 py-2">
                                    {data?.contactName || 'N/A'}
                                </div>
                            </div>


                            {/* Contact Number */}
                            <div className="p-2 flex items-center odd:bg-gray-100 even:bg-white">
                                <label className="block text-sm font-medium text-gray-700 w-1/3">
                                    Contact Number:
                                </label>
                                <div className="w-2/3 px-2 py-2">
                                    {data?.businessPhone || data?.mobilePhone || 'N/A'}
                                </div>
                            </div>


                            {/* Contact Email */}
                            <div className="p-2 flex items-center odd:bg-gray-100 even:bg-white">
                                <label className="block text-sm font-medium text-gray-700 w-1/3">
                                    Contact Email:
                                </label>
                                <div className="w-2/3 px-2 py-2 ">
                                    <a href={`mailto:${data?.email}`} style={{ color: "green" }}>
                                        {data?.email || 'N/A'}
                                    </a>
                                </div>
                            </div>
                            {/* Footer */}
                            <footer className="sticky bottom-0 pt-3 flex items-center gap-2 justify-start border-t border-neutral-500 z-10 rounded-b-lg">
                                <button onClick={onClose} className="py-2 text-sm bg-white text-gray-600 border rounded-md hover:bg-white/50">
                                    Cancel
                                </button>
                                {(isEdit || !isDetail) && (
                                    <button className="py-2 text-sm bg-c-teal text-white rounded-md hover:bg-c-teal/80" onClick={handleSaveClick} disabled={isSaving}>
                                        {isSaving ? 'Saving...' : 'Save'}
                                    </button>
                                )}
                            </footer>
                        </div>
                    </div>
                </main>
            </div >
        </div >
    );
}