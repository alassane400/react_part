import React from 'react'
import { useState, useEffect } from "react";
import data from "../../data/data.json";
import getdate from "../../utils/getDate.js";

const Admin_file = () => {
  const [today, setToday] = useState();
  useEffect(() => {
    setToday(getdate());
  }, []);

  return (
    <div className="admin_file-content">
      <div className="today">
        <p className="today-text">{today}</p>
      </div>
      <div className="admin_file-body">
        <div className="admin_file-left">
          <div className="dropped">
            <p>Dropped</p>
          </div>
          <div className="blank"></div>
          <div className="blank"></div>
          <div className="blank"></div>
        </div>
        <div className="admin_file-right">
          <div className="admin_file-informations">
            <div className="admin-informations-title">
              <p>Informations</p>
            </div>
            <div className="admin-informations-content">
              <ul>
                <li> Description : </li>
                <li> Dropped at : </li>
                <li> MatriculeBe : </li>
                <li> View it : </li>
              </ul>
            </div>
          </div>
          <div className="admin_file-add-one">
            <div className="admin-add-one-title">
              <p>Add one</p>
            </div>
            <div className="amin-add-one-content">
              <ul>
                <li>Description : </li>
                <li>MatriculeBe : </li>
                <li> Upload the file : </li>
              </ul>
            </div>
            <div className="drop-admin-page">
              <input
              className= "dropButton"
              type="Drop it" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin_file
