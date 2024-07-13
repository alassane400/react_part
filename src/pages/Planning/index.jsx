import { useState, useEffect } from "react";
import data from "../../data/data.json";
import getdate from "../../utils/getDate.js";
import Event_card from "../../components/event_card";
import "./planning.css";


const Planning = () => {
  const [today, setToday] = useState();
  const evenements=data.evenements;

  useEffect(() => {
    setToday(getdate());
}, []);

// Get the current date and time
const now = new Date();

// Filter the events to keep only those with a 'starting' date in the future
const futureEvents = evenements.filter((evenement) => new Date(evenement.starting) > now);

console.log(futureEvents);
return (
  <div className="planning-body">
    <div className="today">
      <p className="today-text">{today}</p>
    </div>
    {futureEvents && futureEvents.map((evenement)=>(
      <Event_card key={evenement.id} evenement={evenement}/>
    ))}
  </div>
)
}
export default Planning
