import React, { useEffect, useState } from 'react';
import { FaUser, FaAddressBook, FaBuilding, FaBullseye, FaChartLine, FaTasks, FaCalendarAlt } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import DefaultResult from './DefaultResult';
import Einstein from '../../lib/einstein.png';

export default function GlobalSearchResult() {
    const [selectedMenu, setSelectedMenu] = useState('default');
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const searchQuery = queryParams.get('search') || '';
    const [sectionHeight, setSectionHeight] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const screenHeight = window.innerHeight;
            const newHeight = screenHeight - 130;
            setSectionHeight(newHeight);
        };

        handleResize();

        // Add event listener to handle window resize
        window.addEventListener('resize', handleResize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const renderContent = () => {
        switch (selectedMenu) {
            case 'default':
                return <DefaultResult />;
            case 'Account':
                return <div>Account Content</div>;
            case 'Contacts':
                return <div>Contacts Content</div>;
            case 'Properties':
                return <div>Properties Content</div>;
            case 'Leads':
                return <div>Leads Content</div>;
            case 'Opportunities':
                return <div>Opportunities Content</div>;
            case 'Activity':
                return <div>Activity Content</div>;
            case 'Events':
                return <div>Events Content</div>;
            default:
                return <div>Select a menu item</div>;
        }
    };

    const menuItems = [
        { name: 'Account', icon: <FaUser /> },
        { name: 'Contacts', icon: <FaAddressBook /> },
        { name: 'Properties', icon: <FaBuilding /> },
        { name: 'Leads', icon: <FaBullseye /> },
        { name: 'Opportunities', icon: <FaChartLine /> },
        { name: 'Activity', icon: <FaTasks /> },
        { name: 'Events', icon: <FaCalendarAlt /> },
    ];

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-48 bg-neutral-300 text-neutral-600 p-3 flex flex-col">
                {menuItems.map((menu, index) => (
                    <button
                        key={menu.name}
                        onClick={() => setSelectedMenu(menu.name)}
                        className={`w-full py-2 my-1 rounded flex items-center px-3 text-sm ${selectedMenu === menu.name ? 'bg-gray-300' : 'bg-gray-200 hover:bg-gray-300'}`}
                    >
                        {menu.icon}
                        <span className="ml-2">{menu.name}</span>
                        <span className="ml-auto bg-gray-400 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">{index + 1}</span>
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 p-4 bg-neutral-200">
                <header className="relative items-center p-3 mb-3 bg-white rounded-md shadow-md">
                    <img src={Einstein} alt="Icon" className="absolute -left-3 -top-2 w-14 h-14" />
                    <p className='text-neutral-700 ml-10'>We search for <span className='text-c-teal font-semibold italic'>{searchQuery}</span></p>
                    {/* <h2 className="text-2xl font-medium">{selectedMenu}</h2> */}
                </header>
                <div style={{ height: `${sectionHeight}px` }} className="bg-neutral-200 h-1/3 overflow-y-auto">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}
