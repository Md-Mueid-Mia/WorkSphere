// import { motion } from 'framer-motion';
// import { useEffect, useState } from 'react';
// import { Link, NavLink } from 'react-router-dom';
// import useAuth from '../Hooks/useAuth';
// import { toast } from 'react-toastify';
// import { useTheme } from '../Provider/ThemeProvider';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const {user, signOutUser} = useAuth();
  
//   const { theme, toggleTheme } = useTheme()
// const handleLogOut = async ()=>{
//     try {
//         await signOutUser()
//         window.location.href = '/login'
//         toast.success('Logout Successful')
//     } catch (error) {
//         console.log(error)
//     }
// }
// useEffect(() => {
//   // Check for hash in URL when page loads
//   if (window.location.hash === '#services') {
//     setTimeout(() => {
//       document.getElementById('services')?.scrollIntoView({ 
//         behavior: 'smooth' 
//       });
//     }, 100);
//   }
// }, []);
// useEffect(() => {
//   // Check for hash in URL when page loads
//   if (window.location.hash === '#about') {
//     setTimeout(() => {
//       document.getElementById('about')?.scrollIntoView({ 
//         behavior: 'smooth' 
//       });
//     }, 100);
//   }
// }, []);
// useEffect(() => {
//   // Check for hash in URL when page loads
//   if (window.location.hash === '#Choose') {
//     setTimeout(() => {
//       document.getElementById('Choose')?.scrollIntoView({ 
//         behavior: 'smooth' 
//       });
//     }, 100);
//   }
// }, []);
// // Light Mode Colors
// const lightColors = {
//   primary: "bg-gradient-to-r from-blue-600 to-indigo-800", // Main nav background
//   secondary: "",  // Content background
//   accent: "bg-blue-500", // Buttons/highlights
//   text: "text-gray-800", // Main text
//   textLight: "text-gray-600" // Secondary text
// }

// // Dark Mode Colors
// const darkColors = {
//   primary: "bg-gradient-to-r from-gray-900 to-slate-700", // Main nav background
//   secondary: "", // Content background
//   accent: "bg-blue-500", // Buttons/highlights
//   text: "text-white", // Main text
//   textLight: "text-gray-300" // Secondary text
// }
//   const links = (
//     <>
//       <motion.li
//         whileHover={{ scale: 1.1 }}
//         className="mx-2"
//       >
//         <NavLink 
//           to={"/"}
//           className={({ isActive }) =>
//             `px-4 py-2 rounded-lg transition-all duration-300 ${
//               isActive 
//                 ? " text-purple-500 font-semibold" 
//                 : " text-slate-500"
//             }`
//           }
//         >
//           Home
//         </NavLink>
//       </motion.li>
//      {user &&  <motion.li
//         whileHover={{ scale: 1.1 }}
//         className="mx-2"
//       >
//         <NavLink 
//           to={"/dashboard"}
//           className={({ isActive }) =>
//             `px-4 py-2 rounded-lg transition-all duration-300 ${
//               isActive 
//                 ? " text-purple-500  font-semibold" 
//                 : " text-slate-500"
//             }`
//           }
//         >
//           Dashboard
//         </NavLink>
//       </motion.li>}

//       <motion.li
//         whileHover={{ scale: 1.1 }}
//         className="mx-2"
//       >
//      <a
//   onClick={(e) => {
//     e.preventDefault();
//     if (window.location.pathname === '/') {
//       document.getElementById('services')?.scrollIntoView({ 
//         behavior: 'smooth' 
//       });
//     } else {
//       window.location.href = '/#services';
//     }
//   }}
//   className={`
//      cursor-pointer text-slate-500
    
//   `}
// >
// Services
// </a>
//       </motion.li>
//       <motion.li
//         whileHover={{ scale: 1.1 }}
//         className="mx-2"
//       >
//      <a
//   onClick={(e) => {
//     e.preventDefault();
//     if (window.location.pathname === '/') {
//       document.getElementById('about')?.scrollIntoView({ 
//         behavior: 'smooth' 
//       });
//     } else {
//       window.location.href = '/#about';
//     }
//   }}
//   className={`
//     cursor-pointer text-slate-500
   
