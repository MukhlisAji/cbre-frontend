import React, { useState } from "react";
import { PROPERTYCATEGORIES, PROPERTYDETAILS } from "../../../lib/const/AppContant";
import AccountContactInfo from "./AccountContact/AccountContactInfo";

export default function PropertyInfo() {
  const [selectedCategory, setSelectedCategory] = useState(
    PROPERTYCATEGORIES[0]?.items[0]?.label || ""
  ); // Set the default category to the first one

  // Find the section corresponding to the selected category, excluding "Property Account and Contacts"
  const selectedSection = PROPERTYDETAILS.sections.find(
    (section) => section.title === selectedCategory
  );

  return (
    <div className="flex text-sm whitespace-nowrap p-2 space-x-2">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-gray-100 shadow-lg">
        {PROPERTYCATEGORIES.map((category, index) => (
          <div key={index} className="mb-6">
            {/* Sidebar Category */}
            <ul>
              {category.items.map((item, idx) => (
                <li
                  key={idx}
                  className={`flex px-4 items-center space-x-2 cursor-pointer py-2 hover:bg-gray-200 ${
                    selectedCategory === item.label ? "bg-gray-300" : ""
                  }`}
                  onClick={() => setSelectedCategory(item.label)} // Update the selected category on click
                >
                  <span
                    className={`w-2 h-3 bg-${item.color} rounded-full`}
                  ></span>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Content Area */}
      <div className="w-full space-y-4">
        {selectedCategory === "Property Account and Contacts" ? (
             <AccountContactInfo/>
        ) : selectedSection ? (
          <div className="w-full mx-auto bg-white shadow-md rounded-md p-4 border border-gray-200">
            <div className="border-b border-green-600 pb-2 mb-4">
              <h2 className="text-c-teal text-lg font-semibold">
                {selectedSection.title}
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-y-2">
              {selectedSection.fields.map((field, index) => (
                <div className="flex text-sm space-x-4" key={index}>
                  <div className="font-semibold text-gray-800 w-2/5 truncate">
                    {field.label}
                  </div>
                  <div className="text-gray-600 w-full sm:w-2/3 truncate">
                    {field.value ? field.value : "-"}
                  </div>
                </div>
              ))}
            </div>
            <div className="col-span-2 mt-6">
              <button className="bg-c-teal text-white py-1 px-4 text-sm rounded hover:bg-c-teal/80">
                Edit
              </button>
            </div>
          </div>
        ) : (
          // Fallback message if no category is selected
          <div className="w-full mx-auto bg-white shadow-md rounded-md p-4 border border-gray-200">
            <p>Select a category to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
