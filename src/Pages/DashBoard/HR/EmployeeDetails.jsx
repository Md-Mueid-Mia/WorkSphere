import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Components/LoadingSpiner";

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const EmployeeDetails = () => {
  const { slug } = useParams(); // Get the dynamic slug
  // const [employee, setEmployee] = useState(null);
  const axiosSecure =useAxiosSecure()


  const {data: employee = [], refetch} = useQuery({
    queryKey: ["employee", slug],
    queryFn: async () => {
      try {
        // Update the endpoint based on whether slug is an email or ID
        const res = await axiosSecure.get(`/payroll/id/${slug}`);
        if (!res.data || res.data.length === 0) {
          throw new Error('No employee data found');
        }
        return res.data; // Return first item since it's an array
      } catch (error) {
        console.error('Error fetching employee:', error);
        throw error;
      }
    },
    retry: 1
  });
console.log(employee);

if (!employee) return <LoadingSpinner></LoadingSpinner>

const employeeData = employee.map(item=> ({
  name: item.date,
  salary: item.salary,
  formattedDate: `${item.month}-${item.year}`,
}))

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];
const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

  return (
    <div className="container mx-auto p-6">
     <div className="pb-10">
     <img
        src={employee?.photo}
        alt={employee?.Name}
        className="rounded-full w-32 h-32 mb-4"
      />
      <h1 className="text-3xl font-bold mb-4">Name: {employee?.Name}</h1>
      <p className="text-xl mb-4"><strong>Designation:</strong> {employee?.designation}</p>
      
     </div>
      <div className="w-full  mx-auto">
      <BarChart
      width={800}
      height={300}
      data={employeeData}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="formattedDate" />
      <YAxis />
      <Bar
        dataKey="salary"
        fill="#8884d8"
        shape={<TriangleBar />}
        label={{ position: "top" }}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
      </div>
    </div>
  );
}

export default EmployeeDetails;
