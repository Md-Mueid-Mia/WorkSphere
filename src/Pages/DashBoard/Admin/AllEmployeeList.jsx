import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaEdit, FaFire } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";
import { IoCheckmarkDone } from "react-icons/io5";

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Verified Employees</h1>
      <button
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setIsTableView(!isTableView)}
      >
        Toggle View
      </button>

      {isTableView ? (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Designation</th>
              <th className="border border-gray-300 px-4 py-2">
                Bank Account No
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Adjust Salary
              </th>
              <th className="border border-gray-300 px-4 py-2">Make HR</th>
              <th className="border border-gray-300 px-4 py-2">Fire</th>
              {/* <th className="border border-gray-300 px-4 py-2">Details</th> */}
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, idx) => (
              <tr key={idx} className="text-center">
                <td className="border border-gray-300 px-4 py-2">
                  {employee.Name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {employee.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {employee.designation}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {employee.bank_account_no}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className=" px-4 py-1 rounded"
                    onClick={() => setSelectedEmployee(employee)}
                  >
                    <FaEdit />
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {employee.role !== "HR" && !employee.fired ? (
                    <button
                      className="bg-blue-500 text-white p-2 rounded"
                      onClick={() => handleMakeHR(employee._id)}
                    >
                      HR
                    </button>
                  ) : (
                    <span ><IoCheckmarkDone className="mx-auto"/></span>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {employee.fired ? (
                    <span className="text-red-500">Fired</span>
                  ) : (
                    <button
                      className=" text-white px-4 py-1 rounded"
                      onClick={() => handleFireEmployee(employee._id)}
                    >
                      <FaFire className="text-yellow-400" />
                    </button>
                  )}
                </td>
                {/* <td className="border border-gray-300 px-4 py-2">
                  <Link>
                    <GoArrowUpRight />
                  </Link>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees.map((employee) => (
            <div key={employee._id} className="border p-4 rounded shadow">
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
            </div>
          ))}
        </div>
      )}

      {/* Adjust Salary Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default AllEmployeeList;
