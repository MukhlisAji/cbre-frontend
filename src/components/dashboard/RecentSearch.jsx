import React from 'react';

// Sample JSON data
const leaseExpiryData = [
  {
    buildingName: 'South Beach Tower',
    leaseTitle: 'South Beach Tower - Expedia',
    expireAt: '2025-01-01',
  },
  {
    buildingName: 'Marina Bay Sands',
    leaseTitle: 'Marina Bay Sands - Finance HQ',
    expireAt: '2024-11-15',
  },
  {
    buildingName: 'Chinatown Point',
    leaseTitle: 'Chinatown Point - Retail',
    expireAt: '2024-08-30',
  },
  {
    buildingName: 'Raffles City Tower',
    leaseTitle: 'Raffles City Tower - Law Firm',
    expireAt: '2024-12-01',
  },
  {
    buildingName: 'Suntec Tower',
    leaseTitle: 'Suntec Tower - Tech Corp',
    expireAt: '2025-03-21',
  },
];

const LeaseExpiryItem = ({ index, buildingName, leaseTitle, expireAt }) => (
  <div className="w-full flex gap-2">
    {/* <p className="font-bold text-xs">
      {index}. Building Name <span className="font-normal">{buildingName}</span>
    </p> */}
    <div className='p-1 mb-1 flex gap-2 w-full items-center bg-neutral-100 rounded-md'>
      <img
        src="https://images.pexels.com/photos/4889298/pexels-photo-4889298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Project C Image 1"
        className="rounded-md w-8 h-8 object-cover cursor-pointer"
      />
      <div className="w-full bg-neutral-100 text-neutral-600">
        <p className="text-xs">
          {/* Lease Title{' '} */}
          <span className="font-bold underline cursor-pointer">{leaseTitle}</span>
        </p>
        {/* <p className="text-xs">Expire at <span className='text-red-500'>{expireAt}</span></p> */}
      </div>
    </div>
  </div>
);

export default function RecentSearch() {
  return (
    <div className="flex flex-col p-4 bg-white rounded-md h-full">
      <span className="pl-1 text-neutral-600 text-sm font-semibold">Recent Search</span>
      <div className="bg-white rounded-md h-full overflow-y-auto mt-2">
        {leaseExpiryData.map((item, index) => (
          <LeaseExpiryItem
            key={index}
            index={index + 1}
            buildingName={item.buildingName}
            leaseTitle={item.leaseTitle}
            expireAt={item.expireAt}
          />
        ))}
      </div>

    </div>
  );
}
