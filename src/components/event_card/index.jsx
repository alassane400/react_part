import formatDateTime from "../../utils/formatDate.js";
import "./event_card.css"
const Event_card = ({evenement}) => {

  const start=formatDateTime(evenement.starting)
  const end=formatDateTime(evenement.ending)

  return (
    <div className="event_card_container">
      <div className="event_card_header">
        <h4>{evenement.type}</h4>
      </div>
      <div className="event_card_body">
        <p>Location: {evenement.location}</p>
        <p>Mission: {evenement.missionId}</p>
      </div>
      <div className="event_card_footer">
        <p>Day Start: {start.formattedDate}</p>
        <p>Hour Start: {start.formattedTime}</p>
        <p>Day End : {end.formattedDate}</p>
        <p>Hour End: {end.formattedTime}</p>
      </div>
    </div>
  )
}

export default Event_card
