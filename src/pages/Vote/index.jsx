import React, { useState, useEffect } from "react";
import "./vote.css";
import data from "../../data/data.json";
import getdate from "../../utils/getDate.js";
import Round from "../../components/Round/index.jsx";

const Vote = () => {
  const vote1 = data.votes[0];
  const [today, setToday] = useState();
  useEffect(() => {
    setToday(getdate());
  }, []);
  const [selectRound, setSelectedRound] = useState(vote1.rounds[0]);

  const handleSelectRound = (id) => {
    setSelectedRound(vote1.rounds[id - 1]);
  };

  return (
    <div className="vote-content">
      <div className="today">
        <p className="today-text">{today}</p>
      </div>
      <div className="vote-body">
        <div className="vote-left">
          <div className="vote">
            <p>Vote</p>
          </div>
          <div className="round" onClick={() => handleSelectRound(1)}>
            <p>Round 1</p>
          </div>
          <div className="round" onClick={() => handleSelectRound(2)}>
            <p>Round 2</p>
          </div>
          <div className="round" onClick={() => handleSelectRound(3)}>
            <p>Round 3</p>
          </div>
        </div>
        <div className="vote-right">
          <div className="vote-informations">
            <div className="information-title">
              <p>Vote informations</p>
            </div>
            <ul>
              <li>Theme: {vote1.activity.theme}</li>
              <li>Created at: {vote1.activity.createdAt}</li>
              <li>Available until: {vote1.activity.availableUntil}</li>
            </ul>
          </div>
          <div className="vote-round">
            <Round round={selectRound} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vote;
