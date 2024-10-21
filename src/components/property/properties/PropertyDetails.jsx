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
import DocumentList from './property-detail/Document-Images/DocumentList';
import axios from 'axios';
import StockingPlanInfo from './property-detail/Stocking-Plan/StockingPlanInfo';

export default function PropertyDetails() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [contactInformationVisible, setContactInformationVisible] = useState(true);
    const [addressInformationVisible, setAddressInformationVisible] = useState(true);
    const [sectionHeight, setSectionHeight] = useState(0);
    const [contactData, setContactData] = useState(null);
    const [propertyInfo, setPropertyInfo] = useState(null);
    const { id } = useParams();

    const tabs = [
        "Property",
        "Stacking Plan",
        "Property Images and Documents",
    ];

    useEffect(() => {
        const fetchPropertyInfo = async () => {
            try {
                const response = await axios.get(`${CONFIG.PROPERTY_SERVICE}/${id}`, {
                    headers: {
                        transactionId: '4646765766',
                    },
                });
                setPropertyInfo(response.data.resultSet.propertyInformation);
                console.log('property info ', response.data.resultSet.propertyInformation);
            } catch (error) {
                console.error('Error fetching property info:', error);
            }
        };

        fetchPropertyInfo();
    }, []);

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

    if (!propertyInfo || !propertyInfo.basicInformation || !propertyInfo.generalInformation) {
        return <div className='p-4'>Loading...</div>; // You can display a loading indicator or a message
    }

    return (
        <div className="bg-neutral-100">
            {/* Header Section */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                <div className="grid grid-cols-12 gap-6 items-start">

                    {/* Left Section - Property Image */}
                    <div className="col-span-2 h-40 bg-gray-200 flex items-center justify-center rounded-md overflow-hidden">
                        <span className="text-gray-500">Property Image</span>
                    </div>

                    {/* Middle Section - Property Details */}
                    <div className="col-span-4 space-y-2">
                        <h1 className="text-xl font-semibold text-gray-800">{propertyInfo.basicInformation.buildingName}</h1>
                        <p className="text-sm text-gray-600">
                            {`${propertyInfo.basicInformation.streetNumber} ${propertyInfo.basicInformation.streetName}, Singapore ${propertyInfo.basicInformation.postalCode}`}
                        </p>
                        <p className="text-sm text-gray-600">{propertyInfo.basicInformation.micromarket}</p>
                        <p className="text-sm text-gray-600">{propertyInfo.basicInformation.zoning}</p>
                        <p className="text-sm text-gray-600">
                            Typical Floor Area: {propertyInfo.generalInformation.areaBreakdown || "N/A"}
                        </p>
                    </div>

                    {/* Right Section - Additional Info */}
                    <div className="col-span-3 space-y-2">
                        <p className="text-sm font-bold text-gray-600">
                            TOP Date: <span className="font-normal">{propertyInfo.generalInformation.termsTopDate}</span>
                        </p>

                        <p className="text-sm font-bold text-gray-600">
                            No. of Floors: <span className="font-normal">{propertyInfo.generalInformation.noOfFloorAboveGround || "N/A"}</span>
                        </p>

                        <p className="text-sm font-bold text-gray-600">Public Transportation:</p>
                        <p className="font-normal text-sm text-gray-600">-</p>

                        <p className="text-sm font-bold text-gray-600">Property Description:</p>
                        <p className="font-normal text-sm text-gray-600">-</p>
                    </div>

                    {/* NLA, Vacancy, Occupancy Section */}
                    <div className="col-span-3 space-y-2">
                        <div className="space-y-2">
                            <p className="text-sm font-bold text-gray-600">NLA</p>
                            <p className="text-sm text-gray-600">Office: {propertyInfo.generalInformation.netLettableArea || "N/A"} SF</p>
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm font-bold text-gray-600">Vacancy</p>
                            <p className="text-sm text-gray-600">Office: XX.XX% | XXXXX.XX SF</p>
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm font-bold text-gray-600">Occupancy</p>
                            <p className="text-sm text-gray-600">Office: XX.XX% | XXXXX.XX SF</p>
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
                <div className="overflow-y-auto h-[calc(100vh-400px)]">

                    <Tab.Panels className="">
                        {tabs.map((tab, idx) => (
                            <Tab.Panel
                                key={idx}
                                className={classNames(
                                    'bg-white rounded-b-lg p-2 shadow-md',
                                    'focus:outline-none ring-white ring-opacity-60'
                                )}
                            >
                                <div>
                                    {tab === "Property" && (
                                        <PropertyInfo propertyInfo={propertyInfo} id={id} />
                                    )}
                                    {tab === "Stacking Plan" && (
                                        <div>
                                            <StockingPlanInfo />
                                        </div>
                                    )}
                                    {tab === "Property Images and Documents" && (
                                        <div>
                                            {/* <h2 className="text-sm font-bold mb-4">Details</h2> */}
                                            <DocumentList />
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