import React, { useState, useEffect } from "react";
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

const EmployeeList = () => {
  // const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    salary: "",
    month: "",
    year: "",
  });
  const axiosSecure = useAxiosSecure()
  const axiosPublic = useAxiosPublic()
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
  })
console.log(employees);
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
      console.error("Error updating verification status:", error.response?.data?.message || error.message);
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

  // Handle payment submission
  const handlePayRequest = async () => {
    if (!selectedEmployee.isVerified) return;

    try {
      await axiosSecure.post("/payroll", {
        employeeId: selectedEmployee._id,
        ...paymentDetails,
      });
      setIsModalOpen(false);
      alert("Payment request created successfully");
    } catch (error) {
      console.error("Error submitting payment request:", error);
    }
  };

  // Handle modal input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Employee List</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Verified</strong></TableCell>
              <TableCell><strong>Bank Account</strong></TableCell>
              <TableCell><strong>Salary</strong></TableCell>
              <TableCell><strong>Pay</strong></TableCell>
              <TableCell><strong>Details</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees?.map((employee) => (
              <TableRow key={employee._id}>
                <TableCell>{employee.Name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() =>
                      handleVerificationToggle(employee._id, employee.isVerified)
                    }
                  >
                    {employee.isVerified ? (
                      <FaCheck color="green" />
                    ) : (
                      <FaTimes color="red" />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell>{employee.bank_account_no}</TableCell>
                <TableCell>{employee.salary}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<FaDollarSign />}
                    onClick={() => openPayModal(employee)}
                    disabled={!employee.isVerified}
                  >
                    Pay
                  </Button>
                </TableCell>
                <TableCell>
                  <Link to={`/dashboard/details/${employee._id}`}><Button variant="outlined" color="secondary">
                    Details
                  </Button></Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Payment Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>Process Payment for {selectedEmployee?.name}</DialogTitle>
        <DialogContent>
          <TextField
            label="Salary"
            value={paymentDetails.salary}
            name="salary"
            InputProps={{ readOnly: true }}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Month"
            value={paymentDetails.month}
            name="month"
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Year"
            value={paymentDetails.year}
            name="year"
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handlePayRequest}
            color="primary"
            variant="contained"
          >
            Submit Payment
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployeeList;
