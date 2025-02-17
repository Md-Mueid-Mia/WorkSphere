// import React, { useState } from "react";
// import { Sidebar } from "primereact/sidebar";
// import { Button } from "primereact/button";
// import { Ripple } from "primereact/ripple";
// import logo from "../assets/Logo_Normal-01+(3).png";
// import { Link, Outlet } from "react-router-dom";
// import useHR from "../Hooks/useHR";
// import useAdmin from "../Hooks/useAdmin";
// import LoadingSpinner from "../Components/LoadingSpiner";
// import { useEmployee } from "../Hooks/useEmployee";
// import { motion } from 'framer-motion';

// const DashBoard = () => {
//   const [visible, setVisible] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);

//   // Custom hooks for role checking
//   const [isHR, isHRLoading] = useHR();
//   const [isAdmin, isAdminLoading] = useAdmin();
//   const [isEmployee,isEmployeeLoading] = useEmployee();
// // console.log("isHR", isHR, "isAdmin", isAdmin, "isEmployee", isEmployee);
//   // Check if roles are loading
//   if (isHRLoading) return <LoadingSpinner />;
//   if (isAdminLoading) return <LoadingSpinner />;
//   if (isEmployeeLoading) return <LoadingSpinner />;

//   // Dropdown toggle handler
//   const toggleDropdown = (dropdownName) => {
//     setActiveDropdown((prev) => (prev === dropdownName ? null : dropdownName));
//   };

//   return (
//     <div>
//       {/* Sidebar Toggle Button */}
//       <Button
//         icon="pi pi-bars"
//         label="Menu"
//         onClick={() => setVisible(true)}
//         className="mb-3 p-5"
//       />

//       {/* Sidebar Component */}
//       <Sidebar visible={visible} onHide={() => setVisible(false)}>
//         <div className="min-h-screen surface-ground">
//           <div className="surface-section h-screen">
//             {/* Logo Section */}
//             <div className="flex align-items-center justify-content-between px-4 pt-3">
//               <span className="font-semibold text-2xl text-primary">
//               <Link to={'/'}>
//       <motion.div 
//         whileHover={{ scale: 1.05 }}
//         className="flex items-center gap-2"
//       >
//         <motion.div
//           initial={{ rotate: -180 }}
//           animate={{ rotate: 0 }}
//           transition={{ duration: 0.5 }}
//           className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold text-xl"
//         >
//           WS
//         </motion.div>
//         <div className="hidden sm:block">
//           <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
//             WorkSphere
//           </h1>
//           <p className="text-xs text-gray-400">Connecting Talents</p>
//         </div>
//       </motion.div>
//     </Link>
//               </span>
//             </div>

//             {/* Sidebar Menu */}
//             <ul className="list-none p-3">
//               {/* Favorites Section */}
//               <li>
//                 <div
//                   className="p-ripple flex align-items-center justify-content-between cursor-pointer p-3"
//                   onClick={() => toggleDropdown("favorites")}
//                 >
//                   <span className="font-medium">FAVORITES</span>
//                   <i
//                     className={`pi ${
//                       activeDropdown === "favorites"
//                         ? "pi-chevron-up"
//                         : "pi-chevron-down"
//                     }`}
//                   ></i>
//                   <Ripple />
//                 </div>

//                 <ul
//                   className={`list-none transition-all duration-300 ease-in-out pl-5 ${
//                     activeDropdown === "favorites"
//                       ? "max-h-40"
//                       : "max-h-0 overflow-hidden"
//                   }`}
//                 >
//                   {/* Employee Links */}
//                   {isEmployee  && (
//                     <>
//                       <Link to="/dashboard/work-sheet">
//                         <li className="p-3 cursor-pointer">Work Sheet</li>
//                       </Link>
//                       <Link to="/dashboard/payment-history">
//                         <li className="p-3 cursor-pointer">Payment History</li>
//                       </Link>
//                     </>
//                   )}

