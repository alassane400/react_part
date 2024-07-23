import React, { useState, useEffect } from "react";
import './home.css';
import getdate from "../../utils/getDate.js";
import Chatbot from "react-chatbot-kit";
import MessageParser from "../../chatbot/messageParser.js";
import config from "../../chatbot/config.js";
import ActionProvider from "../../chatbot/ActionProvider.js";
import 'react-chatbot-kit/build/main.css';
import companionnChatBot from './companionnChatBot.png';
import { VideoRoom } from "../../components/videoroom.jsx";
import axios from 'axios';

const Home = () => {
  const [today, setToday] = useState('');
  const [showChatbot, setShowChatbot] = useState(false);
  const [joined, setJoined] = useState(false);
  const [users, setUsers] = useState([]); // State to store users
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    let token = localStorage.getItem('token');
    if (!token) {
        navigate("/admin");
        return;
    }

    try {
      const response = await axios.get('https://projet-annuel-q1r6.onrender.com/evenements', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setEvents(response.data.evenements);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      if (error.response && error.response.data) {
        toast.error(JSON.stringify(error.response.data));
      } else {
        toast.error('An unknown error occurred');
      }
    }
  };

  // Event data state
  const [eventData, setEventData] = useState({
    type: "",
    description: "",
    starting: "",
    ending: "",
    attendees: [],
    location: "",
    repetitivity: "",
    quorum: 0,
    isVirtual: false,
    virtualLink: "",
  });

  // Fetch users when component mounts
  useEffect(() => {
    fetchEvents();
    const token = localStorage.getItem('token');
    if (!token) {
      navigate("/");  // Ensure `navigate` is imported and defined
    }
    setToday(getdate());  // Ensure `getdate` returns a correct value

    axios.get('https://projet-annuel-q1r6.onrender.com/users', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setUsers(response.data.users);
    })
    .catch(error => {
      console.error('Error fetching users:', error);
    });
  }, []);

  const toggleChatbot = () => {
    setShowChatbot(prevShowChatbot => !prevShowChatbot);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAttendeeChange = (userId) => {
    setEventData(prevData => {
      const existingAttendeeIndex = prevData.attendees.findIndex(attendee => attendee.userId === userId);
      const updatedAttendees = [...prevData.attendees];

      if (existingAttendeeIndex !== -1) {
        // Remove attendee if already exists
        updatedAttendees.splice(existingAttendeeIndex, 1);
      } else {
        // Add attendee with default role
        updatedAttendees.push({ userId, role: 'NORMAL' });
      }

      return {
        ...prevData,
        attendees: updatedAttendees,
      };
    });
  };

  const handleRoleChange = (userId, role) => {
    setEventData(prevData => {
      const updatedAttendees = prevData.attendees.map(attendee =>
        attendee.userId === userId ? { ...attendee, role } : attendee
      );

      return {
        ...prevData,
        attendees: updatedAttendees,
      };
    });
  };

  const handleSubmit = async () => {
    try {
      // Prepare the event data
      const preparedEventData = {
        ...eventData,
        attendees: eventData.attendees.map(attendee => ({
          userId: attendee.userId,
          role: attendee.role,
        })),
      };

      // POST request to the API
      const response = await axios.post('https://projet-annuel-q1r6.onrender.com/evenements', preparedEventData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ensure the token is sent
        },
      });
      alert(response.data);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="home-content">
      <div className="today">
        <p className="today-text">{today}</p>
      </div>
      <div className="home-body">
        <img 
          src={companionnChatBot} 
          alt="Toggle Chatbot"
          className="toggle-chatbot-image"
          onClick={toggleChatbot}
        />
        {showChatbot && (
          <div className="chatbot-container">
            <Chatbot
              config={config}
              actionProvider={ActionProvider}
              messageParser={MessageParser}
            />
          </div>
        )}
        <div>
          <div style={{borderWidth:"2px",borderColor:"black",marginLeft:"40px",marginRight:"40px", padding:"20px",borderRadius:"10px"}}>
            <h1 style={{color:"#f39713",fontSize:"25px"}}>New Assembly</h1><br></br><hr></hr><br></br>
            <div>
              <label style={{margin:"10px"}}>
                Starting:
                <input
                  type="datetime-local"
                  name="starting"
                  value={eventData.starting}
                  onChange={handleInputChange}
                />
              </label>
              <label style={{margin:"10px"}}>
                Ending:
                <input
                  type="datetime-local"
                  name="ending"
                  value={eventData.ending}
                  onChange={handleInputChange}
                />
              </label>
              <label style={{margin:"10px"}}>
                Location:
                <input
                  type="text"
                  name="location"
                  value={eventData.location}
                  onChange={handleInputChange}
                />
              </label>
              <label style={{margin:"10px"}}>
                Type:
                <select
                  name="type"
                  value={eventData.type}
                  onChange={handleInputChange}
                >
                  <option value="">Select type</option>
                  <option value="AG">AG</option>
                  <option value="SUIVI">SUIVI</option>
                </select>
              </label>
              <label style={{margin:"10px"}}>
                Repetitivity:
                <select
                  name="repetitivity"
                  value={eventData.repetitivity}
                  onChange={handleInputChange}
                >
                  <option value="">Select repetitivity</option>
                  <option value="MONTHLY">Monthly</option>
                  <option value="ANNUAL">Annual</option>
                  <option value="NONE">None</option>
                </select>
              </label>

              {eventData.type === "AG" && (
                <>
                  <label style={{margin:"10px"}}>
                    Quorum:
                    <input
                      type="number"
                      name="quorum"
                      value={eventData.quorum}
                      onChange={handleInputChange}
                    />
                  </label>
                  <table style={{ borderWidth: "2px", borderColor: "orange", borderCollapse: "collapse", width: "100%" }}>
                    <tbody>
                      <tr>
                        <td style={{ textAlign: "center", verticalAlign: "middle", padding: "10px" }}>
                          <label style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%" }}>
                            <span>Attendees:</span>
                            <select
                              name="attendees"
                              multiple
                              onChange={(e) => {
                                const selectedOptions = Array.from(e.target.options);
                                selectedOptions.forEach(option => {
                                  if (option.selected) {
                                    handleAttendeeChange(parseInt(option.value, 10));
                                  }
                                });
                              }}
                              style={{ marginTop: "10px" }}
                            >
                              {users.map(user => (
                                <option
                                  key={user.id}
                                  value={user.id}
                                  selected={eventData.attendees.some(attendee => attendee.userId === user.id)}
                                >
                                  {user.name}
                                </option>
                              ))}
                            </select>
                          </label>
                        </td>
                        <td>
                          {eventData.attendees.map(attendee => (
                            <div key={attendee.userId} style={{ margin: "10px" }}>
                              <span>{users.find(user => user.id === attendee.userId)?.name}</span>
                              <select
                                value={attendee.role}
                                onChange={(e) => handleRoleChange(attendee.userId, e.target.value)}
                              >
                                <option value="IMPORTANT">IMPORTANT</option>
                                <option value="NORMAL">NORMAL</option>
                              </select>
                            </div>
                          ))}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </>
              )}

              <label style={{margin:"10px"}}>
                Virtual:
                <select
                  type="text"
                  name="virtualLink"
                  value={eventData.virtualLink}
                  onChange={handleInputChange}
                >
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                  </select>
              </label>
              <label style={{margin:"10px"}}>
                Description:
                <input
                  type="text"
                  name="description"
                  value={eventData.description}
                  onChange={handleInputChange}
                />
              </label>
              <button onClick={handleSubmit}>Create</button>
              <br />
              <hr />
              <br />
              {!joined && (
                <button onClick={() => setJoined(true)}>
                  Join Companion Room
                </button>
              )}
              {joined && <VideoRoom virtualLink={eventData.virtualLink} />} {/* Pass virtualLink as prop */}
              <br />
              <br />
              <p>
                {/* Display the virtual link if available */}
                {eventData.virtualLink ? (
                  <a href={eventData.virtualLink} target="_blank" rel="noopener noreferrer">
                    Join the meeting using this link
                  </a>
                ) : (
                  "No link available"
                )}
              </p>
            </div>
          </div>
          <div style={{borderWidth:"2px",borderColor:"black",marginLeft:"40px",marginRight:"40px", padding:"20px",borderRadius:"10px"}}>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Description</th>
                  <th scope="col" className="px-6 py-3">Type</th>
                  <th scope="col" className="px-6 py-3">Quorum</th>
                  <th scope="col" className="px-6 py-3">Starting</th>
                  <th scope="col" className="px-6 py-3">Ending</th>
                  <th scope="col" className="px-6 py-3">Repetitivity</th>
                  {/* <th scope="col" className="px-6 py-3">VLink</th> */}
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4">{event.description}</td>
                    <td className="px-6 py-4">{event.typee}</td>
                    <td className="px-6 py-4">{event.quorum}</td>
                    <td className="px-6 py-4">{new Date(event.starting).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{new Date(event.ending).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{event.repetitivity}</td>
                    {/* <td className="px-6 py-4">{event.virtualLink}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
