import React, { useContext } from "react";
import { UserDataContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, LogIn } from "lucide-react";
import axios from "axios";

const IsLoginBtn = () => {
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const logOutHandler = async () => {
    try {
      setUser({
        ...user,
        isAuth: false,
      });
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        { withCredentials: true }
      );

      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      {user?.isAuth ? (
        <button
          onClick={logOutHandler}
          className="hover:cursor-pointer px-5 py-2 rounded-lg bg-gray-600 text-white font-medium hover:bg-gray-700 transition"
        >
          <LogOut className="inline-block mr-2" size={16} />
          Logout
        </button>
      ) : (
        <Link
          to="/user-login"
          className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          <LogIn className="inline-block mr-2" size={16} />
          Login
        </Link>
      )}
    </>
  );
};

export default IsLoginBtn;
