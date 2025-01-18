import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import LoadingSpinner from '../../../Components/LoadingSpiner';

const Message = () => {
    const axiosSecure = useAxiosSecure()
    const {data: messages =[],isPending, refetch}=useQuery({
        queryKey: ['message'],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get('/messages');
                return res.data;
            } catch (error) {
                console.error(error);
            }
        },
    })
    // console.log(messages);
    if(isPending) return <LoadingSpinner></LoadingSpinner>
    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
        {/* Avatar or Icon */}
        <div >
        {
            messages.map((message, idx) =><div key={idx} className='my-5'>
                <div className="flex items-center space-x-4 mb-4">
          <div className="w-5 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold text-gray-700">
            
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{message?.name}</h2>
            <p className="text-sm text-gray-600">{message?.email}</p>
          </div>
        </div>
  
        {/* Message */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-800">{message?.message}</p>
        </div>
         {/* Footer */}
         <div className="mt-4 text-right">
          <button className="text-sm text-blue-500 hover:underline">Reply</button>
        </div>
            </div>)
        }
        </div>
  
       
      </div>
    );
};

export default Message;