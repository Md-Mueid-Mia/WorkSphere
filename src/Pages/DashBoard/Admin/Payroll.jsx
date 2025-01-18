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
} from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY);

const Payroll = () => {
  const axiosSecure = useAxiosSecure();
  const [payrolls, setPayrolls] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    const fetchPayrolls = async () => {
      try {
        const response = await axiosSecure.get("/payroll");
        const data = response.data.map((item) => ({
          ...item,
          isPaid: !!item.paymentDate,
        }));
        setPayrolls(data);
      } catch (error) {
        console.error("Error fetching payroll requests:", error);
      }
    };

    fetchPayrolls();
  }, [axiosSecure]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Employee Payroll</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Employee Name</strong></TableCell>
              <TableCell><strong>Salary</strong></TableCell>
              <TableCell><strong>Month</strong></TableCell>
              <TableCell><strong>Year</strong></TableCell>
              <TableCell><strong>Payment Date</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payrolls.map((record) => (
              <TableRow key={record._id}>
                <TableCell>{record.name}</TableCell>
                <TableCell>${record.salary}</TableCell>
                <TableCell>{record.month}</TableCell>
                <TableCell>{record.year}</TableCell>
                <TableCell>
                  {record.paymentDate
                    ? new Date(record.paymentDate).toLocaleDateString()
                    : "Pending"}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={record.isPaid}
                    onClick={() => setSelectedRecord(record)}
                  >
                    {record.isPaid ? "Paid" : "Pay"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedRecord && (
        <div className="mt-4">
          <Elements stripe={stripePromise}>
            <PaymentForm
              record={selectedRecord}
              setPayrolls={setPayrolls}
              setSelectedRecord={setSelectedRecord}
            />
          </Elements>
        </div>
      )}
    </div>
  );
};

export default Payroll;