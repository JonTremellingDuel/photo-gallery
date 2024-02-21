// NotificationsContext.js
import React, { createContext, PropsWithChildren, useState, useContext, useEffect } from 'react';

interface notificationsContextSchema {
  notifications?: any,
  notification?: any,
  addNotification?: any,
  removeNotification?: any,
  clearNotifications?: any
};

const NotificationsContext = createContext<notificationsContextSchema>({
  notification: {},
});

export const NotificationsProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [notifications, setNotifications] = useState<any>([]);

  const addNotification = (notification: {id: string, type: string, message: string }) => {
    setNotifications((prevNotifications: any) => [...prevNotifications, notification]);

    // Remove the notification after 3 seconds
    setTimeout(() => {
      removeNotification(notification.id);
    }, 3000);
  };

  const removeNotification = (id: string) => {
    setNotifications((prevNotifications: any) =>
      prevNotifications.filter((notification: {id: string, type: string, message: string }) => notification.id !== id)
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
