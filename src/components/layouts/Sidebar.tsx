import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { 
  X, Home, Users, CalendarClock, Stethoscope, FileText, 
  Receipt, Pill, FlaskConical, Bed, FileBarChart, Calendar as CalendarIcon,
  Files 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar = ({ isOpen, closeSidebar }: SidebarProps) => {
  const { user } = useAuthStore();

  const navLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
      isActive
        ? 'text-white bg-primary-600 hover:bg-primary-700'
        : 'text-gray-700 hover:bg-gray-100'
    }`;
  };

  // Define navigation items based on user role
  const getNavItems = () => {
    const items = [
      { to: '/dashboard', icon: <Home size={20} />, text: 'Dashboard', roles: ['all'] },
      { to: '/patients', icon: <Users size={20} />, text: 'Patients', roles: ['all'] },
      { to: '/appointments', icon: <CalendarClock size={20} />, text: 'Appointments', roles: ['all'] },
      { to: '/doctors', icon: <Stethoscope size={20} />, text: 'Doctors & Staff', roles: ['admin', 'receptionist'] },
      { to: '/prescriptions', icon: <FileText size={20} />, text: 'Prescriptions', roles: ['admin', 'doctor', 'nurse', 'pharmacist'] },
      { to: '/billing', icon: <Receipt size={20} />, text: 'Billing', roles: ['admin', 'receptionist'] },
      { to: '/pharmacy', icon: <Pill size={20} />, text: 'Pharmacy', roles: ['admin', 'pharmacist'] },
      { to: '/laboratory', icon: <FlaskConical size={20} />, text: 'Laboratory', roles: ['admin', 'lab_technician', 'doctor'] },
      { to: '/wards', icon: <Bed size={20} />, text: 'Wards & Beds', roles: ['admin', 'nurse', 'doctor'] },
      { to: '/reports', icon: <FileBarChart size={20} />, text: 'Reports', roles: ['admin', 'doctor'] },
      { 
        to: '/staff/scheduling', 
        icon: <CalendarIcon size={20} />, 
        text: 'Staff Scheduling', 
        roles: ['admin', 'hr'] 
      },
      { 
        to: '/documents', 
        icon: <Files size={20} />, 
        text: 'Documents', 
        roles: ['admin', 'doctor', 'nurse', 'receptionist'] 
      },
    ];

    if (!user) return [];

    return items.filter(item => 
      item.roles.includes('all') || item.roles.includes(user.role)
    );
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart-pulse">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/>
              </svg>
              <span className="text-lg font-semibold text-gray-900">MedCore HMS</span>
            </div>
            <button
              className="p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 lg:hidden"
              onClick={closeSidebar}
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={navLinkClass}
                end={item.to === '/dashboard'}
              >
                {item.icon}
                <span className="ml-3">{item.text}</span>
              </NavLink>
            ))}
          </nav>

          {/* Sidebar footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={user?.profileImage || "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150"}
                  alt="User"
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{user?.name || "User"}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role || "Role"}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;