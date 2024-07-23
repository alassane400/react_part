import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./vote.css";
import Round from "../../components/Round/index.jsx";
import axios from "axios";

const Vote = () => {
  const [starting, setStarting] = useState("");
  const [ending, setEnding] = useState("");
  const [rounds, setRounds] = useState(1);
  const [description, setDescription] = useState("");
  const [votes, setVotes] = useState([]);
  const [selectedVote, setSelectedVote] = useState(null);
  const [roundDetails, setRoundDetails] = useState([]);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const response = await axios.get("https://projet-annuel-q1r6.onrender.com/votes", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (response.data && Array.isArray(response.data.votes)) {
          setVotes(response.data.votes);
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
    if (!starting || !ending || !rounds || !description) {
      toast.error("Please fill all the fields.");
      return;
    }

    const voteData = { starting, ending, rounds, description };

    try {
      const response = await axios.post("https://projet-annuel-q1r6.onrender.com/vote", voteData, {
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
      const roundsResponse = await axios.get(`https://projet-annuel-q1r6.onrender.com/rounds/${vote.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const rounds = roundsResponse.data;
      const roundsWithPropositions = await Promise.all(
        rounds.map(async (round) => {
          const propositionsResponse = await axios.get(`https://projet-annuel-q1r6.onrender.com/propositions/${round.id}`, {
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
        <div className="vote-right">
          <div style={{ marginTop: "30px", marginLeft: "10px", marginRight: "20px" }}>
            <div className="information-title">
              <p>Vote Informations</p>
            </div>
            {selectedVote && (
              <ul>
                <li>Description:</li>
                <span style={{ color: "orange" }}>{selectedVote.description}</span><br />
                <li>Starting:</li>
                <span style={{ color: "orange" }}>{selectedVote.starting}</span><br />
                <li>Ending:</li>
                <span style={{ color: "orange" }}>{selectedVote.ending}</span><br />
                <li>No:</li>
                <span style={{ color: "orange" }}>{selectedVote.id}</span><br />
              </ul>
            )}
            <div className="vote-round">
              <div className="round-title">
                <p>Rounds Informations</p>
              </div>
              {roundDetails.map((round, index) => (
                <div className="round" key={index}>
                  <p>Description: <span style={{ color: "orange" }}>{round.description}</span></p>
                  <p>Starting: <span style={{ color: "orange" }}>{round.starting}</span></p>
                  <p>Ending: <span style={{ color: "orange" }}>{round.ending}</span></p>
                  <br></br>
                  <hr></hr>
                  {round.propositions.map((proposition, index) => (
                    <p key={index}><span style={{ color: "orange" }}>Choix {index + 1}:</span>{proposition.description}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="vote-informations">
            <div className="information-title">
              <p>New Vote</p>
            </div>
            <ul>
              <li>Starting:</li>
              <input
                id="starting"
                type="datetime-local"
                name="starting"
                placeholder="Enter Starting date and time"
                onChange={(e) => setStarting(e.target.value)}
                required
              />
              <li>Ending:</li>
              <input
                id="ending"
                type="datetime-local"
                placeholder="Enter Ending date and time"
                name="ending"
                onChange={(e) => setEnding(e.target.value)}
                required
              />
              <li>Rounds:</li>
              <input
                id="rounds"
                placeholder="Enter the number of rounds"
                type="number"
                name="number"
                onChange={(e) => setRounds(e.target.value)}
                required
              />
              <li>Description:</li>
              <input
                id="description"
                placeholder="Enter description"
                type="text"
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </ul>
            <div>
              <button className="drop-btn" onClick={handleRegister}>Register</button>
            </div>
            <Round />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vote;
