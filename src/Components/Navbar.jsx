import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {user, signOutUser} = useAuth();
const handleLogOut = async ()=>{
    try {
        await signOutUser()
        window.location.href = '/login'
        toast.success('Logout Successful')
    } catch (error) {
        console.log(error)
    }
}
  const links = (
    <>
      <motion.li
        whileHover={{ scale: 1.1 }}
        className="mx-2"
      >
        <NavLink 
          to={"/"}
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition-all duration-300 ${
              isActive 
                ? "bg-white/20 text-white font-semibold" 
                : "hover:bg-white/10 text-slate-500"
            }`
          }
        >
          Home
        </NavLink>
      </motion.li>
      <motion.li
        whileHover={{ scale: 1.1 }}
        className="mx-2"
      >
        <NavLink 
          to={"/dashboard"}
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition-all duration-300 ${
              isActive 
                ? "bg-white/20 text-white font-semibold" 
                : "hover:bg-white/10 text-slate-500"
            }`
          }
        >
          Dashboard
        </NavLink>
      </motion.li>
      <motion.li
        whileHover={{ scale: 1.1 }}
        className="mx-2"
      >
        <NavLink 
          to={"/contact-us"}
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition-all duration-300 ${
              isActive 
                ? "bg-white/20 text-white font-semibold" 
                : "hover:bg-white/10 text-slate-500"
            }`
          }
        >
          Contact Us
        </NavLink>
      </motion.li>
    </>
  );

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full top-0 z-50"
    >
     <div className="navbar max-w-7xl  px-4 py-4 flex items-center justify-between bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-md">
  {/* Left Side (Logo) */}
  <div className=" flex items-center">
    <Link to={'/'}>
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-2"
      >
        <motion.div
          initial={{ rotate: -180 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.5 }}
          className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold text-xl"
        >
          WS
        </motion.div>
        <div className="hidden sm:block">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            WorkSphere
          </h1>
          <p className="text-xs text-gray-400">Connecting Talents</p>
        </div>
      </motion.div>
    </Link>
  </div>

  {/* Center (Navigation Links) */}
  <div className=" hidden lg:flex justify-center">
    <ul className="menu menu-horizontal px-1 flex items-center">
      {links}
    </ul>
  </div>

  {/* Right Side (User Profile / Login Button) */}
  <div className=" flex justify-end">
    {user ? (
      <motion.div whileHover={{ scale: 1.05 }} className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full ring-2 ring-white/20 hover:ring-white/40 transition-all">
            <img alt="user photo" referrerPolicy="no-referrer" src={user.photoURL} className="object-cover"/>
          </div>
        </div>
        <motion.ul
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="dropdown-content menu p-2 shadow-lg bg-slate-800/90 backdrop-blur-md rounded-box w-52 mt-4"
        >
          <li className="text-white/60 px-4 py-2">{user.displayName}</li>
          <li>
            <button 
              onClick={handleLogOut}
              className="text-white hover:bg-white/10 rounded-lg transition-all"
            >
              Logout
            </button>
          </li>
        </motion.ul>
      </motion.div>
    ) : (
      <Link to="/login" className="btn btn-primary bg-gradient-to-r from-purple-600 to-blue-500 border-none">
        Login
      </Link>
    )}
  </div>
</div>


      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isOpen ? "auto" : 0 }}
        className="lg:hidden overflow-hidden bg-slate-800/90 backdrop-blur-md"
      >
        <ul className="menu px-4 py-2">
          {links}
        </ul>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;