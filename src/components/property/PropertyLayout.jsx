import React, { useEffect, useRef, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';
import { useUtils } from '../lib/api/Authorization';
import AccountForm from './account/AccountForm';
import ContactForm from './contact/ContactForm';
import Project from '../map-viewer/pages/project/Project';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PropertyForm from './properties/PropertyForm';


export default function PropertyLayout() {
    const [activeMenu, setActiveMenu] = useState(null);
    const [openMenu, setOpenMenu] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const accountMenuRef = useRef(null);
    const contactMenuRef = useRef(null);
    const propertiesMenuRef = useRef(null); // Fixing the duplicate contactMenuRef
    const { generateAndSetToken } = useUtils();
    const [modalType, setModalType] = useState(null);

    const openModal = (type) => {
        console.log('Opening modal for:', type); // Debugging
        setModalType(type);
        setIsModalOpen(true);
        setOpenMenu(null);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalType(null);
    };

    useEffect(() => {
        const fetchToken = async () => {
            const success = await generateAndSetToken();
            if (success) {
                console.log('Token generated and set successfully');
            } else {
                console.error('Failed to generate and set token');
            }
        };

        fetchToken();
    }, []);

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
            contactMenuRef.current && !contactMenuRef.current.contains(event.target) &&
            propertiesMenuRef.current && !propertiesMenuRef.current.contains(event.target) // Adding properties menu ref
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

    return (
        <DndProvider backend={HTML5Backend}>
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
                            <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-30">
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    <div onClick={() => openModal('account')} className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900 hover:no-underline" role="menuitem">
                                        <span className="flex items-center">
                                            <span className="mr-2">+</span> New Account
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {isModalOpen && modalType === 'account' && (
                        <AccountForm onClose={closeModal} />
                    )}
                    {/* Contact Menu */}
                    <div ref={contactMenuRef} className={`relative inline-block text-left border-b-2 ${isMenuActive('contacts') ? 'border-b-2 border-c-teal' : 'border-white'}`}>
                        <div className="flex cursor-pointer" onClick={() => handleLabelClick('contacts')}>
                            <Link to="contacts" className=' hover:no-underline'>
                                <span className="mr-2 flex items-center text-neutral-700 text-sm" >
                                    Contacts
                                </span>
                            </Link>
                            <span className="flex items-center text-c-dark-grayish" onClick={() => handleArrowClick('contacts')}>
                                {isMenuOpen('contacts') ? <FaChevronUp /> : <FaChevronDown />}
                            </span>
                        </div>

                        {isMenuOpen('contacts') && (
                            <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-30">
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    <div onClick={() => openModal('contact')} className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900 hover:no-underline" role="menuitem">
                                        <span className="flex items-center">
                                            <span className="mr-2">+</span> New Contact
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {isModalOpen && modalType === 'contact' && (
                        <ContactForm onClose={closeModal} />
                    )}

                    {/* Properties Menu */}
                    <div ref={propertiesMenuRef} className={`relative border-b-2 inline-block text-left ${isMenuActive('properties') ? 'border-b-2 border-c-teal' : 'border-white'}`}>
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
                            <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-30">
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    <Link onClick={() => openModal('properties')} className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900 hover:no-underline" role="menuitem">
                                        <span className="flex items-center">
                                            <span className="mr-3">+</span> New Properties
                                        </span>
                                    </Link>
                                    <Link to="properties/search" onClick={()=> setOpenMenu(null)} className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900 hover:no-underline" role="menuitem">
                                    <span className="flex items-center">
                                        <span className="mr-1.5"><IoIosSearch className='font-bold text-neutral-900' /></span>Search Properties
                                    </span>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
                {isModalOpen && modalType === 'properties' && (
                    <PropertyForm onClose={closeModal} />
                )}
            </div>
            <div c>
                <Outlet />
            </div>
            <Project />
        </div>
        </DndProvider >
    );
}



