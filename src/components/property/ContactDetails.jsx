import React, { useEffect, useState } from 'react';
import { HiPencil } from 'react-icons/hi2';
import { IoMdArrowDropdown } from 'react-icons/io';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { RiContactsBook3Line } from 'react-icons/ri';

const ContactDetails = () => {

    const [contactInformationVisible, setContactInformationVisible] = useState(true);
    const [addressInformationVisible, setAddressInformationVisible] = useState(true);
    const [sectionHeight, setSectionHeight] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const screenHeight = window.innerHeight;
            const newHeight = screenHeight - 350; // Subtract 200px for any other fixed content
            setSectionHeight(newHeight);
        };

        // Set initial height
        handleResize();

        // Add event listener to handle window resize
        window.addEventListener('resize', handleResize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
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
                            <h1 className="text-xs font-normal">Contacts</h1>
                            <h1 className="text-lg font-bold text-neutral-700">Mr. K singa Singamsetty</h1>
                        </div>
                    </div>

                </div>
            </div>
            <div className="flex justify-between items-center bg-white p-2 mb-4 rounded-md shadow-md">
                <div className="flex space-x-12">
                    <div className="flex flex-col p-2 ">
                        <span className="text-xs">Title</span>
                    </div>
                    <div className="flex flex-col p-2 ">
                        <span className="text-xs">Account Name</span>
                        <p className="text-sm cursor-pointer text-green-700 hover:text-c-teal">Xact Data Discovery</p>
                    </div>
                    <div className="flex p-2 ">
                        <span className="material-icons text-xs">phone (2)</span>
                        <IoMdArrowDropdown className='ml-1 cursor-pointer active:rounded-lg active:border active:border-neutral-500' />
                    </div>
                    <div className="flex flex-col p-2 ">
                        <span className="text-xs">Email</span>
                        <p href="mailto:k.singamsetty@xactdata.com.test" className="text-green-700 hover:text-c-teal text-sm">k.singamsetty@xactdata.com.test</p>
                    </div>
                    <div className="flex flex-col p-2 ">
                        <span className="material-icons text-xs">linkedin</span>
                        <p className="text-sm">LinkedIn</p>
                    </div>
                    <div className="flex flex-col p-2 ">
                        <span className="material-icons text-xs">Contact Status</span>
                        <div className='flex items-center'>
                            <p className="text-sm">Active </p>
                            <IoCheckmarkCircleOutline className='text-2xl pl-1 text-green-700'/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Details Section */}
            <div className="bg-white shadow-md p-4 rounded-md overflow-y-auto">
                <div className='border-b border-b-neutral-300 mb-4'>
                    <div className="w-14 text-md font-bold border-b-2 border-c-dark-grayish">Details</div>
                </div>
                <div style={{ height: `${sectionHeight}px` }} >
                    {/* Contact Information */}
                    <div className="mb-4">
                        <div className="flex bg-neutral-100 mb-2 justify-between items-center cursor-pointer" onClick={() => toggleVisibility('contactInformation')}>
                            <h2 className="text-md font-semibold text-neutral-700">
                                <span className='text-sm'>{contactInformationVisible ? '▼' : '►'}</span> Contact Information
                            </h2>
                            <span>{contactInformationVisible ? '-' : '+'}</span>
                        </div>
                        {contactInformationVisible && (
                            <div className='ml-3 mb-6'>
                                <div className="grid grid-cols-2 gap-y-2 md:gap-x-12 mb-4 mr-4">
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Name</label>
                                            <input type="text" value="Mr. K singa Singamsetty" className="w-full text-sm text-neutral-700" />
                                        </div>
                                        <HiPencil className="ml-2 cursor-pointer text-neutral-500 mt-auto" />
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col">
                                            <label className="text-neutral-600 text-sm mb-1">Account Name</label>
                                            <a href="#" className="text-green-700 hover:text-c-teal text-sm">Xact Data Discovery</a>
                                        </div>
                                        <HiPencil className="ml-2 cursor-pointer text-neutral-500 mt-auto" />
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Title</label>
                                            <input type="text" value="" className="w-full text-sm text-neutral-700" />
                                        </div>
                                        <HiPencil className="ml-2 cursor-pointer text-neutral-500 mt-auto" />
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Email</label>
                                            <a href="mailto:k.singamsetty@xactdata.com.test" className="text-green-700 hover:text-c-teal">k.singamsetty@xactdata.com.test</a>
                                        </div>
                                        <HiPencil className="ml-2 cursor-pointer text-neutral-500 mt-auto" />
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Department</label>
                                            <input type="text" value="" className="w-full text-sm text-neutral-700" />
                                        </div>
                                        <HiPencil className="ml-2 cursor-pointer text-neutral-500 mt-auto" />
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Business Phone</label>
                                            <input type="text" value="" className="w-full text-sm text-neutral-700" />
                                        </div>
                                        <HiPencil className="ml-2 cursor-pointer text-neutral-500 mt-auto" />
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Contact Profile</label>
                                            <input type="text" value="" className="w-full text-sm text-neutral-700" />
                                        </div>
                                        <HiPencil className="ml-2 cursor-pointer text-neutral-500 mt-auto" />
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Mobile</label>
                                            <input type="text" value="" className="w-full text-sm text-neutral-700" />
                                        </div>
                                        <HiPencil className="ml-2 cursor-pointer text-neutral-500 mt-auto" />
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Contact Type</label>
                                            <input type="text" value="" className="w-full text-sm text-neutral-700" />
                                        </div>
                                        <HiPencil className="ml-2 cursor-pointer text-neutral-500 mt-auto" />
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Main Phone</label>
                                            <input type="text" value="" className="w-full text-sm text-neutral-700" />
                                        </div>
                                        <HiPencil className="ml-2 cursor-pointer text-neutral-500 mt-auto" />
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Linkedin</label>
                                            <input type="text" value="" className="w-full text-sm text-neutral-700" />
                                        </div>
                                        <HiPencil className="ml-2 cursor-pointer text-neutral-500 mt-auto" />
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Influence Level</label>
                                            <input type="text" value="low" className="w-full text-sm text-neutral-700" />
                                        </div>
                                        <HiPencil className="ml-2 cursor-pointer text-neutral-500 mt-auto" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Address Information */}
                    <div className="mb-4 pb-2">
                        <div className="flex bg-neutral-100 mb-2 justify-between items-center cursor-pointer" onClick={() => toggleVisibility('addressInformation')}>
                            <h2 className="text-md font-semibold text-neutral-700">
                                <span className='text-sm'>{addressInformationVisible ? '▼' : '►'}</span> Address Information
                            </h2>
                            <span>{addressInformationVisible ? '-' : '+'}</span>
                        </div>
                        {addressInformationVisible && (
                            <div className='ml-3 mb-6 mr-4 w-1/2 pr-10'>
                                <div className="flex flex-col gap-4">
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Source of Mailing Address</label>
                                            <input type="text" value="account address" className="w-full text-sm text-neutral-700" />
                                        </div>
                                        <HiPencil className="ml-2 cursor-pointer text-neutral-500 mt-auto" />
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <div className="flex flex-col mt-auto">
                                            <label className="text-neutral-600 text-sm mb-1">Address</label>
                                            <input type="text" value="MDC, Mumbai" className="w-full text-sm text-neutral-700" />
                                        </div>
                                        <HiPencil className="ml-2 cursor-pointer text-neutral-500 mt-auto" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ContactDetails;