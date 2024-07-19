import React, { useEffect, useState } from 'react';
import { IoCheckmark, IoClose } from 'react-icons/io5';
import { MdCheck } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { SPACEDATADUMMY } from '../../components/lib/const/DataEntryDummy';
import CustomTable from '../shared/CustomTable';



export default function LeaseSubmit() {
    const [templateSearchTerm, setTemplateSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);


    const handleTemplateSearchChange = (event) => setTemplateSearchTerm(event.target.value);


    const handleSubmit = () => {
        setShowModal(true);
    };

    const handleModalClose = (submitAnother) => {
        setShowModal(false);
        if (submitAnother) {
            navigate('/data-entry-portal/mass-upload/lease'); // Navigate to the same page to submit another data entry
        } else {
            navigate('/home'); // Navigate to a different page, e.g., home or another section
        }
    };

    const navigate = useNavigate();
    const filteredTemplates = SPACEDATADUMMY.filter((item) =>
        Object.values(item).some((value) =>
            value.toString().toLowerCase().includes(templateSearchTerm.toLowerCase())
        )
    );

    const columns = [
        { Header: 'Space Name', accessor: 'spaceName', width: 'w-28' },
        { Header: 'Floor', accessor: 'floor', width: 'w-20' },
        { Header: 'Unit Nor', accessor: 'unitNo', width: 'w-20' },
    ];

    const [templates, setTemplates] = useState(filteredTemplates);

    const handleSave = (updatedBuilding) => {
        setTemplates(templates.map((building) =>
            building.id === updatedBuilding.id ? updatedBuilding : building
        ));
    };

    const [sectionHeight, setSectionHeight] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const screenHeight = window.innerHeight;
            const newHeight = screenHeight - 300; // Subtract 200px for any other fixed content
            setSectionHeight(newHeight);
        };

        handleResize();

        // Add event listener to handle window resize
        window.addEventListener('resize', handleResize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);



    return (
        <div className="flex-1 overflow-y-auto flex flex-col px-5 py-5 h-screen p-4 bg-white">
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-sm mx-auto text-center">
                        <div className="flex flex-col items-center mb-4">
                            <div className="bg-green-100 rounded-full p-3 mb-3">
                                <MdCheck className="w-8 h-8 text-green-600" />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">Data Successfully Submitted!</h2>
                            <p className="text-sm text-gray-700">
                                Would you like to add or update lease data?
                            </p>
                        </div>
                        <div className="flex justify-center space-x-4 mt-4">
                            <button
                                onClick={() => handleModalClose(false)}
                                className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg w-20"
                            >
                                <IoClose className="w-5 h-5 mr-2" />
                                No
                            </button>
                            <button
                                onClick={() => handleModalClose(true)}
                                className="flex items-center justify-center bg-c-teal hover:bg-c-weldon-blue text-white px-4 py-2 rounded-lg w-20"
                            >
                                <IoCheckmark className="w-5 h-5 mr-2" />
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}


            <div className="bg-white shadow-sm  p-6">
                <h2 className="text-c-dark-grayish font-semibold text-md">Submit your data entry below!</h2>
            </div>

            <div className="bg-white shadow-lg py-3 px-3 rounded rounded-md">
                <div className="relative mb-2 w-80 ">
                    <label htmlFor="table-search" className="sr-only">Search building...</label>
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="table-search"
                        placeholder="Search..."
                        value={templateSearchTerm}
                        onChange={handleTemplateSearchChange}
                        className="w-full px-10 py-1.5 text-sm font-thin rounded-lg border border-neutral-300 focus:outline-none focus:border-c-teal hover:border-c-teal"
                    />
                </div>
                <div style={{ height: `${sectionHeight}px` }} className="overflow-auto shadow shadow-md rounded rounded-sm">
                    <CustomTable columns={columns} filteredTemplates={filteredTemplates} handleSave={handleSave} />

                </div>
                <div className="flex justify-end">
                    <button
                        onClick={() => handleSubmit('/data-entry-portal/mass-upload/lease/submit')}
                        className="w-32 mx-2 py-2 mt-3 bg-c-teal text-white hover:text-white hover:bg-c-weldon-blue focus:outline-none shadow-md rounded rounded-md"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}
