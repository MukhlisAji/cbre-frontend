import React, { useEffect, useState } from 'react';
import { HiPencil } from 'react-icons/hi2';
import { IoMdArrowDropdown } from 'react-icons/io';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { RiContactsBook3Line } from 'react-icons/ri';
import { CONFIG } from '../../../config';
import { useParams } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import classNames from 'classnames';

export default function PropertyDetails() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [contactInformationVisible, setContactInformationVisible] = useState(true);
    const [addressInformationVisible, setAddressInformationVisible] = useState(true);
    const [sectionHeight, setSectionHeight] = useState(0);
    const [contactData, setContactData] = useState(null);
    const { id } = useParams();

    const tabs = [
        "Basic",
        "Details",
        "Stacking Plan",
        "Space Detail",
        "Property Accounts and Contacts",
        "Property Images and Documents",
        "Notificaaation Log",
    ];

    const toggleVisibility = (section) => {
        switch (section) {
            case 'contactInformation':
                setContactInformationVisible(!contactInformationVisible);
                break;
            case 'addressInformation':
                setAddressInformationVisible(!addressInformationVisible);
                break;
            default:
                console.log(`Section '${section}' not handled`);
                break;
        }
    };

    // if (!contactData) {
    //     return <div>Loading...</div>;  // Show a loading state while data is fetched
    // }

    return (
        <div className="bg-neutral-100">
            {/* Header Section */}
            <div className="bg-neutral-100 mb-4">
                <div className="flex justify-between items-center">
                    <div className='flex items-center space-x-3'>
                        <div className="p-2 rounded-md border-2 border-purple-500 bg-purple-600">
                            <RiContactsBook3Line className="text-white text-xl font-bold" />
                        </div>
                        <div>
                            <h1 className="text-xs font-normal">Building Name</h1>
                            <h1 className="text-lg font-bold text-neutral-700">Building Address</h1>
                        </div>
                    </div>

                </div>
            </div>
            {/* <div className="flex justify-between items-center bg-white p-2 mb-4 rounded-md shadow-md">
                <div className="flex space-x-12">
                    <div className="flex flex-col p-2 ">
                        <span className="text-xs">{contactData.title}</span>
                    </div>
                    <div className="flex flex-col p-2 ">
                        <span className="text-xs">Account Name</span>
                        <p className="text-sm cursor-pointer text-green-700 hover:text-c-teal">{contactData.accountContact.accountName}</p>
                    </div>
                    <div className="flex p-2 ">
                        <span className="material-icons text-xs">{contactData.businessPhone}</span>
                        <IoMdArrowDropdown className='ml-1 cursor-pointer active:rounded-lg active:border active:border-neutral-500' />
                    </div>
                    <div className="flex flex-col p-2 ">
                        <span className="text-xs">Email</span>
                        <p href="mailto:k.singamsetty@xactdata.com.test" className="text-green-700 hover:text-c-teal text-sm">{contactData.email}</p>
                    </div>
                    <div className="flex flex-col p-2 ">
                        <span className="material-icons text-xs">linkedin</span>
                        <p className="text-sm">{contactData.linkedin}</p>
                    </div>
                    <div className="flex flex-col p-2 ">
                        <span className="material-icons text-xs">Contact Status</span>
                        <div className='flex items-center'>
                            <p className="text-sm">{contactData.status}</p>
                            <IoCheckmarkCircleOutline className='text-2xl pl-1 text-green-700' />
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Details Section */}
            <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                <Tab.List className="flex space-x-1 bg-white rounded-md border-b border-neutral-300">
                    {tabs.map((tab) => (
                        <Tab
                            key={tab}
                            className={({ selected }) =>
                                classNames(
                                    'w-full text-sm font-normal text-neutral-700 ',
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
                                {tab === "Basic" && (
                                    <div className="text-sm p-4">
                                        <h2 className="text-lg font-bold mb-4">Basic Information</h2>
                                        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                            {/* Basic Information Fields */}
                                            <div className="flex justify-between">
                                                <span className="font-semibold">Region-Micromarket</span>
                                                <span>Region 1</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-semibold">Property Address</span>
                                                <span>Address</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-semibold">Property Description</span>
                                                <span>Description</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-semibold">Public Transportation</span>
                                                <span>MRT</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-semibold">Zoning</span>
                                                <span>Business 1</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-semibold">No. of Floors</span>
                                                <span>10</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-semibold">Total NLA</span>
                                                <span>5000 SqFt</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-semibold">Typical Floor Area (min-max)</span>
                                                <span>200-400 SqFt</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-semibold">TOP Date</span>
                                                <span>01/01/2021</span>
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <hr className="my-4 border-t border-neutral-300" />

                                        <h2 className="text-lg font-bold mb-4">Specifications</h2>
                                        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                            {/* Specifications Fields */}
                                            <div className="flex justify-between">
                                                <span className="font-semibold">A/C System</span>
                                                <span>Central</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-semibold">Floor to Ceiling Height</span>
                                                <span>3 meters</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-semibold">Floor System</span>
                                                <span>Raised</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-semibold">Floor Loading</span>
                                                <span>5 KN/Sqm</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-semibold">Elevator</span>
                                                <span>3 elevators</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-semibold">Service Charge</span>
                                                <span>$2 per SqFt</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-semibold">Landlord Provision</span>
                                                <span>Yes</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-semibold">Green Mark</span>
                                                <span>Platinum</span>
                                            </div>
                                        </div>
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
        </div >
    );
};