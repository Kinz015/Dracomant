import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [userData, setUserData] = useState(false);
  const [login, setLogin] = useState(false);
  const [userId, setUseId] = useState(null);
  const [username, setUsername] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [avatar, setAvatar] = useState(null)
  
  const clear = () => {
    setUsername(null);
    setUserEmail(null);
    setAvatar(null);
    setLogin(false);
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,   
        clear,
        login,
        setLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
