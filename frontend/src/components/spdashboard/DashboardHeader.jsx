import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, MessageCircle, User, LogOut } from "lucide-react";

const DashboardHeader = ({ providerName }) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      navigate('/service-provider-login');
    } catch (e) {
      console.error('Logout failed', e);
      navigate('/service-provider-login');
    }
  };

  // Dummy notifications data - only customer messages
  const [notifications] = useState([
    {
      id: 1,
      title: "New message from Priya Patel",
      message: "Hi, can you come tomorrow for the plumbing work?",
      time: "5 minutes ago",
      read: false,
      type: "message",
      customerName: "Priya Patel",
      serviceType: "Plumbing"
    },
    {
      id: 2,
      title: "Message from Amit Sharma",
      message: "Thank you for fixing my AC! Working perfectly now.",
      time: "1 hour ago",
      read: false,
      type: "message",
      customerName: "Amit Sharma",
      serviceType: "AC Repair"
    },
    {
      id: 3,
      title: "New message from Rahul Verma",
      message: "What's your availability for this weekend?",
      time: "2 hours ago",
      read: false,
      type: "message",
      customerName: "Rahul Verma",
      serviceType: "Washing Machine Repair"
    }
  ]);

  return (
    <div className="bg-linear-to-r from-blue-600 to-blue-800 text-white px-4 sm:px-6 lg:px-8 py-4 sm:py-6 rounded-b-3xl shadow-lg">
      <div className="flex flex-col gap-4 sm:gap-6">
        {/* Top Section - Greeting and Icons */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex-1">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-1">
              Hello, {providerName} 👋
            </h1>
            <p className="text-blue-100 text-sm sm:text-base">
              Ready to work today?
            </p>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 order-3 sm:order-2">
            <div className="relative" ref={notificationRef}>
              <span className="absolute -top-2 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium z-10">
                3
              </span>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 sm:p-2.5 bg-white/20 rounded-full hover:bg-white/30 transition"
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Messages</h3>
                    <p className="text-sm text-gray-500">3 unread messages</p>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="p-4 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                            <MessageCircle className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 text-sm">{notification.title}</p>
                            <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs text-gray-400">{notification.time}</span>
                              <span className="text-xs text-blue-600">• {notification.serviceType}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-3 border-t border-gray-200 space-y-2">
                    <button 
                      onClick={() => {
                        setShowNotifications(false);
                        navigate('/service-requests');
                      }}
                      className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium py-2 rounded-lg hover:bg-blue-50 transition"
                    >
                      View All Messages
                    </button>
                    <button 
                      onClick={() => {
                        setShowNotifications(false);
                      }}
                      className="w-full text-center text-sm text-gray-600 hover:text-gray-700 font-medium py-2 rounded-lg hover:bg-gray-50 transition"
                    >
                      Mark All as Read
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => navigate("/profile-settings")}
              className="p-2 sm:p-2.5 bg-white/20 rounded-full hover:bg-white/30 transition"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={handleLogout}
              className="p-2 sm:p-2.5 bg-white/20 rounded-full hover:bg-white/30 transition"
              title="Logout"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
