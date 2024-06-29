import React, { useState, useEffect } from "react";
import './home.css';
import data from "../../data/data.json";
import getdate from "../../utils/getDate.js";
import Activities from "../../components/Activities";
import Chatbot from "react-chatbot-kit";
import MessageParser from "../../chatbot/messageParser.js";
import config from "../../chatbot/config.js";
import ActionProvider from "../../chatbot/ActionProvider.js";
import 'react-chatbot-kit/build/main.css';
import companionnChatBot from './companionnChatBot.png';

const Home = () => {
  const [today, setToday] = useState();
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    setToday(getdate());
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
      </div>
    </div>
  );
};

export default Home;
