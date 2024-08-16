import React, { useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';

export default function DetailedView({ building, onClose }) {
    const [activeTab, setActiveTab] = useState('Details');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Details':
                return (
                    <div className="p-2 text-sm text-gray-700 space-y-2">
                        <div className="flex justify-between">
                            <span className="font-semibold">Floor:</span>
                            <span>01</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Space Name:</span>
                            <span>Entire</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Space Status:</span>
                            <span>For Sale</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Possession Status:</span>
                            <span>Vacant</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Space Size:</span>
                            <span>28,656 sq ft</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Tenant Name:</span>
                            <span>Rent</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Lease Type:</span>
                            <span>Negotiator</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Commencement:</span>
                            <span>Immediate</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Expiry:</span>
                            <span>Landlord</span>
                        </div>
                    </div>
                );
            case 'Availability':
                return (
                    <div className="p-2 text-sm text-gray-700 space-y-2">
                        <div className="flex justify-between">
                            <span className="font-semibold">Available Spaces:</span>
                            <span>{building.SPACE_COUNT}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Next Availability:</span>
                            <span>Immediate</span>
                        </div>
                    </div>
                );
            case 'Tenant Stack':
                return (
                    <div className="p-2 text-sm text-gray-700 space-y-2">
                        <div className="flex justify-between">
                            <span className="font-semibold">Tenant 1:</span>
                            <span>ABC Corp</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Tenant 2:</span>
                            <span>XYZ Ltd</span>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="fixed right-0 top-0 w-1/5 h-full translate-y-12 bg-white shadow-md z-10">
            <div className="px-4 py-2 flex justify-between items-center bg-neutral-100">
                <h2 className="text-sm font-semibold text-neutral-700">{building.BUILDINGNAME}</h2>
                <div
                    onClick={onClose}
                    className='absolute right-2 top-2 cursor-pointer'>
                    <RiCloseLine className='text-lg' />
                </div>
            </div>
            <p className='p-2 px-4 text-neutral-700 text-sm'>{building.BUILDINGNAME}</p>
            <img
                src="https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Building"
                className="w-full h-32 object-cover"
            />
            <div className="flex justify-around border-b">
                <button
                    className={`p-2 text-neutral-500 text-sm ${activeTab === 'Details' ? 'border-b-2 border-black text-neutral-700' : ''}`}
                    onClick={() => setActiveTab('Details')}
                >
                    Details
                </button>
                <button
                    className={`p-2 text-neutral-500 text-sm ${activeTab === 'Availability' ? 'border-b-2 border-black text-neutral-700' : ''}`}
                    onClick={() => setActiveTab('Availability')}
                >
                    Availability ({building.SPACE_COUNT})
                </button>
                <button
                    className={`p-2 text-neutral-500 text-sm ${activeTab === 'Tenant Stack' ? 'border-b-2 border-black text-neutral-700' : ''}`}
                    onClick={() => setActiveTab('Tenant Stack')}
                >
                    Tenant Stack
                </button>
            </div>
            <div className="bg-gray-100 px-4 rounded-md h-full">
                {renderTabContent()}
            </div>
        </div>
    );
}
