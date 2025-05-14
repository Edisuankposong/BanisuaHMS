import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { 
  Menu, Bell, Search, UserCircle, LogOut, Settings, ChevronDown 
} from 'lucide-react';

interface TopBarProps {
  toggleSidebar: () => void;
}

const TopBar = ({ toggleSidebar }: TopBarProps) => {
  const { user, logout } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Mock notifications
  const notifications = [
    { id: 1, message: 'New patient registered', time: '5 min ago', read: false },
    { id: 2, message: 'Dr. Johnson updated a prescription', time: '1 hour ago', read: false },
    { id: 3, message: 'Appointment reminder: Sarah Miller at 2:00 PM', time: '3 hours ago', read: true },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none lg:hidden"
            onClick={toggleSidebar}
          >
            <Menu size={20} />
          </button>

          {/* Search */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-4 py-2 w-80 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Search patients, appointments..."
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              className="p-1.5 text-gray-500 bg-gray-100 rounded-full hover:text-primary-600 hover:bg-gray-200 relative"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <Bell size={20} />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-danger-500"></span>
              )}
            </button>

            {/* Notifications dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-10 border border-gray-200 animate-fade-in">
                <div className="px-4 py-2 border-b border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                </div>
                <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map(notification => (
                      <div key={notification.id} className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}>
                        <p className="text-sm text-gray-800">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))
                  ) : (
                    <p className="px-4 py-3 text-sm text-gray-500">No new notifications</p>
                  )}
                </div>
                <div className="px-4 py-2 border-t border-gray-200">
                  <a href="#" className="text-xs text-primary-600 hover:text-primary-700 font-medium">
                    View all notifications
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* User menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img
                className="h-8 w-8 rounded-full object-cover"
                src={user?.profileImage || "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150"}
                alt="User"
              />
              <span className="hidden md:block text-sm font-medium">
                {user?.name || "User"}
              </span>
              <ChevronDown size={16} />
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10 border border-gray-200 animate-fade-in">
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  <UserCircle size={16} className="mr-2" />
                  My Profile
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  <Settings size={16} className="mr-2" />
                  Settings
                </Link>
                <button
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => {
                    logout();
                    setDropdownOpen(false);
                  }}
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;