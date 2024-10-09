import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";

export default function AddAccountContact({ onClose }) {
    const [email, setEmail] = useState('');
    const [contactName, setContactName] = useState('');
    const [kind, setKind] = useState('Developer');
    const [isEditable, setIsEditable] = useState(false); // New state for enabling/disabling the select
    const [searchTerm, setSearchTerm] = useState('');
    const [showAllCountries, setShowAllCountries] = useState(false);
    const [showInactiveAccounts, setShowInactiveAccounts] = useState(false);
    const [result, setResult] = useState(false);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchClick = () => {
        setResult(true);
        console.log('Search term:', searchTerm);
        console.log('Show all countries:', showAllCountries);
        console.log('Show inactive accounts:', showInactiveAccounts);
    };

    const handleSelectClick = () => {
        // Add your select logic here
        console.log('Select button clicked');
    };

    const handleCancelClick = () => {
        // Add your cancel logic here
        console.log('Cancel button clicked');
    };

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

    const tableData = [
        {
            kind: "Developer",
            accountName: "CapitaLand Singapore Limited",
            contactName: "No Contact",
            contactNumber: "",
            contactEmail: "",
        },
        {
            kind: "Landlord / Owner",
            accountName: "CapitaLand Integrated Commercial Trust Management Limited",
            contactName: "Ms. Kathleen Ong",
            contactNumber: "+65 67133941(O)",
            contactEmail: "kathleen.ong@capitaland.com",
        },
        {
            kind: "Landlord / Owner",
            accountName: "CapitaLand Integrated Commercial Trust Management Limited",
            contactName: "Ms. Kathleen Ong",
            contactNumber: "+65 67133941(O)",
            contactEmail: "kathleen.ong@capitaland.com",
        },
    ];

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-50 ${onClose ? 'animate-fade-in' : 'animate-fade-out'}`}
            onClick={handleBackdropClick}
        >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative flex flex-col h-3/4 w-3/4 bg-white shadow-lg rounded-lg" onClick={handleModalContentClick}>
                {/* Header */}
                <div className="flex bg-c-teal justify-between items-center p-4 border-b rounded-t-lg">
                    <span className="text-lg text-white font-semibold">Account and Contact Search</span>
                    <span onClick={onClose} className="cursor-pointer text-white text-lg hover:text-white/80">
                        &times;
                    </span>
                </div>

                {/* Modal Content */}
                <main className="flex-1 overflow-y-auto">
                    <div className="relative">
                        <div className="flex space-x-4 mx-auto bg-white p-4 border-b">
                            {/* Kind Dropdown */}

                            <div className="flex flex-col space-y-2">
                                <div className="flex items-center space-x-2">
                                    <label htmlFor="search" className="text-gray-700 font-medium">
                                        Search word
                                    </label>
                                    <input
                                        id="search"
                                        type="text"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        className="px-3 w-96 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0.5 focus:ring-c-teal focus:border-c-teal"
                                    />
                                </div>

                                {/* Checkboxes */}
                                <div className="flex items-center space-x-4">
                                    <label className="flex items-center text-gray-700">
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            checked={showAllCountries}
                                            onChange={(e) => setShowAllCountries(e.target.checked)}
                                        />
                                        Show All Countries Accounts
                                    </label>
                                    <label className="flex items-center text-gray-700">
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            checked={showInactiveAccounts}
                                            onChange={(e) => setShowInactiveAccounts(e.target.checked)}
                                        />
                                        Show Inactive Accounts
                                    </label>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex space-x-2 h-1/2">
                                <button
                                    onClick={handleSearchClick}
                                    className="flex items-center text-sm bg-c-teal text-white rounded-md hover:bg-c-teal/80 whitespace-nowrap"                                >
                                    <FaSearch className="mr-2" /> Search
                                </button>
                                <button
                                    onClick={handleSelectClick}
                                    className=" text-sm bg-c-teal text-white rounded-md hover:bg-c-teal/80"                                >
                                    Select
                                </button>
                                <button
                                    onClick={handleCancelClick}
                                    className="text-sm bg-white text-gray-600 border rounded-md hover:bg-white/50"                                >
                                    Cancel
                                </button>
                            </div>

                        </div>

                        {result &&
                            <div style={{ overflowX: "auto" }} className="h-full p-4">
                                <table className="min-w-full table-auto" style={{ tableLayout: "fixed", width: "100%" }}>
                                    <thead>
                                        <tr className="bg-c-teal text-gray-200 text-xs">
                                            <th style={{ width: "4%" }} className="py-2 px-4 border text-xs overflow-hidden text-ellipsis whitespace-nowrap"></th>
                                            <th style={{ width: "30%" }} className="py-2 px-4 border overflow-hidden text-ellipsis whitespace-nowrap">Account Name</th>
                                            <th style={{ width: "20%" }} className="py-2 px-4 border overflow-hidden text-ellipsis whitespace-nowrap">Contact Name</th>
                                            <th style={{ width: "15%" }} className="py-2 px-4 border overflow-hidden text-ellipsis whitespace-nowrap">Contact Number</th>
                                            <th style={{ width: "25%" }} className="py-2 px-4 border overflow-hidden text-ellipsis whitespace-nowrap">Contact Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData.map((row, index) => (
                                            <tr key={index} className="hover:bg-gray-50 text-sm relative">
                                                <td className="py-2 text-center align-middle border">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox h-3 w-3 text-c-teal"
                                                    />
                                                </td>
                                                <td className="py-2 px-4 border overflow-hidden text-ellipsis whitespace-nowrap">{row.accountName}</td>
                                                <td className="py-2 px-4 border overflow-hidden text-ellipsis whitespace-nowrap">{row.contactName}</td>
                                                <td className="py-2 px-4 border overflow-hidden text-ellipsis whitespace-nowrap">{row.contactNumber}</td>
                                                <td className="py-2 px-4 border overflow-hidden text-ellipsis whitespace-nowrap">
                                                    <a href={`mailto:${row.contactEmail}`} style={{ color: "green" }}>{row.contactEmail}</a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        }

                    </div>
                </main>

                {/* Footer */}
                {/* <footer className="px-4 sticky bottom-0 bg-neutral-100 py-3 flex items-center gap-2 justify-start border-t border-neutral-500 shadow-md z-10 rounded-b-lg">
                    <button className="py-2 text-sm bg-white text-gray-600 border rounded-md hover:bg-white/50">
                        Cancel
                    </button>
                    <button className="py-2 text-sm bg-c-teal text-white rounded-md hover:bg-c-teal/80">
                        Save
                    </button>
                </footer> */}
            </div>
        </div>
    );
}
