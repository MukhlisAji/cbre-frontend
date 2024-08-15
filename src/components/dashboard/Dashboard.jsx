import React from 'react';
import ProjectList from './ProjectList';
import RecentSearch from './RecentSearch';
import LeaseExpiries from './LeaseExpiries';
import ListingAnalytics from './ListingAnalytics';
import NotificationHistory from './NotificationHistory';

const Dashboard = () => {
  return (
    <div className="px-4 pb-4 pt-2 h-full bg-neutral-100">
      <h1 className="text-lg font-bold mb-2 text-neutral-500">Welcome Back, <span className='text-neutral-700'>James</span> </h1>
      <div className="flex h-full pb-7">
        <div className="flex flex-col w-4/5 space-y-4 pr-4">
          <div className="bg-white shadow-md rounded-md flex-grow ">
            <ProjectList />
          </div>
          <div className="flex space-x-4 h-56">
            <div className="bg-gray-300 shadow-md rounded-md w-1/2 flex-grow">
              <RecentSearch />
            </div>
            <div className="bg-gray-300 shadow-md rounded-md w-1/2 flex-grow">
              <LeaseExpiries />
            </div>
          </div>
          <div className="rounded-md h-3/6">
            <ListingAnalytics />
          </div>
        </div>
        <div className="bg-neutral-200 shadow-md rounded-md p-2 w-1/5 h-full">
          <NotificationHistory />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
