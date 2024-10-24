import React, { useRef, useState, useEffect } from "react";
import { PROPERTYCATEGORIES } from "../../../lib/const/AppContant";
import AccountContactInfo from "./AccountContact/AccountContactInfo";
import Agency from "./Agency";

export default function PropertyInfo({ propertyInfo, id }) {
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

  if (!propertyInfo) {
    return <div>Loading...</div>;
  }

  const formatLabel = (label) => {
    return label
      .replace(/([a-z])([A-Z])/g, '$1 $2')  // Handle camelCase to space-separated words
      .replace(/_/g, ' ')                   // Replace underscores with spaces (for snake_case)
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
  };

  return (
    <div className="flex text-sm whitespace-nowrap p- space-x-2">
      {/* Sidebar */}
      <div className="w-64 h-[calc(100vh-250px)] bg-gray-100 shadow-lg">
        {PROPERTYCATEGORIES.map((category, index) => (
          <div key={index} className="mb-6">
            {/* Sidebar Category */}
            <ul>
              {category.items.map((item, idx) => (
                <li
                  key={idx}
                  className={`flex px-4 items-center space-x-2 cursor-pointer py-2 hover:bg-gray-200 ${selectedCategory === item.label ? "bg-gray-300" : ""
                    }`}
                  onClick={() => handleCategoryClick(item.label, idx)}
                >
                  <span
                    className={`w-2 h-3 bg-${item.color} rounded-full`}
                  ></span>
                  <span>{item.displayLabel}</span>
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
            {item.label === "propertyAccountAndContacts" ? (
              <AccountContactInfo propertyId={id} />
            ) : item.label === "agency" ? (
              <Agency agency={propertyInfo.agency} />
            ) : (
              <div className="p-4">
                <div className="border-b border-green-600 pb-2 mb-4">
                  <h2 className="text-c-teal text-lg font-semibold">
                    {item.displayLabel}
                  </h2>
                </div>
                {/* Render details from propertyInfo based on the label */}
                <div className="grid grid-cols-2 gap-y-2">
                  {propertyInfo[item.label] ? (
                   Object.entries(propertyInfo[item.label]).map(([key, value], idx) => (
                    <div className="mb-4" key={idx}>
                      <div className="flex text-sm space-x-4">
                        <div className="font-semibold text-gray-800 w-2/5 truncate">
                          {formatLabel(key)}
                        </div>
                        <div className="text-gray-600 w-full sm:w-2/3">
                          {typeof value === 'object' && value !== null ? (
                            // Render subfields vertically below the parent field
                            <div className="mt-2 space-y-1 pl-4">
                              {Object.entries(value).map(([subKey, subValue], subIdx) => (
                                <div key={subIdx} className="flex justify-between">
                                  <span className="font-medium">{formatLabel(subKey)}</span>: <span>{subValue || '-'}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            // Render simple fields directly to the right
                            <span>{value || "-"}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                  ) : (
                    <div className="text-gray-600">No data available</div>
                  )}
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