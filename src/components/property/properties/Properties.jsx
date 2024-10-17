import React, { useEffect, useState } from 'react'
import { RiContactsBook3Line } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';
import { CONTACTCOLUMNDUMMY, CONTACTDATADUMMY, PROPERTYCOLUMNDUMMY, PROPERTYDATADUMMY } from '../../lib/const/DummyData';
import PropertyNew from './PropertyNew';
import DataTable from '../../shared/CustomTableMUI';
import PropertyForm from './PropertyForm';
import ListProperty from '../ListProperty';
import PropertyResource from '../PropertyResource';


export default function Properties() {
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentAccount, setCurrentAccount] = useState(null);
    const [propertyId, setPropertyId] = useState(null);
    const { properties, fetchProperties } = PropertyResource();

    useEffect(() => {
        if (!properties || properties.length === 0) {  // Check if properties is empty
            setLoading(true);  // Set loading to true before fetching data
            fetchProperties();  // Call the function to fetch properties
        } else {
            setLoading(false);  // Set loading to false if properties already has data
        }
    }, [properties]);  // Add properties as a dependency


    useEffect(() => {
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

    const handleNewProperty = () => {
        setIsEditing(false);
        setCurrentAccount(null);
        setIsModalOpen(true);
    };

    const handleEditProperty = (property) => {
        setIsModalOpen(true);
        console.log('Editing account:', property.id);
        setIsEditing(true);
        setAccountId(property.id);
        setCurrentAccount(property);
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
                                Properties
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
                <ListProperty column={PROPERTYCOLUMNDUMMY} dataTable={properties} openModal={handleNewProperty} isHeader={true} tableHeight={300} loading={loading} onEdit={handleEditProperty} dataType={"properties"} />
                {isModalOpen && (
                    <PropertyForm
                        onClose={closeModal}
                        isEditing={isEditing}
                        initialData={currentAccount}
                        accountId={propertyId}
                    />
                )}
            </div>
        </div>
    );
};