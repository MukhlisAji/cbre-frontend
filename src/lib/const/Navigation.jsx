import React from 'react';
import { VscNote } from 'react-icons/vsc';
import { GoDatabase, GoLink } from 'react-icons/go';
import { PiMapTrifoldDuotone, PiStarLight } from 'react-icons/pi';
import { TbDeviceIpadHorizontalSearch, TbReport } from 'react-icons/tb';
import { IoAnalytics } from 'react-icons/io5';

const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: 'home',
    label: 'Home',
    path: '/home',
    icon: <VscNote />,
    isOpen: false
  },
  {
    key: 'cbreCorporateLink',
    label: 'CBRE Corporate Link',
    path: '/cbre-corporate-link',
    icon: <GoLink />,
    isOpen: false
  },
  {
    key: 'myFavourites',
    label: 'My Favourites',
    path: '/my-favourites',
    icon: <PiStarLight />,
    isOpen: false
  },
  {
    key: 'propertySearch',
    label: 'Property Search',
    path: '/property-search',
    icon: <TbDeviceIpadHorizontalSearch />,
    isOpen: false
  },
  {
    key: '2d3dMap',
    label: '2D & 3D Map',
    path: '/map',
    icon: <PiMapTrifoldDuotone />,
    isOpen: false
  },
  {
    key: 'reportGeneration',
    label: 'Report Generation',
    path: '/report-generation',
    icon: <TbReport />,
    isOpen: false
  },
  {
    key: 'analyticsAndVisualization',
    label: 'Analytics & Visualization',
    path: '/analytics-and-visualization',
    icon: <IoAnalytics />,
    isOpen: false
  },
  {
    key: 'dataEntryPortal',
    label: 'Data Entry Portal',
    path: '/data-entry-portal',
    icon: <GoDatabase />,
    isOpen: false,
    submenu: [
        { key: 'propertyDatabase', label: 'Property Database', path: '/data-entry-portal/property-database' },
        { key: 'massUpload', label: 'Mass Upload', path: '/data-entry-portal/mass-upload' }
      ]
  }
];

const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
//   {
//     key: 'settings',
//     label: 'Settings',
//     path: '/settings',
//     icon: <HiOutlineCog />
//   },
//   {
//     key: 'support',
//     label: 'Help & Support',
//     path: '/support',
//     icon: <HiOutlineQuestionMarkCircle />
//   }
];

export { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS };
