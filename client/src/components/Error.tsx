import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { useNotifications } from './notifications/NotificationsContext';
import { clearError } from '../actions';
import { stateSchema } from 'store';

interface ErrorProps {
    error: string,
    clearError: () => void
}
  
const Error: React.FC<ErrorProps> = ({error, clearError}) => {
    const { notifications, addNotification, removeNotification } = useNotifications();

    useEffect(() => {
        if (error) {
            addNotification({
                id: Date.now(),
                message: error,
                type: 'error',
            });

            clearError();
        }
    },[error])

    return (
        <div className="notifications-container">
            {notifications && notifications.map((notification: {id: number, type: string, message: string}) => (
                <div key={notification.id} className={`notification ${notification.type}`}>
                    <button className="close-button" onClick={() => removeNotification(notification.id)}>
                    &times;
                    </button>
                    <div className="notification-content">{notification.message}</div>
                </div>
            ))}
        </div>
    )
};

const mapStateToProps = (state: stateSchema) => ({
  error: state.throwaway?.error
});

const mapDispatchToProps = {
    clearError
};

export default connect(mapStateToProps, mapDispatchToProps)(Error);
