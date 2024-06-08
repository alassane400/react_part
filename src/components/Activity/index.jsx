import { useState, useEffect } from "react";
import "./activity.css";

const Activity = ({ activity, onClick }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (activity !== undefined) {
      setIsActive(true);
    }
  }, [activity]);

  return (
    <div className={isActive ? "activite" : "activite mute"} onClick={onClick}>
      <p>{activity.name}</p>
    </div>
  );
};

export default Activity;
