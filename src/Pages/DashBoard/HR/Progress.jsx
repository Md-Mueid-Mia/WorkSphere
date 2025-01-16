import React, { useEffect, useState } from "react";
import axios from "axios";

const Progress = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    // Fetch work records
    axios
      .get("/api/work-records") // Replace with your backend API
      .then((response) => {
        setRecords(response.data);
        setFilteredRecords(response.data);
      })
      .catch((error) => console.error("Error fetching work records:", error));

    // Fetch employee names for dropdown
    axios
      .get("/api/employees") // Replace with your backend API
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  // Handle filtering
  const handleFilter = () => {
    let filtered = [...records];
    if (selectedEmployee) {
      filtered = filtered.filter(
        (record) => record.employeeName === selectedEmployee
      );
    }
    if (selectedMonth) {
      filtered = filtered.filter((record) => record.month === selectedMonth);
    }
    setFilteredRecords(filtered);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Employee Work Progress</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Employee Filter */}
        <div>
          <label htmlFor="employeeFilter" className="block font-semibold mb-2">
            Filter by Employee
          </label>
          <select
            id="employeeFilter"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="w-full sm:w-64 p-2 border border-gray-300 rounded"
          >
            <option value="">All Employees</option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee.name}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>

        {/* Month Filter */}
        <div>
          <label htmlFor="monthFilter" className="block font-semibold mb-2">
            Filter by Month
          </label>
          <select
            id="monthFilter"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full sm:w-64 p-2 border border-gray-300 rounded"
          >
            <option value="">All Months</option>
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
              (month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              )
            )}
          </select>
        </div>

        {/* Filter Button */}
        <div className="flex items-end">
          <button
            onClick={handleFilter}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Work Records Table */}
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Employee Name</th>
            <th className="border px-4 py-2">Month</th>
            <th className="border px-4 py-2">Work Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{record.employeeName}</td>
                <td className="border px-4 py-2">{record.month}</td>
                <td className="border px-4 py-2">{record.workDetails}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
                className="border px-4 py-2 text-center text-gray-500"
              >
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Progress;
