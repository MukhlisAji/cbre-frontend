import React, { useEffect, useState } from 'react';
import { HiPencil } from 'react-icons/hi2';
import { IoMdArrowDropdown } from 'react-icons/io';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { RiContactsBook3Line } from 'react-icons/ri';
import { CONFIG } from '../../../config';
import { useParams } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { PROPERTYCATEGORIES, PROPERTYDETAILS } from '../../lib/const/AppContant';

export default function PropertyDetails() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [contactInformationVisible, setContactInformationVisible] = useState(true);
    const [addressInformationVisible, setAddressInformationVisible] = useState(true);
    const [sectionHeight, setSectionHeight] = useState(0);
    const [contactData, setContactData] = useState(null);
    const { id } = useParams();

    const tabs = [
        "Property",
        "Stacking Plan",
        "Property Images and Documents",
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
                                'focus:outline-none ring-white ring-opacity-60'
                            )}
                        >
                            <div className="space-y-4">
                                {tab === "Property" && (
                                    <div className="flex text-sm whitespace-nowrap p-4 space-x-4">
                                        <div className="w-64 h-screen bg-gray-100 shadow-lg">
                                            {PROPERTYCATEGORIES.map((category, index) => (
                                                <div key={index} className="mb-6">
                                                    {/* <h2 className="text-lg font-semibold px-4 a my-4">{category.title}</h2> */}
                                                    <ul className="">
                                                        {category.items.map((item, idx) => (
                                                            <li key={idx} className="flex px-4 items-center space-x-2 cursor-pointer py-2 hover:bg-gray-200">
                                                                <span className={`w-2 h-3 bg-${item.color} rounded-full`}></span>
                                                                <span className="">
                                                                    {item.label}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>

                                        <div className='w-full flex flex-col space-y-4'>
                                            {PROPERTYDETAILS.sections.map((section, index) => (
                                                <div className="w-full mx-auto bg-white shadow-md rounded-md p-4 border border-gray-200">
                                                    <div className="border-b border-green-600 pb-2 mb-4">
                                                        <h2 className="text-c-teal text-lg font-semibold">{section.title}</h2>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-y-2">
                                                        {section.fields.map((field, index) => (
                                                            <div className="flex text-sm space-x-4" key={index}>
                                                                <div className="font-semibold text-gray-800 w-2/5 truncate">{field.label}</div>
                                                                <div className="text-gray-600 w-full sm:w-2/3 truncate">{field.value ? field.value : '-'}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div class="col-span-2 mt-6">
                                                        <button class="bg-c-teal text-white py-1 px-4 text-sm rounded hover:bg-c-teal/80">Edit</button>
                                                    </div>
                                                </div>))}
                                        </div>
                                    </div>
                                )}
                                {tab === "Stocking Plan" && (
                                    <div>
                                        {/* <h2 className="text-sm font-bold mb-4">Details</h2> */}
                                        <p>No items to display.</p>
                                    </div>
                                )}
                                {tab === "Property Images and Documents" && (
                                    <div>
                                        {/* <h2 className="text-sm font-bold mb-4">Details</h2> */}
                                        <p>No items to display.</p>
                                    </div>
                                )}
                                <div>
                                    {/* <p className='text-sm'>Have a query regarding this account? <a href="#" className="text-blue-500">Click Here</a></p> */}
                                </div>
                            </div>
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div >
    );
};