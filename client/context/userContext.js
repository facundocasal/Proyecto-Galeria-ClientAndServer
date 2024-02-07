import { useRouter } from 'next/router';
import {
  createContext, useState, useContext, useEffect,
} from 'react';

export const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [flagReload, setFlagReload] = useState(false);
  const [acept, setAcept] = useState(true);

  const getUserData = () => {
    setUserData({
      userName: localStorage.getItem('user_name'),
      accessToken: localStorage.getItem('accessToken'),
    });
  };

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      getUserData();
    }
  }, [flagReload]);

  return (
    <UserContext.Provider value={{
      acept, setAcept, userData, setUserData, flagReload, setFlagReload,
    }}>
      { children }
    </UserContext.Provider>
  );
};
