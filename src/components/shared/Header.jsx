import React from 'react';
import { HiOutlineArrowLeft, HiOutlineBell, HiOutlineChatAlt, HiOutlineHome } from 'react-icons/hi';
import { Popover, PopoverButton, PopoverPanel, Transition, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import classnames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoIosSearch } from 'react-icons/io';
// import { useAppContext } from '../../AppContext';

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const formattedPath = location.pathname.substring(1).replace(/\//g, ' /') + ' /';


  return (
    <div className='shadow-sm'>
      {/* Header */}
      <div className='z-10 bg-gradient-to-r from-c-dark-grayish via-c-dark-grayish to-c-light-grayish h-10 px-4 flex justify-between items-center border-b border-gray-200 shadow shadow-lg'>
        <div className='relative'>
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

        <div className='flex items-center gap-2 mr-2'>
          <Popover>
            {({ open }) => (
              <>
                <PopoverButton className={classnames(open && "bg-gray-200 text-neutral-800", "p-1.5 rounded inline-flex items-center text-white hover:text-opacity-100 focus:outline-none active:bg-gray-200 active:text-neutral-700")}>
                  <HiOutlineChatAlt fontSize={20} />
                </PopoverButton>
                <Transition
                  as={React.Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <PopoverPanel
                    className="absolute right-0 z-10 mt-2.5 w-80 bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5"
                  >
                    <div className="px-2 py-2.5">
                      <strong className='text-gray-700 text-sm'>Message</strong>
                      <div className='mt-2 py-1 text-xs'>This is panel message</div>
                    </div>
                  </PopoverPanel>
                </Transition>
              </>
            )}
          </Popover>

          <Popover>
            {({ open }) => (
              <>
                <PopoverButton className={classnames(open && "bg-gray-200 text-neutral-800", "p-1.5 rounded inline-flex items-center text-white hover:text-opacity-100 focus:outline-none active:bg-gray-200 active:text-neutral-700")}>
                  <HiOutlineBell fontSize={20} />
                </PopoverButton>
                <Transition
                  as={React.Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <PopoverPanel
                    className="absolute right-0 z-10 mt-2.5 w-80 bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5"
                  >
                    <div className="px-2 py-2.5">
                      <strong className='text-gray-700 text-sm'>Notifications</strong>
                      <div className='mt-2 py-1 text-xs'>This is panel notification</div>
                    </div>
                  </PopoverPanel>
                </Transition>
              </>
            )}
          </Popover>

          <Menu as={'div'} classnames='relative'>
            <div className='inline-flex'>
              <MenuButton className="p-1.5 rounded-full inline-flex items-center text-neutral-300 hover:text-opacity-100 focus:outline-none">
                <span className='sr-only'>Open menu option </span>
                <div
                  className='h-6 w-6 rounded-full bg-c-yellow bg-cover bg-no-repeat bg-center'
                  style={{ backgroundImage: 'url("https://source.unsplash.com/80x80?face")' }}
                >
                  <span className='sr-only'>Mukhlis Aji</span>
                </div>
              </MenuButton>
            </div>
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
                anchor="bottom end"
                className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem>
                  {({ active }) => (
                    <div
                      className={classnames(active && 'bg-gray-100', "text-gray-700 text-sm  focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2")}
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

      {/* Path Location with Search Bar */}
      <div className='bg-white h-10 px-4 flex justify-between items-center border-b border-gray-200 '>
        <div className="hidden md:block"> {/* Hide on screens smaller than medium (md) */}
          <span className="text-gray-400 mr-2 text-xs">{formattedPath}</span>
        </div>
        <div className="relative w-96 flex justify-end"> {/* Added flex justify-end for right alignment */}
          <input
            type="text"
            placeholder="Search..."
            className="border w-full border-gray-300 text-sm font-normal rounded-lg px-4 py-0.5 focus:outline-none hover:border-c-teal focus:border-c-teal w-200 mr-1"
          />
          {/* Add your search button or icon here */}
          <IoIosSearch fontSize={20} className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500" />
        </div>
      </div>
    </div>


  );
}
