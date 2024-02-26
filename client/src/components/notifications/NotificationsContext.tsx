import React, { createContext, PropsWithChildren, useState, useContext, useEffect } from 'react';
import { NotificationSchema } from './Notifications';

interface ContextSchema {
  notifications?: Array<NotificationSchema>,
  notification?: NotificationSchema,
  addNotification: (notification: NotificationSchema) => void,
  removeNotification: (id: number) => void,
  clearNotifications: () => void
};

const NotificationsContext = createContext<ContextSchema>({
  addNotification: () => {},
  removeNotification: () => {},
  clearNotifications: () => {}
});

export const NotificationsProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {

  const [notifications, setNotifications] = useState<NotificationSchema[]>([]);

  const addNotification = (notification: {id: number, type: string, message: string }) => {
    setNotifications((prevNotifications: Array<NotificationSchema>) => [...prevNotifications, notification]);

    // Remove the notification after 3 seconds
    setTimeout(() => {
      removeNotification(notification.id);
    }, 3000);
  };

  const removeNotification = (id: number) => {
    setNotifications((prevNotifications: Array<NotificationSchema>) =>
      prevNotifications.filter((notification: {id: number, type: string, message: string }) => notification.id !== id)
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationsContext.Provider
      value={{ notifications, addNotification, removeNotification, clearNotifications }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  return useContext(NotificationsContext);
};
