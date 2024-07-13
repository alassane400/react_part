import { useEffect, useState } from "react"
import "./edit_user.css"
import logo from "/image/logo.png"
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { use } from "chai";
// import api from '.../api';

const EditUser= () => {
  const idUser = useParams()
  const [user, setUser] = useState()
  const [email, setEmail]=useState("")

  const [password, setPassword]=useState("")
  const displayedText = "Edit Profile"

  let navigate = useNavigate();

  const VITE_URL_API = import.meta.env.VITE_URL_API;

  useEffect(() => {

    let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${VITE_URL_API}/users/readOneUser?id=${idUser}`,
        headers: {
            "Content-Type": "application/json",
        },
    };

    axios
        .request(config)
        .then((response) => {
            console.log(response);
            setUser(response.data.user);
        })
        .catch((error) => {
            console.log(error);
        });
}, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = { email, password }
    data = JSON.stringify(data);

    console.log(data);
}

  return (
    <div className="container edit row">
      <h1 className="signin-right-title">Edit Profile</h1>

      <form className="formGroup edit-center" onSubmit={handleSubmit}>
                <div className="inputGroup">
                    <label className="form-label mt-4" htmlFor="email">Email</label>
                    <input
                        id="email"
                        aria-label="Enter Email"
                        className="form-control"
                        type="email"
                        name="email"
                        value={user && user.email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        required="required"
                    />
                </div>
                <div className="inputGroup">
                    <label className="form-label mt-4" htmlFor="password">Password</label>
                    <input
                        id="password"
                        aria-label="Enter Password"
                        className="form-control"
                        type="password"
                        name="password"
                        placeholder="Enter actual Password or New one"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        required="required"
                    />
                </div>
                <div className="form-footer">
                    <input
                        className="submitButton"
                        type="submit"
                        aria-label="Valider" />
                </div><br></br>
            </form >
      </div>
  )
}

export default EditUser
