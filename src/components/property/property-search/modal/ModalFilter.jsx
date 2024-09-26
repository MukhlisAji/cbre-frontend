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
        <div className="flex bg-c-teal justify-between items-center p-4 border-b rounded-t-lg">
          <span className="text-lg text-white font-semibold">Filter by {filter}</span>
          <span onClick={onClose} className="cursor-pointer text-white text-lg hover:text-white/80">
            &times;
          </span>
        </div>

        {/* Modal Content */}
        <div className="p-4 ">
          {content}
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-between space-x-4">
          <button
            // onClick={handleClearAll}
            className="text-red-600 text-sm underline"
          >
            Clear All
          </button>
          <button
            // onClick={() => {
            //   const queryString = `${form.buildingName},${form.streetNumber},${form.streetName},${form.postalCode}`;
            //   setQuery(queryString);  // Update the query in the parent component
            //   onClose();  // Close the modal
            // }}
            className="py-1 text-sm bg-c-teal text-white rounded-md hover:bg-c-teal/80"
          >
            Apply
          </button>


        </div>
      </div>
    </div>

    );
};
