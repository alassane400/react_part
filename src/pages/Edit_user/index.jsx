  return (
    <div className="container row edit-wrap">
      <div className="profile-left">
        <div className="profile-image">
          <img src="/image/logo-avatar.png" alt="Profile Image" />
        </div>
        <div>
          <table>
            <tr><td style={{fontSize:"40px",color:"orange"}}>{localStorage.getItem('name')}</td></tr>
            <tr><td>{localStorage.getItem('status')}</td></tr>
          </table>
        </div>
      </div>
      <div className="profile-right">
        <h1 className="signin-right-title">Edit Profile</h1>

        <form className="formGroup edit-center" onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label className="form-label mt-4" htmlFor="name">Name</label>
            <input
              id="name"
              aria-label="Enter Name"
              className="form-control"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="inputGroup">
            <label className="form-label mt-4" htmlFor="email">Email</label>
            <input
              id="email"
              aria-label="Enter Email"
              className="form-control"
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              
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
              placeholder="Enter a new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="inputGroup">
            <label className="form-label mt-4" htmlFor="password" style={{color:"red"}}>Actual password</label>
            <input
              id="password"
              aria-label="Enter Password"
              className="form-control"
              type="password"
              name="password"
              placeholder="Enter your actual password"
              value={actual_password}
              onChange={(e) => setApassword(e.target.value)}
              required
            />
          </div>
          <div className="form-footer">
            <input
              className="submitButton"
              type="submit"
              aria-label="Submit"
            />
          </div>
          <br />
        </form>
      </div>
    </div>
  );
};

export default EditUser;

