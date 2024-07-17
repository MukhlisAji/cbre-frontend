import React from 'react';
import { GoDatabase } from 'react-icons/go';
import { PiMapTrifoldDuotone } from 'react-icons/pi';
import { TbDeviceIpadHorizontalSearch, TbReport } from 'react-icons/tb';
import { IoAnalytics } from 'react-icons/io5';
// import { MdContactPhone } from 'react-icons/md';
import { HiOutlineCog, HiOutlineQuestionMarkCircle } from 'react-icons/hi';

const DASHBOARD_SIDEBAR_LINKS = [
  
  // {
  //   key: 'contact',
  //   label: 'Contact',
  //   path: '/contact',
  //   icon: <MdContactPhone />,
  //   isOpen: false
  // },
  {
    key: 'propertySearch',
    label: 'Property',
    path: '/property-search',
    icon: <TbDeviceIpadHorizontalSearch />,
    isOpen: false
  },
  {
    key: '2d3dMap',
    label: '2D & 3D Map',
    path: '/map',
    icon: <PiMapTrifoldDuotone />,
    isOpen: false,
    submenu: [
      { key: 'map2D', label: 'Map 2D', path: '/map/2d-map' },
      { key: 'map3D', label: 'Map 3D', path: '/map/3d-map' }
    ]
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
  {
    key: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: <HiOutlineCog />,
    isOpen: false
  },
  {
    key: 'support',
    label: 'Help & Support',
    path: '/support',
    icon: <HiOutlineQuestionMarkCircle />,
    isOpen: false
  }
];

export { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS };
