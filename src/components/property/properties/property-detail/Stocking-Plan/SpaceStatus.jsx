import React from 'react';

const data = {
  immediateAvailability: [
    { spaceNumber: 20, tenant: "ACI Worldwide (Asia)", spaceSize: "6,168 sf" },
    { spaceNumber: 22, tenant: "Company X", spaceSize: "6,878 sf" },
    { spaceNumber: 25, tenant: "Company Y", spaceSize: "4,816 sf" }
  ],
  futureAvailability: [
    { spaceNumber: 22, tenant: "Future Tenant", spaceSize: "6,878 sf" }
  ],
  occupied: [
    { spaceNumber: 23, tenant: "Abbott Laboratories", spaceSize: "30,570 sf" },
    { spaceNumber: 22, tenant: "Abbott Laboratories", spaceSize: "29,515 sf" },
    { spaceNumber: 21, tenant: "Abbott Laboratories", spaceSize: "31,420 sf" },
    { spaceNumber: 19, tenant: "Estee Lauder Cosmetics", spaceSize: "31,420 sf" },
    { spaceNumber: 17, tenant: "Mastercard Asia Pacific", spaceSize: "31,420 sf" }
  ]
};

export default function SpaceStatus(){
  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        {/* Headers */}
        <div className="w-1/3 text-center">
          <h2 className="text-lg font-semibold border-b border-gray-300">
            Immediate Availability
          </h2>
          <div className="text-gray-600 text-sm">
            8.46% | 48,071.00 SF
          </div>
        </div>
        <div className="w-1/3 text-center">
          <h2 className="text-lg font-semibold border-b border-gray-300">
            Future Availability
          </h2>
          <div className="text-gray-600 text-sm">
            1.43% | 8,105.00 SF
          </div>
        </div>
        <div className="w-1/3 text-center">
          <h2 className="text-lg font-semibold border-b border-gray-300">
            Occupied
          </h2>
          <div className="text-gray-600 text-sm">
            90.11% | 512,020.00 SF
          </div>
        </div>
      </div>

      {/* Space Rows */}
      <div className="flex">
        {/* Immediate Availability */}
        <div className="w-1/3 bg-gray-100 p-2 space-y-2">
          {data.immediateAvailability.map((space, index) => (
            <div key={index} className="bg-green-300 p-2 rounded-md">
              <div className="flex justify-between">
                <span>{space.spaceNumber}</span>
                <span>{space.tenant}</span>
              </div>
              <div className="text-sm">{space.spaceSize}</div>
              <div className="text-xs text-gray-700">Immediate</div>
            </div>
          ))}
        </div>

        {/* Future Availability */}
        <div className="w-1/3 bg-gray-100 p-2 space-y-2">
          {data.futureAvailability.map((space, index) => (
            <div key={index} className="bg-yellow-300 p-2 rounded-md">
              <div className="flex justify-between">
                <span>{space.spaceNumber}</span>
                <span>{space.tenant}</span>
              </div>
              <div className="text-sm">{space.spaceSize}</div>
              <div className="text-xs text-gray-700">Future</div>
            </div>
          ))}
        </div>

        {/* Occupied */}
        <div className="w-1/3 bg-gray-100 p-2 space-y-2">
          {data.occupied.map((space, index) => (
            <div key={index} className="bg-gray-300 p-2 rounded-md">
              <div className="flex justify-between">
                <span>{space.spaceNumber}</span>
                <span>{space.tenant}</span>
              </div>
              <div className="text-sm">{space.spaceSize}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};