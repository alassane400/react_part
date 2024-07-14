import "./header.css";
import {NavLink} from "react-router-dom"

const Header = () => {
  return (
    <div className="header-content">
     <div className="header-left">
      <div className="input-button">
        <img src="image/logo-find.png" alt="" />
        <input type="text" className="search" name="search" placeholder="Search..."/>
      </div>
     </div>
     <div className="header-right">
      <div className="bell">
        <NavLink to='/notification'>
        <img src="image/logo-bell.png" alt="" />
        </NavLink>
      </div>
      <div className="profile">
        <NavLink to='/edit_user'>
        <img src="image/logo-avatar.png" alt="" />
        </NavLink>
        <span className="profile-name">John D.</span>
      </div>
     </div>

    </div>
  )
}

export default Header
