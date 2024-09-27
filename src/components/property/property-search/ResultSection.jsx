import React, { useState } from "react";
import { CiSaveUp2 } from "react-icons/ci";
import { RxCaretSort } from "react-icons/rx";
import ResultCard from "./ResultCard";
import Switcher from "../../shared/element/Switcher";

export default function ResultSection({ resultData }) {
    const [enabled, setEnabled] = useState(false)
    const [activeButton, setActiveButton] = useState('All'); // Default active button

    const handleButtonClick = (button) => {
        setActiveButton(button);
      };

    return (
        <div className="w-[970px] flex flex-col items-center space-x-5">
            <div className="relative inline-flex gap-2 rounded-full mt-4 px-4 w-full">
                {/* Active Background Slider */}
                {/* <div
                className="absolute top-0 left-0 h-full bg-c-teal rounded-full transition-all duration-300 ease-in-out"
                style={{
                  width: `${sliderStyle.width}px`,
                  left: `${sliderStyle.left}px`,
                }}
              ></div> */}

                {/* Button Items */}
                <span
                    // ref={buttonRefs.All}
                    onClick={() => handleButtonClick('All')}
                    className={`relative z-10 py-1 px-4 rounded-full cursor-pointer text-sm font-bold transition-colors duration-100 ease-in-out
                ${activeButton === 'All' ? 'bg-c-teal text-white' : ' text-gray-600 bg-gray-200 hover:bg-gray-200'}`}
                >
                    All
                </span>
                <span
                    // ref={buttonRefs.Lease}
                    onClick={() => handleButtonClick('Lease')}
                    className={`relative z-10 py-1 px-4 rounded-full cursor-pointer text-sm font-bold transition-colors duration-100 ease-in-out
                ${activeButton === 'Lease' ? 'bg-c-teal text-white' : ' text-gray-600 bg-gray-200 hover:bg-gray-200'}`}
                >
                    For Lease
                </span>
                <span
                    // ref={buttonRefs.Sale}
                    onClick={() => handleButtonClick('Sale')}
                    className={`relative z-10 py-1 px-4 rounded-full cursor-pointer text-sm font-bold transition-colors duration-100 ease-in-out
                ${activeButton === 'Sale' ? 'bg-c-teal text-white' : ' text-gray-600 bg-gray-200 hover:bg-gray-200'}`}
                >
                    For Sale
                </span>
            </div>

            <div className="w-full flex justify-between items-center py-4 px-2">
                {/* Left Side: Homes Count and Save Search */}
                <div className="flex flex-col justify-start space-y-5">
                    <span className="text-sm text-gray-500">33,928 Homes for Rent in Singapore</span>
                    <button className="flex px-2 py-2 w-32 items-center gap-2 text-sm border border-gray-600 rounded-lg text-gray-600 hover:bg-gray-100">
                        <CiSaveUp2 className="text-lg" />
                        Save Search
                    </button>
                </div>

                {/* Right Side: Show Map Toggle and Recommended Dropdown */}
                <div className="flex flex-col justify-start items-center space-y-5 mr-5">
                    <div className="flex items-center gap-4 text-sm text-gray-600">

                        <Switcher />
                        Show map
                    </div>
                    <div className="flex py-2 items-center gap-2 text-sm cursor-pointer text-gray-600 hover:text-gray-600/80">
                        <RxCaretSort className="text-lg" />
                        Recommended
                    </div>
                </div>
            </div>

            <div className="flex items-center">
                <ResultCard resultSet={resultData} />
            </div>
        </div >

    );
}
