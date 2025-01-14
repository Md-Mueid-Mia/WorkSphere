import React from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import logo from '../assets/Logo_Normal-01+(3).png'
import Swal from "sweetalert2";

const Navbar = () => {
  const {user, signOutUser} = useAuth()

  
  const signOut = () => {
    signOutUser().then(() => {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "User logged out successfully",
        showConfirmButton: false,
        timer: 1500
      });
    });
  };
  const links = (
    <>
      <li className="mx-2">
        <NavLink to={"/"}>Home</NavLink>
      </li> 
      <li className="mx-2">
        <NavLink to={"/dashboard"}>Dashboard</NavLink>
      </li>
      <li className="mx-2">
        <NavLink to={"/contact-us"}>Contact Us</NavLink>
      </li>
     

      
     
    </>
  );
  return (
    <div>
      <div className="navbar fixed z-10 max-w-7xl mx-auto  bg-gray-600 bg-opacity-25 backdrop-blur-sm text-white">
        <div className="navbar-start">
          
          <Link to={'/'}><img className="w-32" src={logo} alt="" /></Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          {/* Align navigation items in a single horizontal line */}
          <ul className="menu menu-horizontal px-1 flex items-center">{links}</ul>
        </div>
        <div className="navbar-end">
          {
            user? <>
            <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="user photo"
            referrerPolicy="no-referrer"
            src={user ? user?.photoURL : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-orange-400 bg-opacity-40 backdrop-blur-sm  rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li className="mx-2 text-white">
          <button onClick={signOut}>
            LogOut
          </button>
        </li>
      </ul>
    </div>
            </>: <li className="mx-2">
          <NavLink to={"/login"}>Login</NavLink>
        </li>
          }
        <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu bg-gray-600 bg-opacity-60 menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow absolute right-1"
            >
              {links}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
