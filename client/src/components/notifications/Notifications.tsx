import React from 'react';
import { useNotifications } from './NotificationsContext';

export interface NotificationSchema {
  id: number,
  type: string,
  message: string;
}

const Notifications: React.FC = () => {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="notifications-container">
      {notifications && notifications.map((notification: NotificationSchema) => (
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
