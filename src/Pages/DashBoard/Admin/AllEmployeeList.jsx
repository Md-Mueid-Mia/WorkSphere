import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaEdit, FaFire } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";
import { IoCheckmarkDone } from "react-icons/io5";
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdDoneAll } from "react-icons/io";

const AllEmployeeList = () => {
  const [isTableView, setIsTableView] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [newSalary, setNewSalary] = useState(0);
  const axiosSecure = useAxiosSecure();

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
      className="container mx-auto p-4 md:p-0"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-4 md:mb-0">
          Employee Management
        </h1>
        <button
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          onClick={() => setIsTableView(!isTableView)}
        >
          {isTableView ? 'Grid View' : 'Table View'}
        </button>
      </div>

      <div className="overflow-x-auto">
      {isTableView ? (
       <table className="w-full min-w-[800px]">
       <thead>
         <tr className="bg-gradient-to-r from-purple-50 to-blue-50">
           <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
           <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
           <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Designation</th>
           <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Salary</th>
           <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Account No</th>
           <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Edit</th>
           <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Fire</th>
           <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Make Hr</th>
         </tr>
       </thead>
       <tbody>
         {employees.map((employee, idx) => (
           <motion.tr 
             key={idx}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: idx * 0.1 }}
             className="border-b hover:bg-gray-50"
           >
             <td className="p-3">{employee.Name}</td>
             <td className="p-3">{employee.email}</td>
             <td className="p-3">{employee.designation}</td>
             <td className="p-3">${employee.salary}</td>
             <td className="p-3">{employee.bank_account_no}</td>
             <td className="px-6 py-4 ">
             <button
                 onClick={() => setSelectedEmployee(employee)}
                 className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
               >
                 <FaEdit size={18} />
               </button>
             </td>
             <td className="px-6 py-4 "> {!employee.fired && (
                 <button
                   onClick={() => handleFireEmployee(employee._id)}
                   className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                 >
                   <FaFire size={18} />
                 </button>
               )}</td>
             <td className="px-6 py-4 ">
               
                {employee.role == "HR" ? <IoMdDoneAll /> :(
                 <button
                   onClick={() => handleMakeHR(employee._id)}
                   className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition-colors"
                 >
                   Make HR
                 </button>)}
               
             </td>
           </motion.tr>
         ))}
       </tbody>
     </table>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
          {employees.map((employee) => (
             <motion.div
             key={employee._id}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow"
           >
              <h3 className="font-bold text-lg">{employee.Name}</h3>
              <p>Role: {employee.role}</p>
              <p>Bank Account No: {employee.bank_account_no}</p>
              <p>Email: {employee.email}</p>
              <div className="mt-2">
                {employee.role !== "HR" && !employee.fired ? (
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    onClick={() => handleMakeHR(employee.id)}
                  >
                     HR
                  </button>
                ) : null}
                {employee.fired ? (
                  <span className="text-red-500">Fired</span>
                ) : (
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded mr-2"
                    onClick={() => handleFireEmployee(employee.id)}
                  >
                    Fire
                  </button>
                )}
                <button
                  className="bg-green-500 text-white px-3 py-1 mt-2 rounded"
                  onClick={() => setSelectedEmployee(employee)}
                >
                  Adjust Salary
                </button>
              </div>
              </motion.div>
          ))}
        </div>
      )}
      </div>

      {/* Adjust Salary Modal */}
      <AnimatePresence>
      {selectedEmployee && (
         <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
       >
         <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl p-6 w-full max-w-md"
            >
            <h2 className="text-lg font-bold mb-4">Adjust Salary</h2>
            <p className="mb-4">
              Adjust salary for <strong>{selectedEmployee.Name}</strong>
            </p>
            <input
              type="number"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              defaultValue={selectedEmployee?.salary}
              onChange={(e) => setNewSalary(Number(e.target.value))}
            />
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setSelectedEmployee(null)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => handleAdjustSalary(selectedEmployee?._id)}
              >
                Save
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
