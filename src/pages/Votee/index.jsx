import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./vote.css";
import axios from "axios";

const Votee = () => {
  const [starting, setStarting] = useState("");
  const [ending, setEnding] = useState("");
  const [rounds, setRounds] = useState(1);
  const [description, setDescription] = useState("");
  const [votes, setVotes] = useState([]);
  const [selectedVote, setSelectedVote] = useState(null);
  const [roundDetails, setRoundDetails] = useState([]);
  const [selectedChoices, setSelectedChoices] = useState({});

  useEffect(() => {
    let token=localStorage.getItem("token");
    if(!token){
      Navigate("/")
    }
    const fetchVotes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/votes", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (response.data && Array.isArray(response.data.votes)) {
          const currentDate = new Date();
          const filteredVotes = response.data.votes.filter(vote => {
            const startingDate = new Date(vote.starting);
            const endingDate = new Date(vote.ending);
            return currentDate >= startingDate && currentDate <= endingDate;
          });
          setVotes(filteredVotes);
        } else {
          toast.error("Unexpected response format.");
        }
      } catch (error) {
        toast.error("Failed to fetch votes. Please try again.");
      }
    };

    fetchVotes();
  }, []);

  const handleRegister = async () => {
    const voteData = { starting, ending, rounds, description };

    try {
      const response = await axios.post("http://localhost:3000/vote", voteData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      localStorage.setItem('voteId', response.data.id);
      toast.success("Vote created successfully!");
    } catch (error) {
      toast.error("Failed to create vote. Please try again.");
    }
  };

  const handleVoteClick = async (vote) => {
    setSelectedVote(vote);
    try {
      const roundsResponse = await axios.get(`http://localhost:3000/rounds/${vote.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      const currentDate = new Date();
      const filteredRounds = roundsResponse.data.filter(round => {
        const startingDate = new Date(round.starting);
        const endingDate = new Date(round.ending);
        return currentDate >= startingDate && currentDate <= endingDate;
      });

      const roundsWithPropositions = await Promise.all(
        filteredRounds.map(async (round) => {
          const propositionsResponse = await axios.get(`http://localhost:3000/propositions/${round.id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          return { ...round, propositions: propositionsResponse.data };
        })
      );
      setRoundDetails(roundsWithPropositions);
    } catch (error) {
      toast.error("Failed to fetch round details. Please try again.");
    }
  };

  const handleChoiceChange = (roundId, value) => {
    setSelectedChoices(prevState => ({
      ...prevState,
      [roundId]: value
    }));
  };

  const handleSubmit = async (roundId) => {
    const choice = selectedChoices[roundId];
    if (!choice) {
      toast.error("Please select a choice before submitting.");
      return;
    }
    console.log(choice)
    try {
      await axios.post("http://localhost:3000/choice", { roundId, choice }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Choice submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit choice. Please try again.");
    }
  };

  return (
    <div className="vote-content">
      <ToastContainer />
      <div className="today">
        <p className="today-text">{new Date().toLocaleDateString()}</p>
      </div>
      <div className="vote-body">
        <div className="vote-left">
          <div className="vote">
            <p>Votes</p>
          </div>
          {votes.map((vote, index) => (
            <div className="round" key={index} onClick={() => handleVoteClick(vote)}>
              {vote.description}
            </div>
          ))}
        </div>
        <div className="vote-left">
          <div style={{ marginTop: "30px", marginLeft: "10px", marginRight: "20px" }}>
            <div className="information-title">
              <p>Vote Information</p>
            </div>
            {selectedVote && (
              <ul>
                <li>Description:</li>
                <span style={{ color: "orange" }}>{selectedVote.description}</span><br />
                <li>Starting:</li>
                <span style={{ color: "orange" }}>{selectedVote.starting}</span><br />
                <li>Ending:</li>
                <span style={{ color: "orange" }}>{selectedVote.ending}</span><br />
              </ul>
            )}
            <div className="vote-round">
              <div className="round-title">
                <p>Rounds Information</p>
              </div>
              {roundDetails.map((round, index) => (
                <div className="round" key={index}>
                  <p>Description: <span style={{ color: "orange" }}>{round.description}</span></p>
                  <p>Starting: <span style={{ color: "orange" }}>{round.starting}</span></p>
                  <p>Ending: <span style={{ color: "orange" }}>{round.ending}</span></p>
                  <br />
                  <hr />
                  {round.propositions.map((proposition, idx) => (
                    <div key={idx}>
                      <p>Choice {idx + 1}: <span style={{ color: "orange" }}>{proposition.description}</span></p>
                      <input
                        type="radio"
                        name={`choice-${round.id}`}
                        value={proposition.description}
                        onChange={() => handleChoiceChange(round.id, proposition.description)}
                      />
                    </div>
                  ))}
                  <button
                    style={{ color: "red", fontFamily: "fantasy", marginLeft: "40%" }}
                    onClick={() => handleSubmit(round.id)}
                  >
                    Submit
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Votee;
