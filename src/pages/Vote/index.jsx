import React, {useState } from 'react';
import "./vote.css";
import data from "../../data/data.json";
import getdate from "../../utils/getDate.js";

const Vote = () => {
  const round1 = data.vote[0].rounds[0];

  const [selectRound, setSelectedRound] = useState(round1);
  return (
    <div className="vote-container">
      <div className="vote-left">
        <div className="vote">
          <p>Vote</p>
        </div>
        <div className="round">
          <p>Round 1</p>
        </div>
        <div className="round">
          <p>Round 2</p>
        </div>
        <div className="round">
          <p>Round 3</p>
        </div>
      </div>
      <div className="vote-right">
        <div className="vote-informations">
          <div className="information-title">
            <p>Vote informations</p>
          </div>
          <ul>
            <li>Theme: {vote.activity.theme}</li>
            <li>Created at: {vote.activity.created-at}</li>
            <li>Available until: {vote.activity.available-until}</li>
          </ul>
        </div>
        <div className="vote-round">
          <div className="question">
            <p> question: {vote.rounds.question}</p>
          </div>
          {selectRound.map((choice)=>(
            <Choice choice= {choice}/>
          ))}
        </div>
      </div>
    </div>
  )
}
