import React, { useEffect, useRef, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import ContactNew from './ContactNew';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import AccountNew from './AccountNew';
import { IoIosSearch } from 'react-icons/io';


export default function PropertyLayout() {
    const [activeMenu, setActiveMenu] = useState(null);
    const [openMenu, setOpenMenu] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility


    const accountMenuRef = useRef(null);
    const contactMenuRef = useRef(null);

    const handleLabelClick = (menu) => {
        if (activeMenu !== menu) {
            setActiveMenu(menu);
            setOpenMenu(null);
        }
    };

    const handleArrowClick = (menu) => {
        if (openMenu !== menu) {
            setOpenMenu(menu);
            setActiveMenu(menu);
        } else {
            setOpenMenu(null);
        }
    };

    const handleClickOutside = (event) => {
        if (
            accountMenuRef.current && !accountMenuRef.current.contains(event.target) &&
            contactMenuRef.current && !contactMenuRef.current.contains(event.target)
        ) {
            setOpenMenu(null);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const isMenuActive = (menu) => activeMenu === menu;
    const isMenuOpen = (menu) => openMenu === menu;

    // Function to open the modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="flex flex-col overflow-hidden">
            <div className="flex relative bg-white p-2 text-c-dark-grayish border-b border-neutral-200">
                <div className="text-md text-c-dark-grayish font-semibold"><span>Property</span></div>
            </div>
            <div className="px-8 flex flex-row bg-white p-2 gap-4 text-gray-800 border-b shadow shadow-sm border-neutral-200 items-center">
                {/* Account Menu */}
                <div ref={accountMenuRef} className={`relative inline-block text-left border-b-2 ${isMenuActive('accounts') ? 'border-b-2 border-c-teal' : 'border-white'}`}>
                    <div className="flex cursor-pointer" onClick={() => handleLabelClick('accounts')}>
                        <Link to="accounts" className=' hover:no-underline'>
                            <span className="mr-2 flex items-center text-neutral-700 text-sm" >
                                Accounts
                            </span>
                        </Link>
                        <span className="flex items-center text-c-dark-grayish" onClick={() => handleArrowClick('accounts')}>
                            {isMenuOpen('accounts') ? <FaChevronUp /> : <FaChevronDown />}
                        </span>
                    </div>

                    {isMenuOpen('accounts') && (
                        <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <div onClick={openModal} className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900 hover:no-underline" role="menuitem">
                                    <span className="flex items-center">
                                        <span className="mr-2">+</span> New Account
                                    </span>
                                </div>
                            </div>

                        </div>
                    )}


                </div>
                {isModalOpen &&
                    <AccountNew onClose={closeModal} />
                }
                {/* Contact Menu */}
                <div ref={contactMenuRef} className={`relative inline-block text-left border-b-2 ${isMenuActive('contacts') ? 'border-b-2 border-c-teal' : 'border-white'}`}>
                    <div className="flex cursor-pointer" onClick={() => handleLabelClick('contacts')}>
                        <Link to="contacts" className=' hover:no-underline'>
                            <span className="mr-2 flex items-center text-neutral-700 text-sm" >
                                Contact
                            </span>
                        </Link>
                        <span className="flex items-center text-c-dark-grayish" onClick={() => handleArrowClick('contacts')}>
                            {isMenuOpen('contacts') ? <FaChevronUp /> : <FaChevronDown />}
                        </span>
                    </div>

                    {isMenuOpen('contacts') && (
                        <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <div onClick={openModal} className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900 hover:no-underline" role="menuitem">
                                    <span className="flex items-center">
                                        <span className="mr-2">+</span> New Contact
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {isModalOpen &&
                    <ContactNew onClose={closeModal} />
                }

                <div ref={contactMenuRef} className={`relative border-b-2 inline-block text-left ${isMenuActive('properties') ? 'border-b-2 border-c-teal' : 'border-white'}`}>
                    <div className="flex cursor-pointer" onClick={() => handleLabelClick('properties')}>
                        <Link to="properties" className=' hover:no-underline'>
                            <span className="mr-2 flex items-center text-neutral-700 text-sm" >
                                Properties
                            </span>
                        </Link>
                        <span className="flex items-center text-c-dark-grayish" onClick={() => handleArrowClick('properties')}>
                            {isMenuOpen('properties') ? <FaChevronUp /> : <FaChevronDown />}
                        </span>
                    </div>

                    {isMenuOpen('properties') && (
                        <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <div onClick={openModal} className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900 hover:no-underline" role="menuitem">
                                    <span className="flex items-center">
                                        <span className="mr-3">+</span> New Properties
                                    </span>
                                </div>
                                <div onClick={openModal} className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900 hover:no-underline" role="menuitem">
                                    <span className="flex items-center">
                                        <span className="mr-1.5"><IoIosSearch className='font-bold text-neutral-900'/></span>Search Properties
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className='p-4'>
                <Outlet />
            </div>
        </div>
    );
}