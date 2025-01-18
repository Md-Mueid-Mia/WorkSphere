import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Ripple } from "primereact/ripple";
import logo from "../assets/Logo_Normal-01+(3).png";
import { Link, Outlet } from "react-router-dom";
import useHR from "../Hooks/useHR";
import useAdmin from "../Hooks/useAdmin";
import LoadingSpinner from "../Components/LoadingSpiner";
import { useEmployee } from "../Hooks/useEmployee";

const DashBoard = () => {
  const [visible, setVisible] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Custom hooks for role checking
  const [isHR, isHRLoading] = useHR();
  const [isAdmin, isAdminLoading] = useAdmin();
  const [isEmployee,isEmployeeLoading] = useEmployee();
console.log("isHR", isHR, "isAdmin", isAdmin, "isEmployee", isEmployee);
  // Check if roles are loading
  if (isHRLoading) return <LoadingSpinner />;
  if (isAdminLoading) return <LoadingSpinner />;
  if (isEmployeeLoading) return <LoadingSpinner />;

  // Dropdown toggle handler
  const toggleDropdown = (dropdownName) => {
    setActiveDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  return (
    <div>
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
              <span className="font-semibold text-2xl text-primary">
                <Link to="/">
                  <img src={logo} alt="Logo" />
                </Link>
              </span>
            </div>

            {/* Sidebar Menu */}
            <ul className="list-none p-3">
              {/* Favorites Section */}
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
                    activeDropdown === "favorites"
                      ? "max-h-40"
                      : "max-h-0 overflow-hidden"
                  }`}
                >
                  {/* Employee Links */}
                  {isEmployee  && (
                    <>
                      <Link to="/dashboard/work-sheet">
                        <li className="p-3 cursor-pointer">Work Sheet</li>
                      </Link>
                      <Link to="/dashboard/payment-history">
                        <li className="p-3 cursor-pointer">Payment History</li>
                      </Link>
                    </>
                  )}

                  {/* HR Links */}
                  {isHR && !isAdmin && !isEmployee && (
                    <>
                      <Link to="/dashboard/employee-list">
                        <li className="p-3 cursor-pointer">Employee Sheet</li>
                      </Link>
                      <Link to="/dashboard/progress">
                        <li className="p-3 cursor-pointer">Employee Progress</li>
                      </Link>
                    </>
                  )}

                  {/* Admin Links */}
                  {isAdmin && (
                    <>
                      <Link to="/dashboard/all-employee-list">
                        <li className="p-3 cursor-pointer">All Employee List</li>
                      </Link> 
                      <Link to="/dashboard/payroll">
                        <li className="p-3 cursor-pointer">Payroll</li>
                      </Link>
                    </>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </Sidebar>

      {/* Main Content */}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;
