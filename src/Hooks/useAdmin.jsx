import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useAdmin = () => {
      const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !!user?.email,
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/users/admin/${user?.email}`);
                console.log('Admin check response:', res.data);
                return res.data?.admin;
            } catch (error) {
                // console.error('Admin check failed:', error);
                return false;
            }
        }
    })
    // console.log(isAdmin, user);
    return [isAdmin, isAdminLoading]
};

export default useAdmin;