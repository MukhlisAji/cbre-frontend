import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import classnames from 'classnames';
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from '../../lib/const/DataEntryNavigation';
import { useAppContext } from '../../AppContext';
import { LiaAngleRightSolid } from 'react-icons/lia';
import WarningModal from './WarningModal';

const linkClasses = 'flex items-center gap-2 px-3 hover:bg-c-weldon-blue hover:no-underline hover:text-white active:bg-c-teal rounded-sm text-sm';

export default function DataEntrySidebar() {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 680);
  const [activeMenu, setActiveMenu] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 780);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Determine the active menu based on the current path
    const currentPath = location.pathname;
    let activeMenuPath = '';

    DASHBOARD_SIDEBAR_LINKS.forEach(item => {
      if (currentPath.startsWith(item.path)) {
        activeMenuPath = item.path;
      }
    });

    if (activeMenuPath === '' && currentPath !== '/') {
      // Fallback if no active menu item found and not on the root path
      const fallbackItem = DASHBOARD_SIDEBAR_LINKS.find(item => item.path === '/');
      activeMenuPath = fallbackItem ? fallbackItem.path : ''; // Set to empty string if fallbackItem is undefined
    }
    

    setActiveMenu(activeMenuPath);
  }, [location]);

  const handleMenuClick = (path) => {
    setActiveMenu(path);
  };

  return (
    <div className={`bg-white p-3 flex flex-col text-neutral-700 shadow-xl z-10 transition-all duration-500 ease-in-out ${isOpen ? 'min-w-64' : 'w-20'}`}>
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

function SidebarLink({ item, isOpen, isActive, onClick }) {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const submenuRef = useRef(null);
  const { isDirty, setIsDirty } = useAppContext();
  const [showWarningModal, setShowWarningModal] = useState(false);

  const navigate = useNavigate();

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

  const handleLeavePage = () => {
    setShowWarningModal(false);
    setIsSubMenuOpen(true);
    setIsDirty(false);
    onClick(item.path);
    navigate(item.path);
  };

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
