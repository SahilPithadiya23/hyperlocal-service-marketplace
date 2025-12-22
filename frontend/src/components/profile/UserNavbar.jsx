// import React, { useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { UserDataContext } from '../../context/UserContext';
// import { MapPin, User, LogOut } from 'lucide-react';

// const ProfileNavbar = () => {
//   const { user, setUser } = useContext(UserDataContext);
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await fetch("http://localhost:3000/api/auth/logout", {
//         method: "POST",
//         credentials: "include",
//       });

//       setUser({
//         isAuth: false,
//         loading: false,
//         profile: null,
//       });

//       navigate("/user-login");
//     } catch (err) {
//       console.error("Logout failed", err);
//     }
//   };

//   return (
//     <header className="bg-white shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
//         {/* Logo */}
//         <Link to="/" className="flex items-center gap-2">
//           <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
//             <MapPin className="w-5 h-5 text-white" />
//           </div>
//           <span className="text-xl font-bold text-gray-800">LocalServe</span>
//         </Link>

//         {/* Right Side - My Profile & Logout */}
//         <div className="flex items-center gap-4">
//           <Link 
//             to="/profile" 
//             className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition"
//           >
//             <User className="w-5 h-5" />
//             <span className="font-medium">My Profile</span>
//           </Link>
          
//           <button 
//             onClick={handleLogout}
//             className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
//           >
//             <LogOut className="w-4 h-4" />
//             Logout
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default ProfileNavbar;


import { useContext, useState } from "react";
import { Menu, X, MapPin, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../../context/UserContext";

const ProfileNavbar = () => {
  const { user, setUser } = useContext(UserDataContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      setUser({
        isAuth: false,
        loading: false,
        profile: null,
      });

      navigate("/user-login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* SAME WIDTH AS HEADER */}
      <div className="max-w-7xl mx-auto px-4">
        {/* SAME HEIGHT AS HEADER (h-16) */}
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <MapPin className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              LocalServe
            </span>
          </Link>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/profile"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <User className="w-5 h-5 text-black fill-black" />
              <span className="font-medium text-gray-700">
                {user?.profile?.name || "My Profile"}
              </span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-gray-100 rounded-lg"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-700"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-4 mt-4">

              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 text-gray-700"
              >
                <User size={18} />
                My Profile
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-left text-red-600"
              >
                <LogOut size={18} />
                Logout
              </button>

            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default ProfileNavbar;
