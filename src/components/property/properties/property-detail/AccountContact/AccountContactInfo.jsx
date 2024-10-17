import React, { useState, useEffect, useRef } from "react";
import { FaList } from "react-icons/fa";
import DetailsInfo from "./DetailsInfo";
import AddAccountContact from "./AddAccountContact";
import AccountForm from "../../../account/AccountForm";
import ContactForm from "../../../contact/ContactForm";
import { CONFIG } from "../../../../../config";
import AccountContactList from "./AccountContactList";  // Import the advanced table component

export default function AccountContactInfo({propertyId}) {
   const [dropdownOpen, setDropdownOpen] = useState(null);
   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
   const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [modalType, setModalType] = useState(null);
   const [selectedRowData, setSelectedRowData] = useState(null); // State to store selected row data
   const [tableData, setTableData] = useState([]); // Initialize state for fetched data
   const [loading, setLoading] = useState(true);
   const dropdownRefs = useRef([]); // Array of refs

   const openDetailsModal = (rowData) => {
       setSelectedRowData(rowData); // Set selected row data
       setIsDetailsModalOpen(true);
       setDropdownOpen(null);
       console.log("data : " , tableData);
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

   // Fetch data from the API 183933
   useEffect(() => {
       const fetchData = async () => {
           try {
               const response = await fetch(`${CONFIG.PROPERTY_SERVICE}/${propertyId}/accounts-contacts`, {
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

const PROPERTYCOLUMNDUMMY = [
    {
        label: "Action",
        accessor: "action",
        width: "100px",  // Set a fixed width for the Action column
        isClickable: false,  // Disable sorting by ensuring no clickable behavior
    },
    { label: "Kind", accessor: "kind" },
    { label: "Account Name", accessor: "accountName" },
    { label: "Contact Name", accessor: "contactName" },
    { label: "Contact Number", accessor: "businessPhone" },
    { label: "Contact Email", accessor: "email" },
];


   const formattedTableData = tableData.map((row, index) => ({
       action: (
           <div>
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
           </div>
       ),
       kind: row.kind || 'N/A',
       accountName: row.accountName || 'N/A',
       contactName: row.contactName || 'N/A',
       businessPhone: row.businessPhone || row.mobilePhone || 'N/A',
       email: <a href={`mailto:${row.email}`} style={{ color: "green" }}>{row.email || 'N/A'}</a>,
   }));

   return (
       <div className="relative h-full mx-auto bg-white shadow-md rounded-md p-4 border border-gray-200" style={{ maxWidth: "100%" }}>
           <h2 className="text-c-teal text-lg font-semibold mb-4">Property Account and Contacts</h2>
           {/* <div style={{ overflowX: "auto" }} className="h-48"> */}
               {/* Use the AccountContactList component without header */}
               <AccountContactList
                   dataTable={formattedTableData}
                   column={PROPERTYCOLUMNDUMMY}
                   openModal={openAddAccountModal}
                   isHeader={false} 
                   tableHeight={500}
                   loading={loading}
                   onEdit={openDetailsModal}
                   dataType="property"
               />
           {/* </div> */}

           {/* Modals */}
           {isDetailsModalOpen && <DetailsInfo data={selectedRowData} onClose={closeDetailsModal} isDetail={true}/>}
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
