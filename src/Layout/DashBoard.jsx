import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Ripple } from "primereact/ripple";
import logo from '../assets/Logo_Normal-01+(3).png'
import { Link, Outlet } from "react-router-dom";
import useHR from "../Hooks/useHR";
import useAdmin from "../Hooks/useAdmin";

const DashBoard = () => {
  const [visible, setVisible] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isHR] = useHR()
  const [isAdmin]= useAdmin()
//   const [isEmployee] = 

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  return (
    <div>
        <div >
      {/* Sidebar Toggle Button */}
      <Button
        icon="pi pi-bars"
        label="Menu"
        onClick={() => setVisible(true)}
        className="mb-3 p-5"
      />

      {/* Sidebar Component */}
      <Sidebar visible={visible} onHide={() => setVisible(false)}>
        <div className="min-h-screen surface-ground">
          <div className="surface-section h-screen">
            {/* Logo Section */}
            <div className="flex align-items-center justify-content-between px-4 pt-3">
              <span className="font-semibold text-2xl text-primary"><Link to='/'><img src={logo} alt="" /></Link></span>
              
            </div>

            {/* Sidebar Menu */}
            <ul className="list-none p-3">
              {/* Favorites */}
              <li>
                <div
                  className="p-ripple flex align-items-center justify-content-between cursor-pointer p-3"
                  onClick={() => toggleDropdown("favorites")}
                >
                  <span className="font-medium">FAVORITES</span>
                  <i
                    className={`pi ${
                      activeDropdown === "favorites"
                        ? "pi-chevron-up"
                        : "pi-chevron-down"
                    }`}
                  ></i>
                  <Ripple />
                </div>
                <ul
                  className={`list-none transition-all duration-300 ease-in-out pl-5 ${
                    activeDropdown === "favorites" ? "max-h-40" : "max-h-0 overflow-hidden"
                  }`}
                >
                  <Link to='/dashboard/work-sheet'><li className="p-3 cursor-pointer">Work Sheet</li></Link>
                  <li className="p-3 cursor-pointer">Bookmarks</li>
                  <li className="p-3 cursor-pointer">Reports</li>
                </ul>
              </li>

              {/* Applications */}
              <li>
                <div
                  className="p-ripple flex align-items-center justify-content-between cursor-pointer p-3"
                  onClick={() => toggleDropdown("applications")}
                >
                  <span>APPLICATIONS</span>
                  <i
                    className={`pi ${
                      activeDropdown === "applications"
                        ? "pi-chevron-up"
                        : "pi-chevron-down"
                    }`}
                  ></i>
                  <Ripple />
                </div>
                <ul
                  className={`list-none transition-all duration-300 ease-in-out pl-5 ${
                    activeDropdown === "applications"
                      ? "max-h-40"
                      : "max-h-0 overflow-hidden"
                  }`}
                >
                  <li className="p-3 cursor-pointer">Projects</li>
                  <li className="p-3 cursor-pointer">Settings</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </Sidebar>
    </div>
        <div><Outlet></Outlet></div>
    </div>
  );
};

export default DashBoard;
