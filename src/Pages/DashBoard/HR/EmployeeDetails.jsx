import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const EmployeeDetails = () => {
  const { slug } = useParams(); // Get the dynamic slug
  const [employee, setEmployee] = useState(null);
  const [chartData, setChartData] = useState(null);
  const axiosSecure =useAxiosSecure()

  useEffect(() => {
    // Fetch employee details
    axiosSecure.get(`/employees/${slug}`) // Replace with your API endpoint
      .then((response) => {
        const data = response.data;
        setEmployee(data);

        // Prepare chart data
        setChartData({
          labels: data.salaryHistory.map(item => `${item.month} '${item.year}`),
          datasets: [
            {
              label: "Salary",
              data: data.salaryHistory.map(item => item.salary),
              backgroundColor: [
                "#4CAF50",
                "#FF9800",
                "#FFEB3B",
                "#03A9F4",
              ],
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => console.error("Error fetching employee data:", error));
  }, [slug]);

//   if (!employee || !chartData) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{employee.name}</h1>
      <img
        src={employee.photoURL}
        alt={employee.name}
        className="rounded-full w-32 h-32 mb-4"
      />
      <p className="text-xl mb-4"><strong>Designation:</strong> {employee.designation}</p>
      
      <div className="w-full max-w-lg mx-auto">
        <Bar
          data={chartData}
          options={{
            plugins: {
              legend: { display: true },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Month",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Salary ($)",
                },
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default EmployeeDetails;
