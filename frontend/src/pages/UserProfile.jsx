// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { UserDataContext } from '../context/UserContext';
// import UserNavbar from '../components/profile/UserNavbar';
// import { MapPin, Mail, Phone, Calendar, Clock } from 'lucide-react';

// const UserProfile = () => {
//   const { user } = useContext(UserDataContext);
  
//   const profile = {
//     name: user.profile?.name || 'John Doe',
//     email: user.profile?.email || 'john.doe@example.com',
//     phone: '+1 234 567 8900',
//     address: '123 Main Street, New York, NY 10001',
//     bio: 'Looking for reliable service providers in my area.'
//   };

//   const recentBooking = {
//     serviceName: 'Home Cleaning',
//     providerName: 'CleanPro Services',
//     date: 'Dec 20, 2024',
//     time: '10:00 AM',
//     status: 'Completed'
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Navbar Component */}
//       <UserNavbar/>

//       {/* Blue Hero Section */}
//       <div className="bg-blue-600 py-16">
//         <div className="max-w-7xl mx-auto px-4 text-center">
//           <h1 className="text-4xl font-bold text-white mb-2">My Profile</h1>
//           <p className="text-blue-100">Manage your account and preferences</p>
//         </div>
//       </div>

//       {/* Profile Content */}
//       <div className="max-w-4xl mx-auto px-4 -mt-8">
//         <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//           <div className="flex items-center gap-4 mb-6">
//             <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
//               <span className="text-2xl font-bold text-blue-600">
//                 {profile.name.charAt(0)}
//               </span>
//             </div>
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
//               <p className="text-gray-500">User Account</p>
//             </div>
//           </div>

//           <div className="grid md:grid-cols-2 gap-6">
//             <div>
//               <label className="text-sm text-gray-500 mb-1 block">Full Name</label>
//               <p className="text-gray-800 font-medium">{profile.name}</p>
//             </div>
            
//             <div>
//               <label className="text-sm text-gray-500 mb-1 block flex items-center gap-1">
//                 <Mail className="w-4 h-4" /> Email
//               </label>
//               <p className="text-gray-800 font-medium">{profile.email}</p>
//             </div>

//             <div>
//               <label className="text-sm text-gray-500 mb-1 block flex items-center gap-1">
//                 <Phone className="w-4 h-4" /> Phone
//               </label>
//               <p className="text-gray-800 font-medium">{profile.phone}</p>
//             </div>

//             <div>
//               <label className="text-sm text-gray-500 mb-1 block flex items-center gap-1">
//                 <MapPin className="w-4 h-4" /> Address
//               </label>
//               <p className="text-gray-800 font-medium">{profile.address}</p>
//             </div>

//             <div className="md:col-span-2">
//               <label className="text-sm text-gray-500 mb-1 block">Bio</label>
//               <p className="text-gray-800">{profile.bio}</p>
//             </div>
//           </div>
//         </div>

//         {/* Recent Bookings Section */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Bookings</h3>
          
//           <div className="border border-gray-200 rounded-lg p-4 mb-4">
//             <div className="flex justify-between items-start mb-3">
//               <div>
//                 <h4 className="text-lg font-semibold text-gray-800">{recentBooking.serviceName}</h4>
//                 <p className="text-gray-600">{recentBooking.providerName}</p>
//               </div>
//               <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
//                 {recentBooking.status}
//               </span>
//             </div>
//             <div className="flex gap-4 text-sm text-gray-600">
//               <div className="flex items-center gap-1">
//                 <Calendar className="w-4 h-4" />
//                 {recentBooking.date}
//               </div>
//               <div className="flex items-center gap-1">
//                 <Clock className="w-4 h-4" />
//                 {recentBooking.time}
//               </div>
//             </div>
//           </div>

//           <div className="text-center">
//             <Link 
//               to="/"
//               className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
//             >
//               Find More Services
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;



import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import ProfileNavbar from "../components/profile/UserNavbar";
import { Mail, Phone, MapPin, Calendar, Clock } from "lucide-react";

const UserProfile = () => {
  const { user } = useContext(UserDataContext);

  const profile = {
    name: user?.profile?.name || "John Doe",
    email: user?.profile?.email || "john.doe@example.com",
    phone: "+1 234 567 8900",
    address: "123 Main Street, New York, NY 10001",
    bio: "Looking for reliable service providers in my area.",
  };

  const recentBooking = {
    serviceName: "Home Cleaning",
    providerName: "CleanPro Services",
    date: "Dec 20, 2024",
    time: "10:00 AM",
    status: "Completed",
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Profile Navbar */}
      <ProfileNavbar />

      {/* Hero */}
      <section className="bg-blue-600 py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            My Profile
          </h1>
          <p className="text-blue-100 mt-1">
            Manage your account and preferences
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 -mt-10 pb-12">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600">
              {profile.name.charAt(0)}
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-semibold text-gray-800">
                {profile.name}
              </h2>
              <p className="text-gray-500">User Account</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <Info label="Full Name" value={profile.name} />
            <Info icon={<Mail size={16} />} label="Email" value={profile.email} />
            <Info icon={<Phone size={16} />} label="Phone" value={profile.phone} />
            <Info
              icon={<MapPin size={16} />}
              label="Address"
              value={profile.address}
            />
            <div className="sm:col-span-2">
              <Info label="Bio" value={profile.bio} />
            </div>
          </div>
        </div>

        {/* Recent Booking */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Bookings
          </h3>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  {recentBooking.serviceName}
                </h4>
                <p className="text-gray-600">
                  {recentBooking.providerName}
                </p>
              </div>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                {recentBooking.status}
              </span>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Calendar size={14} /> {recentBooking.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} /> {recentBooking.time}
              </span>
            </div>
          </div>

          <div className="text-center mt-6">
            <Link
              to="/"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Find More Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value, icon }) => (
  <div>
    <label className="text-sm text-gray-500 flex items-center gap-1 mb-1">
      {icon} {label}
    </label>
    <p className="text-gray-800 font-medium">{value}</p>
  </div>
);

export default UserProfile;
