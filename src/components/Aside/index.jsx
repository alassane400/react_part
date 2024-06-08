import { NavLink } from "react-router-dom";
import "./aside.css"

const Aside = () => {
  return (
    <div className="aside">
    <NavLink to="/" className={({ isActive }) =>
    isActive ? "active" : ""
    }>
    <div className="aside-logo"><img src="image/logo.png" alt="logo" /></div>
      </NavLink>


    <NavLink
    to="/"
    className={({ isActive }) =>
    isActive ? "active" : ""
    }>
    <div className="aside-center"><img src="image/logo-doc.png" alt="doc" /></div>
    </NavLink>

    <NavLink
    to="/"
    className={({ isActive }) =>
    isActive ? "active" : ""
    }>
    <div className="aside-center"><img src="image/logo-calendar.png" alt="calendar" /></div>
    </NavLink>

    <NavLink to="/"
    className={({ isActive }) =>
    isActive ? "active" : ""
    }>
    <div className="aside-center"><img src="image/logo-resources.png" alt="resources" /></div>
    </NavLink>

    <NavLink
    to="/"
    className={({ isActive }) =>
    isActive ? "active" : ""
    }>
     <div className="aside-logout"><img src="image/logo-exit.png" alt="logout" /></div>
      </NavLink>


    </div>

  )
}

export default Aside
