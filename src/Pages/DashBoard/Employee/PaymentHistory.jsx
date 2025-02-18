import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useTheme } from "../../../Provider/ThemeProvider";
import { motion } from "framer-motion";

const PaymentHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const { user } = useAuth();
  const { isDarkTheme } = useTheme();
  const axiosSecure = useAxiosSecure();

  const { data: paymentData = [], isLoading, error } = useQuery({
    queryKey: ["payroll", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/payroll/${user?.email}`);
      return response.data;
    },
    enabled: !!user?.email
  });

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="text-center p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">
      Error: {error.message}
    </div>
  );

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = paymentData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(paymentData.length / rowsPerPage);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`container mx-auto px-4 md:p-6 ${isDarkTheme ? 'dark bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}`}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">Payment History</h1>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className={`${
              isDarkTheme 
                ? 'bg-gray-700 text-gray-100' 
                : 'bg-gray-100 text-gray-700'
            }`}>
              <th className="px-4 py-3 text-left">Month</th>
              <th className="px-4 py-3 text-left">Year</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((payment, index) => (
              <motion.tr 
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  ${isDarkTheme 
                    ? 'border-gray-700 hover:bg-gray-700' 
                    : 'border-gray-200 hover:bg-gray-50'
                  } border-b transition-colors
                `}
              >
                <td className="px-4 py-3">{payment.month}</td>
                <td className="px-4 py-3">{payment.year}</td>
                <td className="px-4 py-3 font-semibold">
                  <span className="text-green-500">$</span> {payment.salary}
                </td>
                <td className="px-4 py-3 font-mono">{payment.transactionId}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {paymentData.length > rowsPerPage && (
        <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
          <button
            className={`px-4 py-2 rounded-md transition-colors ${
              isDarkTheme
                ? 'bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800'
                : 'bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100'
            } disabled:cursor-not-allowed`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`px-4 py-2 rounded-md transition-colors ${
              isDarkTheme
                ? 'bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800'
                : 'bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100'
            } disabled:cursor-not-allowed`}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default PaymentHistory;