import React, { useEffect, useRef, useState } from 'react';
import { Transition, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom';
import GlobalSearch from './GlobalSearch';
import { HiOutlineArrowLeft, HiOutlineHome } from 'react-icons/hi';

export default function Header() {
  const navigate = useNavigate();
  const [inputWidth, setInputWidth] = useState(0);
  const searchRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      setInputWidth(inputRef.current.offsetWidth);
    }
  }, []);

  return (
    <div className='shadow-sm w-full'>
      {/* Header */}
      <div className='z-10 bg-gradient-to-r from-c-dark-grayish via-c-dark-grayish to-c-light-grayish h-12 px-4 flex justify-between items-center border-b border-gray-200 shadow shadow-lg'>
        {/* Left Section */}
        <div className='relative z-20'>
          <HiOutlineArrowLeft
            fontSize={18}
            className='text-neutral-300 absolute top-1/2 -translate-y-1/2 left-3 cursor-pointer'
            onClick={() => navigate(-1)}
          />
          <HiOutlineHome
            fontSize={18}
            className='text-neutral-300 absolute top-1/2 -translate-y-1/2 left-12 cursor-pointer'
            onClick={() => navigate('/')}
          />
        </div>
        {/* Center Section - Search Bar */}
        <div className='relative w-full'>
          <GlobalSearch />
        </div>
        {/* Right Section */}
        <div className='flex items-center gap-2 pr-0'>
          <Menu as="div" className="relative">
            <MenuButton className="p-1.5 rounded-full inline-flex items-center text-neutral-300 hover:text-opacity-100 focus:outline-none">
              <span className='sr-only'>Open menu option</span>
              <div
                className='h-6 w-6 rounded-full bg-c-yellow bg-cover bg-no-repeat bg-center'
                style={{ backgroundImage: 'url("https://source.unsplash.com/face")' }}
              >
                <span className='sr-only'>Mukhlis Aji</span>
              </div>
            </MenuButton>
            <Transition
              as={React.Fragment}
              enter="transition ease-out duration-75"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <MenuItems
                className="origin-top-right z-20 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem>
                  {({ active }) => (
                    <div
                      className={classnames(active && 'bg-gray-100', "text-gray-700 text-sm focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2")}
                      onClick={() => navigate('./profile')}
                    >
                      Your Profile
                    </div>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <div
                      className={classnames(active && 'bg-gray-100', "text-gray-700 text-sm focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2")}
                      onClick={() => navigate('./settings')}
                    >
                      Settings
                    </div>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <div
                      className={classnames(active && 'bg-gray-100', "text-red-400 text-sm focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2")}
                      onClick={() => navigate('./logout')}
                    >
                      Sign out
                    </div>
                  )}
                </MenuItem>
              </MenuItems>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
}
