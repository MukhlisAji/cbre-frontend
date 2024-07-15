import React from 'react'
import { BsPersonFillAdd, BsPersonFillExclamation } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AccContactMassUpload() {
    const navigate = useNavigate()
    const location = useLocation();


    const handleCardClick = (path, action) => {
        const currentPath = location.pathname;
        const newPath = `${currentPath}${path}?action=${action}`;
        navigate(newPath);
    };

    return (
        <div className="flex flex-col">
            <div className='flex justify-center bg-white'>
                <div className="max-w-md bg-neutral-100 border border-sm border-neutral-200 shadow-lg rounded-lg overflow-hidden mx-4 my-8 cursor-pointer transform transition-transform hover:scale-105"
                    onClick={() => handleCardClick('/acc/template', 'new')}>
                    <div className="p-6">
                        <div className="flex items-center justify-center">
                            {/* Building Icon */}
                            <BsPersonFillAdd fontSize={60} className='text-yellow-400' />
                            {/* <img fontSize={60} className='text-yellow-400' src={`${process.env.PUBLIC_URL}/spaceIcon.png`} alt="spaceIcon" /> */}
                        </div>
                        <div className="text-center mt-4">
                            <p className="text-xl font-semibold text-gray-800">New Account</p>
                            <p className="text-sm text-gray-500">Description for adding new Account</p>
                        </div>
                    </div>
                </div>
                <div className="max-w-md bg-neutral-100 border border-sm border-neutral-200 shadow-lg rounded-lg overflow-hidden mx-4 my-8 cursor-pointer transform transition-transform hover:scale-105"
                    onClick={() => handleCardClick('/acc/template', 'update')}>
                    <div className="p-6">
                        <div className="flex items-center justify-center">
                            {/* Building Icon */}
                            <BsPersonFillExclamation fontSize={60} className='text-yellow-400' />
                        </div>
                        <div className="text-center mt-4">
                            <p className="text-xl font-semibold text-gray-800">Update Account</p>
                            <p className="text-sm text-gray-500">Description for updating Account</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-center bg-white'>

                <div className="max-w-md bg-neutral-100 border border-sm border-neutral-200 shadow-lg rounded-lg overflow-hidden mx-4 mb-8 cursor-pointer transform transition-transform hover:scale-105"
                    onClick={() => handleCardClick('/con/template', 'new')}>
                    <div className="p-6">
                        <div className="flex items-center justify-center">
                            {/* Building Icon */}
                            <BsPersonFillAdd fontSize={60} className='text-yellow-400' />
                            {/* <img fontSize={60} className='text-yellow-400' src={`${process.env.PUBLIC_URL}/spaceIcon.png`} alt="spaceIcon" /> */}
                        </div>
                        <div className="text-center mt-4">
                            <p className="text-xl font-semibold text-gray-800">New Contact</p>
                            <p className="text-sm text-gray-500">Description for adding new Contact</p>
                        </div>
                    </div>
                </div>
                <div className="max-w-md bg-neutral-100 border border-sm border-neutral-200 shadow-lg rounded-lg overflow-hidden mx-4 mb-8 cursor-pointer transform transition-transform hover:scale-105"
                    onClick={() => handleCardClick('/con/template', 'update')}>
                    <div className="p-6">
                        <div className="flex items-center justify-center">
                            {/* Building Icon */}
                            <BsPersonFillExclamation fontSize={60} className='text-yellow-400' />
                        </div>
                        <div className="text-center mt-4">
                            <p className="text-xl font-semibold text-gray-800">Update Contact</p>
                            <p className="text-sm text-gray-500">Description for updating Contact</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
