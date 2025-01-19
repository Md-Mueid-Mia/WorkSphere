import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const WorkRecords = () => {
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const axiosSecure = useAxiosSecure();

  const { data: employees = [] } = useQuery({
    queryKey: ["workRecords"],
    queryFn: async () => {
      try {
        const response = await axiosSecure.get("/work-progress");
        return response.data;
      } catch (error) {
        console.error("Error fetching employees:", error);
        return [];
      }
    },
  });

  // Extract unique employee names
  const uniqueEmployees = [...new Set(employees.map((emp) => emp.name))];

  // Filter data based on selected filters
  const filteredRecords = employees.filter((record) => {
    const recordDate = new Date(record.data.date);
    const matchesEmployee = selectedEmployee ? record.name === selectedEmployee : true;
    const matchesYear = selectedYear ? recordDate.getFullYear() === parseInt(selectedYear) : true;
    const matchesMonth = selectedMonth ? recordDate.getMonth() + 1 === parseInt(selectedMonth) : true;

    return matchesEmployee && matchesYear && matchesMonth;
  });

  return (
    <div className="container mx-auto px-4 md:p-6">
      <h1 className="text-2xl font-semibold mb-4">Work Records</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <FormControl className="w-full md:w-1/3">
          <InputLabel>Employee</InputLabel>
          <Select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <MenuItem value="">
              <em>All Employees</em>
            </MenuItem>
            {uniqueEmployees.map((name, index) => (
              <MenuItem key={index} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="w-full md:w-1/3">
          <InputLabel>Month</InputLabel>
          <Select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <MenuItem value="">
              <em>All Months</em>
            </MenuItem>
            {Array.from({ length: 12 }, (_, i) => (
              <MenuItem key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="w-full md:w-1/3">
          <InputLabel>Year</InputLabel>
          <Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <MenuItem value="">
              <em>All Years</em>
            </MenuItem>
            {Array.from({ length: 20 }, (_, i) => {
              const currentYear = new Date().getFullYear();
              const year = currentYear - i;
              return (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Employee Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Task</strong></TableCell>
              <TableCell><strong>Hours</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <TableRow key={record._id}>
                  <TableCell>{record.name}</TableCell>
                  <TableCell>{record.email}</TableCell>
                  <TableCell>{record.data.task}</TableCell>
                  <TableCell>{record.data.hoursWorked}</TableCell>
                  <TableCell>
                    {new Date(record.data.date).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default WorkRecords;
