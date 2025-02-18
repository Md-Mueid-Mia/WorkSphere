import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaEdit, FaFire } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserTie } from "react-icons/fa";
import { useTheme } from "../../../Provider/ThemeProvider";

const AllEmployeeList = () => {
  const [isTableView, setIsTableView] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [newSalary, setNewSalary] = useState(0);
  const axiosSecure = useAxiosSecure();
  const { isDarkTheme, toggleTheme } = useTheme();

  const {
    data: employees = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/verified");
      return res.data;
    },
  });

  const handleFireEmployee = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, fire!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure
          .patch(`/users/${id}`, { fired: true })
          .then((response) => {
            // console.log("Made HR:", response);
            refetch();
            Swal.fire("Success", "Employee fired successfully", "success");
          });
      }
    });
  };

  const handleMakeHR = async (id) => {
    await axiosSecure.patch(`/users/${id}`, { role: "HR" }).then((response) => {
      // console.log("Made HR:", response);
      refetch();
      Swal.fire("Success", "Employee promoted to HR", "success");
    });
  };
  // console.log(newSalary);

  const handleAdjustSalary = async (id) => {
    // console.log(id);
    if (selectedEmployee && newSalary > selectedEmployee.salary) {
      //   updateEmployee(selectedEmployee._id, { salary: newSalary });
      const updatedEmployee = await axiosSecure.patch(`/users/${id}`, {
        salary: newSalary,
      });
      // console.log("Updated Employee:", updatedEmployee);
      refetch();
      setSelectedEmployee(null);
      setNewSalary(0);
      Swal.fire("Success", "Salary updated successfully", "success");
    } else {
      Swal.fire(
        "Error",
        "New salary must be higher than the current salary",
        "error"
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`container mx-auto p-4 md:p-0 ${
        isDarkTheme ? "text-gray-100" : "text-gray-800"
      }`}
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1
          className={`text-3xl font-bold ${
            isDarkTheme
              ? "text-purple-400"
              : "bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
          } mb-4 md:mb-0`}
        >
          Employee Management
        </h1>
        <button
          className={`px-6 py-2 ${
            isDarkTheme
              ? "bg-purple-500 hover:bg-purple-600"
              : "bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90"
          } text-white rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105`}
          onClick={() => setIsTableView(!isTableView)}
        >
          {isTableView ? "Grid View" : "Table View"}
        </button>
      </div>

      <div className="overflow-x-auto">
        {isTableView ? (
          <div
            className={`rounded-xl shadow-lg overflow-hidden ${
              isDarkTheme ? "bg-gray-800" : "bg-white"
            }`}
          >
            <table className="w-full min-w-[800px]">
              <thead>
                <tr
                  className={`${
                    isDarkTheme
                      ? "bg-gray-700"
                      : "bg-gradient-to-r from-purple-50 to-blue-50"
                  }`}
                >
                  <th
                    className={`px-6 py-4 text-left text-sm font-semibold ${
                      isDarkTheme ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Name
                  </th>
                  <th
                    className={`px-6 py-4 text-left text-sm font-semibold ${
                      isDarkTheme ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Email
                  </th>
                  <th
                    className={`px-6 py-4 text-left text-sm font-semibold ${
                      isDarkTheme ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Designation
                  </th>
                  <th
                    className={`px-6 py-4 text-left text-sm font-semibold ${
                      isDarkTheme ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Salary
                  </th>
                  <th
                    className={`px-6 py-4 text-left text-sm font-semibold ${
                      isDarkTheme ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Account No
                  </th>
                  <th
                    className={`px-6 py-4 text-center text-sm font-semibold ${
                      isDarkTheme ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, idx) => (
                  <motion.tr
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`border-b ${
                      isDarkTheme
                        ? "border-gray-700 hover:bg-gray-700"
                        : "border-gray-100 hover:bg-gray-50"
                    }`}
                  >
                    <td className="p-4 flex items-center gap-2">
                      {employee.Name}
                    </td>
                    <td className="p-4">{employee.email}</td>
                    <td className="p-4">{employee.designation}</td>
                    <td className="p-4">${employee.salary}</td>
                    <td className="p-4">{employee.bank_account_no}</td>
                    <td className="p-4">
                      <div className="flex flex-wrap justify-center gap-2">
                        <button
                          onClick={() => setSelectedEmployee(employee)}
                          className={`p-2 rounded-lg flex items-center gap-1 ${
                            isDarkTheme
                              ? "bg-gray-700 hover:bg-gray-600 text-blue-400"
                              : "bg-blue-50 hover:bg-blue-100 text-blue-600"
                          } transition-all duration-300`}
                        >
                          <FaEdit size={16} />
                          <span className="text-xs">Edit</span>
                        </button>
                        {!employee.fired && (
                          <button
                            onClick={() => handleFireEmployee(employee._id)}
                            className={`p-2 rounded-lg flex items-center gap-1 ${
                              isDarkTheme
                                ? "bg-gray-700 hover:bg-gray-600 text-red-400"
                                : "bg-red-50 hover:bg-red-100 text-red-600"
                            } transition-all duration-300`}
                          >
                            <FaFire size={16} />
                            <span className="text-xs">Fire</span>
                          </button>
                        )}
                        {employee.role !== "HR" && (
                          <button
                            onClick={() => handleMakeHR(employee._id)}
                            className={`p-2 rounded-lg flex items-center gap-1 ${
                              isDarkTheme
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-blue-500 hover:bg-blue-600"
                            } text-white transition-all duration-300`}
                          >
                            <FaUserTie size={16} />
                            <span className="text-xs">Make HR</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {employees.map((employee) => (
              <motion.div
                key={employee._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${
                  isDarkTheme
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-white hover:shadow-xl"
                } p-6 rounded-xl shadow-md transition-all duration-300`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <FaUserTie className="text-purple-500 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{employee.Name}</h3>
                    <p
                      className={`text-sm ${
                        isDarkTheme ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {employee.role}
                    </p>
                  </div>
                </div>

                <div
                  className={`space-y-2 mb-4 ${
                    isDarkTheme ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  <p className="flex items-center gap-2">
                    <span className="font-medium">Email:</span> {employee.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-medium">Account:</span>{" "}
                    {employee.bank_account_no}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-medium">Salary:</span> $
                    {employee.salary}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4">
                  <button
                    onClick={() => setSelectedEmployee(employee)}
                    className={`col-span-1 px-3 py-2 rounded-lg flex items-center justify-center gap-2 ${
                      isDarkTheme
                        ? "bg-gray-700 hover:bg-gray-600 text-blue-400"
                        : "bg-blue-50 hover:bg-blue-100 text-blue-600"
                    } transition-all duration-300`}
                  >
                    <FaEdit size={16} />
                    <span>Edit Salary</span>
                  </button>
                  {!employee.fired && (
                    <button
                      onClick={() => handleFireEmployee(employee._id)}
                      className={`col-span-1 px-3 py-2 rounded-lg flex items-center justify-center gap-2 ${
                        isDarkTheme
                          ? "bg-gray-700 hover:bg-gray-600 text-red-400"
                          : "bg-red-50 hover:bg-red-100 text-red-600"
                      } transition-all duration-300`}
                    >
                      <FaFire size={16} />
                      <span>Fire</span>
                    </button>
                  )}
                  {employee.role !== "HR" && (
                    <button
                      onClick={() => handleMakeHR(employee._id)}
                      className={`col-span-2 px-3 py-2 rounded-lg flex items-center justify-center gap-2 ${
                        isDarkTheme
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-blue-500 hover:bg-blue-600"
                      } text-white transition-all duration-300`}
                    >
                      <FaUserTie size={16} />
                      <span>Promote to HR</span>
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Salary Adjustment Modal */}
      <AnimatePresence>
        {selectedEmployee && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className={`${
                isDarkTheme ? "bg-gray-800" : "bg-white"
              } rounded-xl p-6 w-full max-w-md shadow-xl`}
            >
              <h2
                className={`text-xl font-bold mb-4 ${
                  isDarkTheme ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Adjust Salary
              </h2>
              <p
                className={`mb-4 ${
                  isDarkTheme ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Adjusting salary for <strong>{selectedEmployee.Name}</strong>
              </p>
              <input
                type="number"
                className={`w-full rounded-lg px-4 py-2 mb-4 ${
                  isDarkTheme
                    ? "bg-gray-700 border-gray-600 text-gray-100"
                    : "border border-gray-300 text-gray-800"
                }`}
                defaultValue={selectedEmployee?.salary}
                onChange={(e) => setNewSalary(Number(e.target.value))}
              />
              <div className="flex justify-end gap-2">
                <button
                  className={`px-4 py-2 rounded-lg ${
                    isDarkTheme
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-200 hover:bg-gray-300"
                  } transition-colors`}
                  onClick={() => setSelectedEmployee(null)}
                >
                  Cancel
                </button>
                <button
                  className={`px-4 py-2 rounded-lg ${
                    isDarkTheme
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-green-500 hover:bg-green-600"
                  } text-white transition-colors`}
                  onClick={() => handleAdjustSalary(selectedEmployee?._id)}
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AllEmployeeList;
