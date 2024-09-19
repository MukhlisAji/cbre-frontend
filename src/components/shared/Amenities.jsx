import React from 'react';

export default function Amenities({label, currentAmenities}){
    return(
        <div className="flex justify-between w-1/4">
            <img src="3d.svg" alt="3D" className="w-[30px] h-[30px]" />
            <button
            
                className={`p-2 text-neutral-500 text-sm ${currentAmenities === label ? 'border-b-2 border-black text-neutral-700' : ''}`}
                
            > 
                {label}
            </button>
        </div>
    )
}