import React from 'react'
import { useState, useEffect } from "react";
import data from "../../data/data.json";
import getdate from "../../utils/getDate.js";
import "./admin_home.css";

const Admin_home = () => {
  const [today, setToday] = useState();
  useEffect(() => {
    setToday(getdate());
  }, []);


  return (
    <div className="admin_home-content">
      <div className="today">
        <p className="today-text">{today}</p>
      </div>
      <div className="admin_home-body">
        <div className="admin_home-sup">
          <div className="account-card">
            <div className="admin-card-left">
              <p>Account</p>
            </div>
            <div className="admin-card-mid">
              <p>25</p>
            </div>
            <div className="admin-card-right">
              <p>€</p>
            </div>
          </div>
          <div className="income-card">
            <div className="admin-card-left">
              <p>Incomes</p>
            </div>
            <div className="admin-card-mid">
              <p>40</p>
            </div>
            <div className="admin-card-right">
              <p>€</p>
            </div>
          </div>
          <div className="expense-card">
            <div className="admin-card-left">
              <p>Expenses</p>
            </div>
            <div className="admin-card-mid">
              <p>15</p>
            </div>
            <div className="admin-card-right">
              <p>€</p>
            </div>
          </div>
          <div className="contribute-card">
            <div className="admin-card-left">
              <p>Contributors</p>
            </div>
            <div className="admin-card-end">
              <p>02</p>
            </div>
          </div>
          <div className="admin-month">
            <p>Apr.</p>
          </div>
        </div>
        <div className="admin_home-mid">
          <table>
            <thead>
              <tr>
                <th className='first-t'>
                </th>
                <th>
                  Contributor
                </th>
                <th>
                  Amount
                </th>
                <th>
                  When
                </th>
                <th>
                  For
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='first-t'>1</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td className='first-t'>2</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
          <div className="admin_home-inf">
            <div className="reminder">
              <div className="reminder-left">
                <img src="logo-bell-adminPage.png" alt="" />
              </div>
              <div className="reminder-right">
                <form>
                  <select name="month">
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="January">January</option>
                    <option value="January">January</option>
                    <option value="January">January</option>
                    <option value="January">January</option>
                    <option value="January">January</option>
                    <option value="January">January</option>
                    <option value="January">January</option>
                    <option value="January">January</option>
                    <option value="January">January</option>
                    <option value="January">January</option>
                  </select>
                  <input type="submit" className='btn-reminder' />
                </form>
              </div>
            </div>
            <div className="expense">
              <div className="expense-sup">
                <p>Initiate an expense</p>
              </div>
              <div className="expense-mid">
                <p>Reason :</p>
                <p>Beneficiary :<span> <img src="logo-drop.png" alt="" /></span></p>
              </div>
              <div className="expense-inf">
                <button>Validate</button>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Admin_home
