import { useState } from "react";
import Activity from "../Activity";
import Task from "../Task";
import "./activities.css";

const Activities = ({ category }) => {
  const [selectedActivity, setSelectedActivity] = useState(null);

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
  };

  // Helper function to generate empty activities
  const makeEmptyActivities = (num) => {
    return Array.from({ length: num }, (_, index) => (
      <Activity key={`empty-${index}`} activity={null} onClick={() => {}} />
    ));
  };

  // Calculate the number of empty activities needed
  const activitiesToDisplay = [
    ...category.activity,
    ...makeEmptyActivities(Math.max(0, 3 - category.activity.length))
  ];
  return (
<div className="past">
    <div className="card-title">
      <p>{category.title}</p>
    </div>
      <div className="activities">
        {activitiesToDisplay.map((item, index) => (
          <Activity
            key={index}
            activity={item}
            onClick={() => handleActivityClick(item)}
          />
        ))}
      </div>
      <div className="tasks">
        {selectedActivity && <Task activity={selectedActivity} />}
      </div>
    </div>
  );
};

export default Activities;
