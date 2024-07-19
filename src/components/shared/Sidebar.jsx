import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from '../lib/const/Navigation';
import { useAppContext } from '../../AppContext';
import { MdOutlineKeyboardArrowDown, MdKeyboardArrowLeft } from 'react-icons/md';
import WarningModal from './WarningModal';

const linkClasses = 'flex items-center gap-2 px-2.5 hover:bg-c-weldon-blue hover:no-underline hover:text-white active:bg-c-teal rounded-sm text-sm';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 780);
  const [submenuStates, setSubmenuStates] = useState({});
  const [activeMenu, setActiveMenu] = useState('');
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const { isSidebarOpen, setIsSidebarOpen } = useAppContext();

  useEffect(() => {
    let activeMenuPath = '';

    DASHBOARD_SIDEBAR_LINKS.forEach(item => {
      if (currentPath.startsWith(item.path)) {
        activeMenuPath = item.path;
      }
    });

    DASHBOARD_SIDEBAR_BOTTOM_LINKS.forEach(item => {
      if (currentPath.startsWith(item.path)) {
        activeMenuPath = item.path;
      }
    });

    if (activeMenuPath === '' && currentPath !== '/') {
      const fallbackItem = DASHBOARD_SIDEBAR_LINKS.find(item => item.path === '/');
      activeMenuPath = fallbackItem ? fallbackItem.path : '';
    }

    setActiveMenu(activeMenuPath);

    // Check if currentPath is '/map' and close sidebar
    if (currentPath === '/map') {
      setIsOpen(false);
      setIsSidebarOpen(false);
    }
  }, [currentPath, navigate]);

  const handleMenuClick = (path) => {
    setActiveMenu(path);
    setSubmenuStates({});
  };

  const toggleSubmenu = (key) => {
    setSubmenuStates(prevState => ({
      ...prevState,
      [key]: !prevState[key]
    }));
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setIsSidebarOpen(!isSidebarOpen); // Update context state
  };

  return (
    <div className='flex'>
      <div className={`bg-white p-3 h-screen text-neutral-700 shadow-xl z-10 ${isOpen ? 'w-64' : 'w-16'} duration-300 relative flex flex-col justify-between`}>
        <div>
          <MdKeyboardArrowLeft
            className={`bg-white text-c-teal text-2xl rounded-full absolute -right-3 top-2 border border-neutral-300 cursor-pointer hover:text-white hover:bg-c-teal ${!isOpen && "rotate-180"}`}
            onClick={toggleSidebar}
          />
          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-col items-center px-1 mx-auto">
              <a href="/" className="flex flex-col cursor-pointer focus:outline-none hover:no-underline">
                <div className="flex gap-2">
                  <span className={`text-c-dark-grayish font-logo ${isOpen ? 'text-7xl font-semibold' : 'text-2xl mt-6 -ml-1 font-bold'} `}>one</span>
                </div>
                {isOpen && <span className="text-xs text-c-dark-grayish ml-auto">by CBRE</span>}
              </a>
            </div>
          </div>
          <div className={`flex-1 py-8 flex flex-col gap-0.5`}>
            {DASHBOARD_SIDEBAR_LINKS.map((item) => (
              <SidebarLink
                key={item.key}
                item={item}
                isOpen={isOpen}
                isActive={item.path === activeMenu}
                onClick={() => handleMenuClick(item.path)}
                onSubmenuClick={() => toggleSubmenu(item.key)}
                submenuOpen={submenuStates[item.key]}
              />
            ))}
          </div>
        </div>
        <div>
          {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
            <SidebarLink
              key={item.key}
              item={item}
              isOpen={isOpen}
              isActive={item.path === activeMenu}
              onClick={() => handleMenuClick(item.path)}
              onSubmenuClick={() => toggleSubmenu(item.key)}
              submenuOpen={submenuStates[item.key]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ item, isOpen, isActive, onClick, onSubmenuClick, submenuOpen }) {
  const { pathname } = useLocation();
  const submenuRef = useRef(null);
  const [submenuHeight, setSubmenuHeight] = useState(0);
  const { isDirty, setIsDirty } = useAppContext();
  const [showWarningModal, setShowWarningModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (submenuRef.current) {
      setSubmenuHeight(submenuOpen ? submenuRef.current.scrollHeight : 0);
    }
  }, [submenuOpen]);

  const handleLinkClick = (event) => {
    if (isDirty) {
      event.preventDefault();
      setShowWarningModal(true);
    } else {
      onClick && onClick();
      setIsDirty(false);
    }
  };

  const handleSubmenuClick = (event) => {
    event.preventDefault();
    onSubmenuClick && onSubmenuClick();
  };

  const handleLeavePage = () => {
    setShowWarningModal(false);
    setIsDirty(false);
    navigate(item.path);
  };

  const handleCloseModal = () => {
    setShowWarningModal(false);
  };

  const hasSubmenu = item.submenu && item.submenu.length > 0;

  return (
    <div className="relative" title={item.label}>
      <Link
        to={item.path}
        className={classnames(
          'py-3 cursor-pointer flex items-center w-full',
          isActive ? 'bg-c-teal text-white' : 'text-c-dark-grayish',
          linkClasses
        )}
        onClick={hasSubmenu ? handleSubmenuClick : handleLinkClick}
      >
        <span className='text-xl'>{item.icon}</span>
        {isOpen && (
          <span className={`whitespace-nowrap transition-opacity duration-300 delay-300 ${isOpen ? 'opacity-100' : 'opacity-0'} flex-grow`}>
            {item.label}
          </span>
        )}
        {hasSubmenu && <MdOutlineKeyboardArrowDown className="ml-auto" fontSize={13} />}
      </Link>
      {hasSubmenu && (
        <div
          ref={submenuRef}
          className={`mt-0.5 flex flex-col shadow-sm bg-white z-11 gap-0.5 transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? " " : "ml-2 -pl-9"} `}
          style={{
            height: submenuHeight,
            position: isOpen ? 'relative' : 'absolute',
            left: isOpen ? '0' : '100%',
            top: '0',
            minWidth: '200px'
          }}
        >
          {item.submenu.map(submenuItem => (
            <Link
              key={submenuItem.key}
              to={submenuItem.path}
              className={classnames(
                'py-2',
                isOpen ? 'pl-12' : 'pl-3',
                pathname === submenuItem.path ? 'bg-c-teal text-white' : 'text-c-dark-grayish',
                linkClasses
              )}
              title={submenuItem.label}
            >
              <span>{submenuItem.label}</span>
            </Link>
          ))}
        </div>
      )}
      <WarningModal
        showModal={showWarningModal}
        closeModal={handleCloseModal}
        leavePage={handleLeavePage}
      />
    </div>
  );
}
