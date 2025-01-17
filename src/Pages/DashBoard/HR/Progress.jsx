import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
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

  // Filter work records based on the selected employee and month
  const { data: employees = [], refetch } = useQuery({
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
  console.log(employees);
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Work Records</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <FormControl className="w-1/3">
          <InputLabel>Employee</InputLabel>
          <Select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <MenuItem value="">
              <em>All Employees</em>
            </MenuItem>
            {employees.map((employee) => (
              <MenuItem key={employee._id} value={employee._id}>
                {employee.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="w-1/3">
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
        <FormControl className="w-1/3">
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
              const year = currentYear - i; // Display last 20 years
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
              <TableCell>
                <strong>Employee Name</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Task</strong>
              </TableCell>
              <TableCell>
                <strong>Hours</strong>
              </TableCell>
              <TableCell>
                <strong>Date</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.length > 0 ? (
              employees.map((record) => (
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
                <TableCell colSpan={3} align="center">
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
