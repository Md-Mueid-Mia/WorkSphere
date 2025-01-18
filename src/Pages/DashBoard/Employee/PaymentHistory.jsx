import React, { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure(); // Use secure axios instance

  const { data: paymentData = [], isLoading, error } = useQuery({
    queryKey: ["payroll", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/payroll/${user?.email}`);
      return response.data;
    },
    enabled: !!user?.email
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
    console.log(paymentData);

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = paymentData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(paymentData.length / rowsPerPage);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Payment History</h1>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Month</th>
            <th className="border px-4 py-2">Year</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Transaction ID</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((payment, index) => (
            <tr key={index} className="text-center">
              <td className="border px-4 py-2">{payment.month}</td>
              <td className="border px-4 py-2">{payment.year}</td>
              <td className="border px-4 py-2">$ {payment.salary}</td>
              <td className="border px-4 py-2">{payment.transactionId}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {paymentData.length > rowsPerPage && (
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded mr-2"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded ml-2"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
