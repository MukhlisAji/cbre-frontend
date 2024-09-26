import React, { useEffect } from "react";

export default function ModalSearch({ isVisible, onClose, category, form, onFormChange, setQuery }) {
  if (!isVisible) return null;

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    // Update the parent form via the onFormChange callback
    onFormChange({
      ...form,
      [id]: value
    });
  };

  const handleClearAll = () => {
    onFormChange({
      buildingName: '',
      streetNumber: '',
      streetName: '',
      postalCode: ''
    });
  };

  let content;
  switch (category) {
    case 'Address':
      content = (
        <div className="max-w-md mx-auto p-2">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="buildingName">
              Building Name
            </label>
            <input
              type="text"
              id="buildingName"
              value={form.buildingName}
              onChange={handleInputChange}
              placeholder="Enter Building Name"
              className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>



          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="streetName">
              Street Name
            </label>
            <input
              type="text"
              id="streetName"
              value={form.streetName}
              onChange={handleInputChange}
              placeholder="Enter Street Name"
              className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="streetNumber">
                Street No
              </label>
              <input
                type="text"
                id="streetNumber"
                value={form.streetNumber}
                onChange={handleInputChange}
                placeholder="Enter Street No"
                className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="postalCode">
                Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                value={form.postalCode}
                onChange={handleInputChange}
                placeholder="Enter Postal Code"
                className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>


        </div>
      );
      break;
    case 'Account/Contacts':
      content = (
        <div>
          <label className="block mb-2">Enter Account/Contact:</label>
          <input type="text" className="form-input w-full p-2 border" placeholder="Enter account/contact" />
          <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Search</button>
        </div>
      );
      break;
    case 'Region/Micromarket':
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
          <span className="text-lg text-white font-semibold">Search by {category}</span>
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
            onClick={handleClearAll}
            className="text-red-600 text-sm underline"
          >
            Clear All
          </button>
          <button
            onClick={() => {
              const queryString = `${form.buildingName},${form.streetNumber},${form.streetName},${form.postalCode}`;
              setQuery(queryString);  // Update the query in the parent component
              onClose();  // Close the modal
            }}
            className="py-1 text-sm bg-c-teal text-white rounded-md hover:bg-c-teal/80"
          >
            Search
          </button>


        </div>
      </div>
    </div>
  );
};
