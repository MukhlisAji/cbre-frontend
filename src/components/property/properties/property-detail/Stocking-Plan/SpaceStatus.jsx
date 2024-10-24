import React from 'react';
import { IoSettingsSharp } from 'react-icons/io5';
import { RiFileSettingsLine } from 'react-icons/ri';

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

const floorsData = [
    {
        floor: 23,
        area: "30,570 sf",
        vacant: "0 sf Vac",
        segments: [
            { space: "01", area: "30,570 sf", width: 60, category: "occupied", company: "DBS Bank Ltd" },
            { space: "02", area: "30,570 sf", width: 40, category: "immediate", status: "Immediate" }
        ]
    },
    {
        floor: 22,
        area: "29,511 sf",
        vacant: "0 sf Vac",
        segments: [
            { space: "01", area: "30,570 sf", width: 100, category: "occupied", company: "Pavilion Energy" }
        ]
    },
    {
        floor: 21,
        area: "21,109 sf",
        vacant: "0 sf Vac",
        vacant: "11,194 sf Vac",
        segments: [
            { space: "01", area: "30,570 sf", width: 70, category: "future" },
            { space: "02", area: "30,570 sf", width: 30, category: "immediate", status: "Immediate" }
        ]
    },
    {
        floor: 20,
        area: "30,570 sf",
        vacant: "0 sf Vac",
        segments: [
            { space: " 01", area: "30,570 sf", width: 60, category: "occupied", company: "OKG Group" },
            { space: " 02", area: "30,570 sf", width: 40, category: "immediate", status: "Immediate" }
        ]
    },
    {
        floor: 19,
        area: "29,511 sf",
        vacant: "0 sf Vac",
        segments: [
            { space: "01", area: "30,570 sf", width: 100, category: "occupied", company: "Evercore Asia" }
        ]
    },
    {
        floor: 18,
        area: "21,109 sf",
        vacant: "0 sf Vac",
        vacant: "11,194 sf Vac",
        segments: [
            { space: " 01", area: "30,570 sf", width: 70, category: "future" },
            { space: " 02", area: "30,570 sf", width: 30, category: "immediate", status: "Immediate" }
        ]
    }];

// Mapping category to color class
const categoryColors = {
    immediate: "bg-green-200 border-green-300",
    future: "bg-green-500 border-green-600",
    occupied: "bg-gray-300 border-gray-400"
};

// Segment Component
const Segment = ({ segment }) => (
    <div
        className={`p-2 border rounded ${categoryColors[segment.category]} flex flex-col justify-between`}
        style={{ width: `${segment.width}%` }} // Dynamic width based on segment size
    >
        {/* Company Name (only for occupied) */}
        {segment.company && (
            <div className="font-semibold text-gray-800">{segment.company}</div>
        )}

        {/* Space and Status */}
        <div className="text-sm text-gray-600">{segment.space} | {segment.area}</div>

        {/* Status (only for immediate availability) */}
        {segment.status && (
            <div className="text-sm text-gray-500">{segment.status}</div>
        )}
    </div>
);

// Floor Component
const FloorRow = ({ floorData }) => (
    <div className="p-1 bg-gray-200 m">
        {/* Floor Header */}
        {/* <div className="font-semibold mb-2">
        Floor {floorData.floor} | {floorData.area}
      </div> */}

        {/* Segments within the Floor */}
        <div className="flex gap-2">
            {floorData.segments.map((segment, index) => (
                <Segment key={index} segment={segment} />
            ))}
        </div>
    </div>
);

// Main Component to Render All Floors
const FloorsList = () => (
    <div className="p-2 w-full">
        {floorsData.map((floor, index) => (
            <FloorRow key={index} floorData={floor} />
        ))}
    </div>
);

// const floorsData = [
//     { floor: 23, area: "30,570 sf", vacant: "0 sf Vac" },
//     { floor: 22, area: "29,511 sf", vacant: "0 sf Vac" },
//     { floor: 21, area: "21,109 sf", vacant: "" },
//     { floor: 20, area: "31,204 sf", vacant: "11,194 sf Vac" },
//     { floor: 19, area: "31,420 sf", vacant: "0 sf Vac" },
//     { floor: 18, area: "31,420 sf", vacant: "0 sf Vac" },
//     { floor: 17, area: "31,420 sf", vacant: "0 sf Vac" },
//     { floor: 16, area: "31,420 sf", vacant: "0 sf Vac" }
// ];
const highFloors = floorsData.slice(0, 4); // Floors 23-20
const lowFloors = floorsData.slice(4);


