import React from 'react';
import { HiOutlineBuildingOffice2, HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { BsPeople } from 'react-icons/bs';
import { IoCubeOutline } from 'react-icons/io5';

const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: 'building',
    label: 'Building',
    path: '/data-entry-portal/mass-upload/building',
    icon: <HiOutlineBuildingOffice2 />,
    isOpen: false
  },
  {
    key: 'space',
    label: 'Space',
    path: '/data-entry-portal/mass-upload/space',
    icon: <IoCubeOutline />,
    isOpen: false
    // isOpen: false,
    // submenu: [
    //   { key: 'massUpload', label: 'Mass Upload', path: '/data-entry-portal/mass-upload/space/mass-upload' },
    //   { key: 'singleEntry', label: 'Single Entry', path: '/data-entry-portal/mass-upload/space/single-entry' }
    // ]
  },
  {
    key: 'lease',
    label: 'Lease',
    path: '/data-entry-portal/mass-upload/lease',
    icon: <HiOutlineClipboardDocumentList />,
    isOpen: false
  },
  {
    key: 'account&contact',
    label: 'Account & Contact',
    path: '/data-entry-portal/mass-upload/account-contact',
    icon: <BsPeople />,
    isOpen: false
  }
];

const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  // {
  //   key: 'settings',
  //   label: 'Settings',
  //   path: '/settings',
  //   icon: <HiOutlineCog />
  // },
  // {
  //   key: 'support',
  //   label: 'Help & Support',
  //   path: '/support',
  //   icon: <HiOutlineQuestionMarkCircle />
  // }
];

export { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS };
