import "./home.css"
import data from "../../data/data.json"
import getdate from "../../utils/getDate.js";
import { useEffect, useState } from "react";

const Home = () => {
  const[today, setToday] = useState()
  useEffect(() => {
    setToday(getdate())
  }, []);
  return (
    <div className="home-content">
      <div className="today">
        <p className="today-text">{today}</p>
      </div>
      <div className="home-body">
        <div className="past">
          <div className="card-title">
            <p>Past</p>
          </div>
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
        <div className="todo">
          <div className="card-title">
            <p>To Do</p>
          </div>
          <div className="activite">
            <p>Organisation Repas</p>
          </div>
          <div className="activite">
            <p></p>
          </div>
          <div className="activite">
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
              </ul>
            </div>
          </div>
        </div>
        <div className="incoming">
          <div className="card-title">
            <p>In Coming</p>
          </div>
          <div className="activite">
          </div>
          <div className="activite">
            <p></p>
          </div>
          <div className="activite">
            <p></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
