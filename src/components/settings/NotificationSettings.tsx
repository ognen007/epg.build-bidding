import React, { useState } from 'react';

export function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    messages: true,
    updates: false
  });

  return (
    <div className="p-6 border-b border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
            <p className="text-sm text-gray-500">Receive email updates about your projects</p>
          </div>
          <button
            onClick={() => setNotifications({ ...notifications, email: !notifications.email })}
            className={`
              relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
              transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
              ${notifications.email ? 'bg-orange-500' : 'bg-gray-200'}
            `}
          >
            <span
              className={`
                pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0
                transition duration-200 ease-in-out
                ${notifications.email ? 'translate-x-5' : 'translate-x-0'}
              `}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Push Notifications</h3>
            <p className="text-sm text-gray-500">Receive push notifications on your device</p>
          </div>
          <button
            onClick={() => setNotifications({ ...notifications, push: !notifications.push })}
            className={`
              relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
              transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
              ${notifications.push ? 'bg-orange-500' : 'bg-gray-200'}
            `}
          >
            <span
              className={`
                pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0
                transition duration-200 ease-in-out
                ${notifications.push ? 'translate-x-5' : 'translate-x-0'}
              `}
            />
          </button>
        </div>
      </div>
    </div>
  );
}