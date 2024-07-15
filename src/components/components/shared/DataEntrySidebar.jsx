import classnames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { LiaAngleRightSolid } from 'react-icons/lia';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../AppContext';
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from '../../components/lib/const/DataEntryNavigation';
import WarningModal from './WarningModal';

const linkClasses = 'flex items-center gap-2 px-2.5 hover:bg-c-weldon-blue hover:no-underline hover:text-white active:bg-c-teal rounded-sm text-sm';

export default function DataEntrySidebar() {
  // State to manage sidebar open/close status
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 780);
  const [activeMenu, setActiveMenu] = useState('');
  const location = useLocation();

  // Effect to handle window resize and set sidebar state accordingly
  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 780);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Effect to determine the active menu item based on the current path
  useEffect(() => {
    const currentPath = location.pathname;
    let activeMenuPath = '';

    DASHBOARD_SIDEBAR_LINKS.forEach(item => {
      if (currentPath.startsWith(item.path)) {
        activeMenuPath = item.path;
      }
    });

    if (activeMenuPath === '' && currentPath !== '/') {
      const fallbackItem = DASHBOARD_SIDEBAR_LINKS.find(item => item.path === '/');
      activeMenuPath = fallbackItem ? fallbackItem.path : '';
    }

    setActiveMenu(activeMenuPath);
  }, [location]);

  // Function to handle menu click and set active menu item
  const handleMenuClick = (path) => {
    setActiveMenu(path);
  };

  return (
    <div className={`bg-white p-3 flex flex-col text-neutral-700 shadow-xl z-10 transition-all duration-500 ease-in-out ${isOpen ? 'min-w-64' : 'w-16'}`}>
      <div className="flex flex-col items-center px-1 py-3 transition-all duration-500 ease-in-out">
        <a href="/data-entry-portal/mass-upload" className="flex flex-col cursor-pointer focus:outline-none hover:no-underline">
          <div className="flex items-center gap-2">
            <span className={`text-c-dark-grayish transition-all duration-500 ease-in-out ${isOpen ? 'text-4xl' : 'text-md'} font-bold font-logo`}>data entry</span>
          </div>
          <span className="text-xs text-c-dark-grayish ml-auto">by CBRE</span>
        </a>
      </div>
      <div className={`flex-1 py-8 flex flex-col gap-0.5 transition-all duration-500 ease-in-out`}>
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink
            key={item.key}
            item={item}
            isOpen={isOpen}
            isActive={item.path === activeMenu}
            onClick={handleMenuClick}
          />
        ))}
      </div>
      <div className="transition-all duration-500 ease-in-out">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} isOpen={isOpen} />
        ))}
      </div>
    </div>
  );
};

// Component for individual sidebar links
function SidebarLink({ item, isOpen, isActive, onClick }) {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const submenuRef = useRef(null);
  const { isDirty, setIsDirty } = useAppContext();
  const [showWarningModal, setShowWarningModal] = useState(false);
  const navigate = useNavigate();

  // Handle link click with dirty state check and navigation
  const handleClick = (event) => {
    if (isDirty) {
      event.preventDefault();
      setShowWarningModal(true);
    } else {
      onClick(item.path);
      setIsSubMenuOpen(true);
      setIsDirty(false);
    }
  };

  // Handle leaving page with unsaved changes
  const handleLeavePage = () => {
    setShowWarningModal(false);
    setIsSubMenuOpen(true);
    setIsDirty(false);
    onClick(item.path);
    navigate(item.path);
  };

  // Handle closing the warning modal
  const handleCloseModal = () => {
    setShowWarningModal(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Link
        to={item.path}
        className={classnames(
          'py-3',
          isActive ? 'bg-c-teal text-white' : 'text-c-dark-grayish',
          linkClasses
        )}
        onClick={handleClick}
      >
        <span className='text-xl'>{item.icon}</span>
        {isOpen && <span>{item.label}</span>}
        {item.submenu && <LiaAngleRightSolid className="ml-auto" fontSize={13} />}
      </Link>
      {item.submenu && isSubMenuOpen && (
        <div
          ref={submenuRef}
          className={classnames('submenu-container bg-white flex flex-col text-neutral-700 shadow-xl z-11 gap-0.5')}
          style={{
            position: 'absolute',
            top: 0,
            left: '100%',
            padding: '8px 0',
            width: '200px',
            flexDirection: 'column',
          }}
        >
          {item.submenu.map(submenuItem => (
            <Link
              key={submenuItem.key}
              to={submenuItem.path}
              className={classnames(
                'py-2',
                isActive ? 'bg-c-teal text-white' : 'text-neutral-700',
                linkClasses
              )}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              {!isOpen && <span className='text-sm'>{submenuItem.icon}</span>}
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
