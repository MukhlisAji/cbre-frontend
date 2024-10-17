import React, { useEffect, useState } from 'react';
import DataTable from '../../shared/CustomTableMUI';
import { RiContactsBook3Line } from "react-icons/ri";
import { generateTransactionId } from '../../lib/api/Authorization';
import { CONTACTCOLUMN } from '../../lib/const/AppContant';
import ContactForm from './ContactForm';
import { CONFIG } from '../../../config';



const Contact = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const [activeButton, setActiveButton] = useState('all');
    const [resultSet, setResultSet] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentContact, setCurrentContact] = useState(null);
    const [contactId, setContactId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const transactionId = generateTransactionId();
            try {
                const response = await fetch(`${CONFIG.CONTACT_SERVICE}?page=1`, {
                    method: 'GET',
                    headers: {
                        'transactionId': transactionId
                    }
                });
                const data = await response.json();
                console.log("data result data : ", data.resultSet);

                setResultSet(data.resultSet);
                setLoading(false);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // This effect runs whenever resultSet is updated
    // useEffect(() => {
    //     console.log("Updated resultSet: ", resultSet);
    // }, [resultSet]);


    const handleButtonClick = (button) => {
        setActiveButton(button);
    };


    // Function to open the modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Function to close the modal
    const handleNewContact = () => {
        setIsEditing(false);
        setCurrentContact(null);
        setIsModalOpen(true);
    };

    const handleEditContact = (contact) => {
        console.log('Editing contact:', contact.id);
        setIsEditing(true);
        setContactId(contact.id);
        setCurrentContact(contact);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setCurrentContact(null);
    };

    return (
        <div className="h-screen flex flex-col flex-grow mb-4">
            <div className="bg-neutral-100 rounded flex-grow">
                <div className="flex items-center justify-between mb-4 p-4">
                    <div className='flex items-center space-x-2'>

                        <div className=''>
                            <div className='flex items-center space-x-2 mb-4             '>
                                <div className="p-1 rounded-full border-2 border-purple-500 bg-purple-600">
                                    <RiContactsBook3Line className="text-white text-xl font-bold" />
                                </div>
                                <div>
                                    {/* <h1 className="text-xs font-normal">Contacts</h1> */}
                                    <h2 className="flex items-center cursor-pointer text-2xl text-neutral-600">
                                        Contacts
                                        {/* <IoMdArrowDropdown className='ml-1 active:rounded-lg active:border active:border-neutral-500' /> */}
                                    </h2>
                                </div>
                            </div>

                        </div>


                    </div>
                    {/* <div className="flex items-center space-x-2">
                        <button 
                        onClick={openModal} 
                        className="flex items-center space-x-2 px-6 py-1.5 text-xs hover:bg-neutral-100 hover:text-neutral-700 border border-neutral-500 bg-white text-blue-500 rounded rounded-full transition duration-150 ease-in-out"

                        >
                            <span>New</span>
                        </button>
                    </div> */}

                </div>
                <DataTable column={CONTACTCOLUMN} dataTable={resultSet} openModal={handleNewContact} isHeader={true} tableHeight={300} loading={loading} onEdit={handleEditContact} dataType={"contact"} />
                {isModalOpen && (
                    <ContactForm
                        onClose={closeModal}
                        isEditing={isEditing}
                        initialData={currentContact}
                        contactId={contactId}
                    />
                )}
            </div>
        </div>
    );
};

export default Contact;
