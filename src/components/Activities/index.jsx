import "./activities.css"

const Activities = ({category}) => {
  return (
    <div className="past">
    <div className="card-title">
      <p>{category.title}</p>
    </div>
     {category.activity.map((item)=> >(

     ))}
    <div className="activite">
      <p>Activite Test</p>
    </div>
    <div className="activite mute">
      <p></p>
    </div>
    <div className="activite mute">
      <p></p>
    </div>
    <div className="tasks">
      <div className="task-title">
        <p>Tasks</p>
      </div>
      <div className="task-list">
        <ul>
          <li className="task-item">
            <label htmlFor="t1">
              T1
            </label>
            <input type="checkbox" name="task" id="t1"/>
          </li>
          <li className="task-item">
            <label htmlFor="t1">
              T2
            </label>
            <input type="checkbox" name="task" id="t1"/>
          </li>
          <li className="task-item">
            <label htmlFor="t1">
              T3
            </label>
            <input type="checkbox" name="task" id="t1"/>
          </li>
          <li className="task-item">
            <label htmlFor="t1">
              T4
            </label>
            <input type="checkbox" name="task" id="t1"/>
          </li>
        </ul>
      </div>
    </div>
  </div>
  )
}

export default Activities
