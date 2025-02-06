import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [login, setLogin] = useState(false);
  const [userId, setUseId] = useState(null)
  const [userData, setUserData] = useState(false)
  const [username, setUsername] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [avatar, setAvatar] = useState(null)

  const logou = (userData) => {
    setUserData(userData)
    setUsername(userData.nome);
    setUserEmail(userData.email);
    setUseId(userData.id)
    setLogin(true)
    if (userData.avatar) {
      setAvatar(userData.avatar)
    }
  }
  
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
        logou,
        setUserData,
        userId,
        username,
        setUsername,
        avatar,
        setAvatar,
        login,
        setLogin,
        userEmail,
        setUserEmail,
        clear,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
