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
import { useTheme } from "../../../Provider/ThemeProvider";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";


const StyledTableContainer = styled(TableContainer)(({ theme, isDark }) => ({
  backgroundColor: isDark ? '#1F2937' : '#ffffff',
  borderRadius: '1rem',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  marginTop: '1rem',
}));

const StyledTableCell = styled(TableCell)(({ theme, isDark }) => ({
  color: isDark ? '#E5E7EB' : '#374151',
  borderBottom: `1px solid ${isDark ? '#374151' : '#E5E7EB'}`,
}));

const StyledSelect = styled(Select)(({ theme, isDark }) => ({
  backgroundColor: isDark ? '#374151' : '#ffffff',
  color: isDark ? '#E5E7EB' : '#374151',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: isDark ? '#4B5563' : '#E5E7EB',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: isDark ? '#6B7280' : '#D1D5DB',
  },
}));
const WorkRecords = () => {
  const { isDarkTheme } = useTheme();
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
    <div className={`min-h-screen p-4 md:p-6 lg:p-8 ${
      isDarkTheme ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'
    }`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-8">Work Progress Records</h1>

        {/* Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <FormControl fullWidth>
            <InputLabel 
              sx={{ color: isDarkTheme ? '#E5E7EB' : '#374151' }}
            >
              Employee
            </InputLabel>
            <StyledSelect
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              isDark={isDarkTheme}
            >
              <MenuItem value=""><em>All Employees</em></MenuItem>
              {uniqueEmployees.map((name, index) => (
                <MenuItem key={index} value={name}>{name}</MenuItem>
              ))}
            </StyledSelect>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel 
              sx={{ color: isDarkTheme ? '#E5E7EB' : '#374151' }}
            >
              Month
            </InputLabel>
            <StyledSelect
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              isDark={isDarkTheme}
            >
              <MenuItem value=""><em>All Months</em></MenuItem>
              {Array.from({ length: 12 }, (_, i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString("default", { month: "long" })}
                </MenuItem>
              ))}
            </StyledSelect>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel 
              sx={{ color: isDarkTheme ? '#E5E7EB' : '#374151' }}
            >
              Year
            </InputLabel>
            <StyledSelect
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              isDark={isDarkTheme}
            >
              <MenuItem value=""><em>All Years</em></MenuItem>
              {Array.from({ length: 20 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <MenuItem key={year} value={year}>{year}</MenuItem>
                );
              })}
            </StyledSelect>
          </FormControl>
        </div>

        {/* Records Table */}
        <StyledTableContainer component={Paper} isDark={isDarkTheme}>
          <Table>
            <TableHead>
              <TableRow>
                {['Employee Name', 'Email', 'Task', 'Hours', 'Date'].map((header) => (
                  <StyledTableCell 
                    key={header} 
                    isDark={isDarkTheme}
                    sx={{
                      fontWeight: 'bold',
                      backgroundColor: isDarkTheme ? '#374151' : '#F3F4F6',
                    }}
                  >
                    {header}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <TableRow
                    key={record._id}
                    sx={{
                      '&:hover': {
                        backgroundColor: isDarkTheme ? '#374151' : '#F9FAFB',
                      },
                    }}
                  >
                    <StyledTableCell isDark={isDarkTheme}>{record.name}</StyledTableCell>
                    <StyledTableCell isDark={isDarkTheme}>{record.email}</StyledTableCell>
                    <StyledTableCell isDark={isDarkTheme}>{record.data.task}</StyledTableCell>
                    <StyledTableCell isDark={isDarkTheme}>{record.data.hoursWorked}</StyledTableCell>
                    <StyledTableCell isDark={isDarkTheme}>
                      {new Date(record.data.date).toLocaleDateString()}
                    </StyledTableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <StyledTableCell 
                    colSpan={5} 
                    align="center" 
                    isDark={isDarkTheme}
                  >
                    No records found
                  </StyledTableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </motion.div>
    </div>
  );
};

export default WorkRecords;
