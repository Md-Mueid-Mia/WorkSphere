import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import LoadingSpinner from '../../../Components/LoadingSpiner';
import { useTheme } from '../../../Provider/ThemeProvider';
import { FaReply, FaUserCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Message = () => {
    const { isDarkTheme } = useTheme();
    const axiosSecure = useAxiosSecure();
    const { data: messages = [], isPending, refetch } = useQuery({
        queryKey: ['message'],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get('/messages');
                return res.data;
            } catch (error) {
                console.error(error);
            }
        },
    });

    // if (isPending) return <LoadingSpinner />;
    // if (isPending) return <LoadingSpinner variant="pulse"/>;
    if (isPending) return <LoadingSpinner variant="dots"/>;

    return (
        <div className={`min-h-screen p-4 md:p-6 lg:p-8 ${
            isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
        }`}>
            <div className="max-w-4xl mx-auto">
                <h1 className={`text-2xl md:text-3xl font-bold mb-6 border-b pb-4 ${
                    isDarkTheme ? 'border-gray-700' : 'border-gray-200'
                }`}>
                    Messages Inbox
                </h1>

                <div className="grid gap-6">
                    {messages.map((message, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`rounded-lg shadow-lg overflow-hidden ${
                                isDarkTheme ? 'bg-gray-800' : 'bg-white'
                            }`}
                        >
                            <div className={` p-4 md:p-6 ${
                                isDarkTheme ? 'border-gray-700' : 'border-gray-100'
                            }`}>
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                                        isDarkTheme ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                                    }`}>
                                        <FaUserCircle />
                                    </div>
                                    <div>
                                        <h2 className={`text-lg font-semibold ${
                                            isDarkTheme ? 'text-gray-100' : 'text-gray-900'
                                        }`}>
                                            {message?.name}
                                        </h2>
                                        <p className={`text-sm ${
                                            isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                                        }`}>
                                            {message?.email}
                                        </p>
                                    </div>
                                </div>

                                <div className={`p-4 rounded-lg ${
                                    isDarkTheme ? 'bg-gray-700' : 'bg-gray-50'
                                }`}>
                                    <p className={isDarkTheme ? 'text-gray-300' : 'text-gray-800'}>
                                        {message?.message}
                                    </p>
                                </div>

                                <div className="mt-4 flex justify-between items-center">
                                    <span className={`text-sm ${
                                        isDarkTheme ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                        {message?.timestamp ? new Date(message.timestamp).toLocaleDateString() : 'No date'}
                                    </span>
                                    <button
                                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
                                            isDarkTheme 
                                                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                                : 'bg-blue-500 hover:bg-blue-600 text-white'
                                        }`}
                                    >
                                        <FaReply />
                                        <span>Reply</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Message;