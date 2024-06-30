import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/Home";
import Vote from "./pages/Vote";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignIn from "./pages/SignIn";
import Aside from "./components/Aside";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Result from "./pages/Result";
import { UserProvider } from "./context/userProvider";
import Payment from "./pages/Payment";
import Admin_file from "./pages/Admin_file";
import Admin_home from "./pages/Admin_home";
import Admin_membergestion from "./pages/Admin_membergestion";


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
      <UserProvider>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route element={<HeaderLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/result" element={<Result/>}/>
          <Route path="/payment" element={<Payment/>}/>
          <Route path="/admin_home" element={<Admin_home/>}/>
          <Route path="/admin_file" element={<Admin_file/>}/>
          <Route path="/admin_membergestion" element={<Admin_membergestion/>}/>
        </Route>
      </Routes>
      </UserProvider>
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
