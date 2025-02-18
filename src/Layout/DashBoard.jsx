import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import { FiMenu, FiHome, FiUser, FiSettings, FiLogOut, FiFileText, FiDollarSign, FiUsers, FiUserPlus, FiMessageSquare, FiMoon, FiSun } from 'react-icons/fi';
import useAdmin from './../Hooks/useAdmin';
import { useEmployee } from './../Hooks/useEmployee';
import useHR from './../Hooks/useHR';
import LoadingSpinner from './../Components/LoadingSpiner';
import useAuth from '../Hooks/useAuth';
import { FiPieChart } from 'react-icons/fi';
import { useTheme } from '../Provider/ThemeProvider';

const DashBoard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const [isHR, isHRLoading] = useHR();
  const [isAdmin, isAdminLoading] = useAdmin();
  const [isEmployee, isEmployeeLoading] = useEmployee();
  const { user } = useAuth();
  const { isDarkTheme, toggleTheme } = useTheme();

  if (isHRLoading || isAdminLoading || isEmployeeLoading) return <LoadingSpinner />;

  const commonMenuItems = [
    { title: "Home", icon: <FiHome />, path: "/" },
    { title: "Overview", icon: <FiPieChart />, path: "/dashboard/overview" },
    { title: "Profile", icon: <FiUser />, path: "/dashboard/profile" },
    { title: "Settings", icon: <FiSettings />, path: "/dashboard/settings" }
  ];

  const employeeMenuItems = [
    { title: "Work Sheet", icon: <FiFileText />, path: "/dashboard/work-sheet" },
    { title: "Payment History", icon: <FiDollarSign />, path: "/dashboard/payment-history" }
  ];

  const hrMenuItems = [
    { title: "Employee Sheet", icon: <FiUsers />, path: "/dashboard/employee-list" },
    { title: "Employee Progress", icon: <FiFileText />, path: "/dashboard/progress" }
  ];

  const adminMenuItems = [
    { title: "All Employee", icon: <FiUserPlus />, path: "/dashboard/all-employee" },
    { title: "Payroll", icon: <FiDollarSign />, path: "/dashboard/payroll" },
    { title: "Messages", icon: <FiMessageSquare />, path: "/dashboard/messages" }
  ];

  const menuItems = [
    ...commonMenuItems,
    ...(isEmployee ? employeeMenuItems : []),
    ...(isHR && !isAdmin && !isEmployee ? hrMenuItems : []),
    ...(isAdmin ? adminMenuItems : [])
  ];

  const sidebarVariants = {
    open: { width: "300px" },
    closed: { width: "88px" }
  };

  return (
    <>
     {location.pathname === '/dashboard' && (
        <Navigate to="/dashboard/profile" replace={true} />
      )}
    <div className="flex justify-center w-full bg-gray-100">
      <div className={`relative flex min-h-screen w-full max-w-7xl mx-auto ${isDarkTheme ? 'bg-gray-900 pr-[88px]' : 'bg-gray-50'} transition-colors duration-300`}>
        {/* Sidebar Container */}
        <div className="fixed left-0 right-0 mx-auto max-w-7xl">
          {/* Actual Sidebar */}
          <motion.div 
            variants={sidebarVariants}
            animate={isOpen ? "open" : "closed"}
            className={`fixed left-auto h-screen ${
              isDarkTheme ? 'bg-gray-800' : 'bg-white'
            } shadow-xl z-30 transition-colors duration-300`}
          >
            {/* Logo Area */}
            <div className={`p-4 border-b ${isDarkTheme ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between`}>
              {isOpen && <h1 className={`text-xl font-bold ${isDarkTheme ? 'text-purple-400' : 'text-purple-600'}`}>Dashboard</h1>}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-3 rounded-lg ${
                  isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                } transition-colors`}
              >
                <FiMenu className={`max-w-6  ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-2 p-4">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 p-[10px] rounded-lg transition-all duration-300 ${
                      location.pathname === item.path
                        ? isDarkTheme 
                          ? 'bg-purple-900/50 text-purple-400'
                          : 'bg-purple-100 text-purple-600'
                        : isDarkTheme
                          ? 'text-gray-400 hover:bg-gray-700'
                          : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {isOpen && <span className="font-medium">{item.title}</span>}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* User Profile Section */}
            <motion.div
              className={`absolute bottom-0 left-0 right-0 border-t ${
                isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <img
                    src={user?.photoURL}
                    alt="User"
                    className={`max-w-10 rounded-full border-2 ${
                      isDarkTheme ? 'border-purple-400' : 'border-purple-200'
                    }`}
                  />
                  {isOpen && (
                    <div className="flex flex-col">
                      <span className={`font-medium ${isDarkTheme ? 'text-gray-200' : 'text-gray-800'}`}>
                        {user?.displayName}
                      </span>
                      <span className={`text-xs ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                        {user?.email}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div 
          className={`
            flex-1 transition-all duration-300 
            ${isOpen ? 'ml-[300px]' : ' ml-[88px]'}
            w-full
          `}
        >
          <header className={`${
            isDarkTheme ? 'bg-gray-800' : 'bg-white'
          } shadow-sm py-4 px-6 mb-6 transition-colors duration-300`}>
            <div className="flex items-center justify-between">
              <h1 className={`text-2xl font-semibold ${
                isDarkTheme ? 'text-gray-200' : 'text-gray-800'
              }`}>
                {menuItems.find(item => item.path === location.pathname)?.title || "Dashboard"}
              </h1>
              <div className="flex items-center gap-4">
                <button 
                  onClick={toggleTheme}
                  className={`p-2 rounded-full ${
                    isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  {isDarkTheme ? (
                    <FiSun className="text-gray-400" />
                  ) : (
                    <FiMoon className="text-gray-600" />
                  )}
                </button>
                
                <button className={`p-2 rounded-full ${
                  isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}>
                  <FiSettings className={`${
                    isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                  }`} />
                </button>
              </div>
            </div>
          </header>
          <main className="px-3 md:px-6 pb-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
    </>
  );
};

export default DashBoard;