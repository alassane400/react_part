import { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
   const [userData, setUserData] = useState();
   const [logged, setLogged] = useState(false);
   const [token, setToken] = useState();

  return (
    <UserContext.Provider
      value={{ userData, token, setToken, logged, setLogged, setUserData}}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
export default UserContext;
