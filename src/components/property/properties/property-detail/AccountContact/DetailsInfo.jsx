import React, { useState, useEffect } from 'react';
import { RiPencilFill } from 'react-icons/ri';

export default function DetailsInfo({ data, onClose, isEdit, setIsEdit }) {
    const [kind, setKind] = useState(data?.kind || 'Developer');
    const [isSaving, setIsSaving] = useState(false); // Track save status

    const handleKindChange = (event) => {
        setKind(event.target.value);
    };

    const handleBackdropClick = (e) => {
        if (onClose) onClose();
    };

    const handleModalContentClick = (e) => {
        e.stopPropagation();
    };

    const handleEditClick = () => {
        setIsEdit(true);
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
                    buildingId: 12345, // Replace with your hardcoded building ID
                    accountId: data?.accountId,
                    contactId: data?.contactId,
                    createdBy: 'James',
                    createdTimestamp: new Date().toISOString(),
                    modifiedBy: 'James',
                    modifiedTimestamp: new Date().toISOString(),
                    kind: kind,
                },
            ],
        };

        try {
            const response = await fetch('https://a9b2-103-55-53-254.ngrok-free.app/cbre/property/accounts-contacts', {
                method: 'POST',
                headers: {
                    'transactionId': '4646765766',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const responseData = await response.json();

            if (responseData.statusCode === '00') {
                setIsEdit(false);
                setIsSaving(false); // Reset saving flag after successful save
                alert('Contact information saved successfully!');
            } else {
                setIsSaving(false); // Reset saving flag if there's an error
                alert(`Error saving contact information: ${responseData.statusMessage}`);
            }
        } catch (error) {
            console.error('Error saving contact information:', error);
            setIsSaving(false); // Reset saving flag if there's an error
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${onClose ? 'animate-fade-in' : 'animate-fade-out'}`} onClick={handleBackdropClick}>
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
                                <label className="block text-sm font-medium text-gray-700 w-1/3">
                                    Kind:
                                </label>
                                <select
                                    value={kind}
                                    onChange={handleKindChange}
                                    className="w-2/3 px-2 py-2 bg-white border border-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-0.5 focus:ring-c-teal focus:border-c-teal"
                                    disabled={!isEdit}
                                >
                                    <option value="">Select</option>
                                    <option value="Asset Manager">Asset Manager</option>
                                    <option value="Consultant">Consultant</option>
                                    <option value="Developer">Developer</option>
                                    <option value="Fund Manager">Fund Manager</option>
                                    <option value="Landlord / Owner">Landlord / Owner</option>
                                    <option value="Licensee">Licensee</option>
                                    <option value="Maintenance Agency">Maintenance Agency</option>
                                    <option value="Operator / Manager">Operator / Manager</option>
                                    <option value="Outside Broker">Outside Broker</option>
                                    <option value="Owner Investor">Owner Investor</option>
                                    <option value="Owner Occupier">Owner Occupier</option>
                                    <option value="Owner Representative">Owner Representative</option>
                                    <option value="Property Manager">Property Manager</option>
                                </select>
                                <RiPencilFill className="text-sm ml-2 cursor-pointer hover:text-c-teal" onClick={handleEditClick} />
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
                            <footer className="px-4 sticky bottom-0 bg-neutral-100 py-3 flex items-center gap-2 justify-start border-t border-neutral-500 shadow-md z-10 rounded-b-lg">
                                <button onClick={onClose} className="py-2 text-sm bg-white text-gray-600 border rounded-md hover:bg-white/50">
                                    Cancel
                                </button>
                                {isEdit && (
                                    <button className="py-2 text-sm bg-c-teal text-white rounded-md hover:bg-c-teal/80" onClick={handleSaveClick} disabled={isSaving}>
                                        {isSaving ? 'Saving...' : 'Save'}
                                    </button>
                                )}
                            </footer>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}