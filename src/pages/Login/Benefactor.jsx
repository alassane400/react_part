import { useEffect, useState, useContext } from "react"
import "./signin.css"
import logo from "/image/logo.png"
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";
// <<<<<<< HEAD:src/pages/Login/Benefactor.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import api from '.../api';

const LogInBenefactor = () => {
// =======
// import UserContext from "../../context/userProvider";



// const SignIn = () => {
//   const { setLogged, setUserData, setToken } = useContext(UserContext);
// >>>>>>> c994e0a0bc76902fcc13ec9e20dec62fc4b4b2ba:src/pages/SignIn/index.jsx

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
// <<<<<<< HEAD:src/pages/Login/Benefactor.jsx
        url: `http://localhost:3000/benefactor/login`,
// =======
//         url: `${VITE_URL_API}/login`,
// >>>>>>> c994e0a0bc76902fcc13ec9e20dec62fc4b4b2ba:src/pages/SignIn/index.jsx
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
// <<<<<<< HEAD:src/pages/Login/Benefactor.jsx
                toast.success("Enregistré");
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('status', response.data.other.status.description);
                localStorage.setItem('name', response.data.other.name);
                localStorage.setItem('id', response.data.other.id);
// =======
                // toast.success("Connecté");
                // let user={
                //   email:response.data.other.email,
                //   name:response.data.other.name,
                //   description:response.data.other.description
                // }
                // setUserData(user);
                // setToken(response.data.token);
                // console.log(response);
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
                <div className="form-footer">
                    <input
                        className="submitButton"
                        type="submit"
                        aria-label="Se connecter" />
                </div><br></br>
                <div className="form-footer2">
                  <Link to="/benefactor/signUp">Create a new benefactor account</Link>
                </div>
            </form >
      </div>
    </div>
  )
}

export default LogInBenefactor
