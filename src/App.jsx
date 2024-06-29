// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './pages/Home';
import Vote from './pages/Vote';
import Votee from './pages/Votee';
import Document from './pages/Document/index.jsx';
import Header from './components/Header';
import Footer from './components/Footer';
import LogIn from './pages/Login/index.jsx';
import LogInBenefactor from './pages/Login/Benefactor.jsx';
import LogInAdmin from './pages/Login/Admin.jsx';
import SignUp from './pages/Register/index.jsx';
import SignUpBenefactor from './pages/Register/indexbenefactor.jsx';
import SignUpAdmin from './pages/Register/indexadmin.jsx';
import Aside from './components/Aside';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatbotComponent from './components/chatbot/ChatbotComponent.jsx';
import Expenditure from './pages/Expenditure/index.jsx';

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

function App() {
  return (
    <Router>
      <div className="App">
        <ChatbotComponent />
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Benefactor" element={<LogInBenefactor />} />
          <Route path="/Benefactor/SignUp" element={<SignUpBenefactor />} />
          <Route path="/Admin" element={<LogInAdmin />} />
          <Route path="/Admin/SignUp" element={<SignUpAdmin />} />
          <Route element={<HeaderLayout />}>
            <Route path="/Expenditure" element={<Expenditure />} />
            <Route path="/Document" element={<Document />} />
            <Route path="/home" element={<Home />} />
            <Route path="/admin/vote" element={<Vote />} />
            <Route path="/vote" element={<Votee />} />
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
      </div>
    </Router>
  );
}

export default App;
