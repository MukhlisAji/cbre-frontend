import React, { useState, useEffect, useRef } from 'react';
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
import { generateTransactionId } from '../../lib/api/Authorization';
import { MdContactPhone } from 'react-icons/md';

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
    const [segmentationVisible, setSegmentationVisible] = useState(true);
    const [additionalInformationVisible, setAdditionalInformationVisible] = useState(true);
    const [systemInformationVisible, setSystemInformationVisible] = useState(false);
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [parentAccountInfo, setParentAccountInfo] = useState('');
    const tooltipRef = useRef(null); // Create a ref for the tooltip
    const buttonRef = useRef(null);
    // useEffect(() => {
    const fetchParentAccountInfo = async () => {
        const parentId = accountData.parentAccount?.id;
        if (parentId) {
            try {
                const response = await fetch(`${CONFIG.ACCOUNT_SERVICE}/${parentId}`);
                const data = await response.json();
                console.log('Fetched account data:', data.resultSet); // Changed console.error to console.log for successful fetch
                setParentAccountInfo(data.resultSet);
            } catch (error) {
                console.error('Error fetching account data:', error);
            }
        }
    };

    // Call the function to fetch data
    //     fetchParentAccountInfo();
    // }, [accountData]); // Empty dependency array to run only on component mount

    const handleParentAccountClick = () => {
        setTooltipVisible(true);
        fetchParentAccountInfo();
    };


    const handleClickOutside = (e) => {
        if (
            tooltipVisible &&
            tooltipRef.current &&
            !tooltipRef.current.contains(e.target) &&
            buttonRef.current &&
            !buttonRef.current.contains(e.target)
        ) {
            setTooltipVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [tooltipVisible]);

    // Tooltip positioning style
    const tooltipStyle = {};
    if (tooltipVisible && buttonRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        
        // Only calculate tooltip position if tooltipRef is available
        if (tooltipRef.current) {
            tooltipStyle.top = `${buttonRect.top - tooltipRef.current.offsetHeight}px`; // Position above
            tooltipStyle.left = `${buttonRect.left + buttonRect.width / 2 - tooltipRef.current.offsetWidth / 2}px`; // Center above the button
        }
    }

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
            case 'segmentation':
                setSegmentationVisible((prev) => !prev);
                break;
            case 'additionalInformation':
                setAdditionalInformationVisible((prev) => !prev);
                break;
            case 'systemInformation':
                setSystemInformationVisible((prev) => !prev);
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
                        <p className="text-sm font-semibold text-neutral-600">{accountData.accountSite || "-"}</p>
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
                                        { label: 'Account Name', value: accountData.accountName || '-' },
                                        { label: 'Local Account Name', value: accountData.localAccountName || '-' },
                                        { label: 'Phone', value: accountData.phone || '-' },
                                        { label: 'Fax', value: accountData.fax || '-' },
                                        { label: 'Website', value: accountData.website || '-', isLink: true },
                                        { label: 'Status', value: accountData.status || '-' },
                                        {
                                            label: 'Parent Account',
                                            value: accountData.parentAccount?.name || '-',
                                            isLink: true,
                                            onClick: handleParentAccountClick,
                                            ref: buttonRef
                                        },
                                        { label: 'Client Type', value: (accountData.clientType.length > 0 ? accountData.clientType.map(type => type.name).join(', ') : '-') || '-' }
                                    ].map((item, index) => (
                                        <div key={index} className="flex justify-between border-b pb-1">
                                            <div ref={item.label === 'Parent Account' ? buttonRef : null} className="flex w-full flex-col mt-auto">
                                                <label className="text-neutral-600 text-sm mb-1">{item.label}</label>
                                                {item.isLink ? (
                                                    <input
                                                        // ref={item.ref}
                                                        onClick={item.onClick} // Call the click handler
                                                        type="text"
                                                        value={item.value}
                                                        className="text-green-700 w-full cursor-pointer focus:outline-none border-none hover:text-c-teal text-sm"
                                                        readOnly
                                                    />
                                                ) : (
                                                    <input
                                                        type="text"
                                                        value={item.value}
                                                        className="text-green-700 w-full hover:text-c-teal text-sm"
                                                        readOnly
                                                    />
                                                )}

                                            </div>
                                        </div>

                                    ))}
                                    {tooltipVisible && (
                                        <div
                                            ref={tooltipRef}
                                            role="tooltip"
                                            aria-live="polite"
                                            style={tooltipStyle} // Apply dynamic styles
                                            className="tooltip absolute h-auto w-auto bg-white border border-gray-300 rounded-md shadow-lg z-10"
                                        >                                            
                                        {!parentAccountInfo ? (
                                            <div className="p-4 h-52 w-96 flex items-center justify-center">
                                                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-c-teal"></div>

                                            </div>
                                        ) : (
                                            <div className='h-52 w-96'>
                                                <div className='px-4 py-2 flex bg-neutral-100 items-center space-x-3'>
                                                    <div className="p-2 rounded-md border-2 border-purple-500 bg-purple-600">
                                                        <RiContactsBook3Line className="text-white text-lg font-bold" />
                                                    </div>
                                                    <div>
                                                        <h1 className="text-lg font-semibold text-neutral-600">
                                                            {parentAccountInfo.accountName || '-'}
                                                        </h1>
                                                    </div>
                                                </div>

                                                <div className="p-4 grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <div className="rounded-md">
                                                            <p className="text-xs text-gray-600"><strong>Account Site:</strong></p>
                                                            <p className="text-xs text-gray-600">{parentAccountInfo.accountSite || '-'}</p>
                                                        </div>
                                                        <div className="rounded-md">
                                                            <p className="text-xs text-gray-600"><strong>Phone:</strong></p>
                                                            <p className="text-xs text-gray-600">{parentAccountInfo.phone || '-'}</p>
                                                        </div>
                                                        <div className="rounded-md">
                                                            <p className="text-xs text-gray-600"><strong>APAC Industry Type:</strong></p>
                                                            <p className="text-xs text-gray-600">{parentAccountInfo.industrialType?.name || '-'}</p>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <div className="rounded-md">
                                                            <p className="text-xs text-gray-600"><strong>Website:</strong></p>
                                                            {parentAccountInfo.website ? (
                                                                <p className="text-xs text-gray-600">
                                                                    <a
                                                                        href={parentAccountInfo.website}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="text-c-teal hover:underline"
                                                                    >
                                                                        {parentAccountInfo.website}
                                                                    </a>
                                                                </p>
                                                            ) : (
                                                                <p className="text-xs text-gray-600">-</p>
                                                            )}
                                                        </div>
                                                        <div className="rounded-md">
                                                            <p className="text-xs text-gray-600"><strong>Address:</strong></p>
                                                            <p className="text-xs text-gray-600">
                                                                {parentAccountInfo.billingStreet || '-'}, {parentAccountInfo.billingCity || '-'},
                                                                {parentAccountInfo.billingState || '-'}, {parentAccountInfo.billingPostCode || '-'}
                                                            </p>
                                                        </div>
                                                        <div className="rounded-md">
                                                            <p className="text-xs text-gray-600"><strong>Status:</strong></p>
                                                            <p className="text-xs text-gray-600">{parentAccountInfo.status || '-'}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        </div>
                                    )}



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
                                            { label: 'Street', value: accountData.billingStreet || '-' },
                                            { label: 'City', value: accountData.billingCity || '-' },
                                            { label: 'State', value: accountData.billingState || '-' },
                                            { label: 'Post Code', value: accountData.billingPostCode || '-' },
                                            { label: 'Country', value: accountData.billingCountry?.countryName || '-' }
                                        ].map((item, index) => (
                                            <div key={index} className="flex justify-between border-b pb-1">
                                                <div className="flex flex-col mt-auto">
                                                    <label className="text-neutral-600 text-sm mb-1">{item.label}</label>
                                                    <input type="text" value={item.value} className="w-full text-sm text-neutral-700" readOnly />
                                                </div>
                                            </div>
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
                                            { label: 'Street', value: accountData.shippingStreet || '-' },
                                            { label: 'City', value: accountData.shippingCity || '-' },
                                            { label: 'State', value: accountData.shippingState || '-' },
                                            { label: 'Post Code', value: accountData.shippingPostCode || '-' },
                                            { label: 'Country', value: accountData.shippingCountry?.countryName || '-' }
                                        ].map((item, index) => (
                                            <div key={index} className="flex justify-between border-b pb-1">
                                                <div className="flex flex-col mt-auto">
                                                    <label className="text-neutral-600 text-sm mb-1">{item.label}</label>
                                                    <input type="text" value={item.value} className="w-full text-sm text-neutral-700" readOnly />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Segmentation Section */}
                    <div className="mb-4">
                        <div className="flex bg-neutral-100 mb-2 justify-between items-center cursor-pointer" onClick={() => toggleVisibility('segmentation')}>
                            <h2 className="text-md font-semibold text-neutral-700">
                                <span className='text-sm'>{segmentationVisible ? '▼' : '►'}</span> Segmentation
                            </h2>
                            <span>{segmentationVisible ? '-' : '+'}</span>
                        </div>
                        {segmentationVisible && (
                            <div className='ml-3 mb-6'>
                                <div className="flex flex-col gap-4">
                                    {[
                                        { label: 'Industrial Type', value: accountData.industrialType?.name || '-' },
                                        { label: 'Sub Industry', value: accountData.subIndustrial?.name || '-' },
                                        { label: 'Headquarter Country', value: accountData.headQuarter?.countryName || '-' },
                                        { label: 'Commercial Number', value: accountData.commercialNumber || '-' }
                                    ].map((item, index) => (
                                        <div key={index} className="flex justify-between border-b pb-1">
                                            <div className="flex flex-col mt-auto">
                                                <label className="text-neutral-600 text-sm mb-1">{item.label}</label>
                                                <input type="text" value={item.value} className="w-full text-sm text-neutral-700" readOnly />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        )}
                    </div>

                    {/* Additional Information Section */}
                    <div className="mb-4">
                        <div className="flex bg-neutral-100 mb-2 justify-between items-center cursor-pointer" onClick={() => toggleVisibility('additionalInformation')}>
                            <h2 className="text-md font-semibold text-neutral-700">
                                <span className='text-sm'>{additionalInformationVisible ? '▼' : '►'}</span> Additional Information
                            </h2>
                            <span>{additionalInformationVisible ? '-' : '+'}</span>
                        </div>
                        {additionalInformationVisible && (
                            <div className='ml-3 mb-6'>
                                <div className="flex flex-col gap-4">
                                    {[
                                        { label: 'Tax Type', value: accountData.taxType || '-' },
                                        { label: 'Tax ID', value: accountData.taxId || '-' },
                                        { label: 'Description', value: accountData.description || '-' }
                                    ].map((item, index) => (
                                        <div key={index} className="flex justify-between border-b pb-1">
                                            <div className="flex flex-col mt-auto">
                                                <label className="text-neutral-600 text-sm mb-1">{item.label}</label>
                                                <input type="text" value={item.value} className="w-full text-sm text-neutral-700" readOnly />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        )}
                    </div>
                    {/* System Information Section */}
                    <div className="mb-4">
                        <div className="flex bg-neutral-100 mb-2 justify-between items-center cursor-pointer" onClick={() => toggleVisibility('systemInformation')}>
                            <h2 className="text-md font-semibold text-neutral-700">
                                <span className='text-sm'>{systemInformationVisible ? '▼' : '►'}</span> System Information
                            </h2>
                            <span>{systemInformationVisible ? '-' : '+'}</span>
                        </div>
                        {systemInformationVisible && (
                            <div className='ml-3 mb-6'>
                                <div className="flex flex-col gap-4">
                                    {[
                                        { label: 'Account Owner', value: accountData.accountOwner.length > 0 ? accountData.accountOwner[0].employee?.givenName + ' ' + accountData.accountOwner[0].employee?.surName : '-' },
                                        { label: 'Created By', value: accountData.createdBy || '-' },
                                        { label: 'Created Date', value: accountData.createdDate || '-' },
                                        { label: 'Last Modified By', value: accountData.modifiedBy || '-' },
                                        { label: 'Last Modified Date', value: accountData.modifiedDate || '-' },
                                        { label: 'Status', value: accountData.status || '-' },
                                        { label: 'Inactivation Date', value: accountData.inactivationDate || '-' },
                                        { label: 'Reason for Inactivating', value: accountData.reasonForInactivating || '-' }
                                    ].map((item, index) => (
                                        <div key={index} className="flex justify-between border-b pb-1">
                                            <div className="flex flex-col mt-auto">
                                                <label className="text-neutral-600 text-sm mb-1">{item.label}</label>
                                                <input type="text" value={item.value} className="w-full text-sm text-neutral-700" readOnly />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        )}
                    </div>
                </div>
            </div >

        </div >
    );
}