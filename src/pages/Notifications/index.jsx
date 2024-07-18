import { useState, useEffect } from "react";
import getdate from "../../utils/getDate.js";
import "./notifications.css"
import Notification_card from "../../components/Notification_card";

const Notifications = () => {
  const notifications = [
    {
      "id": 0,
      "title": "Mission Lambersart",
      "message": "Besoin d'intervention à l'habitat de Lambersart",
      "createdAt": "2024-03-24T08:00:00Z"
    },
    {
      "id": 1,
      "title": "Mission Lambersart",
      "message": "Besoin d'intervention à l'habitat de Lambersart",
      "createdAt": "2024-03-24T08:00:00Z"
    },
    {
      "id": 2,
      "title": "Mission Lambersart",
      "message": "Besoin d'intervention à l'habitat de Lambersart",
      "createdAt": "2024-03-24T08:00:00Z"
    },
    {
      "id": 3,
      "title": "Mission Lambersart",
      "message": "Besoin d'intervention à l'habitat de Lambersart",
      "createdAt": "2024-03-24T08:00:00Z"
    },
    {
      "id": 4,
      "title": "Mission Lambersart",
      "message": "Besoin d'intervention à l'habitat de Lambersart",
      "createdAt": "2024-03-24T08:00:00Z"
    }
  ]

  const [today, setToday] = useState();

  useEffect(() => {
    setToday(getdate());
  }, []);

  return (
    <div className="notification-body">
    <div className="today">
      <p className="today-text">{today}</p>
    </div>
    {notifications && notifications.map((notification)=>(
      <Notification_card key={notification.id} notification={notification}/>
    ))}
  </div>
  )
}

export default Notifications
