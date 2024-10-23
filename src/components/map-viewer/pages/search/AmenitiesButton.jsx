import React, { useEffect, useState } from 'react';

export default function AmenitiesButton({label, currentAmenities, setCurrentAmenities, img, category}){
    const handleButtonOnClick= () => {
        setCurrentAmenities(category);
    };

    return(
        <div className="flex justify-between w-1/3 h-[30px] space-x-2">
           
            <button
                 
                className={`text-neutral-500 text-xs ${currentAmenities === category ? 'border-b-2 border-black text-neutral-700' : ''} flex items-center space-x-7 `}
                onClick={handleButtonOnClick}
            > 
                <img src="amenities.svg" alt="3D" className="w-[20px] h-[20px]" />
                {label}
            </button>
        </div>
    )
}