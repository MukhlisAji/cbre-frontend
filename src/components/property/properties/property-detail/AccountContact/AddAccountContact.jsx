import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import DetailsInfo from "./DetailsInfo";


export default function AddAccountContact({ onClose }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [showAllCountries, setShowAllCountries] = useState(false);
    const [showInactiveAccounts, setShowInactiveAccounts] = useState(false);
    const [result, setResult] = useState(false);
    const [tableData, setTableData] = useState([]); // State for storing search results
    const [selectedRow, setSelectedRow] = useState(null); // Track selected row
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    // const [isEdit, setIsEdit] = useState(false);
    // const handleModalTitle = (edit) => {
    //     setIsEdit(edit);
        
    // }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };


    const handleSearchClick = async () => {
        try {
            const response = await fetch(`http://localhost:8082/cbre/property/accounts-contacts?keyword=${searchTerm}`, {
                method: 'GET',
                headers: {
                    'transactionId': '4646765766',
                },
            });


            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }


            const data = await response.json();
            if (data.statusCode === "00") {
                setTableData(data.resultSet.accountContactInformation); // Update state with search results
                setResult(true); // Show the table with results
            } else {
                console.error("Error fetching data:", data.statusMessage);
                setTableData([]); // Clear table data if no results are found
            }
        } catch (error) {
            console.error("Search error:", error);
        }
    };


    const handleSelectClick = () => {
        setIsDetailsModalOpen(true);
    };


    const handleRowSelect = (row) => {
        setSelectedRow(row);

    };

    const closeDetailsModal = () => {
        setIsDetailsModalOpen(false);
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative flex flex-col h-3/4 w-3/4 bg-white shadow-lg rounded-lg" onClick={(e) => e.stopPropagation()}>
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
                            {/* Search and Options */}
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
                                    className="flex items-center text-sm bg-c-teal text-white rounded-md hover:bg-c-teal/80 whitespace-nowrap"
                                >
                                    <FaSearch className="mr-2" /> Search
                                </button>
                                <button
                                    onClick={handleSelectClick}
                                    className="text-sm bg-c-teal text-white rounded-md hover:bg-c-teal/80"
                                >
                                    Select
                                </button>
                                <button
                                    onClick={onClose}
                                    className="text-sm bg-white text-gray-600 border rounded-md hover:bg-white/50"
                                >
                                    Cancel
                                </button>
                            </div>


                        </div>


                        {/* Search Results Table */}
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
                                                        type="radio"
                                                        name="selectRow"
                                                        onChange={() => handleRowSelect(row)}
                                                        className="form-checkbox h-3 w-3 text-c-teal"
                                                    />
                                                </td>
                                                <td className="py-2 px-4 border overflow-hidden text-ellipsis whitespace-nowrap">{row.accountName}</td>
                                                <td className="py-2 px-4 border overflow-hidden text-ellipsis whitespace-nowrap">{row.contactName}</td>
                                                <td className="py-2 px-4 border overflow-hidden text-ellipsis whitespace-nowrap">{row.businessPhone || row.mobilePhone || 'N/A'}</td>
                                                <td className="py-2 px-4 border overflow-hidden text-ellipsis whitespace-nowrap">
                                                    <a href={`mailto:${row.email}`} style={{ color: "green" }}>{row.email || 'N/A'}</a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        }

                        {isDetailsModalOpen && <DetailsInfo data={selectedRow} onClose={closeDetailsModal} isEdit={true}/>}

                    </div>
                </main>
            </div>
        </div>
    );
}




