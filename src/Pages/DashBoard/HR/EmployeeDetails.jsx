import React from "react";
import { useParams } from "react-router-dom";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Components/LoadingSpiner";
import { useTheme } from "../../../Provider/ThemeProvider";
import { motion } from "framer-motion";

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4842', '#EA1179'];

const EmployeeDetails = () => {
  const { isDarkTheme } = useTheme();
  const { slug } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: employee = [], isLoading } = useQuery({
    queryKey: ["employee", slug],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/payroll/id/${slug}`);
        if (!res.data || res.data.length === 0) {
          throw new Error('No employee data found');
        }
        return res.data;
      } catch (error) {
        console.error('Error fetching employee:', error);
        throw error;
      }
    },
    retry: 1
  });

  if (isLoading) return <LoadingSpinner />;

  const employeeData = employee.map(item => ({
    name: item.date,
    salary: item.salary,
    formattedDate: `${item.month}-${item.year}`,
  }));

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
console.log(employee);
  return (
    <div className={`min-h-screen ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Employee Info Card */}
          <div className={`rounded-xl p-6 mb-8 ${
            isDarkTheme ? 'bg-gray-800' : 'bg-white'
          } shadow-xl transition-all duration-300`}>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={employee[0]?.photo || 'default-avatar.png'}
                alt={employee[0]?.Name}
                className="rounded-full w-32 h-32 object-cover border-4 border-blue-500 shadow-lg"
              />
              <div className="text-center md:text-left">
                <h1 className="text-2xl md:text-4xl font-bold mb-2">
                  {employee[0]?.Name}
                </h1>
                <p className={`text-lg md:text-xl ${
                  isDarkTheme ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <span className="font-semibold">Designation:</span> {employee[0]?.designation}
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <span className={`px-4 py-1 rounded-full text-sm ${
                    isDarkTheme ? 'bg-blue-600' : 'bg-blue-100 text-blue-800'
                  }`}>
                    Employee ID: {employee[0]?._id?.slice(0, 8)}
                  </span>
                  <span className={`px-4 py-1 rounded-full text-sm ${
                    isDarkTheme ? 'bg-green-600' : 'bg-green-100 text-green-800'
                  }`}>
                    Active Employee
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Salary Chart Card */}
          <div className={`rounded-xl p-6 ${
            isDarkTheme ? 'bg-gray-800' : 'bg-white'
          } shadow-xl transition-all duration-300`}>
            <h2 className="text-xl md:text-2xl font-bold mb-6">Salary History</h2>
            <div className="w-full" style={{ height: '400px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={employeeData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke={isDarkTheme ? '#374151' : '#e5e7eb'}
                  />
                  <XAxis 
                    dataKey="formattedDate" 
                    stroke={isDarkTheme ? '#D1D5DB' : '#4B5563'}
                  />
                  <YAxis 
                    stroke={isDarkTheme ? '#D1D5DB' : '#4B5563'}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: isDarkTheme ? '#1F2937' : '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      color: isDarkTheme ? '#FFFFFF' : '#000000'
                    }}
                  />
                  <Bar
                    dataKey="salary"
                    shape={<TriangleBar />}
                    label={{ 
                      position: "top",
                      fill: isDarkTheme ? '#D1D5DB' : '#4B5563'
                    }}
                  >
                    {employeeData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={colors[index % colors.length]} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EmployeeDetails;