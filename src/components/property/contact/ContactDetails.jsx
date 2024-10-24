import React, { useEffect, useMemo, useRef, useState } from 'react';
import { HiPencil } from 'react-icons/hi2';
import { IoMdArrowDropdown } from 'react-icons/io';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { RiContactsBook3Line } from 'react-icons/ri';
import { CONFIG } from '../../../config';
import { useParams } from 'react-router-dom';
import CustomTableMUI from '../../shared/CustomTableMUI';
import { ACCOUNTCOLUMNDUMMY, ACCOUNTDATADUMMY, RELATIONSHIPCLUMN, RELATIONSHIPDUMMY } from '../../lib/const/DummyData';
import BasicTable from '../../shared/element/BasicTable';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { AutocompleteField, InputField, SelectField, SingleSelectField } from '../FormFields';
import { useAppContext } from '../../../AppContext';
import { generateTransactionId, useUtils } from '../../lib/api/Authorization';

const ContactDetails = () => {

    const [contactInformationVisible, setContactInformationVisible] = useState(true);
    const [addressInformationVisible, setAddressInformationVisible] = useState(true);
    const [relationshipInformationVisible, setRelationshipInformationVisible] = useState(true);
    const [sectionHeight, setSectionHeight] = useState(0);
    const [contactData, setContactData] = useState(null);
    const { id } = useParams();
    const { contactSalesforceId, setContactSalesforceId } = useState("");
    const { generateAndSetToken } = useUtils();
    const { contactResource, setContactResource } = useAppContext();
    const { token } = useAppContext();
    const [notification, setNotification] = useState(null);
    const [notificationType, setNotificationType] = useState('success');
    const [sendingRelation, setSendingRelation] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [reload, setReload] = useState(false);
    const [accountName, setAccountName] = useState("");
    const [isEditRelation, setIsEditRelation] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null); // Store the row to delete
    const confirmationRef = useRef();
    const [confirmationPosition, setConfirmationPosition] = useState({ x: 0, y: 0 }); // For dynamic positioning


    // All hooks at the top level
    const [formData, setFormData] = useState({
        contactId: id,
        contactSalesforceId: contactSalesforceId,
        accountId: null,
        accountSalesforceId: '',
        relationshipType: '',
        isPrimary: 'No',
        userId: 'James',
        startDate: '',
        endDate: '',
    });

    useEffect(() => {
        const handleResize = () => {
            const screenHeight = window.innerHeight;
            const newHeight = screenHeight - 380; // Subtract 200px for any other fixed content
            setSectionHeight(newHeight);
        };

        // Set initial height
        handleResize();

        // Add event listener to handle window resize
        window.addEventListener('resize', handleResize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleVisibility = (section) => {
        switch (section) {
            case 'contactInformation':
                setContactInformationVisible(!contactInformationVisible);
                break;
            case 'addressInformation':
                setAddressInformationVisible(!addressInformationVisible);
                break;
            case 'relationshipInformation':
                setRelationshipInformationVisible(!relationshipInformationVisible);
            default:
                console.log(`Section '${section}' not handled`);
                break;
        }
    };

    // Fetch account data
    useEffect(() => {
        async function fetchAccountData() {
            try {
                const response = await fetch(`${CONFIG.CONTACT_SERVICE}/${id}`);
                const data = await response.json();
                setContactData(data.resultSet);
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    contactSalesforceId: data.resultSet.salesforceId,
                }));
                setContactSalesforceId(data.resultSet.salesforceId);
            } catch (error) {
                console.error('Error fetching contact data:', error);
            }
        }
        fetchAccountData();
    }, [id, reload]); // Add `reload` to the dependency array



    // const handleChange = (e) => {
    //     const { name, value } = e.target;

    //     setFormData((prevState) => ({
    //         ...prevState,
    //         [name]: value,
    //     }));
    // };

    // const handleChange = (e) => {
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         startDate: e.target.value, // Update the correct field
    //     }));
    // };

    const handleChange = (field) => (event) => {
        const value = event.target ? event.target.value : event.id; // Get the value for text input or select field

        setFormData((prevState) => ({
            ...prevState,
            [field]: value, // Dynamically update the field in formData
        }));
    };



    const searchAccountName = async (searchTerm) => {
        const response = await fetch(`${CONFIG.ACCOUNT_SERVICE}/find-account?name=${searchTerm}`, {
            method: 'GET',
            headers: {
                'Cookie': 'CookieConsentPolicy=0:1; LSKey-c$CookieConsentPolicy=0:1',
            },
        });
        const data = await response.json();
        return data.resultSet.map((account) => ({
            id: account.id,
            label: `${account.accountName}`,
            salesforceId: account.salesforceId,
        }));
    };

    const handleEdit = (row) => {
        setIsEditRelation(true);
        setFormData({
            contactId: id || '',
            contactSalesforceId: contactData.salesforceId || '',
            accountId: row.accountId || null,
            accountSalesforceId: row.accountSalesforceId || '',
            relationshipType: row.relationshipType?.name || '',
            isPrimary: row.primary ? "Yes" : "No",
            userId: row.userId || 'James',
            startDate: row.startDate || '',
            endDate: row.endDate || '',
        });

        setAccountName(row.accountName);
    };


    const [selectedAccount, setSelectedAccount] = useState(null);

    const handleAccountChange = (selectedAccountArray) => {
        const selectedAccount = selectedAccountArray[0];
        if (selectedAccount) {
            setSelectedAccount(selectedAccount);
            setFormData((prevState) => {
                return {
                    ...prevState,
                    accountId: selectedAccount.id !== undefined ? selectedAccount.id : "", // Update accountId if it exists
                    accountSalesforceId: selectedAccount.salesforceId || "", // Update accountSalesforceId or set to empty string
                };
            });
        } else {
            console.warn("No account selected or selectedAccount is undefined");
        }
    };




    useEffect(() => {
        console.log("asc ", formData);
    }, [formData])

    const showNotification = (message, type = 'success') => {
        setNotification(message);
        setNotificationType(type);
        setTimeout(() => {
            setNotification(null);
            setNotificationType('success');
        }, 5000);
    };

    const handleSubmitOrDelete = async (event, actionType, deleteData) => {
        const transactionId = generateTransactionId();
        event.preventDefault();

        try {
            let method;
            let bodyData;

            if (actionType === 'submit') {
                method = 'POST';
                bodyData = JSON.stringify(formData);  // Use the formData for submission
            } else if (actionType === 'delete') {
                method = 'DELETE';
                bodyData = JSON.stringify(deleteData); // Use deleteData for deletion
            }

            const response = await fetch(`${CONFIG.CONTACT_SERVICE}/relationship`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'SFDC-token': token,
                    'transactionId': transactionId,
                },
                body: bodyData,
            });

            const result = await response.json();

            if (!response.ok) {
                console.error("Error response: ", result);
                return result; // Return the error response to be handled outside
            }

            console.log("response ", result);
            return result;
        } catch (error) {
            console.error('Error:', error);
            showNotification("An error occurred!", 'error');
            return {
                statusCode: "99",
                statusMessage: "ERROR",
                statusDescription: error.message
            };
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("data ", formData);
        setSendingRelation(true);

        try {
            let response = await handleSubmitOrDelete(e, "submit");

            if (response.statusCode === "02" || response.statusDescription.message === "Session expired or invalid") {
                console.log("Session invalid, regenerating token...");
                await generateAndSetToken();
                response = await handleSubmitOrDelete(e, "submit");
            }

            if (response.statusCode === "00") {
                showNotification("Relationship added successfully!", 'success');
                setSendingRelation(false);
                setReload((prev) => !prev);

            } else {
                console.error('Unexpected response format:', response.statusDescription);
                showNotification(`Failed to add relationship. ${response.statusDescription}.`, 'error');
                setSendingRelation(false);
            }
        } catch (error) {
            console.error('Error:', error);
            setSendingRelation(false);
        }
    };

    const handleDeleteClick = (row, event) => {
        // Store the row and the position of the click event
        setSelectedRow(row);

        // Adjust position: move the dialog to the left and slightly down
        const adjustedX = event.clientX - 300; // Adjust for left alignment
        const adjustedY = event.clientY + 10;  // Move the dialog slightly down by 10 pixels

        setConfirmationPosition({ x: adjustedX, y: adjustedY });
        setShowConfirmation(true); // Show confirmation dialog
    };



    const handleDelete = async () => {
        if (!selectedRow) return;
        setIsDelete(true);
        const deleteData = {
            accountContactId: selectedRow.id,
            contactSalesforceId: contactData.salesforceId || "",
            userId: "AP_SVC_SALESMGTSG"
        };

        try {
            let response = await handleSubmitOrDelete(event, 'delete', deleteData);

            if (response.statusCode === "02" || (response.statusDescription && response.statusDescription.message === "Session expired or invalid")) {
                console.log("Session invalid, regenerating token...");
                await generateAndSetToken();
                response = await handleSubmitOrDelete(event, 'delete', deleteData);
            }

            if (response.statusCode === "00") {
                showNotification("Relationship removed successfully!", 'success');
                setIsDelete(false);
                setReload((prev) => !prev);
            } else {
                console.error('Unexpected response format:', response.statusDescription);
                showNotification(`Failed to remove relationship. ${response.statusDescription}.`, 'error');
                setIsDelete(false);
            }
        } catch (error) {
            console.error('Error:', error);
            setIsDelete(false);
        }

        setShowConfirmation(false); // Hide the confirmation dialog after deletion
        setSelectedRow(null);
    };


    const handleCancelDelete = () => {
        // Hide the confirmation dialog and clear the selected row
        setShowConfirmation(false);
        setSelectedRow(null);
    };

    // Derive formatted relationship data
    const formattedRelationshipData = useMemo(() => {
        if (Array.isArray(contactData?.accountContact)) {
            return contactData.accountContact.map((row) => ({
                relationshipType: row.relationshipType?.name || 'N/A',
                accountName: row.accountName || 'N/A',
                relationshipStartDate: row.startDate || 'N/A',
                relationshipEndDate: row.endDate || 'N/A',
                primary: row.primary === true ? "Yes" : "No" || 'N/A',
                action: (
                    <div className='relative inline-block'>
                        <FaEdit
                            className="inline-block cursor-pointer text-c-teal/80 mr-2"
                            aria-label="Edit"
                            onClick={() => handleEdit(row)}
                        />
                        {row.primary !== true && (
                            <FaTrash
                                className="inline-block cursor-pointer text-red-500"
                                aria-label="Delete"
                                onClick={(event) => handleDeleteClick(row, event)}
                            />
                        )}
                    </div>
                ),
            }));
        }
        return [];
    }, [contactData]);

    if (!contactData) {
        return <div>Loading...</div>;
    }


    return (
        <div className="bg-neutral-100">
            {/* Header Section */}
            <div className="bg-neutral-100 mb-4 p-4">
                <div className="flex justify-between items-center">
                    <div className='flex items-center space-x-3'>
                        <div className="p-2 rounded-md border-2 border-purple-500 bg-purple-600">
                            <RiContactsBook3Line className="text-white text-xl font-bold" />
                        </div>
                        <div>
                            <h1 className="text-xs font-normal">Contacts</h1>
                            <h1 className="text-lg font-bold text-neutral-700">{contactData.firstname} {contactData.lastname}</h1>
                        </div>
                    </div>

                </div>
            </div>
            <div className="flex justify-between items-center bg-white p-2 mb-4 rounded-md shadow-md">
                <div className="flex space-x-12">
                    <div className="flex flex-col p-2 ">
                        <span className="text-xs">{contactData.title}</span>
                    </div>
                    <div className="flex flex-col p-2 ">
                        <span className="text-xs">Account Name</span>
                        <p className="text-sm cursor-pointer text-green-700 hover:text-c-teal">{contactData.accountContact?.accountName}</p>
                    </div>
                    <div className="flex p-2 ">
                        <span className="material-icons text-xs">{contactData.businessPhone}</span>
                        {/* <IoMdArrowDropdown className='ml-1 cursor-pointer active:rounded-lg active:border active:border-neutral-500' /> */}
                    </div>
                    <div className="flex flex-col p-2 ">
                        <span className="text-xs">Email</span>
                        <p href="mailto:k.singamsetty@xactdata.com.test" className="text-green-700 hover:text-c-teal text-sm">{contactData.email}</p>
                    </div>
                    <div className="flex flex-col p-2 ">
                        <span className="material-icons text-xs">linkedin</span>
                        <p className="text-sm">{contactData.linkedin}</p>
                    </div>
                    <div className="flex flex-col p-2 ">
                        <span className="material-icons text-xs">Contact Status</span>
                        <div className='flex items-center'>
                            <p className="text-sm">{contactData.status}</p>
                            <IoCheckmarkCircleOutline className='text-2xl pl-1 text-green-700' />
                        </div>
                    </div>
                </div>
            </div>

            {/* Details Section */}
            <div className="bg-white shadow-md p-4 rounded-md overflow-y-auto">
                <div className='border-b border-b-neutral-300 mb-4'>
                    <div className="w-14 text-md font-bold border-b-2 border-c-dark-grayish">Details</div>
                </div>
                <div style={{ height: `${sectionHeight}px` }} >
                    {/* Contact Information */}
                    <div className="mb-4">
                        <div className="flex bg-neutral-100 mb-2 justify-between items-center cursor-pointer" onClick={() => toggleVisibility('contactInformation')}>
                            <h2 className="text-md font-semibold text-neutral-700">
                                <span className='text-sm'>{contactInformationVisible ? '▼' : '►'}</span> Contact Information
                            </h2>
                            <span>{contactInformationVisible ? '-' : '+'}</span>
                        </div>
                        {contactInformationVisible && (
                            <div className='ml-3 mb-6'>
                                <div className="grid grid-cols-2 gap-y-2 md:gap-x-12 mb-4 mr-4">
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Name</label>
                                            <input type="text" value={`${contactData.salutation} ${contactData.firstname} ${contactData.middlename} ${contactData.lastname}`} className="w-full text-sm text-neutral-700" readOnly />
                                        </div>
                                        {/* <HiPencil className="ml-2 cursor-pointer text-neutral-500 mt-auto" /> */}
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col">
                                            <label className="text-neutral-600 text-sm mb-1">Account Name</label>
                                            <a href="#" className="text-green-700 hover:text-c-teal text-sm">{contactData.accountContact?.accountName}</a>
                                        </div>
                                        {/* <HiPencil className="ml-2 cursor-pointer text-neutral-500 mt-auto" /> */}
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Title</label>
                                            <input type="text" value={contactData.title} className="w-full text-sm text-neutral-700" readOnly />
                                        </div>
                                        {/* <HiPencil className="ml-2 cursor-pointer text-neutral-500 mt-auto" /> */}
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Email</label>
                                            <a href={`mailto:${contactData.email}`} className="text-green-700 hover:text-c-teal">{contactData.email}</a>
                                        </div>
                                        {/* <HiPencil className="ml-2 cursor-pointer text-neutral-500 mt-auto" /> */}
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Department</label>
                                            <input type="text" value={contactData.department} className="w-full text-sm text-neutral-700" readOnly />
                                        </div>
                                        {/* <HiPencil className="ml-2 cursor-pointer text-neutral-500 mt-auto" /> */}
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Business Phone</label>
                                            <input type="text" value={contactData.businessPhone} className="w-full text-sm text-neutral-700" readOnly />
                                        </div>
                                        {/* <HiPencil className="ml-2 cursor-pointer text-neutral-500 mt-auto" /> */}
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Contact Profile</label>
                                            <input type="text" value={contactData.contactProfile.map(profile => profile.contactProfileList.name).join(', ')} className="w-full text-sm text-neutral-700" readOnly />
                                        </div>
                                        {/* <HiPencil className="ml-2 cursor-pointer text-neutral-500 mt-auto" /> */}
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Mobile</label>
                                            <input type="text" value={contactData.mobilePhone} className="w-full text-sm text-neutral-700" readOnly />
                                        </div>
                                        {/* <HiPencil className="ml-2 cursor-pointer text-neutral-500 mt-auto" /> */}
                                    </div>
                                    {/* <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Contact Type</label>
                                            <input type="text" value={contactData.accountContact.relationshipType.name} className="w-full text-sm text-neutral-700" readOnly />
                                        </div>
                                        <HiPencil className="ml-2 cursor-pointer text-neutral-500 mt-auto" />
                                    </div> */}
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Main Phone</label>
                                            <input type="text" value={contactData.businessPhone} className="w-full text-sm text-neutral-700" readOnly />
                                        </div>
                                        {/* <HiPencil className="ml-2 cursor-pointer text-neutral-500 mt-auto" /> */}
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Linkedin</label>
                                            <input type="text" value={contactData.linkedin} className="w-full text-sm text-neutral-700" readOnly />
                                        </div>
                                        {/* <HiPencil className="ml-2 cursor-pointer text-neutral-500 mt-auto" /> */}
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Influence Level</label>
                                            <input type="text" value={contactData.influenceLevel} className="w-full text-sm text-neutral-700" readOnly />
                                        </div>
                                        {/* <HiPencil className="ml-2 cursor-pointer text-neutral-500 mt-auto" /> */}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Address Information */}
                    <div className="mb-4 pb-2">
                        <div className="flex bg-neutral-100 mb-2 justify-between items-center cursor-pointer" onClick={() => toggleVisibility('addressInformation')}>
                            <h2 className="text-md font-semibold text-neutral-700">
                                <span className='text-sm'>{addressInformationVisible ? '▼' : '►'}</span> Address Information
                            </h2>
                            <span>{addressInformationVisible ? '-' : '+'}</span>
                        </div>
                        {addressInformationVisible && (
                            <div className='ml-3 mr-4 w-1/2 pr-10'>
                                <div className="flex flex-col gap-4">
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Source of Mailing Address</label>
                                            <input type="text" value="Contact" className="w-full text-sm text-neutral-700" readOnly />
                                        </div>
                                        {/* <HiPencil className="ml-2 cursor-pointer text-neutral-500 mt-auto" /> */}
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Address</label>
                                            <input
                                                type="text"
                                                value={`${contactData.mailingStreet || ''}, ${contactData.mailingCity || ''}, ${contactData.mailingState || ''}, ${contactData.mailingPostCode || ''}, ${contactData.mailingCountry?.countryName || ''}`}
                                                className="w-full text-sm text-neutral-700"
                                                readOnly
                                            />
                                        </div>
                                        {/* <HiPencil className="ml-2 cursor-pointer text-neutral-500 mt-auto" /> */}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Relationship Info */}
                    <div className="mb-4 pb-2">
                        <div className="flex bg-neutral-100 mb-2 justify-between items-center cursor-pointer" onClick={() => toggleVisibility('relationshipInformation')}>
                            <h2 className="text-md font-semibold text-neutral-700">
                                <span className='text-sm'>{relationshipInformationVisible ? '▼' : '►'}</span> Relationship Information
                            </h2>
                            <span>{relationshipInformationVisible ? '-' : '+'}</span>
                        </div>
                        {relationshipInformationVisible && (
                            <div className="ml-3 mb-6 mr-4 w-full pr-10">
                                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-y-2 w-full gap-4 md:gap-x-12">
                                    {/* Relationship Type Field */}
                                    <div className="flex flex-col w-full">
                                        <SingleSelectField
                                            label='Relationship Type'
                                            value={formData.relationshipType}
                                            onChange={handleChange('relationshipType')}
                                            options={[{ id: 'Board of Directors', label: 'Board of Directors' }, { id: 'Consultant', label: 'Consultant' }, { id: 'Employee', label: 'Employee' }, { id: 'Ex-Employee', label: 'Ex-Employee' }, { id: 'Owner of Company', label: 'Owner of Company' }]}
                                            required='true'
                                        />

                                    </div>

                                    {/* Account Name Field using AutocompleteField */}
                                    <div className="flex flex-col w-full">
                                        <AutocompleteField
                                            label="Account Name"
                                            value={
                                                formData.accountId
                                                    ? { id: formData.accountId, label: selectedAccount?.label || accountName || '' }
                                                    : null
                                            }
                                            onChange={(selectedAccount) => handleAccountChange(selectedAccount)}// Ensure this updates accountId and accountSalesforceId
                                            searchApi={searchAccountName}
                                            required={true}
                                        />

                                    </div>

                                    {/* Start Date Field */}
                                    <div className="flex flex-col w-full">
                                        <InputField
                                            label="Start Date"
                                            type="date"
                                            value={formData.startDate}
                                            onChange={handleChange('startDate')}
                                            required={true}
                                        />

                                        {/* <label className="text-neutral-600 text-sm mb-1">Start Date *</label>
                                        <input
                                            type="date"
                                            name="startDate"
                                            value={formData.startDate}
                                            onChange={handleChange}
                                            className="w-full text-sm text-neutral-700 border border-gray-300 p-2 rounded"
                                            required
                                        /> */}
                                    </div>

                                    {/* End Date Field */}
                                    <div className="flex flex-col w-full">
                                        <InputField
                                            label="End Date"
                                            type="date"
                                            value={formData.endDate}
                                            onChange={handleChange('endDate')}
                                            required={true}
                                        />

                                    </div>

                                    {/* Primary Account Field */}
                                    <div className="flex flex-col w-full">
                                        <SingleSelectField
                                            label='Primary Account'
                                            value={formData.isPrimary}
                                            onChange={handleChange('isPrimary')}
                                            options={[{ id: 'No', label: 'No' }, { id: 'Yes', label: 'Yes' }]}
                                        />


                                    </div>

                                    {/* Add Relationship Button */}
                                    <div className="col-span-2 flex justify-end">
                                        <button disabled={sendingRelation} type="submit" className="bg-c-teal text-sm text-white px-4 py-2 rounded">
                                            {sendingRelation ? "Sending..." : isEditRelation ? "Update Relationship" : "Add Relationship"}
                                        </button>
                                    </div>
                                </form>

                                {notification && (
                                    <div className={`absolute top-5 right-5 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in-out 
                ${notificationType === 'success' ? 'bg-green-500' : 'bg-red-500'}
                text-white`}>
                                        {notification}
                                    </div>
                                )}

                                <BasicTable column={RELATIONSHIPCLUMN} dataTable={formattedRelationshipData} isHeader={false} tableHeight={549} />

                                {showConfirmation && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            left: confirmationPosition.x,
                                            top: confirmationPosition.y,
                                            zIndex: 1000,
                                            backgroundColor: 'white',
                                            border: '1px solid gray',
                                            padding: '10px',
                                            borderRadius: '8px',
                                            boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
                                        }}
                                    >
                                        <p className="text-sm text-gray-700">Are you sure you want to delete this relationship?</p>
                                        <div className="flex justify-end space-x-2 mt-2">
                                            <button
                                                onClick={handleDelete}
                                                className="bg-red-500 text-white text-xs px-2 py-1 rounded-md"
                                            >
                                                {isDelete ? "Deleting..."  : "Delete"}
                                            </button>
                                            <button
                                                onClick={handleCancelDelete}
                                                className="bg-gray-300 text-black text-xs px-2 py-1 rounded-md"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}

                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div >
    );
};

export default ContactDetails;
