import { useEffect, useState } from "react"
import "./signin.css"
import logo from "/image/logo.png"
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import api from '.../api';

const LogInAdmin = () => {

  const text="Companion"
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate("/home");
    }
    let timeout;
    if (index < text.length) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex(index + 1);
      }, 300); // Adjust delay here (in milliseconds)
    } else {
      // Reset after completion
      timeout = setTimeout(() => {
        setDisplayedText('');
        setIndex(0);
      }, 3000); // Delay before restarting (in milliseconds)
    }

    return () => clearTimeout(timeout); // Cleanup timeout on component unmount or before the next run
  }, [index, text]);

  const [email, setEmail]=useState("")

  const [password, setPassword]=useState("")

  const [key, setKey]=useState("")


  const VITE_URL_API = import.meta.env.VITE_URL_API;
  // const LOCALHOST_API=import.meta.env.LOCALHOST_API;

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = { email, password }
    data = JSON.stringify(data);

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://projet-annuel-q1r6.onrender.com/admin/login`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios.request(config)
        .then((response) => {
            if (response.status === 200) {
                console.log(response.data);
                console.log(response.data.token);
                setEmail("");
                setPassword("");
                toast.success("Enregistré");
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('status', response.data.admin.status.description);
                localStorage.setItem('name', response.data.admin.name);
                localStorage.setItem('id', response.data.admin.id);
                setTimeout(() => {
                    navigate("/home");
                }, 3000);
            }
        })
        .catch((error) => {
            const errorMessage = error.response?.data?.message ||
            'An error occurred';
            toast.error(errorMessage);
        }
        )
}

  return (
    <div className="container signin row">
      <div className="signin-left col">
      <div className="title-signin">
      {displayedText}
      </div>
      <div className="title-logo">
        <img src={logo} alt="logo" />
      </div>
      </div>
      <div className="signin-right col">
      <h1 className="signin-right-title">Connexion</h1>

      <form className="formGroup" onSubmit={handleSubmit}>
                <div className="inputGroup">
                    <label className="form-label mt-4" htmlFor="email">Email</label>
                    <input
                        id="email"
                        aria-label="Enter Email"
                        className="form-control"
                        type="email"
                        name="email"
                        placeholder="Enter Email"
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
                        placeholder="Enter Password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        required="required"
                    />
                </div>
                {/* <div className="inputGroup">
                    <label className="form-label mt-4" htmlFor="password">Key</label>
                    <input
                        id="key"
                        aria-label="Enter Status Key"
                        className="form-control"
                        type="password"
                        name="key"
                        placeholder="Enter Status Key"
                        onChange={(e) => {
                            setKey(e.target.value);
                        }}
                        required="required"
                    />
                </div> */}
                <div className="form-footer">
                    <input
                        className="submitButton"
                        type="submit"
                        aria-label="Se connecter" />
                </div><br></br>
                <div className="form-footer2">
                  <Link to="/admin/signUp">Create a new admin account</Link>
                </div>
            </form >
      </div>
    </div>
  )
}

export default LogInAdmin
