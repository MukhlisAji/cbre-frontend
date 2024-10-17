import React, { useRef, useState, useEffect } from "react";
import { STOCKINGCATEGORIES } from "../../../../lib/const/AppContant";
import SpaceStatus from "./SpaceStatus";

export default function StockingPlanInfo({ propertyInfo, id }) {
    const [selectedCategory, setSelectedCategory] = useState(
        STOCKINGCATEGORIES[0]?.items[0]?.label || ""
    );

    // Handle changing the selected category when a category is clicked
    const handleCategoryClick = (label) => {
        setSelectedCategory(label);
    };

    //   if (!propertyInfo) {
    //     return <div>Loading...</div>;
    //   }

    return (
        <div className="flex text-sm whitespace-nowrap p- space-x-2">
            {/* Sidebar */}
            <div className="w-64 h-[calc(100vh-250px)] bg-gray-100 shadow-lg">
                {STOCKINGCATEGORIES.map((category, index) => (
                    <div key={index} className="mb-6">
                        {/* Sidebar Category */}
                        <ul>
                            {category.items.map((item, idx) => (
                                <li
                                    key={idx}
                                    className={`flex px-4 items-center space-x-2 cursor-pointer py-2 hover:bg-gray-200 ${selectedCategory === item.label ? "bg-gray-300" : ""}`}
                                    onClick={() => handleCategoryClick(item.label)}
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
            <div className="w-full">
                {STOCKINGCATEGORIES[0].items.map((item, index) => (
                    <div key={index}>
                        {selectedCategory === item.label && (
                            <div className="w-full mx-auto bg-white shadow-md rounded-md border border-gray-200 space-y-4">
                                <div className="p-4">
                                    {/* <div className="border-b border-green-600 pb-2 mb-4">
                                        <h2 className="text-c-teal text-lg font-semibold">
                                            {item.displayLabel}
                                        </h2>
                                    </div> */}
                                    {/* Render details from a separate file based on the label */}
                                    <div>
                                        {/* Placeholder for imported component for each category */}
                                        {item.label === "spaceStatus" ? <SpaceStatus /> : 'Not defined'}
                                        {/* <div>Component for {item.label} will go here</div> */}
                                    </div>
                                    {/* <div className="col-span-2 mt-6">
                                        <button className="bg-c-teal text-white py-1 px-4 text-sm rounded hover:bg-c-teal/80">
                                            Edit
                                        </button>
                                    </div> */}
                                </div>
                            </div>

                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}