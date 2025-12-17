import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SProtectRouter = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/api/home/sprovider/profile", {
      withCredentials: true
    })
    .then(() => setIsAuth(true))
    .catch(() => setIsAuth(false))
    .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Checking authentication...</p>;

  return isAuth ? children : <Navigate to="/service-provider-login" />;
};

export default SProtectRouter;
