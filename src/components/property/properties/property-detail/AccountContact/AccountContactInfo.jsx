import React, { useState, useEffect, useRef } from "react";
import { FaList } from "react-icons/fa";
import DetailsInfo from "./DetailsInfo";
import AddAccountContact from "./AddAccountContact"; // Import the new modal component
import AccountForm from "../../../account/AccountForm";
import ContactForm from "../../../contact/ContactForm";

export default function AccountContactInfo() {
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false); // State for AddAccountContact modal

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);

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

    const dropdownRefs = useRef([]); // Array of refs

    const openDetailsModal = () => {
        setIsDetailsModalOpen(true);
        setDropdownOpen(null);
    };

    const closeDetailsModal = () => {
        setIsDetailsModalOpen(false);
    };

    const openAddAccountModal = () => {
        setIsAddAccountModalOpen(true); // Open AddAccountContact modal
        setDropdownOpen(null);
    };

    const closeAddAccountModal = () => {
        setIsAddAccountModalOpen(false); // Close AddAccountContact modal
    };

    const handleDropdownClick = (index) => {
        setDropdownOpen(dropdownOpen === index ? null : index);
    };

    const handleClickOutside = (event) => {
        if (dropdownOpen !== null && dropdownRefs.current[dropdownOpen] && !dropdownRefs.current[dropdownOpen].contains(event.target)) {
            setDropdownOpen(null);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownOpen]);

    const openModal = (type) => {
        console.log('Opening modal for:', type); // Debugging
        setModalType(type);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalType(null);
    };


    return (
        <div className="relative h-full mx-auto bg-white shadow-md rounded-md p-4 border border-gray-200" style={{ maxWidth: "100%" }}>
            <h2 className="text-c-teal text-lg font-semibold mb-4">Property Account and Contacts</h2>
            <div style={{ overflowX: "auto" }} className="h-full">
                <table className="min-w-full table-auto" style={{ tableLayout: "fixed", width: "100%" }}>
                    <thead>
                        <tr className="bg-c-teal text-gray-200 text-xs">
                            <th style={{ width: "8%" }} className="py-2 px-4 border text-xs overflow-hidden text-ellipsis whitespace-nowrap">Action</th>
                            <th style={{ width: "15%" }} className="py-2 px-4 border overflow-hidden text-ellipsis whitespace-nowrap">Kind</th>
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
                                    <FaList
                                        onClick={() => handleDropdownClick(index)}
                                        className="inline-block cursor-pointer text-c-teal/80"
                                        aria-haspopup="true"
                                        aria-expanded={dropdownOpen === index}
                                    />
                                    <div ref={(el) => (dropdownRefs.current[index] = el)}>
                                        {dropdownOpen === index && (
                                            <div className="absolute left-0 border mt-2 w-48 bg-white shadow-lg rounded-md z-10">
                                                <ul className="py-1 text-sm text-left text-gray-700">
                                                    <li onClick={openDetailsModal} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Details</li>
                                                    <li onClick={openAddAccountModal} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Add Account and Contacts</li>
                                                    <li onClick={() => openModal('account')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">New Account</li>
                                                    <li onClick={() => openModal('contact')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">New Contact</li>
                                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Delete</li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="py-2 px-4 border overflow-hidden text-ellipsis whitespace-nowrap">{row.kind}</td>
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

            {/* Modals */}
            {isDetailsModalOpen && <DetailsInfo onClose={closeDetailsModal} />}
            {isAddAccountModalOpen && <AddAccountContact onClose={closeAddAccountModal} />} {/* AddAccountContact modal */}
            {isModalOpen && modalType === 'account' && (
                <AccountForm onClose={closeModal} />
            )}
            {isModalOpen && modalType === 'contact' && (
                        <ContactForm onClose={closeModal} />
                    )}
        </div>
    );
}
