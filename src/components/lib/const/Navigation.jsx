import React from 'react';
import { GoDatabase } from 'react-icons/go';
import { PiMapTrifoldDuotone } from 'react-icons/pi';
import { TbDeviceIpadHorizontalSearch, TbReport } from 'react-icons/tb';
import { IoAnalytics, IoEyeOutline } from 'react-icons/io5';
// import { MdContactPhone } from 'react-icons/md';
import { AiOutlineQuestionCircle } from "react-icons/ai";

const DASHBOARD_SIDEBAR_LINKS = [
  
  // {
  //   key: 'contact',
  //   label: 'Contact',
  //   path: '/contact',
  //   icon: <MdContactPhone />,
  //   isOpen: false
  // },
  {
    key: 'property',
    label: 'Property',
    path: '/property',
    icon: <TbDeviceIpadHorizontalSearch />,
    isOpen: false
  },
  {
    key: 'mapViewer',
    label: 'Map Viewer',
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
  {
    key: 'settings',
    label: 'View Bugs',
    path: '/bug/view',
    icon: <IoEyeOutline />,
    isOpen: false
  },
  {
    key: 'support',
    label: 'Report a Bug',
    path: '/bug/report',
    icon: <AiOutlineQuestionCircle />,
    isOpen: false
  }
];

export { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS };
