import "./task.css";

const Task = ({ activity }) => {
  return (
    <div className="tasks">
      <div className="task-title">
        <p>Tasks</p>
      </div>
      <div className="task-list">
        <ul>
          {activity.tasks.map((item, index) => (
            <li key={index} className="task-item">
              <label htmlFor={item.name}>{item.name}</label>
              <input type="checkbox" name="task" id={item.name} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Task;
