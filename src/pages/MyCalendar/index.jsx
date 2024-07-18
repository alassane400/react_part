import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import data from "../../data/data.json";
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = dayjsLocalizer(dayjs)
const events = data.evenements

const getTime =(dateString) => new Date(dateString);

const myEventsList = [
  {
    title: events[0].type + " " + events[0].location,
    start: getTime(events[0].starting),
    end: getTime(events[0].ending),
    allDay: false,
    resource: "",
  },
  {
    title: events[1].type + " " + events[1].location,
    start: getTime(events[1].starting),
    end: getTime(events[1].ending),
    allDay: false,
    resource: "",
  },
  {
    title: events[2].type + " " + events[2].location,
    start: getTime(events[2].starting),
    end: getTime(events[2].ending),
    allDay: false,
    resource: "",
  }
]
const MyCalendar = () => (
  <div>
    <Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>
)
export default MyCalendar
