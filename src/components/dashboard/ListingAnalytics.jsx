import React from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

const vacanciesData = [
    { name: 'Office', value: 400 },
    { name: 'Retail', value: 300 },
    { name: 'Industrial', value: 300 },
    { name: 'Other', value: 20 },
];

const COLORS = ['#ff793f', '#5a8184', '#ffda79', '#84817a'];

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, name, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="black"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
            fontSize={10}
        >
            <tspan x={x} dy="0">{value}</tspan> {/* First line for value */}
            <tspan x={x} dy="10">{name}</tspan> {/* Second line for name, offset by 12px */}

        </text>
    );

};

const availStatus = {
    thresholds: [90, 80, 70, 60],
    segments: [
        { label: 'Immediate Availability', color: 'bg-c-teal', width: '40%' },
        { label: 'Future Availability', color: 'bg-yellow-700', width: '20%' },
        { label: 'Pre-Term', color: 'bg-red-700', width: '30%' },
        { label: 'Occupied', color: 'bg-gray-300', width: '10%' },
    ],
};

const ListingAnalytics = () => {
    return (
        <div className="grid grid-cols-3 gap-4 w-full h-full rounded-md ">
            <div className="bg-white shadow-md p-4 rounded-md flex flex-col">
                <span className="text-neutral-600 text-sm mb-2 font-semibold">Vacancies</span>
                <div className='w-full h-full'>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={200} height={200}>
                            <Pie
                                data={vacanciesData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                // innerRadius={20}
                                outerRadius={65}
                                fill="#8884d8"
                                labelLine={false}
                                label={renderCustomLabel}
                            >
                                {vacanciesData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend
                                layout="vertical" // Stack legend items vertically
                                align="right"
                                verticalAlign="middle"
                                wrapperStyle={{
                                    fontSize: '10px',
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white shadow-md p-4 rounded-md flex flex-col">
                <span className="text-neutral-600 text-sm font-semibold">Availability Status</span>
                <div className="mt-4">
                    <div className="flex items-center justify-between">
                        {availStatus.thresholds.map((threshold, index) => (
                            <span key={index} className="text-xs">{`${threshold}%`}</span>
                        ))}
                    </div>
                    <div className="flex h-4 mt-2 bg-gray-300 rounded-full">
                        {availStatus.segments.map((segment, index) => (
                            <div
                                key={index}
                                className={`${segment.color} h-full ${index === 0 ? 'rounded-l-full' : ''} ${index === availStatus.segments.length - 1 ? 'rounded-r-full' : ''
                                    }`}
                                style={{ width: segment.width }}
                            ></div>
                        ))}
                    </div>
                    <ul className="mt-4 text-xs">
                        {availStatus.segments.map((segment, index) => (
                            <li key={index} className="flex items-center">
                                <span className={`w-4 h-4 ${segment.color} inline-block mr-2`}></span>
                                {segment.label}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-md p-4 flex flex-col">
                <span className="text-neutral-600 text-sm font-semibold">Total No. of Listings</span>
                <div className='flex flex-col h-full items-center justify-center'>
                    <div className="text-5xl font-logo font-bold mb-4 text-c-dark-grayish">1,234</div>
                </div>
            </div>
        </div>
    );
};

export default ListingAnalytics;
