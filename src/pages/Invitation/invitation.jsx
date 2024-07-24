import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Composant NotificationTable
const NotificationTable = () => {
  const [notifications, setNotifications] = useState([]);
  const userId = localStorage.getItem('id'); // Récupération de l'userId depuis localStorage

  useEffect(() => {
    // Fonction pour charger les notifications
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`https://projet-annuel-q1r6.onrender.com/users/${userId}/notifications`);
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error('Erreur lors de la récupération des notifications:', error);
      }
    };

    fetchNotifications();
  }, [userId]);

  // Fonction pour accepter une notification
  const acceptNotification = async (notificationId) => {
    try {
      await axios.patch(`https://projet-annuel-q1r6.onrender.com/notifications/${notificationId}`, { accepted: true });
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId ? { ...notification, accepted: true } : notification
        )
      );
    } catch (error) {
      console.error('Erreur lors de l\'acceptation de la notification:', error);
    }
  };

  return (
    <div style={{ borderWidth: "2px", borderColor: "black", marginLeft: "40px", marginRight: "40px", padding: "20px", borderRadius: "10px" }}>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Message</th>
              <th scope="col" className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => (
              <tr key={notification.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">{notification.message}</td>
                <td className="px-6 py-4">
                  {notification.accepted ? (
                    'Accepté'
                  ) : (
                    <button
                      onClick={() => acceptNotification(notification.id)}
                      className="bg-blue-500 text-white py-1 px-2 rounded"
                    >
                      Accepter
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotificationTable;