//                   {/* HR Links */}
//                   {isHR && !isAdmin && !isEmployee && (
//                     <>
//                       <Link to="/dashboard/employee-list">
//                         <li className="p-3 cursor-pointer">Employee Sheet</li>
//                       </Link>
//                       <Link to="/dashboard/progress">
//                         <li className="p-3 cursor-pointer">Employee Progress</li>
//                       </Link>
//                     </>
//                   )}

//                   {/* Admin Links */}
//                   {isAdmin && (
//                     <>
//                       <Link to="/dashboard/all-employee-list">
//                         <li className="p-3 cursor-pointer">All Employee List</li>
//                       </Link> 
//                       <Link to="/dashboard/payroll">
//                         <li className="p-3 cursor-pointer">Payroll</li>
//                       </Link>
//                       <Link to="/dashboard/messages">
//                         <li className="p-3 cursor-pointer">Messages</li>
//                       </Link>
//                     </>
//                   )}
//                 </ul>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </Sidebar>

//       {/* Main Content */}
//       <div>
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default DashBoard;


import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FiMenu, FiHome, FiUser, FiSettings, FiLogOut, FiFileText, FiDollarSign, FiUsers, FiUserPlus, FiMessageSquare } from 'react-icons/fi';
import useAdmin from './../Hooks/useAdmin';
import { useEmployee } from './../Hooks/useEmployee';
import useHR from './../Hooks/useHR';
import LoadingSpinner from './../Components/LoadingSpiner';
import useAuth from '../Hooks/useAuth';

const DashBoard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const [isHR, isHRLoading] = useHR();
  const [isAdmin, isAdminLoading] = useAdmin();
  const [isEmployee,isEmployeeLoading] = useEmployee();
  const {user} = useAuth();
// // console.log("isHR", isHR, "isAdmin", isAdmin, "isEmployee", isEmployee);
//   // Check if roles are loading
  if (isHRLoading) return <LoadingSpinner />;
  if (isAdminLoading) return <LoadingSpinner />;
  if (isEmployeeLoading) return <LoadingSpinner />;

  const commonMenuItems = [
    { title: "Home", icon: <FiHome />, path: "/" },
    { title: "Profile", icon: <FiUser />, path: "/dashboard/profile" },
    { title: "Settings", icon: <FiSettings />, path: "/dashboard/settings" }
  ];

  // Role-specific menu items
  const employeeMenuItems = [
    { title: "Work Sheet", icon: <FiFileText />, path: "/dashboard/work-sheet" },
    { title: "Payment History", icon: <FiDollarSign />, path: "/dashboard/payment-history" }
  ];

  const hrMenuItems = [
    { title: "Employee Sheet", icon: <FiUsers />, path: "/dashboard/employee-list" },
    { title: "Employee Progress", icon: <FiFileText />, path: "/dashboard/progress" }
  ];

  const adminMenuItems = [
    { title: "All Employee List", icon: <FiUserPlus />, path: "/dashboard/all-employee-list" },
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
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <div 
        className={`
          fixed left-0 top-0 h-screen bg-white 
          shadow-lg transition-all duration-300 
          ${isOpen ? 'w-72' : 'w-20'}
        `}
      >
        {/* Toggle Button */}
        <div className="p-4 border-b">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <FiMenu className="w-8 h-8" />
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
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                  location.pathname === item.path
                    ? "bg-purple-50 text-purple-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {isOpen && <span>{item.title}</span>}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* User Profile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-0 left-0 right-0 p-4"
        >
          <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
            <img
              src={user?.photoURL}
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            {isOpen && (
              <div className="flex flex-col">
                <span className="font-medium text-gray-800">{user?.displayName}</span>
                <span className="text-sm text-gray-500">{user?.email}</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div 
        className={`
          flex-1 transition-all duration-300
          ${isOpen ? 'ml-64' : 'ml-20'}
        `}
      >
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
