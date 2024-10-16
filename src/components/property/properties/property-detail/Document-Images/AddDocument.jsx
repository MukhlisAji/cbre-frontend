import React, { useState } from "react";

export default function AddDocument({ onClose }) {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fileDetails, setFileDetails] = useState([]);

    const handleBackdropClick = (e) => {
        // Close modal when clicking on the backdrop
        if (onClose) onClose();
    };

    const handleModalContentClick = (e) => {
        // Prevent the modal from closing when clicking inside the modal
        e.stopPropagation();
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
        setFileDetails(files.map(file => ({
            name: file.name,
            description: "",
            highPriority: false,
            webPublished: false
        })));
    };

    const handleDetailChange = (index, field, value) => {
        setFileDetails(prevDetails => {
            const updatedDetails = [...prevDetails];
            updatedDetails[index][field] = value;
            return updatedDetails;
        });
    };

    const handleDeleteFile = (index) => {
        setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
        setFileDetails(prevDetails => prevDetails.filter((_, i) => i !== index));
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${onClose ? 'animate-fade-in' : 'animate-fade-out'}`} onClick={handleBackdropClick}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative flex flex-col w-1/2 bg-white shadow-lg rounded-lg" onClick={handleModalContentClick}>
                {/* Header */}
                <div className="flex bg-c-teal justify-between items-center p-4 border-b rounded-t-lg">
                    <span className="text-lg text-white font-semibold">Add Document</span>
                    <span onClick={onClose} className="cursor-pointer text-white text-lg hover:text-white/80">
                        &times;
                    </span>
                </div>

                {/* Modal Content */}
                <main className="flex-1 overflow-y-auto">
                    <div className="relative p-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fileType">
                                Choose File Type:
                            </label>
                            <select id="fileType" className="w-full p-2 border border-gray-300 rounded">
                                <option value="Image">Image</option>
                                <option value="Floor Plan">Floor Plan</option>
                                <option value="Flyer">Flyer</option>
                                <option value="Brochure">Brochure</option>
                                <option value="External Appearance">External Appearance</option>
                                <option value="Facilities">Facilities</option>
                                <option value="Layout">Layout</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <input
                                id="fileInput"
                                type="file"
                                multiple
                                className="w-full p-2 border border-gray-300 rounded"
                                onChange={handleFileChange}
                            />
                        </div>

                        {/* File Previews */}
                        {selectedFiles.length > 0 && (
                            <div className="mb-4">
                                <h3 className="text-gray-700 text-sm font-bold mb-2">Selected Files:</h3>
                                <div className="grid grid-cols-1 gap-4 h-[calc(100vh-400px)] overflow-y-auto">
                                    {selectedFiles.map((file, index) => (
                                        <div key={index} className="border p-4 rounded-md shadow-md">
                                            <div className="flex justify-between items-center space-x-4 mb-2">
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        src={URL.createObjectURL(file)}
                                                        alt={file.name}
                                                        className="w-16 h-16 object-cover rounded-md"
                                                    />
                                                    {/* <div>
                                                        <p className="text-sm font-semibold text-gray-800 truncate">
                                                            {file.name}
                                                        </p>
                                                        <p className="text-xs text-gray-600">
                                                            {Math.round(file.size / 1024)} KB
                                                        </p>
                                                    </div> */}
                                                </div>

                                                <button
                                                    onClick={() => handleDeleteFile(index)}
                                                    className="ml-auto text-sm py-1 px-2 rounded rounded-sm bg-gray-100 text-red-500 hover:text-red-700"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                            <div className="mb-2">
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                    Document Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={fileDetails[index].name}
                                                    readOnly
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fileType">
                                                    Choose File Type:
                                                </label>
                                                <select id="fileType" className="w-full p-2 border border-gray-300 rounded">
                                                    <option value="Image">Image</option>
                                                    <option value="Floor Plan">Floor Plan</option>
                                                    <option value="Flyer">Flyer</option>
                                                    <option value="Brochure">Brochure</option>
                                                    <option value="External Appearance">External Appearance</option>
                                                    <option value="Facilities">Facilities</option>
                                                    <option value="Layout">Layout</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                            <div className="mb-2">
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                    Description
                                                </label>
                                                <textarea
                                                    value={fileDetails[index].description}
                                                    onChange={(e) => handleDetailChange(index, 'description', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                />
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={fileDetails[index].highPriority}
                                                        onChange={(e) => handleDetailChange(index, 'highPriority', e.target.checked)}
                                                        className="mr-2 text-sm"
                                                    />
                                                    High priority
                                                </label>
                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={fileDetails[index].webPublished}
                                                        onChange={(e) => handleDetailChange(index, 'webPublished', e.target.checked)}
                                                        className="mr-2 text-sm"
                                                    />
                                                    Web Published
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </main>

                <footer className="px-4 sticky bottom-0 bg-neutral-100 py-3 flex items-center gap-2 justify-end border-t border-neutral-500 shadow-md z-10 rounded-b-lg">
                    <button
                        onClick={onClose}
                        className="py-2 text-sm bg-c-teal text-white rounded-md hover:bg-c-teal/80"
                    >
                        Cancel
                    </button>
                    <button
                        // onClick={handleSave}
                        // disabled={!isFormValid}
                        className="py-2 text-sm bg-c-teal text-white rounded-md hover:bg-c-teal/80"
                    >
                        Upload
                    </button>
                </footer>
            </div>
        </div>
    );
}