import React from 'react'
import { TbCube, TbCubePlus } from 'react-icons/tb';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SpaceMassUpload() {
    const navigate = useNavigate()
    const location = useLocation();


    const handleCardClick = (path, action) => {
        const currentPath = location.pathname;
        const newPath = `${currentPath}${path}?action=${action}`;
        navigate(newPath);
    };

    return (
        <div className="flex justify-center bg-white">
            <div className="max-w-md bg-neutral-100 border border-sm border-neutral-200 shadow-lg rounded-lg overflow-hidden mx-4 my-8 cursor-pointer transform transition-transform hover:scale-105"
                onClick={() => handleCardClick('/template', 'new')}>
                <div className="p-6">
                    <div className="flex items-center justify-center">
                        {/* Building Icon */}
                        <TbCubePlus fontSize={60} className='text-yellow-400' />
                        {/* <img fontSize={60} className='text-yellow-400' src={`${process.env.PUBLIC_URL}/spaceIcon.png`} alt="spaceIcon" /> */}
                    </div>
                    <div className="text-center mt-4">
                        <p className="text-xl font-semibold text-gray-800">New Space</p>
                        <p className="text-sm text-gray-500">Description for adding new spaces</p>
                    </div>
                </div>
            </div>
            <div className="max-w-md bg-neutral-100 border border-sm border-neutral-200 shadow-lg rounded-lg overflow-hidden mx-4 my-8 cursor-pointer transform transition-transform hover:scale-105"
                onClick={() => handleCardClick('/template', 'update')}>
                <div className="p-6">
                    <div className="flex items-center justify-center">
                        {/* Building Icon */}
                        <TbCube fontSize={60} className='text-yellow-400' />
                    </div>
                    <div className="text-center mt-4">
                        <p className="text-xl font-semibold text-gray-800">Update Space</p>
                        <p className="text-sm text-gray-500">Description for updating spaces</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
