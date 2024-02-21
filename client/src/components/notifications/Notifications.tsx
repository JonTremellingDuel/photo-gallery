// Notifications.js
import React from 'react';
import { useNotifications } from './NotificationsContext';

const Notifications: React.FC = () => {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="notifications-container">
      {notifications.map((notification: any) => (
        <div key={notification.id} className={`notification ${notification.type}`}>
          <button className="close-button" onClick={() => removeNotification(notification.id)}>
            &times;
          </button>
          <div className="notification-content">{notification.message}</div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
