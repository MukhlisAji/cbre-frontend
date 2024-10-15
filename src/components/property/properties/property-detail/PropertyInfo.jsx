import React, { useRef, useState, useEffect } from "react";
import { PROPERTYCATEGORIES, PROPERTYDETAILS } from "../../../lib/const/AppContant";
import AccountContactInfo from "./AccountContact/AccountContactInfo";

export default function PropertyInfo() {
  const [selectedCategory, setSelectedCategory] = useState(
    PROPERTYCATEGORIES[0]?.items[0]?.label || ""
  );

  // Refs for all sections
  const refs = useRef([]);

  // Handle scrolling to a specific section when a category is clicked
  const handleCategoryClick = (label, index) => {
    setSelectedCategory(label);
    refs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  // Update the selected category on scroll
  const handleScroll = () => {
    refs.current.forEach((ref, index) => {
      const rect = ref.getBoundingClientRect();
      if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
        setSelectedCategory(PROPERTYCATEGORIES[0].items[index].label);
      }
    });
  };

  // Add scroll event listener to detect manual scrolling
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [sectionHeight, setSectionHeight] = useState(0);

  useEffect(() => {
      const handleResize = () => {
          const screenHeight = window.innerHeight;
          const newHeight = screenHeight - 280;
          setSectionHeight(newHeight);
      };

      handleResize();
      window.addEventListener('resize', handleResize);
      return () => {
          window.removeEventListener('resize', handleResize);
      };
  }, []);

  return (
    <div className="flex text-sm whitespace-nowrap p-2 space-x-2">
      {/* Sidebar */}
      <div className="w-64 h-full bg-gray-100 shadow-lg">
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
                  onClick={() => handleCategoryClick(item.label, idx)}
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
      <div style={{ height: `${sectionHeight}px` }} className="w-full space-y-4 overflow-y-auto" onScroll={handleScroll}>
        {PROPERTYCATEGORIES[0].items.map((item, index) => (
          <div
            key={index}
            ref={(el) => (refs.current[index] = el)} // Attach ref to each section
            className="w-full mx-auto bg-white shadow-md rounded-md border border-gray-200 space-y-4"
          >
            {item.label === "Property Account and Contacts" ? (
              <AccountContactInfo />
            ) : (
              <div className="p-4">
                <div className="border-b border-green-600 pb-2 mb-4">
                  <h2 className="text-c-teal text-lg font-semibold">
                    {item.label}
                  </h2>
                </div>
                {/* Render details from selected section */}
                <div className="grid grid-cols-2 gap-y-2">
                  {PROPERTYDETAILS.sections.find(
                    (section) => section.title === item.label
                  )?.fields.map((field, idx) => (
                    <div className="flex text-sm space-x-4" key={idx}>
                      <div className="font-semibold text-gray-800 w-2/5 truncate">
                        {field.label}
                      </div>
                      <div className="text-gray-600 w-full sm:w-2/3 truncate">
                        {field.value || "-"}
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
