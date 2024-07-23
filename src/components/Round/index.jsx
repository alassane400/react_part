import React, { useState } from "react";
import "./round.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Round = () => {
  const [description, setDescription] = useState("");
  const [state, setState] = useState("UNSTARTED");
  const [starting, setStarting] = useState("");
  const [ending, setEnding] = useState("");
  const [proposition, setProposition] = useState("");
  const [showAdditionalComponent, setShowAdditionalComponent] = useState(false);
  const [reloadPage, setReloadPage] = useState(false);

  const handleRoundRegister = async () => {
    const voteId = parseInt(localStorage.getItem("voteId"), 10);
    if (isNaN(voteId)) {
      console.error("Invalid vote");
      return;
    }

    const roundData = { description, starting, ending, voteId };

    try {
      const response = await axios.post("https://projet-annuel-q1r6.onrender.com/round", roundData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.status === 200 || response.status === 201) {
        toast.success("Round successfully create");
        localStorage.setItem('roundId', response.data.id);
      } else {
        toast.error("Failed to create round. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to create round. Please try again.");
    }
  };

  const handlePropositionRegister = async () => {
    const roundId = parseInt(localStorage.getItem("roundId"), 10);
    if (isNaN(roundId)) {
      console.error("Invalid vote");
      return;
    }

    const propoData = { description: proposition, roundId };

    try {
      const response = await axios.post("https://projet-annuel-q1r6.onrender.com/proposition", propoData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.status === 200 || response.status === 201 || response.status === 204) {
        toast.success(response.data);
      } else {
        toast.error(`Unexpected response code: ${response.status}`);
      }
    } catch (error) {
      toast.error("Failed to create Round. Please try again.");
    }
  };

  const handleToggleComponent = () => {
    setShowAdditionalComponent(!showAdditionalComponent);
  };

  const handlePageReload = () => {
    setReloadPage(true);
    window.location.reload();
  };

  if (reloadPage) {
    return null; // This will reload the page
  }

  return (
    <div className="vote-round">
      <ToastContainer />
      <div className="round-title">
        <p>New Round</p>
      </div>
      <div className="question">
        <p>Description:</p>
        <input
          id="description"
          placeholder="Enter description"
          type="text"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        {/* <p> State:</p> */}
        {/* <select
          id="state"
          name="state"
          onChange={(e) => setState(e.target.value)}
          required
        >
          <option value="UNSTARTED">UNSTARTED</option>
          <option value="STARTED">STARTED</option>
          <option value="RUNNING">RUNNING</option>
          <option value="ENDED">ENDED</option>
        </select> */}
        <p> Starting:</p>
        <input
          id="starting"
          type="datetime-local"
          name="starting"
          placeholder="Enter Starting date and time"
          onChange={(e) => setStarting(e.target.value)}
          required
        />
        <p> Ending:</p>
        <input
          id="ending"
          type="datetime-local"
          placeholder="Enter Ending date and time"
          name="ending"
          onChange={(e) => setEnding(e.target.value)}
          required
        />
      </div>
      <div>
        <button
          style={{ color: "orange", marginLeft: "40%", marginTop: "5px", marginBottom: "10px" }}
          onClick={handleRoundRegister}
        >
          Register
        </button>
      </div>
      <div
        style={{
          borderWidth: "1px",
          borderColor: "orange",
          borderRadius: "3px",
          padding: "10px",
        }}
      >
        Proposition:
        <input
          id="proposition"
          placeholder="Enter Proposition"
          type="text"
          name="proposition"
          style={{ margin: "4px", borderRadius: "2px" }}
          onChange={(e) => setProposition(e.target.value)}
          required
        />
        <button
          style={{
            color: "orange",
            borderStyle: "dashed",
            borderWidth: "1px",
            borderColor: "orange",
            padding: "7px",
          }}
          onClick={handlePropositionRegister}
        >
          Drop it
        </button>
        <button
          style={{
            color: "orange",
            fontSize: "25px",
            padding: "1px",
            margin: "2px",
          }}
          onClick={handleToggleComponent}
        >
          +
        </button>
        {showAdditionalComponent && (
          <button
            style={{
              color: "orange",
              borderStyle: "dashed",
              borderWidth: "1px",
              borderColor: "orange",
              padding: "7px",
            }}
            onClick={handlePropositionRegister}
          >
            Drop it
          </button>
        )}
      </div>
      <button
        style={{ marginLeft: "45%", color: "red", fontFamily: "fantasy" }}
        onClick={handlePageReload}
      >
        C L O S E
      </button>
    </div>
  );
};

export default Round;