export default function SpaceStatus() {
    return (
        <div className="p-4">
            <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-md shadow-sm">
                {/* Edit Floors Button and Settings Icon */}
                <div className="flex items-center space-x-2">
                    <button className="px-2 py-2 w-auto border rounded-md text-sm text-gray-700 font-semibold hover:bg-gray-100">
                        Edit Floor
                    </button>

                    <IoSettingsSharp size={25} className="text-gray-600 hover:text-gray-800" />
                </div>

                {/* Availability Sections */}
                <div className="flex-1 grid grid-cols-4 gap-x-4">
                    {/* Immediate Availability */}
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-full bg-green-500 rounded"></div> {/* Green Bar */}
                        <div>
                            <h2 className="text-sm font-semibold text-gray-800">Immediate Availability</h2>
                            <div className="text-gray-600 text-sm">8.46% | 48,071.00 SF</div>
                        </div>
                    </div>

                    {/* Future Availability */}
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-full bg-green-800 rounded"></div> {/* Blue Bar */}
                        <div>
                            <h2 className="text-sm font-semibold text-gray-800">Future Availability</h2>
                            <div className="text-gray-600 text-sm">1.43% | 8,105.00 SF</div>
                        </div>
                    </div>

                    {/* Pre-Term */}
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-full bg-yellow-500 rounded"></div> {/* Yellow Bar */}
                        <div>
                            <h2 className="text-sm font-semibold text-gray-800">Pre-Term</h2>
                            <div className="text-gray-600 text-sm">2.00% | 10,000.00 SF</div>
                        </div>
                    </div>

                    {/* Occupied */}
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-full bg-gray-300 rounded"></div> {/* Red Bar */}
                        <div>
                            <h2 className="text-sm font-semibold text-gray-800">Occupied</h2>
                            <div className="text-gray-600 text-sm">90.11% | 512,020.00 SF</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex w-full'>
                <div className="w-40 h-full overflow-y-auto border-r border-gray-300 bg-white relative">
                    {/* Vertical Indicator Container */}
                    <div className="absolute top-0 h-full w-5 flex flex-col items-center">
                        {/* HIGH Section Line and Label */}
                        <div className="relative flex items-center justify-center h-1/2">
                            <div className="absolute w-px h-full bg-gray-300"></div> {/* Vertical Line */}
                            <div className="absolute -top-1 w-4 h-px bg-gray-300"></div> {/* Top Horizontal Line */}
                            <div className="absolute bottom-0 w-4 h-px bg-gray-300"></div> {/* Bottom Horizontal Line */}
                            <span className="absolute rotate-90 text-sm font-semibold text-gray-500">
                                HIGH
                            </span>
                        </div>

                        {/* LOW Section Line and Label */}
                        <div className="relative flex items-center justify-center h-1/2">
                            <div className="absolute w-px h-full bg-gray-300"></div> {/* Vertical Line */}
                            <div className="absolute -top-1 w-4 h-px bg-gray-300"></div> {/* Top Horizontal Line */}
                            <div className="absolute bottom-0 w-4 h-px bg-gray-300"></div> {/* Bottom Horizontal Line */}
                            <span className="absolute rotate-90 text-sm font-semibold text-gray-500">
                                LOW
                            </span>
                        </div>
                    </div>

                    {/* Floors List */}
                    <div className="ml-8">
                        {/* HIGH Floors */}
                        <div className="p-2 space-y-">
                            {highFloors.map((floor) => (
                                <div key={floor.floor} className="h-16">
                                    <div className="text-sm font-semibold text-gray-800">{floor.floor}</div>
                                    <div className="text-xs text-gray-600">{floor.area}</div>
                                    {floor.vacant && (
                                        <div className="text-xs text-gray-600">{floor.vacant}</div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* LOW Floors */}
                        <div className="p-2 space-y-">
                            {lowFloors.map((floor) => (
                                <div>
                                    <div key={floor.floor} className="h-16">
                                        <div className="text-sm font-semibold text-gray-800">{floor.floor}</div>
                                        <div className="text-xs text-gray-600">{floor.area}</div>
                                        {floor.vacant && (
                                            <div className="text-xs text-gray-600">{floor.vacant}</div>
                                        )}
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>
                </div>

                {/* Space Rows */}
                <div className="flex w-full">
                    <FloorsList />
                </div>

            </div>




        </div>
    );
};