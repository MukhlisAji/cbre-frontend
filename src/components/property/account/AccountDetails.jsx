import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { FaRegCheckCircle } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { CONFIG_APP } from '../../map-viewer/config/app';
import { FaBuildingUser } from "react-icons/fa6";
import { PiWarningCircleLight } from 'react-icons/pi';
import { RiContactsBook3Line, RiErrorWarningFill } from 'react-icons/ri';
import { IoMdArrowDropdown } from 'react-icons/io';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { CONFIG } from '../../../config';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function AccountDetails() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const { id } = useParams(); 
    const [accountData, setAccountData] = useState(null);


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

    useEffect(() => {
        // Fetch account data based on the id parameter
        async function fetchAccountData() {
            try {
                // Replace with your API call
                const response = await fetch(`${CONFIG.ACCOUNT_SERVICE}/${id}`);
                const data = await response.json();
                setAccountData(data.resultSet);
            } catch (error) {
                console.error('Error fetching account data:', error);
            }
        }
        fetchAccountData();
    }, [id]);

    if (!accountData) {
        return <div>Loading...</div>;  // Show a loading state while data is fetched
    }

    return (
        <div className="bg-neutral-100">
            {/* Header Section */}
            <div className="bg-neutral-100 mb-4 p-4">
                <div className="flex justify-between items-center">
                    <div className='flex items-center space-x-3'>
                        <div className="p-2 rounded-md border-2 border-purple-500 bg-purple-600">
                            <RiContactsBook3Line className="text-white text-xl font-bold" />
                        </div>
                        <div>
                            <h1 className="text-xs font-normal">Account</h1>
                            <h1 className="text-lg font-semibold text-neutral-600">{accountData.accountName}</h1>
                        </div>
                    </div>

                </div>
            </div>
            <div className="flex justify-between items-center bg-white p-2 mb-4 rounded-md shadow-md">
                <div className="flex space-x-12">
                    <div className="flex flex-col p-2 ">
                        <span className="text-xs">Account Site</span>
                        <p className="text-sm font-semibold text-neutral-600">{accountData.billingCity}</p>
                    </div>
                    <div className="flex flex-col p-2 ">
                        <span className="material-icons text-xs">Phone</span>
                        <p className="text-sm font-semibold text-neutral-600">{accountData.phone}</p>
                        {/* <IoMdArrowDropdown className='ml-1 cursor-pointer active:rounded-lg active:border active:border-neutral-500' /> */}
                    </div>
                    <div className="flex flex-col p-2 ">
                        <span className="text-xs">Website</span>
                        <p className="text-sm font-semibold cursor-pointer text-green-600 hover:text-c-teal">
                            <a href={accountData.website} target="_blank" rel="noopener noreferrer" className='text-green-600 hover:text-c-teal'>
                                {accountData.website}
                            </a>
                        </p>                    </div>
                    <div className="flex flex-col p-2 ">
                        <span className="material-icons text-xs">APAC Industry Type</span>
                        <p className="text-sm font-semibold text-neutral-600">{accountData.industrialType.name}</p>
                    </div>
                    <div className="flex flex-col p-2 ">
                        <span className="material-icons text-xs">Account Status</span>
                        <div className='flex items-center'>
                            <p className="text-sm font-semibold text-neutral-600">{accountData.status} </p>
                            {accountData.status === "Active" ? (
                                <IoCheckmarkCircleOutline className='text-2xl pl-1 text-green-700' />

                            ) : (
                                <RiErrorWarningFill className='text-2xl pl-1 text-red-700' />

                            )}
                        </div>
                    </div>
                </div>
            </div>


            <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                <Tab.List className="flex space-x-1 bg-white rounded-md border-b border-neutral-300">
                    {tabs.map((tab) => (
                        <Tab
                            key={tab}
                            className={({ selected }) =>
                                classNames(
                                    'w-full  text-sm font-normal text-neutral-700 ',
                                    'focus:outline-none border-b-2',
                                    selected
                                        ? 'font-semibold border-b-2 border-c-teal'
                                        : 'text-blue-100 hover:bg-white/[0.12] border-white',
                                    'pb-1 pt-3 px-0'
                                )
                            }
                        >
                            {tab}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels className="">
                    {tabs.map((tab, idx) => (
                        <Tab.Panel
                            key={idx}
                            className={classNames(
                                'bg-white rounded-b-lg p-3 shadow-md',
                                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
                            )}
                        >
                            <div className="space-y-4">
                                {tab === "Summary" && (
                                    <div className='font-sm'>
                                        {/* <h2 className="text-sm mb-4">Summary</h2> */}
                                        <p className='text-sm'>Business Lines All Time</p>
                                    </div>
                                )}
                                {tab === "Details" && (
                                    <div>
                                        {/* <h2 className="text-sm font-bold mb-4">Details</h2> */}
                                        <p>No items to display.</p>
                                    </div>
                                )}
                                {/* Add more content for other tabs here */}
                                <div>
                                    <p className='text-sm'>Have a query regarding this account? <a href="#" className="text-blue-500">Click Here</a></p>
                                </div>
                            </div>
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}