import React, { useState, useEffect } from "react";
import { BsArrowUpRight } from "react-icons/bs";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { FaCheck, FaTimes, FaDollarSign } from "react-icons/fa";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useTheme } from "../../../Provider/ThemeProvider";

const EmployeeList = () => {
  const { isDarkTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    salary: "",
    month: "",
    year: "",
  });
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  // Find this code:

  // Replace with:
  const { data: employees = [], refetch } = useQuery({
    queryKey: ["employees"], // Fixed: wrapped in array
    queryFn: async () => {
      try {
        const response = await axiosSecure.get("/users");
        return response.data;
      } catch (error) {
        console.error("Error fetching employees:", error);
        return [];
      }
    },
  });
  // console.log(employees);
  // Toggle verification
  const handleVerificationToggle = async (employeeId, currentStatus) => {
    try {
      const updatedStatus = !currentStatus;

      // Use axiosSecure instead of axiosPublic for protected route
      await axiosSecure.patch(`/users/${employeeId}/verify`, {
        isVerified: updatedStatus,
      });

      // Refetch data to update UI
      refetch();

      toast.success(`Employee verification status updated successfully`);
    } catch (error) {
      console.error(
        "Error updating verification status:",
        error.response?.data?.message || error.message
      );
      toast.error("Unauthorized. Please check your permissions.");
    }
  };

  // Open modal for pay
  const openPayModal = (employee) => {
    setSelectedEmployee(employee);
    setPaymentDetails({
      salary: employee.salary,
      month: "",
      year: "",
    });
    setIsModalOpen(true);
  };

  const handlePayRequest = async () => {
    if (!selectedEmployee.isVerified) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Employee not verified",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    if (!paymentDetails.month || !paymentDetails.year) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Please select both month and year",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    try {
      // Check if payment already exists for this employee for the selected month and year
      const paymentResponse = await axiosSecure.get(
        `/payroll/exists/${selectedEmployee._id}?month=${paymentDetails.month}&year=${paymentDetails.year}`
      );

      if (paymentResponse?.data?.exists) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Payment already made for this month and year",
          showConfirmButton: false,
          timer: 1500,
        });
        return setIsModalOpen(false);
      }

      // Proceed with payment if not already paid
      await axiosSecure.post("/payroll", {
        employeeId: selectedEmployee._id,
        name: selectedEmployee?.Name,
        email: selectedEmployee?.email,
        bankAccountNo: selectedEmployee?.bank_account_no,
        designation: selectedEmployee?.designation,
        ...paymentDetails,
      });

      setIsModalOpen(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Payment request created successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error submitting payment request:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error processing payment",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  console.log(selectedEmployee);

  // Handle modal input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };
  // console.log(selectedEmployee,paymentDetails);
  return (
    <div className={`min-h-screen p-4 md:p-6 lg:p-8 ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <h1 className={`text-2xl md:text-3xl font-bold mb-6 ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>
        Employee Management
      </h1>

      <TableContainer 
        component={Paper} 
        className={`${isDarkTheme ? 'bg-gray-800' : 'bg-white'} shadow-xl rounded-lg`}
      >
        <Table className="min-w-full">
          <TableHead>
            <TableRow className={isDarkTheme ? 'bg-gray-700' : 'bg-gray-100'}>
              {['Name', 'Email', 'Verified', 'Bank Account', 'Salary', 'Pay', 'Details'].map((header) => (
                <TableCell 
                  key={header}
                  className={`${isDarkTheme ? 'text-gray-200' : 'text-gray-700'} font-semibold py-4`}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {employees?.map((employee) => (
              <TableRow 
                key={employee._id}
                className={`
                  ${isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} 
                  transition-colors duration-150
                `}
              >
                <TableCell className={isDarkTheme ? 'text-gray-200' : 'text-gray-800'}>
                  {employee.Name}
                </TableCell>
                <TableCell className={isDarkTheme ? 'text-gray-200' : 'text-gray-800'}>
                  {employee.email}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleVerificationToggle(employee._id, employee.isVerified)}
                    className={isDarkTheme ? 'text-gray-200' : 'text-gray-800'}
                  >
                    {employee.isVerified ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell className={isDarkTheme ? 'text-gray-200' : 'text-gray-800'}>
                  {employee.bank_account_no}
                </TableCell>
                <TableCell className={isDarkTheme ? 'text-gray-200' : 'text-gray-800'}>
                  ${employee.salary}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    className={`
                      ${!employee.isVerified && 'opacity-50'}
                      ${isDarkTheme ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}
                    `}
                    startIcon={<FaDollarSign />}
                    onClick={() => openPayModal(employee)}
                    disabled={!employee.isVerified}
                  >
                    Pay
                  </Button>
                </TableCell>
                <TableCell>
                  {employee.isVerified ? (
                    <Link to={`/dashboard/details/${employee._id}`}>
                      <Button 
                        className={isDarkTheme ? 'text-blue-400' : 'text-blue-600'}
                      >
                        <BsArrowUpRight />
                      </Button>
                    </Link>
                  ) : (
                    <Button disabled>
                      <BsArrowUpRight />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Payment Modal */}
      <Dialog 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        PaperProps={{
          className: isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white'
        }}
      >
        <DialogTitle className="border-b">
          Process Payment for {selectedEmployee?.Name}
        </DialogTitle>
        <DialogContent className="mt-4">
          <TextField
            label="Salary"
            value={paymentDetails.salary}
            name="salary"
            InputProps={{ 
              readOnly: true,
              className: isDarkTheme ? 'text-white' : ''
            }}
            fullWidth
            margin="dense"
            className="mb-4"
          />
          <TextField
            label="Month"
            value={paymentDetails.month}
            name="month"
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            className="mb-4"
            InputProps={{
              className: isDarkTheme ? 'text-white' : ''
            }}
          />
          <TextField
            label="Year"
            value={paymentDetails.year}
            name="year"
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            InputProps={{
              className: isDarkTheme ? 'text-white' : ''
            }}
          />
        </DialogContent>
        <DialogActions className="p-4">
          <Button 
            onClick={() => setIsModalOpen(false)}
            className={isDarkTheme ? 'text-gray-300' : 'text-gray-600'}
          >
            Cancel
          </Button>
          <Button
            onClick={handlePayRequest}
            variant="contained"
            className={isDarkTheme ? 'bg-blue-600' : 'bg-blue-500'}
          >
            Submit Payment
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployeeList;
