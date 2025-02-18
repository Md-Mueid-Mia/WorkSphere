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
import { useTheme } from "../../../Provider/ThemeProvider";
import useMediaQuery from '@mui/material/useMediaQuery';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY);

const Payroll = () => {
  const axiosSecure = useAxiosSecure();
  const [payrolls, setPayrolls] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const { isDarkTheme } = useTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');

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
    <div className={`min-h-screen p-4 md:p-6 lg:p-8 ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto">
        <h1 className={`text-2xl md:text-3xl font-bold mb-6 border-b pb-4 ${
          isDarkTheme ? 'border-gray-700' : 'border-gray-200'
        }`}>
          Employee Payroll Management
        </h1>
  
        <div className="w-full overflow-x-auto">
          <div className={`rounded-xl shadow-lg overflow-hidden ${isDarkTheme ? "bg-gray-800" : "bg-white"}`}>
            <div className="w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className={`${isDarkTheme ? "bg-gray-700" : "bg-gradient-to-r from-purple-50 to-blue-50"}`}>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkTheme ? "text-gray-200" : "text-gray-700"}`}>
                      Employee Name
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkTheme ? "text-gray-200" : "text-gray-700"}`}>
                      Salary
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold hidden md:table-cell ${isDarkTheme ? "text-gray-200" : "text-gray-700"}`}>
                      Month
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold hidden md:table-cell ${isDarkTheme ? "text-gray-200" : "text-gray-700"}`}>
                      Year
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkTheme ? "text-gray-200" : "text-gray-700"}`}>
                      Payment Date
                    </th>
                    <th className={`px-6 py-4 text-center text-sm font-semibold ${isDarkTheme ? "text-gray-200" : "text-gray-700"}`}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {payrolls.map((record) => (
                    <tr
                      key={record._id}
                      className={`border-b ${
                        isDarkTheme
                          ? "border-gray-700 hover:bg-gray-700"
                          : "border-gray-100 hover:bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4">{record.name}</td>
                      <td className="px-6 py-4">
                        <span className={`font-semibold ${isDarkTheme ? 'text-green-400' : 'text-green-600'}`}>
                          ${record.salary?.toLocaleString() || '0'}
                        </span>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">{record.month}</td>
                      <td className="px-6 py-4 hidden md:table-cell">{record.year}</td>
                      <td className="px-6 py-4">
                        {record.paymentDate ? (
                          <span className={`${isDarkTheme ? 'text-green-400' : 'text-green-600'}`}>
                            {new Date(record.paymentDate).toLocaleDateString()}
                          </span>
                        ) : (
                          <span className={`${isDarkTheme ? 'text-yellow-400' : 'text-yellow-600'}`}>
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Button
                          variant="contained"
                          size={isMobile ? "small" : "medium"}
                          sx={{
                            backgroundColor: record.isPaid ? '#4caf50' : '#1976d2',
                            '&:hover': {
                              backgroundColor: record.isPaid ? '#45a049' : '#1565c0',
                            },
                            '&.Mui-disabled': {
                              backgroundColor: isDarkTheme ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
                              color: isDarkTheme ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.26)',
                            }
                          }}
                          disabled={record.isPaid}
                          onClick={() => setSelectedRecord(record)}
                        >
                          {record.isPaid ? "Paid" : "Pay"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
  
        {selectedRecord && (
          <div className={`mt-6 p-4 rounded-lg shadow-lg ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`}>
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
    </div>
  );
};

export default Payroll;