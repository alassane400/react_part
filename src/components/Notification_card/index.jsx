import formatDateTime from "../../utils/formatDate.js";
import "./notification_card.css"

const Notification_card = ({notification}) => {

  const start=formatDateTime(notification.createdAt)

  return (
    <div className="notification_card_container">
      <div className="notification_card_header">
        <div className="card_header_left">
        <h4>{notification.title}</h4>
        </div>
        <div className="card_header_right">
        <p>{start.formattedDate + " - " + start.formattedTime}</p>
        </div>
      </div>
      <div className="notification_card_body">
        <p>Contenu: {notification.message}</p>
      </div>
    </div>
  )
}

export default Notification_card
