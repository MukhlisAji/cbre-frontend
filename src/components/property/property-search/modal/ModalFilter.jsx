import React from "react";
import FilterContent from "./FilterContent";
import ClassicSearch from "../ClassicSearch";

export default function ModalFilter({ isVisible, onClose, filter }) {
  if (!isVisible) return null;

  let content;
  console.log('filter', filter);

  switch (filter) {
    case 'filter':
      content = (
        <div>
          <ClassicSearch filter={true} />
        </div>
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

  const handleBackdropClick = (e) => {
    // Close modal when clicking on the backdrop
    if (onClose) onClose();
  };

  const handleModalContentClick = (e) => {
    // Prevent the modal from closing when clicking inside the modal
    e.stopPropagation();
  };

  return (
    // <div className="fixed inset-0 h-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
    //   <div className={`bg-white rounded-lg shadow-lg w-full ${filter === "filter" ? "max-w-6xl h-3/4" : "max-w-md"}`}>
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${onClose ? 'animate-fade-in' : 'animate-fade-out'}`} onClick={handleBackdropClick}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative flex flex-col max-w-5xl bg-white shadow-lg rounded-lg" onClick={handleModalContentClick}>
        {/* Header */}
        <div className="flex bg-c-teal justify-between items-center p-4 border-b rounded-t-lg">
          <span className="text-lg text-white font-semibold">Basic Search Criteria</span>
          <span onClick={onClose} className="cursor-pointer text-white text-lg hover:text-white/80">
            &times;
          </span>
        </div>

        {/* Modal Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="relative">
            {content}
          </div>
        </main>

        <footer className="px-4 sticky bottom-0 bg-neutral-100 py-3 flex items-center gap-2 justify-end border-t border-neutral-500 shadow-md z-10 rounded-b-lg">
          <button
            // onClick={onClose}
            className="py-2 text-sm bg-c-teal text-white rounded-md hover:bg-c-teal/80"
          >
            Advance Criteria

          </button>
          <button
            // onClick={handleSave}
            // disabled={!isFormValid}
            className="py-2 text-sm bg-c-teal text-white rounded-md hover:bg-c-teal/80"
          >
            Search
          </button>
        </footer>

      </div>
    </div>

  );
};