//  `}
// >
// About Us
// </a>
//       </motion.li>
//       <motion.li
//         whileHover={{ scale: 1.1 }}
//         className="mx-2"
//       >
//      <a
//   onClick={(e) => {
//     e.preventDefault();
//     if (window.location.pathname === '/') {
//       document.getElementById('Choose')?.scrollIntoView({ 
//         behavior: 'smooth' 
//       });
//     } else {
//       window.location.href = '/#Choose';
//     }
//   }}
//   className={`
//     cursor-pointer text-slate-500
   
//  `}
// >
// Why Choose Us
// </a>
//       </motion.li>
      
      
//       <motion.li
//         whileHover={{ scale: 1.1 }}
//         className="mx-2"
//       >
//         <NavLink 
//           to={"/contact-us"}
//           className={({ isActive }) =>
//             `px-4 py-2 rounded-lg transition-all duration-300 ${
//               isActive 
//                 ? " text-purple-500  font-semibold" 
//                 : " text-slate-500"
//             }`
//           }
//         >
//           Contact Us
//         </NavLink>
//       </motion.li>
//     </>
//   );

//   return (
//     <motion.nav 
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       className="fixed w-full top-0 z-50"
//     >
//      <div className="navbar max-w-7xl  px-4 py-2 flex items-center justify-between bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-md">
//   {/* Left Side (Logo) */}
//   <div className=" flex items-center">
//     <Link to={'/'}>
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
//   </div>

//   {/* Center (Navigation Links) */}
//   <div className=" hidden lg:flex justify-center">
//     <ul className="menu menu-horizontal px-1 flex items-center">
//       {links}
//     </ul>
//   </div>

//   {/* Right Side (User Profile / Login Button) */}
//   <div className=" flex justify-end">
//     {user ? (
//       <motion.div whileHover={{ scale: 1.05 }} className="dropdown dropdown-end">
//         <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
//           <div className="w-10 rounded-full ring-2 ring-white/20 hover:ring-white/40 transition-all">
//             <img alt="user photo" referrerPolicy="no-referrer" src={user.photoURL} className="object-cover"/>
//           </div>
//         </div>
//         <motion.ul
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="dropdown-content menu p-2 shadow-lg bg-slate-800/90 backdrop-blur-md rounded-box w-52 mt-4"
//         >
//           <li className="text-white/60 px-4 py-2">{user.displayName}</li>
//           <li>
//             <button 
//               onClick={handleLogOut}
//               className="text-white hover:bg-white/10 rounded-lg transition-all"
//             >
//               Logout
//             </button>
//           </li>
//         </motion.ul>
//       </motion.div>
//     ) : (
//       <Link to="/login" className="btn btn-primary bg-gradient-to-r from-purple-600 to-blue-500 border-none">
//         Login
//       </Link>
//     )}
//   </div>
// </div>


//       {/* Mobile Menu */}
//       <motion.div
//         initial={{ height: 0 }}
//         animate={{ height: isOpen ? "auto" : 0 }}
//         className="lg:hidden overflow-hidden bg-slate-800/90 backdrop-blur-md"
//       >
//         <ul className="menu px-4 py-2">
//           {links}
//         </ul>
//       </motion.div>
//     </motion.nav>
//   );
// };

// export default Navbar;


