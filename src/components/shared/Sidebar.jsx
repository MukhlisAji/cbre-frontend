import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classnames from 'classnames';
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from '../../lib/const/Navigation';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const linkClasses = 'flex items-center gap-2 px-3 hover:bg-c-weldon-blue hover:no-underline hover:text-white active:bg-c-teal rounded-sm text-sm';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 680);
  const [submenuStates, setSubmenuStates] = useState({});

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 780); // Collapse sidebar automatically on small screens
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures that this effect runs only once after initial render

  const toggleSubmenu = (key) => {
    setSubmenuStates({
      ...submenuStates,
      [key]: !submenuStates[key]
    });
  };

  return (
    <div className={`bg-white p-3 flex flex-col text-neutral-700 shadow-xl z-10 ${isOpen ? 'min-w-64 ' : 'w-20 '}`}>
      <div className="flex flex-col items-center px-1">
        <a href="/" className="flex flex-col cursor-pointer focus:outline-none hover:no-underline">
          <div className="flex gap-2">
            <span className={`text-c-dark-grayish font-logo ${isOpen ? 'text-7xl' : 'text-4xl'} font-semibold`}>one</span>
          </div>
          <span className="text-xs text-c-dark-grayish ml-auto">by CBRE</span>
        </a>
      </div>
      <div className={`flex-1 py-8 flex flex-col gap-0.5`}>
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink
            key={item.key}
            item={item}
            isOpen={isOpen}
            onClick={() => toggleSubmenu(item.key)}
            submenuOpen={submenuStates[item.key]}
          />
        ))}
      </div>
      {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
        <SidebarLink key={item.key} item={item} isOpen={isOpen} />
      ))}
    </div>
  );
}


function SidebarLink({ item, isOpen, onClick, submenuOpen }) {
  const { pathname } = useLocation();
  const submenuRef = useRef(null);
  const [submenuHeight, setSubmenuHeight] = useState(0);

  console.log("SidebarLink item:", item); // Add this line

  useEffect(() => {
    if (submenuOpen) {
      setSubmenuHeight(submenuRef.current.scrollHeight);
    } else {
      setSubmenuHeight(0);
    }
  }, [submenuOpen]);

  const handleSubmenuClick = (event) => {
    if (item.submenu && item.submenu.length > 0) {
      event.preventDefault();
      onClick();
    }
  };

  const hasSubmenu = item.submenu && item.submenu.length > 0;

  return (
    <div className="relative">
      <Link
        to={item.path}
        className={classnames(
          'py-3 cursor-pointer',
          pathname === item.path ? 'bg-c-teal text-white' : 'text-c-dark-grayish',
          linkClasses
        )}
        onClick={handleSubmenuClick}
      >
        <span className='text-xl'>{item.icon}</span> {/* Render icon only when sidebar is collapsed */}
        {isOpen ? <span>{item.label}</span> : null}
        {hasSubmenu && <MdOutlineKeyboardArrowDown className="ml-auto" fontSize={13} />} {/* Display arrow icon if submenu exists */}
      </Link>
      {hasSubmenu && (
        <div
          ref={submenuRef}
          className="mt-0.5 flex flex-col shadow-sm bg-white z-11 gap-0.5 transition-all duration-300 ease-in-out overflow-hidden"
          style={{ height: submenuHeight }}
        >
          {item.submenu.map(submenuItem => (
            <Link
              key={submenuItem.key}
              to={submenuItem.path}
              className={classnames(
                'py-2 pl-12 ', // Indent submenu items for clarity
                pathname === submenuItem.path ? 'bg-c-teal text-white' : 'text-neutral-700',
                linkClasses
              )}
              // No onClick handler here to prevent toggling submenu state
            >
              <span>{submenuItem.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

