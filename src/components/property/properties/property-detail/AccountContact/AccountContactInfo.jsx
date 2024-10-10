import React, { useState, useEffect, useRef } from "react";
import { FaList } from "react-icons/fa";
import DetailsInfo from "./DetailsInfo";
import AddAccountContact from "./AddAccountContact";
import AccountForm from "../../../account/AccountForm";
import ContactForm from "../../../contact/ContactForm";


export default function AccountContactInfo() {
   const [dropdownOpen, setDropdownOpen] = useState(null);
   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
   const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [modalType, setModalType] = useState(null);
   const [selectedRowData, setSelectedRowData] = useState(null); // State to store selected row data
   const [tableData, setTableData] = useState([]); // Initialize state for fetched data
   const [loading, setLoading] = useState(true);
   const [isEdit, setIsEdit] = useState(false);

   const dropdownRefs = useRef([]); // Array of refs


   const openDetailsModal = (rowData) => {
       setSelectedRowData(rowData); // Set selected row data
       setIsDetailsModalOpen(true);
       setDropdownOpen(null);
   };


   const closeDetailsModal = () => {
       setIsDetailsModalOpen(false);
   };


   const openAddAccountModal = () => {
       setIsAddAccountModalOpen(true);
       setDropdownOpen(null);
   };


   const closeAddAccountModal = () => {
       setIsAddAccountModalOpen(false);
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
       setModalType(type);
       setIsModalOpen(true);
   };


   const closeModal = () => {
       setIsModalOpen(false);
       setModalType(null);
   };


   // Fetch data from the API
   useEffect(() => {
       const fetchData = async () => {
           try {
               const response = await fetch('http://localhost:8082/cbre/property/183933/accounts-contacts', {
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
                   setTableData(data.resultSet.accountContactInformation);
               } else {
                   console.error("Error fetching data:", data.statusMessage);
               }
           } catch (error) {
               console.error("Fetch error:", error);
           } finally {
               setLoading(false);
           }
       };


       fetchData();
   }, []);


   if (loading) {
       return <div>Loading...</div>; // Simple loading state
   }


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
                                                   <li onClick={() => openDetailsModal(row)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Details</li>
                                                   <li onClick={openAddAccountModal} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Add Account and Contacts</li>
                                                   <li onClick={() => openModal('account')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">New Account</li>
                                                   <li onClick={() => openModal('contact')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">New Contact</li>
                                                   <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Delete</li>
                                               </ul>
                                           </div>
                                       )}
                                   </div>
                               </td>
                               <td className="py-2 px-4 border overflow-hidden text-ellipsis whitespace-nowrap">{row.kind || 'N/A'}</td>
                               <td className="py-2 px-4 border overflow-hidden text-ellipsis whitespace-nowrap">{row.accountName || 'N/A'}</td>
                               <td className="py-2 px-4 border overflow-hidden text-ellipsis whitespace-nowrap">{row.contactName || 'N/A'}</td>
                               <td className="py-2 px-4 border overflow-hidden text-ellipsis whitespace-nowrap">{row.businessPhone || row.mobilePhone || 'N/A'}</td>
                               <td className="py-2 px-4 border overflow-hidden text-ellipsis whitespace-nowrap">
                                   <a href={`mailto:${row.email}`} style={{ color: "green" }}>{row.email || 'N/A'}</a>
                               </td>
                           </tr>
                       ))}
                   </tbody>
               </table>
           </div>


           {/* Modals */}
           {isDetailsModalOpen && <DetailsInfo data={selectedRowData} onClose={closeDetailsModal} isEdit={isEdit} setIsEdit={setIsEdit}/>}
           {isAddAccountModalOpen && <AddAccountContact onClose={closeAddAccountModal} />}
           {isModalOpen && modalType === 'account' && (
               <AccountForm onClose={closeModal} />
           )}
           {isModalOpen && modalType === 'contact' && (
               <ContactForm onClose={closeModal} />
           )}
       </div>
   );
}
