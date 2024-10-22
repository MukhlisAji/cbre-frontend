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
    const [accountInformationVisible, setAccountInformationVisible] = useState(true);
    const [billingAddressVisible, setBillingAddressVisible] = useState(true);
    const [shippingAddressVisible, setShippingAddressVisible] = useState(true);
    const [otherInformationVisible, setOtherInformationVisible] = useState(true);



    const tabs = [
        "Details",
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

    const toggleVisibility = (section) => {
        switch (section) {
            case 'accountInformation':
                setAccountInformationVisible((prev) => !prev);
                break;
            case 'billingAddress':
                setBillingAddressVisible((prev) => !prev);
                break;
            case 'shippingAddress':
                setShippingAddressVisible((prev) => !prev);
                break;
            case 'otherInformation':
                setOtherInformationVisible((prev) => !prev);
                break;
            default:
                console.log(`Section '${section}' not handled`);
                break;
        }
    };


    if (!accountData) {
        return <div style={{ height: `calc(100vh - 200px)` }} className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-c-teal"></div>
        </div>
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


            {/* Details Section */}
            <div className="bg-white shadow-md p-4 rounded-md overflow-y-auto">
                <div className='border-b border-b-neutral-300 mb-4'>
                    <div className="w-14 text-md font-bold border-b-2 border-c-dark-grayish">Details</div>
                </div>
                <div className='overflow-y-auto h-[calc(100vh-380px)]'>
                    {/* Account Information */}
                    <div className="mb-4">
                        <div className="flex bg-neutral-100 mb-2 justify-between items-center cursor-pointer" onClick={() => toggleVisibility('accountInformation')}>
                            <h2 className="text-md font-semibold text-neutral-700">
                                <span className='text-sm'>{accountInformationVisible ? '▼' : '►'}</span> Account Information
                            </h2>
                            <span>{accountInformationVisible ? '-' : '+'}</span>
                        </div>
                        {accountInformationVisible && (
                            <div className='ml-3 mb-6'>
                                <div className="grid grid-cols-2 gap-y-2 md:gap-x-12 mb-4 mr-4">
                                    {[
                                        { label: 'Account Name', value: accountData.accountName },
                                        { label: 'Local Account Name', value: accountData.localAccountName },
                                        { label: 'Phone', value: accountData.phone },
                                        { label: 'Fax', value: accountData.fax },
                                        { label: 'Website', value: accountData.website, isLink: true },
                                        { label: 'Status', value: accountData.status }
                                    ].map((item, index) => (
                                        item.value && (
                                            <div key={index} className="flex justify-between border-b pb-1">
                                                <div className="flex flex-col mt-auto">
                                                    <label className="text-neutral-600 text-sm mb-1">{item.label}</label>
                                                    {item.isLink ? (
                                                        <a href={`http://${item.value}`} className="text-green-700 hover:text-c-teal" target="_blank" rel="noopener noreferrer">{item.value}</a>
                                                    ) : (
                                                        <input type="text" value={item.value} className="text-green-700 w-full hover:text-c-teal text-sm" readOnly />
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Address Section */}
                    <div className="flex space-x-4 mb-4">
                        {/* Billing Address */}
                        <div className="flex-1">
                            <div className="flex bg-neutral-100 mb-2 justify-between items-center cursor-pointer" onClick={() => toggleVisibility('billingAddress')}>
                                <h2 className="text-md font-semibold text-neutral-700">
                                    <span className='text-sm'>{billingAddressVisible ? '▼' : '►'}</span> Billing Address
                                </h2>
                                <span>{billingAddressVisible ? '-' : '+'}</span>
                            </div>
                            {billingAddressVisible && (
                                <div className='ml-3 mb-6'>
                                    <div className="flex flex-col gap-4">
                                        {[
                                            { label: 'Street', value: accountData.billingStreet },
                                            { label: 'City', value: accountData.billingCity },
                                            { label: 'State', value: accountData.billingState },
                                            { label: 'Post Code', value: accountData.billingPostCode },
                                            { label: 'Country', value: accountData.billingCountry?.countryName }
                                        ].map((item, index) => (
                                            item.value && (
                                                <div key={index} className="flex justify-between border-b pb-1">
                                                    <div className="flex flex-col mt-auto">
                                                        <label className="text-neutral-600 text-sm mb-1">{item.label}</label>
                                                        <input type="text" value={item.value} className="w-full text-sm text-neutral-700" readOnly />
                                                    </div>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Shipping Address */}
                        <div className="flex-1">
                            <div className="flex bg-neutral-100 mb-2 justify-between items-center cursor-pointer" onClick={() => toggleVisibility('shippingAddress')}>
                                <h2 className="text-md font-semibold text-neutral-700">
                                    <span className='text-sm'>{shippingAddressVisible ? '▼' : '►'}</span> Shipping Address
                                </h2>
                                <span>{shippingAddressVisible ? '-' : '+'}</span>
                            </div>
                            {shippingAddressVisible && (
                                <div className='ml-3 mb-6'>
                                    <div className="flex flex-col gap-4">
                                        {[
                                            { label: 'Street', value: accountData.shippingStreet },
                                            { label: 'City', value: accountData.shippingCity },
                                            { label: 'State', value: accountData.shippingState },
                                            { label: 'Post Code', value: accountData.shippingPostCode },
                                            { label: 'Country', value: accountData.shippingCountry?.countryName }
                                        ].map((item, index) => (
                                            item.value && (
                                                <div key={index} className="flex justify-between border-b pb-1">
                                                    <div className="flex flex-col mt-auto">
                                                        <label className="text-neutral-600 text-sm mb-1">{item.label}</label>
                                                        <input type="text" value={item.value} className="w-full text-sm text-neutral-700" readOnly />
                                                    </div>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Other Information */}
                    <div className="mb-4">
                        <div className="flex bg-neutral-100 mb-2 justify-between items-center cursor-pointer" onClick={() => toggleVisibility('otherInformation')}>
                            <h2 className="text-md font-semibold text-neutral-700">
                                <span className='text-sm'>{otherInformationVisible ? '▼' : '►'}</span> Other Information
                            </h2>
                            <span>{otherInformationVisible ? '-' : '+'}</span>
                        </div>
                        {otherInformationVisible && (
                            <div className='ml-3 mb-6'>
                                <div className="flex flex-col gap-4">
                                    {[
                                        { label: 'Industry', value: accountData.industry },
                                        { label: 'Account Type', value: accountData.accountType },
                                        { label: 'Relationship Start Date', value: accountData.relationshipStartDate },
                                        { label: 'Relationship End Date', value: accountData.relationshipEndDate }
                                    ].some(item => item.value) ? ( // Check if at least one value is not empty
                                        // Render the details if at least one value exists
                                        <>
                                            {[
                                                { label: 'Industry', value: accountData.industry },
                                                { label: 'Account Type', value: accountData.accountType },
                                                { label: 'Relationship Start Date', value: accountData.relationshipStartDate },
                                                { label: 'Relationship End Date', value: accountData.relationshipEndDate }
                                            ].map((item, index) => (
                                                item.value && ( // Only render items with values
                                                    <div key={index} className="flex justify-between border-b pb-1">
                                                        <div className="flex flex-col mt-auto">
                                                            <label className="text-neutral-600 text-sm mb-1">{item.label}</label>
                                                            <input type="text" value={item.value} className="w-full text-sm text-neutral-700" readOnly />
                                                        </div>
                                                    </div>
                                                )
                                            ))}
                                        </>
                                    ) : (
                                        // Render "No Information Available" if all values are empty
                                        <div className="text-neutral-500 text-sm">No Information Available</div>
                                    )}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>

        </div >
    );
}