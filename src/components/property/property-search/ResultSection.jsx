import React, { useState } from "react";
import { CiSaveUp2 } from "react-icons/ci";
import { RxCaretSort } from "react-icons/rx";
import ResultCard from "./ResultCard";
import Switcher from "../../shared/element/Switcher";

export default function ResultSection({resultData}) {
    const [enabled, setEnabled] = useState(false)

    return (
        <div className="w-full flex flex-col items-center space-x-5">
            <div className="flex justify-between w-4/6 items-center py-4">
                {/* Left Side: Homes Count and Save Search */}
                <div className="flex flex-col justify-start space-y-5">
                    <span className="text-sm text-gray-500">33,928 Homes for Rent in Singapore</span>
                    <button className="flex px-2 py-2 w-32 items-center gap-2 text-sm border border-gray-600 rounded-lg text-gray-600 hover:bg-gray-100">
                        <CiSaveUp2 className="text-lg" />
                        Save Search
                    </button>
                </div>

                {/* Right Side: Show Map Toggle and Recommended Dropdown */}
                <div className="flex flex-col justify-start items-center space-y-5 ml-10">
                    <div className="flex items-center gap-4">

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
