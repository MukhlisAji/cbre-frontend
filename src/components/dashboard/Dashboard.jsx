import React from 'react';
import ProjectList from './ProjectList';
import RecentSearch from './RecentSearch';
import LeaseExpiries from './LeaseExpiries';
import ListingAnalytics from './ListingAnalytics';
import NotificationHistory from './NotificationHistory';

const Dashboard = () => {
  return (
    <div className="p-4 h-full bg-neutral-100">
      <h1 className="text-lg font-bold mb-4">Welcome Back, James</h1>
      <div className="flex h-full pb-10">
        <div className="flex flex-col w-3/4 space-y-4 pr-4">
          <div className="bg-white shadow-md rounded-md p-4 flex-grow h-3/6">
            <ProjectList />
          </div>
          <div className="flex space-x-4 h-2/6">
            <div className="bg-gray-300 rounded-md p-4 flex-grow">
              <RecentSearch />
            </div>
            <div className="bg-gray-300 rounded-md p-4 flex-grow">
              <LeaseExpiries />
            </div>
          </div>
          <div className="bg-white shadow-md rounded-md p-4 h-2/6">
            <ListingAnalytics />
          </div>
        </div>
        <div className="bg-neutral-200 rounded-md p-4 w-1/4 h-full">
          <NotificationHistory />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
