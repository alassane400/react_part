// ChatbotComponent.js
import React, { useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import MessageParser from '../../chatbot/messageParser';
import config from '../../chatbot/config';
import ActionProvider from '../../chatbot/ActionProvider';
import 'react-chatbot-kit/build/main.css';

const ChatbotComponent = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot(prevShowChatbot => !prevShowChatbot);
  };

  return (
    <div className="chatbot-wrapper">
      <img
        src="src\components\chatbot\companionnChatBot.png"
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
  );
};

export default ChatbotComponent;
