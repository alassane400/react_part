import "./header.css"

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
        <img src="image/logo-bell.png" alt="" />
      </div>
      <div className="profile">
        <img src="image/logo-avatar.png" alt="" />
        <span className="profile-name">John D.</span>
      </div>
     </div>

    </div>
  )
}

export default Header
