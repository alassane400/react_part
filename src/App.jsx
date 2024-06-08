import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignIn from "./pages/SignIn";
import Aside from "./components/Aside";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const HeaderLayout = () => {
    return (
      <div className="layout">
        <Aside />
        <div className="main-content">
          <Header />
          <div className="content">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn/>}/>
        <Route element={<HeaderLayout/>}>
          <Route path="/home" element={<Home/>}/>
        </Route>
      </Routes>
      <Footer />
      <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
    </Router>
  )
}

export default App
