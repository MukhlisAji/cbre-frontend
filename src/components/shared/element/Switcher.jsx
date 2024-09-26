import React, { useState } from 'react';

const Switcher = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <label className='flex cursor-pointer select-none items-center'>
            <div className='relative'>
                <input
                    type='checkbox'
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className='sr-only'
                />
                {/* Switch Background */}
                <div className={`h-5 w-14 rounded-full transition-colors duration-300 ${isChecked ? 'bg-gray-300' : 'bg-[#E5E7EB]'}`}></div>
                {/* Dot with Inner Circle */}
                <div
                    className={`absolute -top-1 left-0 h-7 w-7 rounded-full transition-transform duration-300 transform ${isChecked ? 'translate-x-7 bg-c-teal' : 'translate-x-0  bg-white'}`}
                >
                    {/* Inner Circle */}
                    {/* <span
                        className={`transition-all duration-300 h-4 w-4 rounded-full ${isChecked ? 'bg-c-teal' : 'bg-[#E5E7EB]'}`}
                    ></span> */}
                </div>
            </div>
        </label>
    );
};

export default Switcher;
