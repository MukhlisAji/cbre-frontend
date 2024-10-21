import React from 'react';

// Sample JSON data
const notificationData = [
  {
    date: 'Tuesday 30 July 2024',
    notifications: [
      {
        objectName: 'Project A',
        content: 'had been shared with Broker B',
        time: '13:02',
      },
      {
        objectName: 'Property Monas',
        content: 'had been edited by User C',
        time: '13:06',
      },
      {
        objectName: 'Lease D',
        content: 'is expired',
        time: '14:01',
      },
      {
        objectName:'Space C',
        content: "'s Availability status has been updated to immediate status",
        time: '14:05',
      },
      {
        objectName: 'Project A',
        content: 'had been shared with Broker B',
        time: '15:02',
      },
      {
        objectName: 'Property Monas',
        content: 'had been edited by User C',
        time: '15:06',
      },
      {
        objectName: 'Lease D',
        content: 'is expired',
        time: '16:01',
      },
      {
        objectName:'Space C',
        content: "'s Availability status has been updated to immediate status",
        time: '16:05',
      },
    ],
  },
  {
    date: 'Monday 29 July 2024',
    notifications: [
      {
        objectName: 'Project C',
        content: 'had been shared with Broker B',
        time: '12:02',
      },
      {
        objectName: 'Property Temple',
        content: 'had been edited by User D',
        time: '13:02',
      },
      {
        objectName: 'Project C',
        content: 'had been shared with Broker B',
        time: '14:02',
      },
      {
        objectName: 'Property Temple',
        content: 'had been edited by User D',
        time: '15:02',
      },
      {
        objectName: 'Project C',
        content: 'had been shared with Broker B',
        time: '16:02',
      },
      {
        objectName: 'Property Temple',
        content: 'had been edited by User D',
        time: '17:02',
      }
    ],
  },
];

const NotificationItem = ({ objectName, content, time }) => (
  <div className="flex justify-between items-center py-0.5">
    <div className="flex-grow text-xs bg-white p-1 rounded-md shadow-sm">
      <span className="text-neutral-700"><span className='font-semibold'>{objectName}</span> {content}</span>
    </div>
    <span className="ml-2 text-xs font-semibold mr-1">{time}</span>
  </div>
);

export default function NotificationHistory() {
  return (
    <div className="flex flex-col rounded-md h-full bg-neutral-200">
      <span className="text-neutral-600 text-sm font-semibold">Notification History</span>
      <div className="rounded-md h-full overflow-y-auto mt-2">
        {notificationData.map((day, index) => (
          <div key={index} className="my-4">
            <span className="block text-xs mb-1 font-semibold text-neutral-700">{day.date}</span>
            {day.notifications.map((notification, idx) => (
              <NotificationItem key={idx} objectName={notification.objectName} content={notification.content} time={notification.time} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
