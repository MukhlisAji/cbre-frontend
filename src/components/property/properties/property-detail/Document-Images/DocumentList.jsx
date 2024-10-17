import React, { useState } from 'react';
import AddDocument from './AddDocument';
import EditDocument from './EditDocument';
import EditPriority from './EditPriority';

const dummyData = [
    {
        category: 'Image',
        documents: [
            { name: 'bldg 2.JPG', created: 'August 23, 2015', modified: 'October 28, 2017', preview: 'bldg2.jpg' },
            { name: 'bldg 1.JPG', created: 'August 23, 2015', modified: 'October 28, 2017', preview: 'bldg1.jpg' },
        ],
    },
    {
        category: 'Floor Plan',
        documents: [
            { name: 'fp.jpg', created: 'August 23, 2015', modified: 'February 28, 2019', preview: 'fp.jpg' },
            { name: 'Capture.JPG', created: 'February 28, 2019', modified: 'February 28, 2019', preview: 'capture.jpg' },
        ],
    },
    {
        category: 'Flyer',
        documents: [
            { name: 'flyer1.jpg', created: 'January 10, 2020', modified: 'January 12, 2020', preview: 'flyer1.jpg' },
        ],
    },
];

const DocumentList = () => {
    // Separate states for each modal type
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalPriority, setShowModalPriority] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);

    // Open specific modals
    const handleAddDocumentClick = () => setShowModalAdd(true);
    const handleEditDocumentClick = () => setShowModalEdit(true);
    const handlePriorityClick = () => setShowModalPriority(true);

    // Close all modals
    const closeModal = () => {
        setShowModalAdd(false);
        setShowModalPriority(false);
        setShowModalEdit(false);
    };

    const handleSavePriority = (updatedFileDetails) => {
        console.log("Updated priority:", updatedFileDetails);
        // Perform further actions (e.g., API call or update state)
    };

    return (
        <div className="container mx-auto">
            <div className='mb-2'>
                <span onClick={handleAddDocumentClick} className='px-2 text-gray-200 py-1.5 rounded bg-c-teal hover:bg-c-teal/80 text-sm font-semibold cursor-pointer'>Add Document</span>
            </div>
            {dummyData.map((categoryItem, index) => (
                <div key={index} className="mb-10">
                    <div className="bg-c-teal/80 text-gray-200 p-2 font-semibold text-sm flex justify-between">
                        <span>{categoryItem.category}</span>
                    </div>
                    <div className="bg-neutral-200 text-gray-300 p-2 flex justify-between">
                        <div className='space-x-4'>
                            <span className='text-sm text-gray-600 font-semibold'>PROPERTY</span>
                            <button
                                className="bg-c-teal text-sm hover:bg-c-teal/80 text-gray-300 py-1 px-2 rounded"
                                onClick={handlePriorityClick}
                            >
                                Priority
                            </button>
                            <button
                                className="bg-c-teal text-sm hover:bg-c-teal/80 text-gray-300 py-1 px-2 rounded"
                                onClick={handleEditDocumentClick}
                            >
                                Edit / Change Type
                            </button>
                        </div>
                    </div>
                    <div className="w-full border-t border-b border-gray-800">
                        {categoryItem.documents.map((doc, docIndex) => (
                            <div key={docIndex} className="flex items-center even:bg-gray-100 odd:bg-white p-2 text-sm">
                                <div className="w-10 text-center">{docIndex + 1}</div>
                                <div className="w-2/12 text-center">
                                    <img src={doc.preview} className="h-20 mx-auto" alt={doc.name} />
                                </div>
                                <div className="w-4/12 text-sm">
                                    <div>Document Name: {doc.name}</div>
                                    <div>Description: </div>
                                </div>
                                <div className="w-4/12 text-sm">
                                    <div>Created: {doc.created}</div>
                                    <div>Modified: {doc.modified}</div>
                                </div>
                                <div className="w-1/12 text-center text-sm">
                                    <button className="bg-c-teal hover:bg-c-teal/80 text-gray-300 py-1 px-2 text-sm rounded">
                                        Download
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Add Document Modal */}
            {showModalAdd && (
                <AddDocument onClose={closeModal} />
            )}

            {/* Edit Priority Modal */}
            {showModalPriority && (
                <EditPriority onClose={closeModal} onSave={handleSavePriority} />
)}

            {/* Edit Document Modal */}
            {showModalEdit && (
                <EditDocument onClose={closeModal} />
            )}
        </div>
    );
};

export default DocumentList;
