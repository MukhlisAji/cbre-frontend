import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { FaRegCheckCircle } from "react-icons/fa";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function AccountDetails(){
    const [selectedIndex, setSelectedIndex] = useState(0);

    const tabs = [
        "Summary",
        "Details",
        "Locations & Hierarchy",
        "Contacts",
        "Opportunities & Comps",
        "Enquiry & Offers",
        "Other Related",
        "Portfolio",
    ];

    return (
        <div className="p-6">
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <div className="flex items-center mb-4">
                    <div className="p-4 bg-blue-600 text-white rounded-full">
                        <span className="text-2xl font-bold">A</span>
                    </div>
                    <div className="ml-4">
                        <h1 className="text-2xl font-bold">cbretest</h1>
                        <p className="text-gray-500">Account Site: South Woodlands Drive, Singapore, Singapore</p>
                        <p className="text-gray-500">Phone: 62248181</p>
                        <p className="text-gray-500">Website: <a href="http://www.cbre.com" className="text-blue-500">www.cbre.com</a></p>
                        <p className="text-gray-500">APAC Industry Type: Accommodation</p>
                        <p className="text-gray-500 flex items-center">
                            Account Status: Active <FaRegCheckCircle className="ml-2 h-5 w-5 text-green-500" />
                        </p>
                    </div>
                </div>
            </div>

            <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                <Tab.List className="flex p-1 space-x-1 bg-gray-200 rounded-lg">
                    {tabs.map((tab) => (
                        <Tab
                            key={tab}
                            className={({ selected }) =>
                                classNames(
                                    'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                                    selected
                                        ? 'bg-white shadow'
                                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                )
                            }
                        >
                            {tab}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels className="mt-2">
                    {tabs.map((tab, idx) => (
                        <Tab.Panel
                            key={idx}
                            className={classNames(
                                'bg-white rounded-xl p-3',
                                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
                            )}
                        >
                            <div className="space-y-4">
                                {tab === "Summary" && (
                                    <div>
                                        <h2 className="text-xl font-bold mb-4">Summary</h2>
                                        <p>Active Currently: 0</p>
                                        <p>Won Last 12 Months: 0</p>
                                        <p>Lost Last 12 Months: 0</p>
                                        <p>Business Lines All Time</p>
                                    </div>
                                )}
                                {tab === "Details" && (
                                    <div>
                                        <h2 className="text-xl font-bold mb-4">Details</h2>
                                        <p>No items to display.</p>
                                    </div>
                                )}
                                {/* Add more content for other tabs here */}
                                <div>
                                    <p>Have a query regarding this account? <a href="#" className="text-blue-500">Click Here</a></p>
                                </div>
                            </div>
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};
