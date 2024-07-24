import React, { useState } from 'react';
import DataTable from '../shared/CustomTableMUI';
import { ACCOUNTCOLUMNDUMMY, ACCOUNTDATADUMMY } from '../lib/const/DummyData';
import { IoMdArrowDropdown } from "react-icons/io";
import AccountNew from './AccountNew';
import { MdAccountBox } from 'react-icons/md';



const Account = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

    // Function to open the modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div className="h-screen flex flex-col flex-grow mb-4">
            <div className="bg-neutral-100 rounded flex-grow">
                <div className="flex items-center justify-between mb-4">
                    <div className='flex items-center space-x-2'>

                        <div className="p-1 rounded-full border-2 border-purple-500 bg-purple-600">
                            <MdAccountBox className="text-white text-xl font-bold" />
                        </div>
                        <div>
                            <h1 className="text-xs font-normal">Accounts</h1>
                            <h2 className="flex items-center py-1 cursor-pointer text-2xl text-neutral-600 border-b border-neutral-100 hover:border-b hover:border-neutral-500">
                                Recently Viewed
                                <IoMdArrowDropdown className='ml-1 active:rounded-lg active:border active:border-neutral-500' />
                            </h2>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button 
                        onClick={openModal} 
                        className="flex items-center space-x-2 px-6 py-1.5 text-xs hover:bg-neutral-100 hover:text-neutral-700 border border-neutral-500 bg-white text-blue-500 rounded rounded-full transition duration-150 ease-in-out"

                        >
                            <span>New</span>
                        </button>
                    </div>
                    {isModalOpen &&
                        <AccountNew onClose={closeModal} />
                    }
                </div>
                <DataTable column={ACCOUNTCOLUMNDUMMY} dataTable={ACCOUNTDATADUMMY} />
            </div>
        </div>
    );
};

export default Account;
