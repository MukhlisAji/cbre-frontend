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
    const [accountInformationVisible, setAccountInformationVisible] = useState(false);
    const [billingAddressVisible, setBillingAddressVisible] = useState(false);
    const [shippingAddressVisible, setShippingAddressVisible] = useState(false);
    const [otherInformationVisible, setOtherInformationVisible] = useState(false);



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


            {/* Details Section */}
            {/* Details Section */}
            <div className="bg-white shadow-md p-4 rounded-md overflow-y-auto">
                <div className='border-b border-b-neutral-300 mb-4'>
                    <div className="w-14 text-md font-bold border-b-2 border-c-dark-grayish">Details</div>
                </div>
                <div className='overflow-y-auto h-[calc(100vh-380px)]' >
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
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Account Name</label>
                                            <a href="#" className="text-green-700 hover:text-c-teal text-sm">{accountData.accountName}</a>
                                        </div>
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col">
                                            <label className="text-neutral-600 text-sm mb-1">Local Account Name</label>
                                            <input type="text" value={accountData.localAccountName} className="w-full text-sm text-neutral-700" readOnly />
                                        </div>
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Phone</label>
                                            <input type="text" value={accountData.phone} className="w-full text-sm text-neutral-700" readOnly />
                                        </div>
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Fax</label>
                                            <input type="text" value={accountData.fax} className="w-full text-sm text-neutral-700" readOnly />
                                        </div>
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Website</label>
                                            <a href={`http://${accountData.website}`} className="text-green-700 hover:text-c-teal" target="_blank" rel="noopener noreferrer">{accountData.website}</a>
                                        </div>
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Status</label>
                                            <input type="text" value={accountData.status} className="w-full text-sm text-neutral-700" readOnly />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Billing Address */}
                    <div className="mb-4">
                        <div className="flex bg-neutral-100 mb-2 justify-between items-center cursor-pointer" onClick={() => toggleVisibility('billingAddress')}>
                            <h2 className="text-md font-semibold text-neutral-700">
                                <span className='text-sm'>{billingAddressVisible ? '▼' : '►'}</span> Billing Address
                            </h2>
                            <span>{billingAddressVisible ? '-' : '+'}</span>
                        </div>
                        {billingAddressVisible && (
                            <div className='ml-3 mb-6'>
                                <div className="flex flex-col gap-4">
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Street</label>
                                            <input type="text" value={accountData.billingStreet} className="w-full text-sm text-neutral-700" readOnly />
                                        </div>
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">City</label>
                                            <input type="text" value={accountData.billingCity} className="w-full text-sm text-neutral-700" readOnly />
                                        </div>
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">State</label>
                                            <input type="text" value={accountData.billingState} className="w-full text-sm text-neutral-700" readOnly />
                                        </div>
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Post Code</label>
                                            <input type="text" value={accountData.billingPostCode} className="w-full text-sm text-neutral-700" readOnly />
                                        </div>
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Country</label>
                                            <input type="text" value={accountData.billingCountry.countryName} className="w-full text-sm text-neutral-700" readOnly />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Shipping Address */}
                    <div className="mb-4">
                        <div className="flex bg-neutral-100 mb-2 justify-between items-center cursor-pointer" onClick={() => toggleVisibility('shippingAddress')}>
                            <h2 className="text-md font-semibold text-neutral-700">
                                <span className='text-sm'>{shippingAddressVisible ? '▼' : '►'}</span> Shipping Address
                            </h2>
                            <span>{shippingAddressVisible ? '-' : '+'}</span>
                        </div>
                        {shippingAddressVisible && (
                            <div className='ml-3 mb-6'>
                                <div className="flex flex-col gap-4">
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Street</label>
                                            <input type="text" value={accountData.shippingStreet} className="w-full text-sm text-neutral-700" readOnly />
                                        </div>
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">City</label>
                                            <input type="text" value={accountData.shippingCity} className="w-full text-sm text-neutral-700" readOnly />
                                        </div>
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">State</label>
                                            <input type="text" value={accountData.shippingState} className="w-full text-sm text-neutral-700" readOnly />
                                        </div>
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Post Code</label>
                                            <input type="text" value={accountData.shippingPostCode} className="w-full text-sm text-neutral-700" readOnly />
                                        </div>
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Country</label>
                                            <input type="text" value={accountData.shippingCountry.countryName} className="w-full text-sm text-neutral-700" readOnly />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
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
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Industry</label>
                                            <input type="text" value={accountData.industry} className="w-full text-sm text-neutral-700" readOnly />
                                        </div>
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Account Type</label>
                                            <input type="text" value={accountData.accountType} className="w-full text-sm text-neutral-700" readOnly />
                                        </div>
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Relationship Start Date</label>
                                            <input type="text" value={accountData.relationshipStartDate} className="w-full text-sm text-neutral-700" readOnly />
                                        </div>
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Relationship End Date</label>
                                            <input type="text" value={accountData.relationshipEndDate} className="w-full text-sm text-neutral-700" readOnly />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div >
    );
}