import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import { toast } from 'react-toastify';
import { useTheme } from '../Provider/ThemeProvider';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {user, signOutUser} = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Combine scroll handlers
  const scrollToSection = (sectionId) => {
    if (window.location.pathname === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  useEffect(() => {
    const sections = ['services', 'about', 'Choose'];
    sections.forEach(section => {
      if (window.location.hash === `#${section}`) {
        setTimeout(() => {
          document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    });
  }, []);

  const handleLogOut = async () => {
    try {
      await signOutUser();
      window.location.href = '/login';
      toast.success('Logout Successful');
    } catch (error) {
      console.log(error);
    }
  };

  const navBackgroundClass = theme === 'dark' 
    ? 'bg-gray-900/95' 
    : 'bg-white/95';

  const textColorClass = theme === 'dark'
    ? 'text-gray-200'
    : 'text-gray-700';

  const linkColorClass = theme === 'dark'
    ? 'text-gray-300 hover:text-white'
    : 'text-gray-600 hover:text-gray-900';

        const links = (
      <>
        {[
          { path: "/", label: "Home" },
          { path: "/dashboard", label: "Dashboard", protected: true },
          { path: "services", label: "Services", isScroll: true },
          { path: "about", label: "About Us", isScroll: true },
          { path: "Choose", label: "Why Choose Us", isScroll: true },
          { path: "/contact-us", label: "Contact Us" }
        ].map((link) => {
          if (link.protected && !user) return null;
    
          const commonClasses = `
            relative px-4 py-2 
            font-medium
            transition-all duration-300
            hover:text-purple-500
            group
          `;
    
          if (link.isScroll) {
            return (
              <motion.li
                key={link.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mx-2"
              >
                <button
                  onClick={() => scrollToSection(link.path)}
                  className={`
                    ${commonClasses}
                    text-slate-500
                    after:content-['']
                    after:absolute
                    after:w-full
                    after:h-0.5
                    after:bg-gradient-to-r
                    after:from-purple-500
                    after:to-blue-500
                    after:left-0
                    after:bottom-0
                    after:rounded-full
                    after:transform
                    after:scale-x-0
                    after:origin-left
                    after:transition-transform
                    after:duration-300
                    group-hover:after:scale-x-100
                  `}
                >
                  {link.label}
                </button>
              </motion.li>
            );
          }
    
          return (
            <motion.li
              key={link.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mx-2"
            >
              <NavLink
                to={link.path}
                className={({ isActive }) => `
                  ${commonClasses}
                  ${isActive ? 'text-purple-500 font-semibold' : 'text-slate-500'}
                  after:content-['']
                  after:absolute
                  after:w-full
                  after:h-0.5
                  after:bg-gradient-to-r
                  after:from-purple-500
                  after:to-blue-500
                  after:left-0
                  after:bottom-0
                  after:rounded-full
                  after:transform
                  after:scale-x-0
                  after:origin-left
                  after:transition-transform
                  after:duration-300
                  group-hover:after:scale-x-100
                  ${isActive && 'after:scale-x-100'}
                `}
              >
                {link.label}
              </NavLink>
            </motion.li>
          );
        })}
      </>
    );
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full top-0 start-0 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-lg' : ''
      }`}
    >
      <div className={`
        ${navBackgroundClass}
        backdrop-blur-md
        transition-all duration-300
      `}>
        <div className=" max-w-7xl mx-auto justify-between px-4 md:px-0 py-2">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to={'/'}>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3"
              >
                <motion.div
                  initial={{ rotate: -180 }}
                  animate={{ rotate: 0 }}
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center"
                >
                  <span className="text-white font-bold text-xl">WS</span>
                </motion.div>
                <div className="hidden sm:block">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                    WorkSphere
                  </h1>
                  <p className={`text-xs ${textColorClass}`}>Connecting Talents</p>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4">
              <ul className="flex items-center space-x-2">
                {links}
              </ul>
              
              {/* Theme Toggle & User Menu */}
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleTheme}
                  className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
                >
                  {theme === 'dark' ? <FiSun className="text-yellow-400" /> : <FiMoon className="text-gray-600" />}
                </motion.button>

                {user ? (
                  <div className="relative">
                    <motion.div whileHover={{ scale: 1.05 }} className="dropdown dropdown-end">
                      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full ring-2 ring-purple-500">
                          <img alt="user photo" src={user.photoURL} className="object-cover" referrerPolicy="no-referrer" />
                        </div>
                      </div>
                      <motion.ul
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`dropdown-content menu p-2 shadow-lg rounded-box w-52 mt-4 ${
                          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                        }`}
                      >
                        <li className={`px-4 py-2 ${textColorClass}`}>{user.displayName}</li>
                        <li>
                          <button 
                            onClick={handleLogOut}
                            className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                          >
                            Logout
                          </button>
                        </li>
                      </motion.ul>
                    </motion.div>
                  </div>
                ) : (
                  <Link 
                    to="/login"
                    className="btn btn-primary bg-gradient-to-r from-purple-600 to-blue-500 text-white border-none hover:opacity-90 transition-opacity"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-md ${textColorClass}`}
              >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className={`lg:hidden ${navBackgroundClass}`}
            >
              <div className="px-4 pt-2 pb-4 space-y-1">
                {links}
                <div className="mt-4 flex items-center justify-between">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleTheme}
                    className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
                  >
                    {theme === 'dark' ? <FiSun className="text-yellow-400" /> : <FiMoon className="text-gray-600" />}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;