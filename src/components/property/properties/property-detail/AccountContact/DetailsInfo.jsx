import React, { useState } from "react";
import { RiPencilFill } from "react-icons/ri";

export default function DetailsInfo({ onClose }) {
    const [email, setEmail] = useState('');
    const [contactName, setContactName] = useState('');
    const [kind, setKind] = useState('Developer');
    const [isEditable, setIsEditable] = useState(false); // New state for enabling/disabling the select

    const handleKindChange = (event) => {
        setKind(event.target.value);
    };

    const toggleEdit = () => {
        setIsEditable(!isEditable); // Toggle the select field's editability
    };

    const handleBackdropClick = (e) => {
        if (onClose) onClose();
    };

    const handleModalContentClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-50 ${onClose ? 'animate-fade-in' : 'animate-fade-out'}`}
            onClick={handleBackdropClick}
        >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative flex flex-col w-full max-w-md bg-white shadow-lg rounded-lg" onClick={handleModalContentClick}>
                {/* Header */}
                <div className="flex bg-c-teal justify-between items-center p-4 border-b rounded-t-lg">
                    <span className="text-lg text-white font-semibold">Contact</span>
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
                                    Kind: <span className="text-red-500">*</span>
                                </label>
                                <select
                                    disabled={!isEditable} // Control whether the field is editable based on state
                                    value={kind}
                                    onChange={handleKindChange}
                                    className="w-2/3 px-2 py-2 bg-white border border-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-0.5 focus:ring-c-teal focus:border-c-teal"
                                >
                                    <option value="Developer">Developer</option>
                                    <option value="Admin">Admin</option>
                                    <option value="User">User</option>
                                    <option value="Manager">Manager</option>
                                </select>
                                <span className="ml-2 cursor-pointer" onClick={toggleEdit}>
                                    <RiPencilFill className="text-sm" />
                                </span>
                            </div>

                            {/* Account Name */}
                            <div className="p-2 flex items-center odd:bg-gray-100 even:bg-white">
                                <label className="block text-sm font-medium text-gray-700 w-1/3">
                                    Account Name:
                                </label>
                                <div className="w-2/3 px-2 py-2">
                                    CapitaLand Singapore Limited
                                </div>
                            </div>

                            {/* Name */}
                            <div className="p-2 flex items-center odd:bg-gray-100 even:bg-white">
                                <label className="block text-sm font-medium text-gray-700 w-1/3">
                                    Name:
                                </label>
                                <div className="w-2/3 px-2 py-2">
                                    No Contact
                                </div>
                            </div>

                            {/* Contact Number */}
                            <div className="p-2 flex items-center odd:bg-gray-100 even:bg-white">
                                <label className="block text-sm font-medium text-gray-700 w-1/3">
                                    Contact Number:
                                </label>
                                <div className="w-2/3 px-2 py-2">
                                    +65 1234 5678
                                </div>
                            </div>

                            {/* Contact Email */}
                            <div className="p-2 flex items-center odd:bg-gray-100 even:bg-white">
                                <label className="block text-sm font-medium text-gray-700 w-1/3">
                                    Contact Email:
                                </label>
                                <div className="w-2/3 px-2 py-2 ">
                                    email@example.com
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="px-4 sticky bottom-0 bg-neutral-100 py-3 flex items-center gap-2 justify-start border-t border-neutral-500 shadow-md z-10 rounded-b-lg">
                    <button className="py-2 text-sm bg-white text-gray-600 border rounded-md hover:bg-white/50">
                        Cancel
                    </button>
                    <button className="py-2 text-sm bg-c-teal text-white rounded-md hover:bg-c-teal/80">
                        Save
                    </button>
                </footer>
            </div>
        </div>
    );
}
