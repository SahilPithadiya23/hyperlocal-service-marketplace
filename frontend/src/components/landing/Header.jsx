// import { useState } from "react";
// import { Menu, X, MapPin } from "lucide-react";
// import { Link } from "react-router-dom";
// import IsLoginBtn from "./IsLoginBtn";

// const Header = () => {
//   const [open, setOpen] = useState(false);

//   return (
//     <header className="sticky top-0 z-50 bg-white shadow-sm">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
          
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-2">
//             <div className="bg-blue-600 p-2 rounded-lg">
//               <MapPin className="text-white w-5 h-5" />
//             </div>
//             <span className="text-xl font-bold text-gray-900">
//               LocalServe
//             </span>
//           </Link>

//           {/* Desktop Menu */}
//           <nav className="hidden md:flex items-center gap-8">
//             <a href="#categories" className="text-gray-700 hover:text-blue-600 transition">
//               Categories
//             </a>
//             <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition">
//               How It Works
//             </a>
//             <a href="#why-us" className="text-gray-700 hover:text-blue-600 transition">
//               Why LocalServe
//             </a>

//             {/* <Link
//               to="/user-login"
//               className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
//             >
//               Login
//             </Link> */}
//           <IsLoginBtn/>
//           </nav>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setOpen(!open)}
//             className="md:hidden text-gray-700"
//           >
//             {open ? <X size={26} /> : <Menu size={26} />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {open && (
//           <div className="md:hidden pb-4">
//             <div className="flex flex-col gap-4 mt-4">
//               <a
//                 href="#categories"
//                 onClick={() => setOpen(false)}
//                 className="text-gray-700 hover:text-blue-600"
//               >
//                 Categories
//               </a>
//               <a
//                 href="#how-it-works"
//                 onClick={() => setOpen(false)}
//                 className="text-gray-700 hover:text-blue-600"
//               >
//                 How It Works
//               </a>
//               <a
//                 href="#why-Choose-localserve"
//                 onClick={() => setOpen(false)}
//                 className="text-gray-700 hover:text-blue-600"
//               >
//                 Why LocalServe
//               </a>

//               <Link
//                 to="/user-login"
//                 onClick={() => setOpen(false)}
//                 className="w-full text-center px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
//               >
//                 Login
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;







import { useContext, useState } from "react";
import { Menu, X, MapPin, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../../context/UserContext";

const Header = () => {
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
      <div className="max-w-7xl mx-auto px-4">
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

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#categories" className="text-gray-700 hover:text-blue-600">
              Categories
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-blue-600">
              How It Works
            </a>
            <a href="#why-us" className="text-gray-700 hover:text-blue-600">
              Why LocalServe
            </a>

            {/* Auth Section */}
            {!user.loading && (
              <>
                {user.isAuth ? (
                  <div className="flex items-center gap-4">
                    <Link to="/profile" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                      <User className="w-5 h-5 text-black fill-black" />
                      <span className="font-medium text-gray-700">{user.profile?.name || "My Profile"}</span>
                    </Link>
                    <button onClick={handleLogout} className="px-3 py-2 text-red-600 hover:bg-gray-100 rounded-lg flex items-center gap-2">
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/user-login"
                    className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Login
                  </Link>
                )}
              </>
            )}
          </nav>

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

              <a href="#categories" className="text-gray-700">
                Categories
              </a>
              <a href="#how-it-works" className="text-gray-700">
                How It Works
              </a>
              <a href="#why-us" className="text-gray-700">
                Why LocalServe
              </a>

              {!user.loading && (
                user.isAuth ? (
                  <>
                    <Link
                      to="/profile"
                      className="text-gray-700"
                      onClick={() => setOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-left text-red-600"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/user-login"
                    className="px-5 py-2 rounded-lg bg-blue-600 text-white text-center"
                  >
                    Login
                  </Link>
                )
              )}

            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

