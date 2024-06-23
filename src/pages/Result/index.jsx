import { useState, useEffect } from "react";
import "./result.css";
import data from "../../data/data.json";
import getdate from "../../utils/getDate.js";
import Chart from "../../components/Chart/index.jsx";

const Result = () => {
  const vote = data.votes[0];
  const [today, setToday] = useState();

  useEffect(() => {
    setToday(getdate());
  }, []);
  const [selectRound, setSelectedRound] = useState(vote.rounds[0]);

  const handleSelectRound = (id) => {
    setSelectedRound(vote.rounds[id - 1]);
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
              <li>Result: </li>
            </ul>
          </div>
          <div className="result-container">
            <div className="information-title result">
              <p>{selectRound.title}</p>
            </div>
            <div className="vote-round left">
              <Chart round={selectRound} />
            </div>
            <div className="vote-round right">
              <ul>
                <li>Choice 1 : {selectRound.choice[0].result} votes</li>
                <li>Choice 2 : {selectRound.choice[1].result} votes</li>
                <li>Choice 3 : {selectRound.choice[2].result} votes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
