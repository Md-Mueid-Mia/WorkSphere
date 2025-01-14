
import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useHR = () => {
    const {user} = useAuth();
    const axiosSecure= useAxiosSecure()
    const {data: isHR, isPending: isHRLoading}= useQuery({
        queryKey: [user?.email, 'hr'],
        enabled:!!user?.email,
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/users/hr/${user?.email}`);
                console.log('HR info response:', res.data);
                return res.data;
            } catch (error) {
                // console.error('HR info failed:', error);
            }
        }
    })
    return [isHR, isHRLoading]
};

export default useHR;