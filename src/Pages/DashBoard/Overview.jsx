import React from 'react';
import { FiUsers, FiDollarSign, FiClock, FiCheckSquare } from 'react-icons/fi';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { useTheme } from '../../Provider/ThemeProvider';

const Overview = () => {
    const {  isDarkTheme: isDark, toggleTheme } = useTheme();
  const stats = [
    { title: 'Total Employees', value: '150', icon: <FiUsers />, color: 'from-blue-400 to-blue-600' },
    { title: 'Monthly Revenue', value: '$45,00', icon: <FiDollarSign />, color: 'from-green-400 to-green-600' },
    { title: 'Work Hours', value: '1,280', icon: <FiClock />, color: 'from-purple-400 to-purple-600' },
    { title: 'Tasks Complete', value: '85%', icon: <FiCheckSquare />, color: 'from-yellow-400 to-yellow-600' },
  ];

  const chartData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
  ];

  const pieData = [
    { name: 'Engineering', value: 400, color: '#8884d8' },
    { name: 'Sales', value: 300, color: '#82ca9d' },
    { name: 'Marketing', value: 300, color: '#ffc658' },
    { name: 'Support', value: 200, color: '#ff8042' },
  ];

  return (
    <div className={`px-5 space-y-8 min-h-screen max-w-full ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            key={index}
            className={`relative overflow-hidden ${
              isDark ? 'bg-gray-800' : 'bg-white'
            } rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300`}
          >
            <div className="p-4 md:p-5">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-xl bg-gradient-to-r ${stat.color} text-white text-lg`}>
                  {stat.icon}
                </div>
                <div>
                  <p className={`${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  } text-sm font-medium`}>
                    {stat.title}
                  </p>
                  <h3 className={`text-xl md:text-2xl font-bold ${
                    isDark ? 'text-white' : 'bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'
                  }`}>
                    {stat.value}
                  </h3>
                </div>
              </div>
            </div>
            <div className={`h-1 w-full bg-gradient-to-r ${stat.color}`} />
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`${
            isDark ? 'bg-gray-800' : 'bg-white'
          } rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-all duration-300`}
        >
          <h3 className={`text-xl font-bold mb-6 ${
            isDark ? 'text-white' : 'bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'
          }`}> Revenue Overview
          </h3>
          <div className="h-[300px] md:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke={isDark ? '#374151' : '#f0f0f0'} 
                />
                <XAxis 
                  dataKey="name" 
                  stroke={isDark ? '#9CA3AF' : '#666'} 
                />
                <YAxis 
                  stroke={isDark ? '#9CA3AF' : '#666'} 
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    color: isDark ? '#fff' : '#000'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  fill="url(#colorValue)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Employee Distribution */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`${
            isDark ? 'bg-gray-800' : 'bg-white'
          } rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-all duration-300`}
        >
          <h3 className={`text-xl font-bold mb-6 ${
            isDark ? 'text-white' : 'bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'
          }`}>
            Employee Distribution
          </h3>
          <div className="h-[300px] md:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    color: isDark ? '#fff' : '#000'
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  formatter={(value) => (
                    <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Overview;