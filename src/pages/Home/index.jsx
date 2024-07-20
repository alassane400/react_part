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

const Home = () => {
  const [today, setToday] = useState('');
  const [showChatbot, setShowChatbot] = useState(false);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate("/");  // Assurez-vous que la fonction `navigate` est importée et définie
    }
    setToday(getdate());  // Assurez-vous que `getdate` renvoie une valeur correcte
  }, []);

  const toggleChatbot = () => {
    setShowChatbot(prevShowChatbot => !prevShowChatbot);
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
          <div>Assembly</div>
          <div>

          </div>
          <div>
            <div>Informations about the selected assembly</div>
            <div>
              starting
              end
              Activities
              Repetitivite : Ponctuel ou Pas
              Attendees
              Location
              Ordre du jour
            </div>
          </div>
          <div>
            <div>New Assembly</div>
            <div>
              starting
              ending
              quorum
              location: possibilite de selectionner dans une liste ou d'ajouter une nouvelle location / e-meeting
              Ordre du jour
              selection des personnes prioritairement conviees( celles entrant dans le decompte pour le quorum )
            </div>
            <div>
              add a mission( creer la mission et y affecter des/de la personne(s) en regardant celle(s) disposant des/de la competence)
              add a vote(deporter toute la logique de vote ici)
            </div>
            <br />
            <hr />
            <br />
            {!joined && (
              <button onClick={() => setJoined(true)}>
                Join Companion Room
              </button>
            )}
            {joined && <VideoRoom />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
