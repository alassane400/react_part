import React from 'react'
import { useState, useEffect } from "react";
import data from "../../data/data.json";
import getdate from "../../utils/getDate.js";
import "./admin_membergestion.css";


const Admin_membergestion = () => {
  const [today, setToday] = useState();
  useEffect(() => {
    setToday(getdate());
}, []);

return (
  <div className="gestion-body">
    <div className="gestion-body-sup">
      <table>
            <thead>
              <tr>
                <th className='first-t'>
                </th>
                <th>
                  Personal
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
    <div className="gestion-body-inf">
    <table>
            <thead>
              <tr>
                <th className='first-t'>

                </th>
                <th>
                  Beneficiary
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
  </div>
)
}
export default Admin_membergestion
