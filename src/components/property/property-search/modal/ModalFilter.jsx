import React from "react";
import FilterContent from "./FilterContent";

export default function ModalFilter({ isVisible, onClose, filter }) {
    if (!isVisible) return null;

    let content;
    console.log('filter', filter);

    switch (filter) {
        case 'filter':
            content = (
                <FilterContent />
            );
            break;
        case 'propertyType':
            content = (
                <div>
                    <label className="block mb-2">Enter Account/Contact:</label>
                    <input type="text" className="form-input w-full p-2 border" placeholder="Enter account/contact" />
                    <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Search</button>
                </div>
            );
            break;
        case 'Price':
            content = (
                <div>
                    <label className="block mb-2">Enter Region/Micromarket:</label>
                    <input type="text" className="form-input w-full p-2 border" placeholder="Enter region/micromarket" />
                    <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Search</button>
                </div>
            );
            break;
        case 'Size':
            content = (
                <div>
                    <label className="block mb-2">Enter Region/Micromarket:</label>
                    <input type="text" className="form-input w-full p-2 border" placeholder="Enter region/micromarket" />
                    <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Search</button>
                </div>
            );
            break;
        case 'Availibility':
            content = (
                <div>
                    <label className="block mb-2">Enter Region/Micromarket:</label>
                    <input type="text" className="form-input w-full p-2 border" placeholder="Enter region/micromarket" />
                    <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Search</button>
                </div>
            );
            break;
        default:
            content = <p>No content available.</p>;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <span className="text-lg font-semibold">Filter</span>
                    <span onClick={onClose} className="cursor-pointer text-gray-500 hover:text-gray-700">
                        &times;
                    </span>
                </div>

                {/* Modal Content */}
                <div className="p-4">
                    {content}
                </div>

                {/* Footer */}
                <div className="p-4 border-t flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                        Clear All
                    </button>
                    <button
                        className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                        Apply Filter
                    </button>
                </div>
            </div>
        </div>

    );
};
