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
import PropertyInfo from './property-detail/PropertyInfo';

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
                <div className="overflow-y-auto h-[calc(100vh-230px)]">

                    <Tab.Panels className="">
                        {tabs.map((tab, idx) => (
                            <Tab.Panel
                                key={idx}
                                className={classNames(
                                    'bg-white rounded-b-lg p-2 shadow-md',
                                    'focus:outline-none ring-white ring-opacity-60'
                                )}
                            >
                                <div className="space-y-4">
                                    {tab === "Property" && (

                                        <PropertyInfo />

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
                                    </div>
                                </div>
                            </Tab.Panel>
                        ))}
                    </Tab.Panels>
                </div>
            </Tab.Group>
        </div >
    );
};