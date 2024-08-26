import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import DataTable from '../shared/CustomTableMUI';
import { CONTACTCOLUMNDUMMY, CONTACTDATADUMMY } from '../lib/const/DummyData';
import { RiContactsBook3Line } from "react-icons/ri";
import ContactNew from './ContactNew';

const Contact = () => {
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Check if the state indicates that the modal should be open
        if (location.state?.openModal) {
            setIsModalOpen(true);
        }
    }, [location.state]);

    // Function to open the modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleEdit = (contact) => {
        console.log('Editing contact:', contact);
        // Logic for editing an account
      };

    return (
        <div className="h-screen flex flex-col flex-grow mb-4">
            <div className="bg-neutral-100 rounded flex-grow">
                <div className="flex items-center justify-between mb-4">
                    <div className='flex items-center space-x-2 mb-4'>
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
                    {/* <div className="flex items-center space-x-2">
                        <button
                            onClick={openModal}
                            className="flex items-center space-x-2 px-6 py-1.5 text-xs hover:bg-neutral-100 hover:text-neutral-700 border border-neutral-500 bg-white text-blue-500 rounded rounded-full"
                        >
                            <span>New</span>
                        </button>
                    </div> */}
                </div>
                <DataTable column={CONTACTCOLUMNDUMMY} dataTable={CONTACTDATADUMMY} openModal={openModal} tableHeight={300} isHeader={true} loading={loading} onEdit={handleEdit}/>
                {isModalOpen && <ContactNew onClose={closeModal} />}
            </div>
        </div>
    );
};

export default Contact;
