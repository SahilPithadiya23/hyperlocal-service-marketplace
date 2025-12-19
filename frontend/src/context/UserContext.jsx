import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    isAuth: false,
    loading: true,
    profile: null,
  });

  // 🔑 Restore auth after reload
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/home/user/profile", {
        withCredentials: true,
      })
      .then((res) => {
        setUser({
          isAuth: true,
          loading: false,
          profile: res.data.user,
        });
      })
      .catch(() => {
        setUser({
          isAuth: false,
          loading: false,
          profile: null,
        });
      });
  }, []);

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
