import React from 'react';
import CustomTableMUI from '../CustomTableMUI';
import { ACCOUNTCOLUMNDUMMY, ACCOUNTDATADUMMY } from '../../lib/const/DummyData';
import { HiBuildingOffice2 } from "react-icons/hi2";
import { MdAccountBox } from 'react-icons/md';
import { SlPeople } from "react-icons/sl";
import { RiContactsBookLine } from "react-icons/ri";
import { FaCrown } from 'react-icons/fa';

export default function DefaultResult() {
    const firstFiveAccounts = ACCOUNTDATADUMMY.slice(0, 5);

    return (
        <div className='bg-neutral-200'>
            <div className="rounded-md border bg-neutral-100 shadow-md mb-4">
                {/* Header Section */}
                <div className="flex px-4 justify-between items-center p-2">
                    <div className="flex items-center bg-neutral-100">
                        <div className="bg-blue-800 text-white rounded-full w-8 h-8 flex items-center justify-center">
                            <HiBuildingOffice2 />
                        </div>
                        <div className="ml-4">
                            <h2 className="text-lg font-semibold text-c-teal">test_lowyun</h2>
                            <span className="text-xs text-neutral-700 "><span className='font-semibold italic'>Recommended Result · </span>Account</span>
                        </div>
                    </div>
                    <div className="flex text-neutral-600 bg-neutral-100 mt-auto">
                        <button className="bg-gray-200 text-xs font-normal px-2 py-1 rounded-sm border border-neutral-400 mr-2 hover:bg-gray-300">+ Follow</button>
                        <button className="bg-gray-200 text-xs font-normal px-2 py-1 rounded-l-sm border border-neutral-400 hover:bg-gray-300">New Private Note</button>
                        <button className="bg-gray-200 text-xs font-normal px-2 py-1 border border-neutral-400 hover:bg-gray-300">Clone</button>
                        <button className="bg-gray-200 text-xs font-normal px-2 py-1 rounded-r-sm border border-neutral-400 hover:bg-gray-300">New Referral</button>
                    </div>
                </div>

                <div className="flex bg-white border-t">
                    {/* Details Section */}
                    <div className="w-3/4 p-4">
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <h4 className="text-xs text-neutral-500">Account Status With Site</h4>
                                <p className="text-sm text-neutral-700">Unknown, jb, Singapore</p>
                            </div>
                            <div>
                                <h4 className="text-xs text-nautral-500">Local Account Name</h4>
                                <p className="text-sm text-neutral-700">jb</p>
                            </div>
                            <div>
                                <h4 className="text-xs text-nautral-500"># of Active Opportunities</h4>
                                <p className="text-sm text-neutral-700">-</p>
                            </div>
                            <div>
                                <h4 className="text-xs text-nautral-500">SPOC</h4>
                                <input type="checkbox" className="form-checkbox text-neutral-700" />
                            </div>
                            <div>
                                <h4 className="text-xs text-neutral-500">Billing City</h4>
                                <p className="text-sm text-neutral-700">jb</p>
                            </div>
                            <div>
                                <h4 className="text-xs text-neutral-500">Billing State/Province</h4>
                                <p className="text-sm text-neutral-700">-</p>
                            </div>
                        </div>
                    </div>

                    {/* Related List Quick Links Section */}
                    <div className="w-1/4 pt-4 border-l pl-2">
                        <h4 className="text-xs text-gray-500">Related List Quick Links</h4>
                        <div className="flex flex-col mt-2">
                            <div className='flex items-center space-x-2 mb-2'>
                                <div className="border-2 border-purple-500 bg-purple-600">
                                    <MdAccountBox className="text-white text-xs font-bold" />
                                </div>
                                <div>
                                    <h2 className="flex items-center cursor-pointer text-c-teal text-xs">Contact (2)                                    </h2>
                                </div>
                            </div>
                            <div className='flex items-center space-x-2 mb-2'>
                                <div className="border-2 border-blue-500 bg-blue-600">
                                    <RiContactsBookLine className="text-white text-xs font-bold" />
                                </div>
                                <div>
                                    <h2 className="flex items-center cursor-pointer text-c-teal text-xs">Related Contacts (2)                                    </h2>
                                </div>
                            </div>
                            <div className='flex items-center space-x-2 mb-2'>
                                <div className="border-2 border-orange-500 bg-orange-600">
                                    <FaCrown className="text-white text-xs font-bold" />
                                </div>
                                <div>
                                    <h2 className="flex items-center cursor-pointer text-c-teal text-xs">Opportunities (0)                                    </h2>
                                </div>
                            </div>
                            <div className='flex items-center space-x-2 mb-2'>
                                <div className="border-2 border-yellow-500 bg-yellow-600">
                                    <SlPeople className="text-white text-xs font-bold" />
                                </div>
                                <div>
                                    <h2 className="flex items-center cursor-pointer text-c-teal text-xs">Opportunity Related ... (0)                                   </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feedback Section */}
                <div className="border-t p-2 flex items-center space-x-2 bg-white rounded rounded-b-md">
                    <span className="text-xs text-neutral-700">Did you find these results useful?</span>
                    <span className="text-xs text-neutral-500 border rounded-md cursor-pointer">👍</span>
                    <span className="text-xs text-neutral-500 border rounded-md cursor-pointer">👎</span>
                </div>
            </div>
            {/* Account table */}
            <div className='py-2 mb-4 bg-neutral-100 border rounded-md shadow-md'>
                <h2 className="text-lg font-semibold text-c-teal ml-4">Accounts</h2>
                <div className='flex justify-between ml-4'>
                    <div className='bg-neutral-100'>
                        <span className="text-xs text-neutral-700">5+ results · Sorted by relevance </span>
                    </div>
                    <span className='text-xs text-blue-700 cursor-pointer px-2'>View more</span>
                </div>

                <CustomTableMUI column={ACCOUNTCOLUMNDUMMY} dataTable={firstFiveAccounts} isHeader={false} tableHeight={549} />
            </div>
            <div className='py-2 mb-4 bg-neutral-100 border rounded-md shadow-md'>
                <h2 className="text-lg font-semibold text-c-teal ml-4">Leads</h2>
                <div className='flex justify-between py-2 ml-4'>
                    <div className='bg-neutral-100'>
                        <span className="text-xs text-neutral-700">5+ results · Sorted by relevance </span>
                    </div>
                    <span className='text-xs text-blue-700 cursor-pointer px-2'>View more</span>
                </div>

                <CustomTableMUI column={ACCOUNTCOLUMNDUMMY} dataTable={firstFiveAccounts} isHeader={false} tableHeight={549} />
            </div>
        </div>
    );
}
