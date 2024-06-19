import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from "./pages/Home";
import DocumentAdmin from "./pages/Document/index.jsx";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LogIn from "./pages/Login/index.jsx";
import LogInBenefactor from "./pages/Login/Benefactor.jsx";
import LogInAdmin from "./pages/Login/Admin.jsx";
import SignUp from "./pages/Register/index.jsx";
import SignUpBenefactor from "./pages/Register/indexbenefactor.jsx";
import SignUpAdmin from "./pages/Register/indexadmin.jsx";
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
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Benefactor" element={<LogInBenefactor />} />
        <Route path="/Benefactor/SignUp" element={<SignUpBenefactor />} />
        <Route path="/Admin" element={<LogInAdmin />} />
        <Route path="/Admin/SignUp" element={<SignUpAdmin />} />
        <Route element={<HeaderLayout />}>
          <Route path="/admin/Document" element={<DocumentAdmin />} />
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
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
  );
}

export default App;
